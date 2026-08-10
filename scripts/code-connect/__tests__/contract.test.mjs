import assert from 'node:assert/strict';
import test from 'node:test';

import {
    ALLOWED_FIGMA_FILE_KEY,
    STICKY_COMMENT_MARKER,
    classifyFigmaStatus,
    compareSnapshots,
    normalizeFigmaNodes,
    planStickyCommentUpdate,
    serializeSnapshot,
    validateContract,
    validateSnapshotDocument,
    validateTrustedFiles,
} from '../lib/contract.mjs';

const buttonTemplatePath = 'src/components/Button/Button.figma.ts';

function property(rawKey, name, type, defaultValue, enumOptions = []) {
    return {rawKey, name, type, defaultValue, enumOptions};
}

function snapshotWith(properties) {
    return {
        schemaVersion: 1,
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        components: [
            {
                component: 'Button',
                nodeId: '53098:497062',
                template: buttonTemplatePath,
                properties,
            },
        ],
    };
}

const validSnapshot = snapshotWith([
    property('Enabled#1:2', 'Enabled', 'BOOLEAN', true),
    property('Label#1:3', 'Label', 'TEXT', 'Save'),
    property('View', 'View', 'VARIANT', 'Normal', ['Normal', 'Action']),
]);

const validTemplate = `// url=https://www.figma.com/design/${ALLOWED_FIGMA_FILE_KEY}/Gravity-UI?node-id=53098-497062
import figma from 'figma';
import type {ButtonProps} from './Button';

const enabled = figma.selectedInstance.getBoolean('Enabled');
const label = figma.selectedInstance.getString('Label');
const view = figma.selectedInstance.getEnum('View', {
    Normal: 'normal',
    Action: 'action',
} satisfies Record<string, NonNullable<ButtonProps['view']>>);

export default {
    example: figma.code\`<Button view="\${view}" disabled="\${!enabled}">\${label}</Button>\`,
    imports: ["import {Button} from '@gravity-ui/uikit';"],
};
`;

test('accepts a complete static parserless mapping', () => {
    const result = validateContract({
        snapshot: validSnapshot,
        ignores: {schemaVersion: 1, ignores: []},
        templates: {[buttonTemplatePath]: validTemplate},
    });

    assert.deepEqual(result.issues, []);
    assert.equal(result.status, 'PASS');
});

test('detects added and removed Figma properties and enum options', () => {
    const live = snapshotWith([
        property('Enabled#1:2', 'Enabled', 'BOOLEAN', true),
        property('Tooltip#1:4', 'Tooltip', 'TEXT', ''),
        property('View', 'View', 'VARIANT', 'Normal', ['Normal', 'Raised']),
    ]);

    const codes = compareSnapshots(validSnapshot, live).map((issue) => issue.code);

    assert.deepEqual(
        new Set(codes),
        new Set(['ADDED_PROPERTY', 'REMOVED_PROPERTY', 'ADDED_ENUM_OPTION', 'REMOVED_ENUM_OPTION']),
    );
});

test('detects wrong getter type', () => {
    const result = validateContract({
        snapshot: validSnapshot,
        ignores: {schemaVersion: 1, ignores: []},
        templates: {
            [buttonTemplatePath]: validTemplate.replace("getEnum('View'", "getString('View'"),
        },
    });

    assert.ok(result.issues.some((issue) => issue.code === 'WRONG_GETTER_TYPE'));
});

test('detects duplicate and stale mappings', () => {
    const duplicate = validTemplate.replace(
        "const label = figma.selectedInstance.getString('Label');",
        "const label = figma.selectedInstance.getString('Label');\nconst duplicateLabel = figma.selectedInstance.getString('Label');",
    );
    const stale = validTemplate.replace(
        "const label = figma.selectedInstance.getString('Label');",
        "const label = figma.selectedInstance.getString('Label');\nconst obsolete = figma.selectedInstance.getString('Obsolete');",
    );

    assert.ok(
        validateContract({
            snapshot: validSnapshot,
            ignores: {schemaVersion: 1, ignores: []},
            templates: {[buttonTemplatePath]: duplicate},
        }).issues.some((issue) => issue.code === 'DUPLICATE_MAPPING'),
    );
    assert.ok(
        validateContract({
            snapshot: validSnapshot,
            ignores: {schemaVersion: 1, ignores: []},
            templates: {[buttonTemplatePath]: stale},
        }).issues.some((issue) => issue.code === 'STALE_MAPPING'),
    );
});

