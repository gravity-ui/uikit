import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test, {after} from 'node:test';

import {analyzeCodeConnect, formatGithubAnnotation, renderGithubSummary} from './check-core.mjs';

const FIGMA_TYPES = `
declare module 'figma' {
    type EnumValues<T extends Record<string, unknown>> = T[keyof T];
    interface Instance {
        getBoolean(name: string): boolean;
        getEnum<T extends Record<string, unknown>>(name: string, values: T): EnumValues<T> | undefined;
        getString(name: string): string;
    }
    interface Figma {
        selectedInstance: Instance;
        code(strings: TemplateStringsArray, ...values: unknown[]): unknown;
        helpers: {
            react: {
                identifier(value: string): {$type: 'identifier'; $value: string};
                renderChildren(value: unknown): unknown;
                renderProp(name: string, value: unknown): unknown;
            };
        };
    }
    const figma: Figma;
    export = figma;
}
`;

const COMPONENT = `
export interface FixtureBaseProps {
    children?: string;
    disabled?: boolean;
    size?: 's' | 'm';
}

export type FixtureProps = FixtureBaseProps &
    ({kind?: 'text'; label?: string} | {kind: 'count'; count?: number});

export const Fixture = 1;
`;

const fixtureDirectories = [];

after(() => {
    for (const directory of fixtureDirectories) {
        fs.rmSync(directory, {force: true, recursive: true});
    }
});

function template(overrides = {}) {
    const {
        component = 'Fixture',
        id = 'fixture',
        importStatement = `import {${component}} from '@gravity-ui/uikit';`,
        nodeId = '1-2',
        propsAlias = 'type Props = FixtureProps;',
        renderLines = [
            'const size = instance.getEnum("Size", {Small: "s", Medium: "m"} as const);',
            'const sizeProp = figma.helpers.react.renderProp("size", size);',
            'const label = instance.getString("Label");',
            'const labelProp = figma.helpers.react.renderProp("label", label);',
            'const children = figma.helpers.react.renderChildren(label);',
        ],
        source = 'https://github.com/gravity-ui/uikit/blob/main/src/components/Fixture/Fixture.tsx',
        url = `https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=${nodeId}`,
    } = overrides;

    return `// url=${url}
// source=${source}
// component=${component}
import type {FixtureProps} from './Fixture';
import figma from 'figma';

${propsAlias}
const instance = figma.selectedInstance;
${renderLines.join('\n')}

export default {
    id: '${id}',
    imports: [${JSON.stringify(importStatement)}],
    example: figma.code\`<${component}\${sizeProp}>\${children}\${labelProp}</${component}>\`,
    metadata: {nestable: true},
};
`;
}

function createFixture(files = {}) {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'code-connect-check-'));
    fixtureDirectories.push(rootDir);
    const defaults = {
        'figma.d.ts': FIGMA_TYPES,
        'src/components/Fixture/Fixture.tsx': COMPONENT,
        'src/components/Fixture/Fixture.figma.ts': template(),
        'src/components/Fixture/index.ts': "export * from './Fixture';",
        'src/components/Second/Second.tsx': 'export const Second = 1;',
        'src/components/Second/index.ts': "export * from './Second';",
        'src/components/index.ts':
            "export * from './Fixture';\nexport * from './Second';\nexport * from './types';\n",
        'src/components/types.ts': 'export type Common = string;',
        'tsconfig.figma.json': JSON.stringify({
            compilerOptions: {
                module: 'NodeNext',
                moduleResolution: 'NodeNext',
                noEmit: true,
                jsx: 'react-jsx',
                strict: true,
                target: 'ES2022',
            },
            include: ['figma.d.ts', 'src/**/*.ts', 'src/**/*.tsx'],
        }),
    };

    for (const [relativePath, content] of Object.entries({...defaults, ...files})) {
        const filePath = path.join(rootDir, relativePath);
        fs.mkdirSync(path.dirname(filePath), {recursive: true});
        fs.writeFileSync(filePath, content);
    }

    return rootDir;
}

function codes(result) {
    return result.diagnostics.map((diagnostic) => diagnostic.code);
}

