#!/usr/bin/env node

import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import {
    ALLOWED_FIGMA_FILE_KEY,
    normalizeFigmaNodes,
    validateSnapshotDocument,
} from './lib/contract.mjs';
import {fetchFigmaNodes} from './lib/figma-api.mjs';
import {
    SNAPSHOT_PATH,
    compareProjectWithLive,
    getLiveSnapshot,
    loadProjectContract,
    mergeSnapshotComponent,
    parseFigmaNodeUrl,
    renderIssueReport,
    validateProjectContract,
    writeSnapshot,
} from './lib/project.mjs';

const root = process.cwd();
const [, , command, ...args] = process.argv;

function getFlag(name) {
    const index = args.indexOf(name);
    return index === -1 ? undefined : args[index + 1];
}

function hasFlag(name) {
    return args.includes(name);
}

function getToken() {
    return process.env.FIGMA_ACCESS_TOKEN ?? '';
}

function printResult(result) {
    process.stdout.write(`${renderIssueReport(result.status, result.issues ?? [])}\n`);
}

function exitCodeForStatus(status) {
    if (status === 'PASS') {
        return 0;
    }
    if (status === 'FAIL') {
        return 1;
    }
    return 2;
}

function runLocalBinary(binaryName, binaryArgs, {inheritOutput = false} = {}) {
    const executable = path.join(root, 'node_modules', '.bin', binaryName);
    const result = spawnSync(executable, binaryArgs, {
        cwd: root,
        env: process.env,
        encoding: 'utf8',
        stdio: inheritOutput ? 'inherit' : 'pipe',
    });
    if (result.error) {
        return {ok: false, detail: result.error.message};
    }
    if (result.status !== 0) {
        const detail = [result.stdout, result.stderr].filter(Boolean).join('\n').trim();
        return {ok: false, detail: detail || `${binaryName} exited with ${result.status}`};
    }
    return {ok: true};
}

async function check() {
    const local = validateProjectContract(root);
    if (local.status !== 'PASS') {
        printResult(local);
        return 1;
    }

    const commands = [
        ['tsc', ['-p', 'tsconfig.figma.json', '--noEmit'], 'FIGMA_TYPESCRIPT_FAILED'],
        [
            'figma',
            [
                'connect',
                'parse',
                '--config',
                'figma.config.json',
                '--skip-update-check',
                '--exit-on-unreadable-files',
            ],
            'FIGMA_PARSE_FAILED',
        ],
    ];
    for (const [binary, binaryArgs, code] of commands) {
        const result = runLocalBinary(binary, binaryArgs);
        if (!result.ok) {
            printResult({status: 'FAIL', issues: [{code, detail: result.detail}]});
            return 1;
        }
    }

    const result = await compareProjectWithLive(root, getToken());
    printResult(result);
    return exitCodeForStatus(result.status);
}

async function refresh() {
    const project = loadProjectContract(root);
    const result = await getLiveSnapshot(project.snapshot, getToken());
    if (result.status !== 'PASS') {
        printResult(result);
        return exitCodeForStatus(result.status);
    }
    writeSnapshot(root, result.snapshot);
    const local = validateProjectContract(root);
    printResult(local);
    return exitCodeForStatus(local.status);
}