test('rejects dynamic property names and getPropertyValue', () => {
    const dynamic = validTemplate.replace("getString('Label')", 'getString(labelProperty)');
    const genericGetter = validTemplate.replace("getString('Label')", "getPropertyValue('Label')");

    assert.ok(
        validateContract({
            snapshot: validSnapshot,
            ignores: {schemaVersion: 1, ignores: []},
            templates: {[buttonTemplatePath]: dynamic},
        }).issues.some((issue) => issue.code === 'DYNAMIC_PROPERTY_NAME'),
    );
    assert.ok(
        validateContract({
            snapshot: validSnapshot,
            ignores: {schemaVersion: 1, ignores: []},
            templates: {[buttonTemplatePath]: genericGetter},
        }).issues.some((issue) => issue.code === 'FORBIDDEN_GENERIC_GETTER'),
    );
});

test('requires a non-empty reason and rejects stale ignores', () => {
    const withoutReason = {
        schemaVersion: 1,
        ignores: [
            {
                component: 'Button',
                nodeId: '53098:497062',
                rawKey: 'Label#1:3',
                reason: '  ',
            },
        ],
    };
    const stale = {
        schemaVersion: 1,
        ignores: [
            {
                component: 'Button',
                nodeId: '53098:497062',
                rawKey: 'Obsolete#1:9',
                reason: 'Removed upstream.',
            },
        ],
    };

    assert.ok(
        validateContract({
            snapshot: validSnapshot,
            ignores: withoutReason,
            templates: {[buttonTemplatePath]: validTemplate},
        }).issues.some((issue) => issue.code === 'EMPTY_IGNORE_REASON'),
    );
    assert.ok(
        validateContract({
            snapshot: validSnapshot,
            ignores: stale,
            templates: {[buttonTemplatePath]: validTemplate},
        }).issues.some((issue) => issue.code === 'STALE_IGNORE'),
    );
});

test('old Button coverage fails on icon-related properties', () => {
    const snapshot = snapshotWith([
        ...validSnapshot.components[0].properties,
        property('Start icon#2:281', 'Start icon', 'BOOLEAN', true),
        property(' ↳ Start icon#2:0', '↳ Start icon', 'INSTANCE_SWAP', '48132:444831'),
        property('Icon only', 'Icon only', 'VARIANT', 'Off', ['Off', 'On']),
    ]);

    const missing = validateContract({
        snapshot,
        ignores: {schemaVersion: 1, ignores: []},
        templates: {[buttonTemplatePath]: validTemplate},
    }).issues.filter((issue) => issue.code === 'MISSING_COVERAGE');

    assert.deepEqual(
        new Set(missing.map((issue) => issue.property)),
        new Set(['Start icon', '↳ Start icon', 'Icon only']),
    );
});

test('old Avatar coverage fails on Icon and Custom border', () => {
    const avatarTemplatePath = 'src/components/Avatar/Avatar.figma.ts';
    const avatarSnapshot = {
        schemaVersion: 1,
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        components: [
            {
                component: 'Avatar',
                nodeId: '53348:563633',
                template: avatarTemplatePath,
                properties: [
                    property('Icon#58291:411', 'Icon', 'INSTANCE_SWAP', '53348:563454'),
                    property('Custom border#60413:26', 'Custom border', 'BOOLEAN', false),
                    property('Type', 'Type', 'VARIANT', 'Icon', ['Image', 'Icon', 'Text']),
                ],
            },
        ],
    };
    const oldAvatar = `// url=https://www.figma.com/design/${ALLOWED_FIGMA_FILE_KEY}/Gravity-UI?node-id=53348-563633
import figma from 'figma';
const type = figma.selectedInstance.getEnum('Type', {Image: 'image', Icon: 'icon', Text: 'text'});
export default {example: figma.code\`<Avatar>\${type}</Avatar>\`};
`;

    const missing = validateContract({
        snapshot: avatarSnapshot,
        ignores: {schemaVersion: 1, ignores: []},
        templates: {[avatarTemplatePath]: oldAvatar},
    }).issues.filter((issue) => issue.code === 'MISSING_COVERAGE');

    assert.deepEqual(
        new Set(missing.map((issue) => issue.property)),
        new Set(['Icon', 'Custom border']),
    );
});

