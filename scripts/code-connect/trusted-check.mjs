#!/usr/bin/env node

import {
    EXPECTED_COMPONENT_NODE_IDS,
    compareSnapshots,
    validateContract,
    validateSnapshotDocument,
    validateTrustedFiles,
} from './lib/contract.mjs';
import {
    getGitHubFile,
    githubRequest,
    renderStickyComment,
    upsertStickyComment,
} from './lib/github.mjs';
import {getLiveSnapshot} from './lib/project.mjs';

const repo = process.env.GITHUB_REPOSITORY ?? '';
const prNumber = process.env.PR_NUMBER ?? '';
const githubToken = process.env.GITHUB_TOKEN ?? '';
const figmaToken = process.env.FIGMA_PLAN_ACCESS_TOKEN ?? '';
const snapshotPath = 'code-connect/figma.schema.snapshot.json';
const ignoresPath = 'code-connect/ignores.json';

function requiredComponentIssues(snapshot) {
    const components = new Map(
        (snapshot.components ?? []).map((component) => [component.component, component]),
    );
    const issues = [];
    for (const [component, nodeId] of Object.entries(EXPECTED_COMPONENT_NODE_IDS)) {
        const actual = components.get(component);
        if (!actual) {
            issues.push({code: 'REQUIRED_COMPONENT_MISSING', component});
        } else if (actual.nodeId !== nodeId) {
            issues.push({
                code: 'INVALID_NODE_ID',
                component,
                expected: nodeId,
                actual: actual.nodeId,
            });
        }
    }
    return issues;
}

async function loadPullRequestData(headSha) {
    const initial = await Promise.all(
        [snapshotPath, ignoresPath].map(async (filePath) => ({
            path: filePath,
            content: await getGitHubFile({
                repo,
                path: filePath,
                ref: headSha,
                token: githubToken,
            }),
        })),
    );
    const initialIssues = validateTrustedFiles(initial);
    if (initialIssues.length > 0) {
        return {status: 'FAIL', issues: initialIssues};
    }

    let snapshot;
    let ignores;
    try {
        snapshot = JSON.parse(initial.find((file) => file.path === snapshotPath).content);
        ignores = JSON.parse(initial.find((file) => file.path === ignoresPath).content);
    } catch {
        return {status: 'FAIL', issues: [{code: 'MALFORMED_JSON'}]};
    }

    const snapshotIssues = [
        ...validateSnapshotDocument(snapshot),
        ...requiredComponentIssues(snapshot),
    ];
    if (snapshotIssues.length > 0) {
        return {status: 'FAIL', issues: snapshotIssues};
    }

    const templateFiles = await Promise.all(
        snapshot.components.map(async ({template}) => ({
            path: template,
            content: await getGitHubFile({
                repo,
                path: template,
                ref: headSha,
                token: githubToken,
            }),
        })),
    );
    const files = [...initial, ...templateFiles];
    const intakeIssues = validateTrustedFiles(files);
    if (intakeIssues.length > 0) {
        return {status: 'FAIL', issues: intakeIssues};
    }

    const templates = Object.fromEntries(templateFiles.map(({path, content}) => [path, content]));
    const local = validateContract({snapshot, ignores, templates});
    if (local.status !== 'PASS') {
        return local;
    }

    const live = await getLiveSnapshot(snapshot, figmaToken);
    if (live.status !== 'PASS') {
        return live;
    }
    const issues = compareSnapshots(snapshot, live.snapshot);
    return {status: issues.length === 0 ? 'PASS' : 'FAIL', issues};
}

async function main() {
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo) || !/^\d+$/.test(prNumber)) {
        process.stderr.write('Invalid trusted workflow inputs.\n');
        return 1;
    }

    let headSha = 'unknown';
    let result;
    try {
        const pullRequest = await githubRequest(`/repos/${repo}/pulls/${prNumber}`, {
            token: githubToken,
        });
        headSha = pullRequest.data?.head?.sha ?? 'unknown';
        if (!pullRequest.ok || !/^[a-f0-9]{40}$/.test(headSha)) {
            result = {status: 'DATA_MISSING', issues: [{code: 'PR_HEAD_DATA_MISSING'}]};
        } else {
            result = await loadPullRequestData(headSha);
        }
    } catch {
        result = {status: 'DATA_MISSING', issues: [{code: 'PR_CONTRACT_DATA_MISSING'}]};
    }

    const body = renderStickyComment({status: result.status, headSha, issues: result.issues});
    try {
        await upsertStickyComment({
            repo,
            prNumber,
            body,
            token: githubToken,
        });
    } catch {
        process.stderr.write('Unable to update the Code Connect contract comment.\n');
        return 1;
    }

    process.stdout.write(`${result.status}\n`);
    return result.status === 'PASS' ? 0 : 1;
}

process.exitCode = await main();