async function scaffold() {
    const urlValue = getFlag('--url');
    const component = getFlag('--component');
    const outFile = getFlag('--out-file');
    if (!urlValue || !component || !outFile) {
        printResult({
            status: 'FAIL',
            issues: [
                {
                    code: 'SCAFFOLD_ARGUMENTS_REQUIRED',
                    detail: '--url, --component, and --out-file are required',
                },
            ],
        });
        return 1;
    }
    if (!/^[A-Z][A-Za-z0-9]*$/.test(component)) {
        printResult({
            status: 'FAIL',
            issues: [{code: 'INVALID_COMPONENT_NAME', actual: component}],
        });
        return 1;
    }
    const expectedOutFile = `src/components/${component}/${component}.figma.ts`;
    if (outFile !== expectedOutFile) {
        printResult({
            status: 'FAIL',
            issues: [{code: 'INVALID_TEMPLATE_PATH', expected: expectedOutFile, actual: outFile}],
        });
        return 1;
    }

    let parsedUrl;
    try {
        parsedUrl = parseFigmaNodeUrl(urlValue);
    } catch (error) {
        printResult({
            status: 'FAIL',
            issues: [
                {
                    code: 'INVALID_FIGMA_URL',
                    detail: error instanceof Error ? error.message : String(error),
                },
            ],
        });
        return 1;
    }
    if (fs.existsSync(path.join(root, outFile))) {
        printResult({
            status: 'FAIL',
            issues: [{code: 'TEMPLATE_ALREADY_EXISTS', template: outFile}],
        });
        return 1;
    }

    const response = await fetchFigmaNodes({
        token: getToken(),
        fileKey: parsedUrl.fileKey,
        nodeIds: [parsedUrl.nodeId],
    });
    if (response.status !== 'PASS') {
        const result = {
            status: response.status,
            issues: [{code: response.code ?? `FIGMA_HTTP_${response.httpStatus}`}],
        };
        printResult(result);
        return exitCodeForStatus(result.status);
    }
    const candidate = normalizeFigmaNodes(response.data, {
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        templatesByNode: {[parsedUrl.nodeId]: outFile},
    });
    if (candidate.components.length !== 1) {
        printResult({status: 'DATA_MISSING', issues: [{code: 'FIGMA_NODE_MISSING'}]});
        return 2;
    }
    candidate.components[0].component = component;
    const schemaIssues = validateSnapshotDocument(candidate);
    if (schemaIssues.length > 0) {
        printResult({status: 'FAIL', issues: schemaIssues});
        return 1;
    }

    const createResult = runLocalBinary(
        'figma',
        ['connect', 'create', urlValue, '--outFile', outFile, '--skip-update-check'],
        {inheritOutput: true},
    );
    if (!createResult.ok) {
        printResult({status: 'FAIL', issues: [{code: 'FIGMA_SCAFFOLD_FAILED'}]});
        return 1;
    }

    const snapshot = JSON.parse(fs.readFileSync(path.join(root, SNAPSHOT_PATH), 'utf8'));
    writeSnapshot(root, mergeSnapshotComponent(snapshot, candidate.components[0]));
    const unresolved = candidate.components[0].properties.map((property) => ({
        property: property.name,
        type: property.type,
        next: 'Confirm the generated mapping against the public React prop or add a reasoned ignore.',
    }));
    process.stdout.write(
        `${JSON.stringify({status: 'PASS', template: outFile, unresolved}, null, 2)}\n`,
    );
    return 0;
}

function preview() {
    let mode;
    if (hasFlag('--all')) {
        mode = 'all';
    } else if (hasFlag('--unique')) {
        mode = 'unique';
    }
    if (!mode) {
        printResult({
            status: 'FAIL',
            issues: [{code: 'PREVIEW_MODE_REQUIRED', detail: 'Pass --all or --unique.'}],
        });
        return 1;
    }
    if (process.env.CODE_CONNECT_PREVIEW_TRUSTED !== '1') {
        printResult({status: 'AUTH_BLOCKED', issues: [{code: 'TRUSTED_PREVIEW_REQUIRED'}]});
        return 2;
    }
    if (!getToken()) {
        printResult({status: 'AUTH_BLOCKED', issues: [{code: 'MISSING_FIGMA_TOKEN'}]});
        return 2;
    }
    const {snapshot} = loadProjectContract(root);
    for (const {template} of snapshot.components) {
        const previewArgs = [
            'connect',
            'preview',
            template,
            '--output',
            'json',
            '--skip-update-check',
        ];
        if (mode === 'all') {
            previewArgs.push('--all', '--max-combinations', '500');
        }
        const result = runLocalBinary('figma', previewArgs, {inheritOutput: true});
        if (!result.ok) {
            return 1;
        }
    }
    return 0;
}

async function main() {
    if (command === 'check') {
        return check();
    }
    if (command === 'refresh') {
        return refresh();
    }
    if (command === 'scaffold') {
        return scaffold();
    }
    if (command === 'preview') {
        return preview();
    }
    printResult({
        status: 'FAIL',
        issues: [
            {
                code: 'UNKNOWN_COMMAND',
                detail: 'Use scaffold, refresh, check, or preview.',
            },
        ],
    });
    return 1;
}

process.exitCode = await main();
