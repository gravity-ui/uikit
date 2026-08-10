import fs from 'node:fs';
import path from 'node:path';

import {
    ALLOWED_FIGMA_FILE_KEY,
    compareSnapshots,
    normalizeFigmaNodes,
    serializeSnapshot,
    validateContract,
    validateSnapshotDocument,
} from './contract.mjs';
import {fetchFigmaNodes} from './figma-api.mjs';

export const SNAPSHOT_PATH = 'code-connect/figma.schema.snapshot.json';
export const IGNORES_PATH = 'code-connect/ignores.json';

function compareText(left, right) {
    if (left < right) {
        return -1;
    }
    if (left > right) {
        return 1;
    }
    return 0;
}

export function parseFigmaNodeUrl(value) {
    let url;
    try {
        url = new URL(value);
    } catch {
        throw new Error('Expected an absolute Figma design URL.');
    }
    if (url.protocol !== 'https:' || url.hostname !== 'www.figma.com') {
        throw new Error('Only https://www.figma.com URLs are allowed.');
    }
    const match = url.pathname.match(/^\/design\/([^/]+)\//);
    if (!match || match[1] !== ALLOWED_FIGMA_FILE_KEY) {
        throw new Error(`Only the allowlisted Figma file ${ALLOWED_FIGMA_FILE_KEY} is allowed.`);
    }
    const rawNodeId = url.searchParams.get('node-id');
    if (!rawNodeId || !/^\d+[-:]\d+$/.test(rawNodeId)) {
        throw new Error('The Figma URL must contain a concrete node-id.');
    }
    return {fileKey: match[1], nodeId: rawNodeId.replace('-', ':')};
}

export function mergeSnapshotComponent(snapshot, component) {
    const components = snapshot.components
        .filter(
            (item) => item.nodeId !== component.nodeId && item.component !== component.component,
        )
        .concat(structuredClone(component))
        .sort(
            (left, right) =>
                compareText(left.component, right.component) ||
                compareText(left.nodeId, right.nodeId),
        );
    return {...structuredClone(snapshot), components};
}

function formatIssue(item) {
    const subject = item.property ?? item.rawKey ?? item.template ?? item.path;
    const suffix = subject ? `: ${subject}` : '';
    const detail = item.option ?? item.detail ?? item.actual;
    return `- \`${item.code}\`${suffix}${detail === undefined ? '' : ` (${String(detail)})`}`;
}

export function renderIssueReport(status, issues) {
    const groups = new Map();
    for (const item of issues) {
        const group = item.component ?? 'Contract';
        const current = groups.get(group) ?? [];
        current.push(item);
        groups.set(group, current);
    }
    const sections = [...groups]
        .sort(([left], [right]) => compareText(left, right))
        .map(([group, entries]) => {
            const rows = entries
                .sort(
                    (left, right) =>
                        compareText(left.code, right.code) ||
                        compareText(
                            left.property ?? left.rawKey ?? '',
                            right.property ?? right.rawKey ?? '',
                        ),
                )
                .map(formatIssue)
                .join('\n');
            return `## ${group}\n\n${rows}`;
        });
    if (sections.length === 0) {
        sections.push('No contract drift detected.');
    }
    return `${status}\n\n${sections.join('\n\n')}`;
}

export function loadProjectContract(root = process.cwd()) {
    const snapshot = JSON.parse(fs.readFileSync(path.join(root, SNAPSHOT_PATH), 'utf8'));
    const ignores = JSON.parse(fs.readFileSync(path.join(root, IGNORES_PATH), 'utf8'));
    const templates = Object.fromEntries(
        snapshot.components.map(({template}) => [
            template,
            fs.readFileSync(path.join(root, template), 'utf8'),
        ]),
    );
    return {snapshot, ignores, templates};
}

export function validateProjectContract(root = process.cwd()) {
    try {
        return validateContract(loadProjectContract(root));
    } catch (error) {
        return {
            status: 'FAIL',
            issues: [
                {
                    code: 'PROJECT_DATA_UNREADABLE',
                    detail: error instanceof Error ? error.message : String(error),
                },
            ],
        };
    }
}

export async function getLiveSnapshot(snapshot, token, fetchImpl = fetch) {
    const snapshotIssues = validateSnapshotDocument(snapshot);
    if (snapshotIssues.length > 0) {
        return {status: 'FAIL', issues: snapshotIssues};
    }
    const templatesByNode = Object.fromEntries(
        snapshot.components.map(({nodeId, template}) => [nodeId, template]),
    );
    const response = await fetchFigmaNodes({
        token,
        fileKey: snapshot.fileKey,
        nodeIds: Object.keys(templatesByNode),
        fetchImpl,
    });
    if (response.status !== 'PASS') {
        return {
            status: response.status,
            issues: [
                {
                    code: response.code ?? `FIGMA_HTTP_${response.httpStatus}`,
                    actual: response.httpStatus,
                },
            ],
        };
    }
    const live = normalizeFigmaNodes(response.data, {
        fileKey: snapshot.fileKey,
        templatesByNode,
    });
    const issues = validateSnapshotDocument(live);
    if (live.components.length !== snapshot.components.length) {
        issues.push({
            code: 'FIGMA_NODES_MISSING',
            expected: snapshot.components.length,
            actual: live.components.length,
        });
    }
    return {status: issues.length === 0 ? 'PASS' : 'DATA_MISSING', issues, snapshot: live};
}

export async function compareProjectWithLive(root, token, fetchImpl = fetch) {
    let project;
    try {
        project = loadProjectContract(root);
    } catch (error) {
        return {
            status: 'FAIL',
            issues: [
                {
                    code: 'PROJECT_DATA_UNREADABLE',
                    detail: error instanceof Error ? error.message : String(error),
                },
            ],
        };
    }
    const local = validateContract(project);
    if (local.status !== 'PASS') {
        return local;
    }
    const live = await getLiveSnapshot(project.snapshot, token, fetchImpl);
    if (live.status !== 'PASS') {
        return live;
    }
    const issues = compareSnapshots(project.snapshot, live.snapshot);
    return {status: issues.length === 0 ? 'PASS' : 'FAIL', issues};
}

export function writeSnapshot(root, snapshot) {
    const target = path.join(root, SNAPSHOT_PATH);
    const temporary = `${target}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, serializeSnapshot(snapshot), {encoding: 'utf8', mode: 0o600});
    fs.renameSync(temporary, target);
}
