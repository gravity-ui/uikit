/* eslint-env node */

/**
 * Prepares a source README for shipping inside the npm tarball (`build/docs/`),
 * where it is consumed by AI agents rather than rendered on GitHub or Storybook.
 *
 * The docs source uses a few service markers:
 *   - `<!--SANDBOX ... SANDBOX-->`      commented-out interactive Storybook code
 *   - `<!--LANDING_BLOCK ... LANDING_BLOCK-->`  commented-out content for the landing site
 *   - `<!--GITHUB_BLOCK-->` / `<!--/GITHUB_BLOCK-->`  wrappers around GitHub-only content
 *
 * SANDBOX/LANDING blocks are commented out (their code duplicates the plain
 * fenced example shown right after), so they are dropped entirely. GITHUB_BLOCK
 * markers wrap real content we want to keep — only the marker lines are removed.
 * Badges and images carry no value for an agent and are stripped too.
 */
function cleanMarkdown(content) {
    let text = content.replace(/\r\n/g, '\n');

    // Drop commented-out blocks whole (open + body + close).
    text = text.replace(/<!--SANDBOX[\s\S]*?SANDBOX-->/g, '');
    text = text.replace(/<!--LANDING_BLOCK[\s\S]*?LANDING_BLOCK-->/g, '');

    // Keep GitHub-only content, remove just the wrapper markers.
    text = text.replace(/<!--\/?GITHUB_BLOCK-->/g, '');

    // Any remaining standalone HTML comments have no value for an agent.
    text = text.replace(/<!--[\s\S]*?-->/g, '');

    // Standalone image / badge lines (shields.io etc.).
    text = text.replace(/^[ \t]*!\[[^\]]*\]\([^)]*\)[ \t]*$/gm, '');
    // Inline images inside headings/links, e.g. `### ![logo](x) [Website](url)`.
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '');

    // Trailing whitespace left behind by the removals.
    text = text.replace(/[ \t]+$/gm, '');

    // Collapse the blank-line runs the removals produced.
    text = text.replace(/\n{3,}/g, '\n\n');

    return `${text.trim()}\n`;
}

/**
 * Extracts a one-line summary for the docs index. By convention a README opens
 * with the title, the import example, then a description line — so the summary
 * is the first prose line after the title, skipping the leading code block.
 * If a section heading follows the title directly (the file doesn't yet follow
 * the convention), there is no intro paragraph and the summary is empty.
 */
function extractSummary(cleanedMarkdown, maxLength = 300) {
    const lines = cleanedMarkdown.split('\n');

    // Anchor on the title (first heading), then read what comes after it.
    const titleIndex = lines.findIndex((line) => /^#{1,6}\s+/.test(line.trim()));
    if (titleIndex === -1) {
        return '';
    }

    for (let i = titleIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) {
            continue;
        }
        // Skip the leading import/example code block.
        if (line.startsWith('```')) {
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                i++;
            }
            continue;
        }
        // A heading right after the title means there is no intro paragraph.
        if (line.startsWith('#')) {
            return '';
        }

        // Unwrap links to plain text — the index line has its own base path.
        const plain = line.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
        return truncate(plain, maxLength);
    }

    return '';
}

/** Returns the text of the first heading, or '' if there is none. */
function extractTitle(cleanedMarkdown) {
    for (const line of cleanedMarkdown.split('\n')) {
        const match = line.trim().match(/^#{1,6}\s+(.+)$/);
        if (match) {
            return match[1].replace(/[*_`]/g, '').trim();
        }
    }
    return '';
}

function truncate(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    const sentenceEnd = text.slice(0, maxLength).lastIndexOf('. ');
    if (sentenceEnd > 40) {
        return text.slice(0, sentenceEnd + 1);
    }
    const wordEnd = text.slice(0, maxLength).lastIndexOf(' ');
    return `${text.slice(0, wordEnd > 40 ? wordEnd : maxLength).trim()}…`;
}

module.exports = {cleanMarkdown, extractSummary, extractTitle};