test('validates allowed file key, node id, and template path', () => {
    const invalid = structuredClone(validSnapshot);
    invalid.fileKey = 'another-file';
    invalid.components[0].nodeId = '1:2';
    invalid.components[0].template = '../Button.figma.ts';

    const codes = validateSnapshotDocument(invalid).map((issue) => issue.code);

    assert.ok(codes.includes('INVALID_FILE_KEY'));
    assert.ok(codes.includes('INVALID_NODE_ID'));
    assert.ok(codes.includes('INVALID_TEMPLATE_PATH'));
});

test('rejects malformed, oversized, duplicate, and traversing PR data', () => {
    const files = [
        {path: '../code-connect/ignores.json', content: '{}'},
        {path: 'code-connect/ignores.json', content: '{'},
        {path: 'code-connect/ignores.json', content: '{}'},
        {path: buttonTemplatePath, content: 'x'.repeat(1024 * 1024 + 1)},
    ];

    const codes = validateTrustedFiles(files).map((issue) => issue.code);

    assert.ok(codes.includes('PATH_TRAVERSAL'));
    assert.ok(codes.includes('MALFORMED_JSON'));
    assert.ok(codes.includes('DUPLICATE_PR_PATH'));
    assert.ok(codes.includes('OVERSIZED_PR_DATA'));
});

test('classifies Figma authentication and availability responses', () => {
    assert.equal(classifyFigmaStatus(200), 'PASS');
    assert.equal(classifyFigmaStatus(401), 'AUTH_BLOCKED');
    assert.equal(classifyFigmaStatus(403), 'AUTH_BLOCKED');
    assert.equal(classifyFigmaStatus(429), 'DATA_MISSING');
    assert.equal(classifyFigmaStatus(500), 'DATA_MISSING');
    assert.equal(classifyFigmaStatus(503), 'DATA_MISSING');
    assert.equal(classifyFigmaStatus(400), 'FAIL');
});

test('plans idempotent sticky comment creation and updates', () => {
    const body = `${STICKY_COMMENT_MARKER}\nPASS`;

    assert.deepEqual(planStickyCommentUpdate([], body), {action: 'create'});
    assert.deepEqual(planStickyCommentUpdate([{id: 7, body}], body), {
        action: 'none',
        commentId: 7,
    });
    assert.deepEqual(
        planStickyCommentUpdate([{id: 7, body: `${STICKY_COMMENT_MARKER}\nFAIL`}], body),
        {
            action: 'update',
            commentId: 7,
        },
    );
});

test('normalizes and serializes Figma nodes deterministically without timestamps', () => {
    const response = {
        nodes: {
            '53098:497062': {
                document: {
                    name: 'Button',
                    componentPropertyDefinitions: {
                        View: {
                            type: 'VARIANT',
                            defaultValue: 'Normal',
                            variantOptions: ['Normal', 'Action'],
                        },
                        ' Label#1:3': {type: 'TEXT', defaultValue: 'Save'},
                    },
                },
            },
        },
    };
    const first = normalizeFigmaNodes(response, {
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        templatesByNode: {'53098:497062': buttonTemplatePath},
    });
    const second = normalizeFigmaNodes(response, {
        fileKey: ALLOWED_FIGMA_FILE_KEY,
        templatesByNode: {'53098:497062': buttonTemplatePath},
    });

    assert.equal(serializeSnapshot(first), serializeSnapshot(second));
    assert.equal(serializeSnapshot(first).includes('timestamp'), false);
    assert.deepEqual(
        first.components[0].properties.map((item) => item.rawKey),
        [' Label#1:3', 'View'],
    );
});
