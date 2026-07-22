/**
 * State of an asynchronous subtree. Resolves the ambiguity of `getItemChildren` returning
 * `undefined` — a tree leaf versus a folder whose children are not loaded yet.
 *
 * - `lazy` — children exist but are not loaded; the first expand triggers a load;
 * - `loading` — children are being loaded (placeholders + `aria-busy`);
 * - `loaded` — the default; synchronous trees never need it;
 * - `canLoadMore` — children are partially loaded (a load-more sentinel).
 *
 * Lives in consumer data (`item.childrenState` by default): load status is inseparable from the
 * consumer's fetches / cache / errors, so the core only reads it.
 */
export type ListChildrenState = 'loaded' | 'loading' | 'lazy' | 'canLoadMore';

/**
 * Structural role of a node.
 *
 * - `item` — a selectable, navigable row (the default);
 * - `section` — a non-interactive group label: skipped by selection and keyboard navigation, but
 * its children are laid out and expand like any other node.
 *
 * Marked explicitly by the list author (`getItemType`) rather than inferred, so the selection layer
 * stays role-independent — a "leaf is an option, node with children is a section header" rule holds
 * only for `listbox`, and would misclassify a `tree` folder.
 */
export type ListItemType = 'item' | 'section';

/**
 * Data getters. Each has a "read from the item" default, so the minimal case needs none of them;
 * for primitive string items the defaults close over the string itself.
 */
export interface ListItemGetters<T, C = unknown> {
    /**
     * Derives a stable, unique id for an item.
     * @default (item) => item.id — a string item is its own id
     */
    getItemId?: (item: T) => string;
    /**
     * Derives the child items of a node. Read together with `childrenState`: `undefined` is a
     * leaf or an unloaded folder, `[]` is a loaded empty folder.
     * @default (item) => item.children
     */
    getItemChildren?: (item: T) => T[] | undefined;
    /**
     * Derives whether an item is disabled.
     * @default (item) => Boolean(item.disabled)
     */
    getItemDisabled?: (item: T) => boolean;
    /**
     * Derives the async subtree state of an item.
     * @default (item) => item.childrenState
     */
    getItemChildrenState?: (item: T) => ListChildrenState | undefined;
    /**
     * Derives the text value used for typeahead and screen-reader announcements. Defaults to the
     * item content only when that content is a plain string; there is no default for richer
     * content, so provide this getter when the content is not plain text.
     * @default the item content, when it is a plain string
     */
    getItemTextValue?: (item: T) => string;
    /**
     * Derives the structural role of an item: a selectable, navigable `item` (the default) or a
     * non-interactive `section` label. Governs selection and keyboard navigation — not disclosure:
     * a `section` may still hold children and expand like any other node. Lets a list author mark
     * group headers explicitly, so selection stays role-independent (a leaf-vs-header rule would be
     * `listbox`-only, and the selection layer has no role).
     * @default (item) => 'item'
     */
    getItemType?: (item: T) => ListItemType;
    /**
     * Derives the renderable content of an item. The only getter without a default, so data
     * fields never leak into rendering implicitly; `C` is inferred from the return value.
     */
    getItemContent?: (item: T) => C;
}
