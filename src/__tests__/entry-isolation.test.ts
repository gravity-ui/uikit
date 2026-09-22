import * as fs from 'fs';
import * as path from 'path';

/**
 * The optional packages must not leak into the main entry: a consumer who installs the package
 * alone has neither `@tanstack/react-virtual` nor `react-window` on disk, and the main entry is
 * what an import of the package gives them.
 *
 * The other entry points are not guarded: each of them is imported on purpose, together with the
 * packages its components need (the legacy List needs react-window, the virtualizer needs tanstack).
 *
 * Two graphs are walked separately. The runtime one skips `import type`/`export type` (they are
 * erased from the emit), the type one keeps them: without the package installed, the .d.ts of a
 * consumer with `skipLibCheck: false` must not reference its types either.
 */

const SRC = path.resolve(__dirname, '..');

/**
 * Packages that must stay out of the main entry — the optional peer dependencies of the package.
 *
 * `@hello-pangea/dnd` is not on the list: it is a plain dependency of the package, imported by the
 * `TableColumnSetup` and the `TreeList` of the main entry.
 */
const FORBIDDEN_IN_MAIN = [
    '@tanstack/react-virtual',
    'react-window',
    'react-virtualized-auto-sizer',
];

const ENTRY_ONLY_DIRS = [
    path.join(SRC, 'components', 'Virtualizer'),
    path.join(SRC, 'components', 'HelloPangeaDnd'),
];

interface Specifier {
    source: string;
    typeOnly: boolean;
}

/**
 * Strips block comments and whole-line comments — a commented-out import always starts its line, so
 * this is enough to keep it out of the graph. Not string-aware: a `/*` inside a string literal
 * would swallow the code after it — no file reachable from an entry point has one (`'image/*'`
 * lives in the FileDropZone tests and stories, which the walk never enters).
 */
function stripComments(code: string) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .split('\n')
        .filter((line) => !/^\s*(\/\/|\*)/.test(line))
        .join('\n');
}

/**
 * `import ... from '…'` / `export ... from '…'` (multiline included — the clause matches across
 * newlines but not across a `;` or a quote, so statements cannot be glued together), plus
 * side-effect imports, `import('…')` and `require('…')`.
 */
function parseSpecifiers(code: string): Specifier[] {
    const source = stripComments(code);
    const found: Specifier[] = [];

    const fromRe = /\b(?:import|export)\b(\s+type\b)?[^;'"]*?\bfrom\s*['"]([^'"]+)['"]/g;
    for (let m = fromRe.exec(source); m; m = fromRe.exec(source)) {
        found.push({source: m[2], typeOnly: Boolean(m[1])});
    }

    const bareRe = /\bimport\s*['"]([^'"]+)['"]/g;
    for (let m = bareRe.exec(source); m; m = bareRe.exec(source)) {
        found.push({source: m[1], typeOnly: false});
    }

    const callRe = /\b(?:import|require)\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    for (let m = callRe.exec(source); m; m = callRe.exec(source)) {
        found.push({source: m[1], typeOnly: false});
    }

    return found;
}

/** `@scope/name/deep` → `@scope/name`, `name/deep` → `name`. */
function packageName(source: string) {
    const parts = source.split('/');
    return source.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

function resolveRelative(source: string, importer: string) {
    const base = path.resolve(path.dirname(importer), source);
    const candidates = [
        `${base}.ts`,
        `${base}.tsx`,
        path.join(base, 'index.ts'),
        path.join(base, 'index.tsx'),
    ];
    return candidates.find((candidate) => fs.existsSync(candidate));
}

function walk(entry: string, options: {types: boolean}) {
    const packages = new Set<string>();
    const files = new Set<string>();
    const queue = [path.resolve(entry)];

    while (queue.length > 0) {
        const file = queue.pop() as string;
        if (files.has(file)) {
            continue;
        }
        files.add(file);

        for (const {source, typeOnly} of parseSpecifiers(fs.readFileSync(file, 'utf8'))) {
            if (typeOnly && !options.types) {
                continue;
            }
            if (!source.startsWith('.')) {
                packages.add(packageName(source));
                continue;
            }
            // A relative specifier that resolves to nothing is an asset (.scss, .json, `?raw`)
            const resolved = resolveRelative(source, file);
            if (resolved) {
                queue.push(resolved);
            }
        }
    }

    return {packages, files};
}

const GRAPHS = [
    ['runtime', {types: false}],
    ['types', {types: true}],
] as const;

const MAIN_ENTRY = path.join(SRC, 'index.ts');

describe('main entry isolation', () => {
    describe.each(GRAPHS)('%s graph', (_name, options) => {
        test('does not reach the optional packages', () => {
            const {packages} = walk(MAIN_ENTRY, options);

            expect([...packages].filter((name) => FORBIDDEN_IN_MAIN.includes(name))).toEqual([]);
        });

        test('does not reach the directories of the dedicated entry points', () => {
            const {files} = walk(MAIN_ENTRY, options);

            const leaked = [...files].filter((file) =>
                ENTRY_ONLY_DIRS.some((dir) => file.startsWith(`${dir}${path.sep}`)),
            );
            expect(leaked).toEqual([]);
        });

        // Without this the whole suite would pass on a parser that silently finds nothing
        test('the walk is not empty', () => {
            const {packages, files} = walk(MAIN_ENTRY, options);

            expect(packages).toContain('react');
            expect(files.size).toBeGreaterThan(100);
        });

        // The checks above are all negative: a typo in FORBIDDEN_IN_MAIN would keep them green
        // while guarding nothing. Every forbidden name is a package that some other entry point
        // reaches on purpose — the legacy List is built on two of them, the virtualizer on the
        // third — so the walk itself says whether the names are spelled the way it sees them.
        test('the forbidden names are the ones the walk produces', () => {
            const reachable = new Set([
                ...walk(path.join(SRC, 'legacy.ts'), options).packages,
                ...walk(path.join(SRC, 'virtualizer.ts'), options).packages,
            ]);

            expect(FORBIDDEN_IN_MAIN.filter((name) => !reachable.has(name))).toEqual([]);
        });
    });
});
