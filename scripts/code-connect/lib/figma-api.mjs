import {ALLOWED_FIGMA_FILE_KEY, classifyFigmaStatus} from './contract.mjs';

const FIGMA_API_ORIGIN = 'https://api.figma.com';
const MAX_NODE_IDS = 50;
const MAX_RESPONSE_BYTES = 8 * 1024 * 1024;

export async function fetchFigmaNodes({token, fileKey, nodeIds, fetchImpl = fetch}) {
    if (typeof token !== 'string' || token.length === 0) {
        return {status: 'AUTH_BLOCKED', code: 'MISSING_FIGMA_TOKEN'};
    }
    if (fileKey !== ALLOWED_FIGMA_FILE_KEY) {
        return {status: 'FAIL', code: 'INVALID_FILE_KEY'};
    }
    if (
        !Array.isArray(nodeIds) ||
        nodeIds.length === 0 ||
        nodeIds.length > MAX_NODE_IDS ||
        nodeIds.some((nodeId) => typeof nodeId !== 'string' || !/^\d+:\d+$/.test(nodeId))
    ) {
        return {status: 'FAIL', code: 'INVALID_NODE_IDS'};
    }

    const uniqueNodeIds = [...new Set(nodeIds)].sort();
    const url = new URL(`/v1/files/${fileKey}/nodes`, FIGMA_API_ORIGIN);
    url.searchParams.set('ids', uniqueNodeIds.join(','));

    let response;
    try {
        response = await fetchImpl(url.toString(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-Figma-Token': token,
            },
            redirect: 'error',
            signal: AbortSignal.timeout(20_000),
        });
    } catch {
        return {status: 'DATA_MISSING', code: 'FIGMA_UNAVAILABLE'};
    }

    const status = classifyFigmaStatus(response.status);
    if (status !== 'PASS') {
        return {status, httpStatus: response.status};
    }

    const contentLength = Number(response.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_RESPONSE_BYTES) {
        return {
            status: 'DATA_MISSING',
            code: 'OVERSIZED_FIGMA_DATA',
            httpStatus: response.status,
        };
    }

    let text;
    try {
        text = await response.text();
    } catch {
        return {
            status: 'DATA_MISSING',
            code: 'FIGMA_UNAVAILABLE',
            httpStatus: response.status,
        };
    }
    if (Buffer.byteLength(text, 'utf8') > MAX_RESPONSE_BYTES) {
        return {
            status: 'DATA_MISSING',
            code: 'OVERSIZED_FIGMA_DATA',
            httpStatus: response.status,
        };
    }

    try {
        return {status: 'PASS', httpStatus: response.status, data: JSON.parse(text)};
    } catch {
        return {
            status: 'DATA_MISSING',
            code: 'MALFORMED_FIGMA_DATA',
            httpStatus: response.status,
        };
    }
}
