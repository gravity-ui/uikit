// Cross-doc links in docs/*.md are written as relative file links (e.g.
// `[typography guide](typography.md)`) so they resolve on GitHub. When the same
// markdown is rendered inside Storybook via <Markdown>, those relative links are
// dead — so we rewrite them to the matching Storybook doc routes at render time.
// The source .md files stay untouched and keep working on GitHub.
const DOC_TO_STORYBOOK_ROUTE: Record<string, string> = {
    'layout.md': '?path=/docs/components-layout--docs',
    'theming.md': '?path=/docs/branding-overview--docs',
    'typography.md': '?path=/docs/typography--docs',
};

export function resolveDocsLinks(markdown: string): string {
    return Object.entries(DOC_TO_STORYBOOK_ROUTE).reduce(
        (md, [file, route]) =>
            md.replace(
                // Match `](file.md` (optionally `./`-prefixed), preserving any
                // trailing `#anchor` or the closing paren that follows.
                new RegExp(`\\]\\((?:\\./)?${file.replace('.', '\\.')}`, 'g'),
                `](${route}`,
            ),
        markdown,
    );
}
