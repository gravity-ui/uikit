import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const contractWorkflow = fs.readFileSync('.github/workflows/code-connect-contract.yml', 'utf8');
const postMergeWorkflow = fs.readFileSync('.github/workflows/code-connect-post-merge.yml', 'utf8');

test('trusted workflow never checks out or executes PR code', () => {
    assert.match(contractWorkflow, /pull_request_target:/);
    assert.match(contractWorkflow, /workflow_dispatch:/);
    assert.match(contractWorkflow, /contents: read/);
    assert.match(contractWorkflow, /pull-requests: write/);
    assert.match(contractWorkflow, /persist-credentials: false/);
    assert.match(contractWorkflow, /node scripts\/code-connect\/trusted-check\.mjs/);
    assert.doesNotMatch(contractWorkflow, /pull_request\.head\.(sha|ref)/);
    assert.doesNotMatch(contractWorkflow, /checkout[^\n]*PR_NUMBER/i);
    assert.doesNotMatch(contractWorkflow, /figma connect publish/);
});

test('publish remains a manual post-merge operation with a separate token', () => {
    assert.match(postMergeWorkflow, /workflow_dispatch:/);
    assert.match(postMergeWorkflow, /github\.ref == 'refs\/heads\/main'/);
    assert.match(postMergeWorkflow, /environment: figma-code-connect/);
    assert.match(postMergeWorkflow, /FIGMA_CODE_CONNECT_CLI_TOKEN/);
    assert.doesNotMatch(postMergeWorkflow, /pull_request(?:_target)?:/);
});
