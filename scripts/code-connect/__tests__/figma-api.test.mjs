import assert from 'node:assert/strict';
import test from 'node:test';

import {ALLOWED_FIGMA_FILE_KEY} from '../lib/contract.mjs';
import {fetchFigmaNodes} from '../lib/figma-api.mjs';

test('fetches only the fixed Figma API host with a bounded node list', async () => {
    let request;
    const payload = {nodes: {'1:2': {document: {name: 'Button'}}}};
    const fetchImpl = async (url, options) => {
        request = {url, options};
        return new Response(JSON.stringify(payload), {
            status: 200,
            headers: {'content-type': 'application/json'},
        });
    };

    const result = await fetchFigmaNodes({
        token: 'test-token',
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        nodeIds: ['3:4', '1:2'],
        fetchImpl,
    });

    assert.equal(
        request.url,
        `https://api.figma.com/v1/files/${ALLOWED_FIGMA_FILE_KEY}/nodes?ids=1%3A2%2C3%3A4`,
    );
    assert.equal(request.options.redirect, 'error');
    assert.equal(request.options.headers['X-Figma-Token'], 'test-token');
    assert.equal(result.status, 'PASS');
    assert.deepEqual(result.data, payload);
});

test('does not issue a request for an invalid file key, token, or node id', async () => {
    let calls = 0;
    const fetchImpl = async () => {
        calls += 1;
        return new Response('{}');
    };

    for (const input of [
        {token: '', fileKey: ALLOWED_FIGMA_FILE_KEY, nodeIds: ['1:2']},
        {token: 'token', fileKey: 'another-file', nodeIds: ['1:2']},
        {token: 'token', fileKey: ALLOWED_FIGMA_FILE_KEY, nodeIds: ['../1:2']},
    ]) {
        const result = await fetchFigmaNodes({...input, fetchImpl});
        assert.equal(result.status, input.token ? 'FAIL' : 'AUTH_BLOCKED');
    }
    assert.equal(calls, 0);
});

test('classifies 401, 403, 429, and 5xx without parsing response data', async () => {
    for (const [httpStatus, status] of [
        [401, 'AUTH_BLOCKED'],
        [403, 'AUTH_BLOCKED'],
        [429, 'DATA_MISSING'],
        [500, 'DATA_MISSING'],
        [503, 'DATA_MISSING'],
    ]) {
        const result = await fetchFigmaNodes({
            token: 'token',
            fileKey: ALLOWED_FIGMA_FILE_KEY,
            nodeIds: ['1:2'],
            fetchImpl: async () => new Response('not json', {status: httpStatus}),
        });

        assert.equal(result.status, status);
        assert.equal(result.httpStatus, httpStatus);
        assert.equal(result.data, undefined);
    }
});

test('reports malformed, oversized, and unavailable Figma data', async () => {
    const malformed = await fetchFigmaNodes({
        token: 'token',
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        nodeIds: ['1:2'],
        fetchImpl: async () => new Response('{', {status: 200}),
    });
    const oversized = await fetchFigmaNodes({
        token: 'token',
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        nodeIds: ['1:2'],
        fetchImpl: async () =>
            new Response('{}', {status: 200, headers: {'content-length': String(9 * 1024 * 1024)}}),
    });
    const unavailable = await fetchFigmaNodes({
        token: 'token',
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        nodeIds: ['1:2'],
        fetchImpl: async () => {
            throw new TypeError('network unavailable');
        },
    });

    assert.equal(malformed.status, 'DATA_MISSING');
    assert.equal(malformed.code, 'MALFORMED_FIGMA_DATA');
    assert.equal(oversized.status, 'DATA_MISSING');
    assert.equal(oversized.code, 'OVERSIZED_FIGMA_DATA');
    assert.equal(unavailable.status, 'DATA_MISSING');
    assert.equal(unavailable.code, 'FIGMA_UNAVAILABLE');
});
