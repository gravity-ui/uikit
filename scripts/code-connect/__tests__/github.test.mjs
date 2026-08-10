import assert from 'node:assert/strict';
import test from 'node:test';

import {STICKY_COMMENT_MARKER} from '../lib/contract.mjs';
import {
    buildGitHubApiUrl,
    decodeGitHubFileContent,
    renderStickyComment,
    upsertStickyComment,
} from '../lib/github.mjs';

test('builds requests only for the fixed GitHub API origin', () => {
    assert.equal(
        buildGitHubApiUrl('/repos/gravity-ui/uikit/pulls/2742').toString(),
        'https://api.github.com/repos/gravity-ui/uikit/pulls/2742',
    );
    assert.throws(() => buildGitHubApiUrl('https://evil.example/repo'));
    assert.throws(() => buildGitHubApiUrl('/repos/gravity-ui/uikit/../secrets'));
});

test('decodes a bounded GitHub file response and rejects malformed base64', () => {
    const content = '{"schemaVersion":1}\n';
    assert.deepEqual(
        decodeGitHubFileContent({
            type: 'file',
            encoding: 'base64',
            size: Buffer.byteLength(content),
            content: Buffer.from(content).toString('base64'),
        }),
        content,
    );
    assert.throws(() =>
        decodeGitHubFileContent({type: 'file', encoding: 'base64', size: 1, content: '!!!'}),
    );
    assert.throws(() =>
        decodeGitHubFileContent({
            type: 'file',
            encoding: 'base64',
            size: 2 * 1024 * 1024,
            content: 'eA==',
        }),
    );
});

test('renders a grouped sticky comment bound to the exact head', () => {
    const body = renderStickyComment({
        status: 'FAIL',
        headSha: '0c8e29f8af2305566681ecc8ead319e189590dc4',
        issues: [{code: 'MISSING_COVERAGE', component: 'Button', property: 'Icon only'}],
    });

    assert.ok(body.startsWith(STICKY_COMMENT_MARKER));
    assert.match(body, /FAIL/);
    assert.match(body, /0c8e29f8af2305566681ecc8ead319e189590dc4/);
    assert.match(body, /## Button[\s\S]*MISSING_COVERAGE/);
});

test('upserts the sticky comment idempotently', async () => {
    const body = `${STICKY_COMMENT_MARKER}\n\nPASS`;

    async function run(existingBody) {
        const requests = [];
        const fetchImpl = async (url, options) => {
            requests.push({url: url.toString(), method: options.method, body: options.body});
            if (options.method === 'GET') {
                const comments = existingBody === undefined ? [] : [{id: 7, body: existingBody}];
                return new Response(JSON.stringify(comments), {status: 200});
            }
            return new Response(JSON.stringify({id: 7, body}), {status: 200});
        };
        await upsertStickyComment({
            repo: 'gravity-ui/uikit',
            prNumber: '2742',
            body,
            token: 'token',
            fetchImpl,
        });
        return requests;
    }

    const unchanged = await run(body);
    const changed = await run(`${STICKY_COMMENT_MARKER}\n\nFAIL`);
    const missing = await run(undefined);

    assert.deepEqual(
        unchanged.map(({method}) => method),
        ['GET'],
    );
    assert.deepEqual(
        changed.map(({method}) => method),
        ['GET', 'PATCH'],
    );
    assert.deepEqual(
        missing.map(({method}) => method),
        ['GET', 'POST'],
    );
});
