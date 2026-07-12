/* eslint-env node */
const fs = require('fs');
const path = require('path');

const {cleanMarkdown, extractSummary, extractTitle} = require('./clean-markdown');

const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'build', 'docs');

// Story/test folders hold Storybook doc pages and fixtures, not API docs.
const DEFAULT_EXCLUDE = ['__stories__', '__tests__', '__mocks__', '__snapshots__'];

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
        } else if (entry.name === 'README.md') {
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
 * Lists the READMEs under `baseDir` as `{source, outRel, name}` items, mirroring
 * the source folder layout so nested groups never collide (e.g.
 * `src/components/controls/TextInput/README.md` → `components/controls/TextInput.md`).
 */
function listReadmes({outPrefix, baseDir, exclude = []}) {
    return findReadmes(baseDir, {exclude}).map((source) => {
        const name = path.relative(baseDir, path.dirname(source)).split(path.sep).join('/');
        return {source, name, outRel: path.posix.join(outPrefix, `${name}.md`)};
    });
}

/**
 * Rewrites intra-repo `README.md` links so they resolve inside `build/docs/`.
 * Source links point at sibling source folders (`../CopyToClipboard/README.md`);
 * here every README maps to a flat `<name>.md`, so links are recomputed relative
 * to the current output file. Links to docs that aren't shipped (e.g. `legacy/`)
 * are unwrapped to plain text so no dead link remains. External URLs are kept.
 */
function rewriteReadmeLinks(markdown, source, outRel, docMap) {
    return markdown.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (whole, text, target) => {
        if (!/README(\.md)?(#|$|\))/i.test(target) && !target.includes('README.md')) {
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

/** Cleans a source doc, rewrites its links, writes it, and returns the cleaned text. */
function emitDoc(source, outRel, docMap) {
    const cleaned = rewriteReadmeLinks(cleanMarkdown(fs.readFileSync(source, 'utf8')), source, outRel, docMap);
    writeDoc(path.join(DOCS_DIR, outRel), cleaned);
    return cleaned;
}

/**
 * Builds `build/docs/` from the package's markdown sources:
 *   - component READMEs  → docs/components/<Name>.md
 *   - public hook READMEs → docs/hooks/<name>.md
 *   - top-level guides   → docs/guides/<relative path>
 *   - docs/INDEX.md      → compact index (name → summary → path) for agents
 */
function buildDocs() {
    fs.rmSync(DOCS_DIR, {recursive: true, force: true});

    // Component READMEs. Nested groups (lab/, controls/, sub-components) keep
    // their relative path so names never collide. `legacy/` is deprecated and
    // deliberately not shipped to the docs.
    const componentItems = listReadmes({
        outPrefix: 'components',
        baseDir: path.join(ROOT, 'src', 'components'),
        exclude: ['legacy'],
    });
    // Public hook READMEs (private helpers excluded).
    const hookItems = listReadmes({
        outPrefix: 'hooks',
        baseDir: path.join(ROOT, 'src', 'hooks'),
        exclude: ['private'],
    });
    // Guides: any markdown placed under the repo-level docs/ folder.
    const guideItems = findMarkdown(path.join(ROOT, 'docs')).map((source) => {
        const relSource = path.relative(path.join(ROOT, 'docs'), source).split(path.sep).join('/');
        return {source, name: relSource.replace(/\.md$/, ''), outRel: path.posix.join('guides', relSource)};
    });

    // Map every shipped source doc to its output path first, so links between
    // docs can be resolved in the second pass regardless of processing order.
    const docMap = new Map(
        [...componentItems, ...hookItems, ...guideItems].map((it) => [it.source, it.outRel]),
    );

    const index = {components: [], hooks: [], guides: []};

    for (const {source, name, outRel} of componentItems) {
        const cleaned = emitDoc(source, outRel, docMap);
        index.components.push({name, rel: outRel, summary: extractSummary(cleaned)});
    }
    for (const {source, name, outRel} of hookItems) {
        const cleaned = emitDoc(source, outRel, docMap);
        index.hooks.push({name, rel: outRel, summary: extractSummary(cleaned)});
    }
    for (const {source, name, outRel} of guideItems) {
        const cleaned = emitDoc(source, outRel, docMap);
        // Guides are named by their heading; fall back to the file path.
        index.guides.push({name: extractTitle(cleaned) || name, rel: outRel, summary: extractSummary(cleaned)});
    }

    writeDoc(path.join(DOCS_DIR, 'INDEX.md'), renderIndex(index));

    const total = index.components.length + index.hooks.length + index.guides.length;
    return {...index, total};
}

function renderSection(title, entries) {
    if (!entries.length) {
        return '';
    }
    const rows = entries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({name, rel, summary}) => {
            const posixRel = rel.split(path.sep).join('/');
            const suffix = summary ? ` — ${summary}` : '';
            return `- [${name}](./${posixRel})${suffix}`;
        })
        .join('\n');
    return `## ${title}\n\n${rows}\n`;
}

function renderIndex(index) {
    const header = [
        '# @gravity-ui/uikit documentation',
        '',
        'Documentation for the **installed** version of `@gravity-ui/uikit`.',
        'Your training data may be outdated — these files are the source of truth.',
        '',
        'Paths are relative to this file (`node_modules/@gravity-ui/uikit/build/docs/`).',
        '',
    ].join('\n');

    return [
        header,
        renderSection('Guides', index.guides),
        renderSection('Components', index.components),
        renderSection('Hooks', index.hooks),
    ]
        .filter(Boolean)
        .join('\n');
}

module.exports = {buildDocs};

if (require.main === module) {
    const result = buildDocs();
    // eslint-disable-next-line no-console
    console.log(
        `Built build/docs: ${result.components.length} components, ` +
            `${result.hooks.length} hooks, ${result.guides.length} guides.`,
    );
}
