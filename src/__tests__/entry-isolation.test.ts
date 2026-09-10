import * as fs from 'fs';
import * as path from 'path';

/**
 * The packages of the dedicated entry points must not leak into the other ones: a consumer that
 * installs @gravity-ui/uikit alone does not have @tanstack/react-virtual on disk.
 *
 * Two graphs are walked separately. The runtime one skips `import type`/`export type` (they are
 * erased from the emit), the type one keeps them: without the package installed, the .d.ts of a
 * consumer with `skipLibCheck: false` must not reference its types either.
 */

const SRC = path.resolve(__dirname, '..');

/**
 * Packages that must stay out of the main entry.
 *
 * `@hello-pangea/dnd` is not on the list: it is a plain dependency of the package, imported by the
 * `List` and the `TableColumnSetup` of the main entry.
 */
const FORBIDDEN_IN_MAIN = ['@tanstack/react-virtual'];

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

/** Every JavaScript entry point except the two dedicated ones (see the exports of package.json) */
const SHARED_ENTRIES = [
    'index.ts',
    'unstable.ts',
    'legacy.ts',
    'server.ts',
    'toaster-singleton.ts',
    path.join('i18n', 'index.ts'),
];

describe('entry point isolation', () => {
    describe.each(GRAPHS)('%s graph', (_name, options) => {
        test.each(SHARED_ENTRIES)('%s does not reach the entry-only packages', (entry) => {
            const {packages} = walk(path.join(SRC, entry), options);

            expect([...packages].filter((name) => FORBIDDEN_IN_MAIN.includes(name))).toEqual([]);
        });

        test.each(SHARED_ENTRIES)(
            '%s does not reach the directories of the dedicated entry points',
            (entry) => {
                const {files} = walk(path.join(SRC, entry), options);

                const leaked = [...files].filter((file) =>
                    ENTRY_ONLY_DIRS.some((dir) => file.startsWith(`${dir}${path.sep}`)),
                );
                expect(leaked).toEqual([]);
            },
        );

        test('the virtualizer entry reaches @tanstack/react-virtual', () => {
            const {packages} = walk(path.join(SRC, 'virtualizer.ts'), options);

            expect(packages).toContain('@tanstack/react-virtual');
        });

        test('the hello-pangea-dnd entry does not reach @tanstack/react-virtual', () => {
            const {packages} = walk(path.join(SRC, 'hello-pangea-dnd.ts'), options);

            expect(packages).not.toContain('@tanstack/react-virtual');
        });

        // Without this the whole suite would pass on a parser that silently finds nothing
        test('the walk of the main entry is not empty', () => {
            const {packages, files} = walk(path.join(SRC, 'index.ts'), options);

            expect(packages).toContain('react');
            expect(files.size).toBeGreaterThan(100);
        });
    });
});
