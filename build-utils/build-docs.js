/* eslint-env node */
const fs = require('fs');
const path = require('path');

const {cleanMarkdown, extractSummary, extractTitle} = require('./clean-markdown');

// Story/test folders hold Storybook doc pages and fixtures, not API docs.
const DEFAULT_EXCLUDE = ['__stories__', '__tests__', '__mocks__', '__snapshots__'];

/**
 * The layout shared by gravity-ui packages: component and hook READMEs plus any
 * markdown dropped under the repo-level `docs/` folder. `exclude: ['legacy']`
 * and an empty `docs/` are both harmless when a package lacks them, so the same
 * config drives every package (uikit, navigation, …).
 */
function standardDocsConfig(rootDir = process.cwd(), packageName = readPackageName(rootDir)) {
    return {
        rootDir,
        packageName,
        outDir: path.join(rootDir, 'build', 'docs'),
        sources: [
            {
                title: 'Guides',
                kind: 'markdown',
                baseDir: 'docs',
                outPrefix: 'guides',
                nameFromTitle: true,
            },
            {
                title: 'Components',
                kind: 'readme',
                baseDir: 'src/components',
                outPrefix: 'components',
                exclude: ['legacy'],
            },
            {
                title: 'Hooks',
                kind: 'readme',
                baseDir: 'src/hooks',
                outPrefix: 'hooks',
                exclude: ['private'],
            },
        ],
    };
}

function readPackageName(rootDir) {
    return JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8')).name || '';
}

/** Recursively collects `README.md` files under `dir`, skipping excluded segments. */
function findReadmes(dir, {exclude = []} = {}) {
    if (!fs.existsSync(dir)) {
        return [];
    }
    const skip = new Set([...DEFAULT_EXCLUDE, ...exclude]);
    const result = [];
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (skip.has(entry.name)) {
                continue;
            }
            result.push(...findReadmes(fullPath, {exclude}));
        } else if (/^readme\.md$/i.test(entry.name)) {
            // Case-insensitive: some packages use `Readme.md` (e.g. navigation).
            result.push(fullPath);
        }
    }
    return result;
}

/** Recursively collects `*.md` files under `dir`. */
function findMarkdown(dir) {
    if (!fs.existsSync(dir)) {
        return [];
    }
    const result = [];
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            result.push(...findMarkdown(fullPath));
        } else if (entry.name.endsWith('.md')) {
            result.push(fullPath);
        }
    }
    return result;
}

function writeDoc(outPath, content) {
    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(outPath, content);
}

/**
 * Lists a source's docs as `{source, outRel, name}` items, mirroring the source
 * folder layout so nested groups never collide (e.g.
 * `src/components/controls/TextInput/README.md` → `components/controls/TextInput.md`,
 * `docs/theming.md` → `guides/theming.md`).
 */
function listSource(rootDir, {kind, baseDir, outPrefix, exclude = []}) {
    const absBase = path.join(rootDir, baseDir);
    if (kind === 'readme') {
        return findReadmes(absBase, {exclude}).map((source) => {
            const name = path.relative(absBase, path.dirname(source)).split(path.sep).join('/');
            return {source, name, outRel: path.posix.join(outPrefix, `${name}.md`)};
        });
    }
    return findMarkdown(absBase).map((source) => {
        const rel = path.relative(absBase, source).split(path.sep).join('/');
        return {source, name: rel.replace(/\.md$/, ''), outRel: path.posix.join(outPrefix, rel)};
    });
}

/**
 * Rewrites intra-repo `README.md` links so they resolve inside the docs output.
 * Source links point at sibling source folders (`../CopyToClipboard/README.md`);
 * here every README maps to a flat `<name>.md`, so links are recomputed relative
 * to the current output file. Links to docs that aren't shipped (e.g. `legacy/`)
 * are unwrapped to plain text so no dead link remains. External URLs are kept.
 */
