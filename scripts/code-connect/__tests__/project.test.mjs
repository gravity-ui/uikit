import assert from 'node:assert/strict';
import test from 'node:test';

import {ALLOWED_FIGMA_FILE_KEY} from '../lib/contract.mjs';
import {mergeSnapshotComponent, parseFigmaNodeUrl, renderIssueReport} from '../lib/project.mjs';

test('parses only a node-specific URL for the allowed Figma file', () => {
    assert.deepEqual(
        parseFigmaNodeUrl(
            `https://www.figma.com/design/${ALLOWED_FIGMA_FILE_KEY}/Gravity-UI?node-id=53098-497062`,
        ),
        {fileKey: ALLOWED_FIGMA_FILE_KEY, nodeId: '53098:497062'},
    );

    for (const url of [
        `https://evil.example/design/${ALLOWED_FIGMA_FILE_KEY}/Gravity-UI?node-id=1-2`,
        'https://www.figma.com/design/another-file/Gravity-UI?node-id=1-2',
        `https://www.figma.com/design/${ALLOWED_FIGMA_FILE_KEY}/Gravity-UI`,
    ]) {
        assert.throws(() => parseFigmaNodeUrl(url));
    }
});

test('merges a refreshed component into a deterministically sorted snapshot', () => {
    const snapshot = {
        schemaVersion: 1,
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        components: [
            {component: 'Checkbox', nodeId: '3:4', template: 'checkbox', properties: []},
            {component: 'Button', nodeId: '1:2', template: 'old', properties: []},
        ],
    };
    const component = {
        component: 'Button',
        nodeId: '1:2',
        template: 'new',
        properties: [{rawKey: 'View'}],
    };

    const merged = mergeSnapshotComponent(snapshot, component);

    assert.deepEqual(
        merged.components.map((item) => [item.component, item.template]),
        [
            ['Button', 'new'],
            ['Checkbox', 'checkbox'],
        ],
    );
    assert.equal(snapshot.components[1].template, 'old');
});

test('renders contract issues grouped by component', () => {
    const report = renderIssueReport('FAIL', [
        {code: 'MISSING_COVERAGE', component: 'Button', property: 'Icon only'},
        {code: 'STALE_IGNORE', component: 'Avatar', property: 'Icon'},
        {code: 'INVALID_FILE_KEY'},
    ]);

    assert.match(report, /^FAIL/m);
    assert.match(report, /## Avatar[\s\S]*STALE_IGNORE/);
    assert.match(report, /## Button[\s\S]*MISSING_COVERAGE/);
    assert.match(report, /## Contract[\s\S]*INVALID_FILE_KEY/);
});
