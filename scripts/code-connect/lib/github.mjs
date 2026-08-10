import {STICKY_COMMENT_MARKER, planStickyCommentUpdate} from './contract.mjs';
import {renderIssueReport} from './project.mjs';

const GITHUB_API_ORIGIN = 'https://api.github.com';
const MAX_GITHUB_RESPONSE_BYTES = 2 * 1024 * 1024;
const MAX_GITHUB_FILE_BYTES = 1024 * 1024;

export function buildGitHubApiUrl(relativePath) {
    if (
        typeof relativePath !== 'string' ||
        !relativePath.startsWith('/') ||
        relativePath.startsWith('//') ||
        relativePath.split(/[/?]/).some((part) => part === '..')
    ) {
        throw new Error('GitHub API paths must be normalized relative paths.');
    }
    return new URL(relativePath, GITHUB_API_ORIGIN);
}

export function decodeGitHubFileContent(data) {
    if (
        !data ||
        data.type !== 'file' ||
        data.encoding !== 'base64' ||
        typeof data.size !== 'number' ||
        data.size < 0 ||
        data.size > MAX_GITHUB_FILE_BYTES ||
        typeof data.content !== 'string'
    ) {
        throw new Error('Malformed or oversized GitHub file response.');
    }
    const encoded = data.content.replace(/\s/g, '');
    if (
        encoded.length === 0 ||
        encoded.length % 4 !== 0 ||
        !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)
    ) {
        throw new Error('Malformed GitHub base64 content.');
    }
    const decoded = Buffer.from(encoded, 'base64');
    if (decoded.length !== data.size) {
        throw new Error('GitHub file size does not match decoded content.');
    }
    return decoded.toString('utf8');
}

export async function githubRequest(
    relativePath,
    {token, method = 'GET', body, fetchImpl = fetch} = {},
) {
    if (typeof token !== 'string' || token.length === 0) {
        throw new Error('Missing GitHub token.');
    }
    const url = buildGitHubApiUrl(relativePath);
    const response = await fetchImpl(url, {
        method,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            ...(body === undefined ? {} : {'Content-Type': 'application/json'}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        redirect: 'error',
        signal: AbortSignal.timeout(20_000),
    });
    const contentLength = Number(response.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_GITHUB_RESPONSE_BYTES) {
        throw new Error('Oversized GitHub API response.');
    }
    const text = await response.text();
    if (Buffer.byteLength(text, 'utf8') > MAX_GITHUB_RESPONSE_BYTES) {
        throw new Error('Oversized GitHub API response.');
    }
    let data;
    if (text.length > 0) {
        try {
            data = JSON.parse(text);
        } catch {
            throw new Error(`Malformed GitHub API response (${response.status}).`);
        }
    }
    return {ok: response.ok, status: response.status, data};
}

export async function getGitHubFile({repo, path, ref, token, fetchImpl = fetch}) {
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo) || !/^[a-f0-9]{40}$/.test(ref)) {
        throw new Error('Invalid repository or commit SHA.');
    }
    const encodedPath = path
        .split('/')
        .map((part) => encodeURIComponent(part))
        .join('/');
    const response = await githubRequest(
        `/repos/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(ref)}`,
        {token, fetchImpl},
    );
    if (!response.ok) {
        throw new Error(`GitHub file request failed (${response.status}).`);
    }
    return decodeGitHubFileContent(response.data);
}

export function renderStickyComment({status, headSha, issues}) {
    return `${STICKY_COMMENT_MARKER}\n\n${renderIssueReport(status, issues)}\n\nExact head: \`${headSha}\``;
}

export async function upsertStickyComment({repo, prNumber, body, token, fetchImpl = fetch}) {
    const comments = [];
    for (let page = 1; page <= 10; page += 1) {
        const response = await githubRequest(
            `/repos/${repo}/issues/${prNumber}/comments?per_page=100&page=${page}`,
            {token, fetchImpl},
        );
        if (!response.ok || !Array.isArray(response.data)) {
            throw new Error(`GitHub comments request failed (${response.status}).`);
        }
        comments.push(...response.data.map(({id, body: commentBody}) => ({id, body: commentBody})));
        if (response.data.length < 100) {
            break;
        }
    }
    const plan = planStickyCommentUpdate(comments, body);
    if (plan.action === 'none') {
        return plan;
    }
    const relativePath =
        plan.action === 'create'
            ? `/repos/${repo}/issues/${prNumber}/comments`
            : `/repos/${repo}/issues/comments/${plan.commentId}`;
    const response = await githubRequest(relativePath, {
        token,
        method: plan.action === 'create' ? 'POST' : 'PATCH',
        body: {body},
        fetchImpl,
    });
    if (!response.ok) {
        throw new Error(`GitHub comment mutation failed (${response.status}).`);
    }
    return plan;
}