function rewriteReadmeLinks(markdown, source, outRel, docMap) {
    return markdown.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (whole, text, target) => {
        if (!/readme\.md/i.test(target)) {
            return whole;
        }
        if (/^[a-z]+:\/\//i.test(target)) {
            return whole; // external URL — leave as-is
        }

        const hashIndex = target.indexOf('#');
        const relPath = hashIndex === -1 ? target : target.slice(0, hashIndex);
        const anchor = hashIndex === -1 ? '' : target.slice(hashIndex);

        const absTarget = path.resolve(path.dirname(source), relPath);
        const targetOut = docMap.get(absTarget);
        if (!targetOut) {
            return text; // target not shipped — drop the link, keep its text
        }

        let relOut = path.posix.relative(path.posix.dirname(outRel), targetOut);
        if (!relOut.startsWith('.')) {
            relOut = `./${relOut}`;
        }
        return `[${text}](${relOut}${anchor})`;
    });
}

/**
 * Builds a package's `docs/` output for AI agents from its markdown sources.
 *
 * @param {object} config — usually `standardDocsConfig()`.
 * @param {string} [config.rootDir] — repo root; defaults to `process.cwd()`.
 * @param {string} config.outDir — directory to (re)generate.
 * @param {string} [config.packageName] — shown in the generated INDEX.md header;
 *   defaults to `rootDir`'s package name.
 * @param {Array} config.sources — `{title, kind:'readme'|'markdown', baseDir,
 *   outPrefix, exclude?, nameFromTitle?}`; INDEX sections follow this order.
 * @returns {{sections: object[], total: number}}
 */
function buildDocs(config) {
    const {outDir, sources} = config;
    const rootDir = config.rootDir || process.cwd();
    const packageName = config.packageName || readPackageName(rootDir);

    fs.rmSync(outDir, {recursive: true, force: true});

    // Resolve every source's items first, so links between docs can be rewritten
    // in the second pass regardless of processing order.
    const listed = sources.map((source) => ({source, items: listSource(rootDir, source)}));
    const docMap = new Map(listed.flatMap(({items}) => items.map((it) => [it.source, it.outRel])));

    const sections = [];
    for (const {source, items} of listed) {
        const entries = [];
        for (const {source: file, name, outRel} of items) {
            const cleaned = rewriteReadmeLinks(
                cleanMarkdown(fs.readFileSync(file, 'utf8')),
                file,
                outRel,
                docMap,
            );
            writeDoc(path.join(outDir, outRel), cleaned);
            entries.push({
                name: source.nameFromTitle ? extractTitle(cleaned) || name : name,
                rel: outRel,
                summary: extractSummary(cleaned),
            });
        }
        sections.push({title: source.title, entries});
    }

    const outRelToRoot = path.relative(rootDir, outDir).split(path.sep).join('/');
    writeDoc(path.join(outDir, 'INDEX.md'), renderIndex(packageName, outRelToRoot, sections));

    const total = sections.reduce((sum, s) => sum + s.entries.length, 0);
    return {sections, total};
}

function renderSection(title, entries) {
    if (!entries.length) {
        return '';
    }
    const rows = entries
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({name, rel, summary}) => `- [${name}](./${rel})${summary ? ` — ${summary}` : ''}`)
        .join('\n');
    return `## ${title}\n\n${rows}\n`;
}

function renderIndex(packageName, outRelToRoot, sections) {
    // e.g. node_modules/@gravity-ui/uikit/build/docs
    const installedPath = path.posix.join('node_modules', packageName, outRelToRoot);
    const header = [
        `# ${packageName} documentation`,
        '',
        `Documentation for the **installed** version of \`${packageName}\`.`,
        'Your training data may be outdated — these files are the source of truth.',
        '',
        `Paths are relative to this file (\`${installedPath}/\`).`,
        '',
    ].join('\n');

    return [header, ...sections.map(({title, entries}) => renderSection(title, entries))]
        .filter(Boolean)
        .join('\n');
}

module.exports = {buildDocs, standardDocsConfig};

if (require.main === module) {
    const rootDir = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..');
    const {name} = require(path.join(rootDir, 'package.json'));
    const result = buildDocs(standardDocsConfig(rootDir, name));
    // eslint-disable-next-line no-console
    console.log(
        `Built docs for ${name}: ` +
            result.sections.map((s) => `${s.entries.length} ${s.title.toLowerCase()}`).join(', '),
    );
}