test('accepts inherited and union props and reports informational coverage', () => {
    const rootDir = createFixture();
    const result = analyzeCodeConnect({rootDir});

    assert.deepEqual(result.diagnostics, []);
    assert.equal(result.coverage.connected, 1);
    assert.equal(result.coverage.total, 2);
    assert.deepEqual(result.coverage.missing, ['Second']);
});

test('rejects an unknown React prop', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.figma.ts': template({
            renderLines: [
                'const value = instance.getString("Value");',
                'const valueProp = figma.helpers.react.renderProp("missing", value);',
                'const sizeProp = "";',
                'const labelProp = "";',
                'const children = "";',
            ],
        }),
    });

    assert.ok(codes(analyzeCodeConnect({rootDir})).includes('CC006'));
});

test('rejects a value incompatible with the React prop type', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.figma.ts': template({
            renderLines: [
                'const size = instance.getEnum("Size", {Small: "s", Large: "l"} as const);',
                'const sizeProp = figma.helpers.react.renderProp("size", size);',
                'const labelProp = "";',
                'const children = "";',
            ],
        }),
    });

    assert.ok(codes(analyzeCodeConnect({rootDir})).includes('CC007'));
});

test('rejects renderChildren when Props has no children', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.tsx': COMPONENT.replace('    children?: string;\n', ''),
    });

    assert.ok(codes(analyzeCodeConnect({rootDir})).includes('CC008'));
});

test('requires an explicit Props alias', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.figma.ts': template({propsAlias: ''}),
    });

    assert.ok(codes(analyzeCodeConnect({rootDir})).includes('CC005'));
});

test('requires Props to alias the mapped component props', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.figma.ts': template({
            propsAlias: 'type Props = FixtureBaseProps;',
        }),
    });

    assert.ok(codes(analyzeCodeConnect({rootDir})).includes('CC005'));
});

test('accepts a normally formatted public import statement', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.figma.ts': template({
            importStatement: "import { Fixture } from '@gravity-ui/uikit';",
        }),
    });

    assert.deepEqual(analyzeCodeConnect({rootDir}).diagnostics, []);
});

test('reports malformed source URL encoding instead of crashing', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.figma.ts': template({
            source: 'https://github.com/gravity-ui/uikit/blob/main/src/components/%E0%A4%A',
        }),
    });

    assert.ok(codes(analyzeCodeConnect({rootDir})).includes('CC003'));
});

test('rejects personal source repositories and non-canonical Figma files', () => {
    const rootDir = createFixture({
        'src/components/Fixture/Fixture.figma.ts': template({
            source: 'https://github.com/simareeno/uikit/blob/main/src/components/Fixture/Fixture.tsx',
            url: 'https://www.figma.com/design/personal/File?node-id=1-2',
        }),
    });
    const resultCodes = codes(analyzeCodeConnect({rootDir}));

    assert.ok(resultCodes.includes('CC002'));
    assert.ok(resultCodes.includes('CC003'));
});

test('rejects duplicate template ids and node ids', () => {
    const rootDir = createFixture({
        'src/components/Second/Second.figma.ts': template(),
    });
    const resultCodes = codes(analyzeCodeConnect({rootDir}));

    assert.ok(resultCodes.includes('CC010'));
    assert.ok(resultCodes.includes('CC011'));
});

test('formats GitHub annotations and a summary without raw control characters', () => {
    const diagnostic = {
        code: 'CC999',
        file: 'src/components/Test,One/Test.figma.ts',
        line: 4,
        column: 2,
        message: 'Bad value: 50%\nnext line',
    };
    const annotation = formatGithubAnnotation(diagnostic);
    const summary = renderGithubSummary({
        coverage: {connected: 1, total: 2, missing: ['Second']},
        diagnostics: [diagnostic],
    });

    assert.match(annotation, /^::error /);
    assert.match(annotation, /file=src\/components\/Test%2COne\/Test\.figma\.ts/);
    assert.match(annotation, /50%25%0Anext line/);
    assert.match(summary, /1\/2/);
    assert.match(summary, /CC999/);
});
