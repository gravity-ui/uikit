import type {ListChildrenState, ListItemGetters, ListItemType} from '../types';

export interface UseListStateProps<T> extends ListItemGetters<T> {
    /** The single source of data; the core never mutates it. */
    items: T[];
    /** Expanded node ids (controlled). Expansion drives `visibleIds`. */
    expandedIds?: string[];
    /** Initially expanded node ids (uncontrolled). */
    defaultExpandedIds?: string[];
    /** Called with the next expanded node ids whenever expansion changes. */
    onExpandedUpdate?: (ids: string[]) => void;
}

export interface ListState<T> {
    /**
     * Flat slice of the visible (expanded) nodes in display order — the single source of truth
     * for rendering, keyboard navigation and virtualization.
     */
    visibleIds: string[];
    /** Returns the source item for an id, or `undefined` if the id is unknown. */
    getItemById(id: string): T | undefined;
    /** Returns the nesting depth of a node (`0` for roots). */
    getLevel(id: string): number;
    /** Returns the parent id of a node, or `undefined` for roots. */
    getParentId(id: string): string | undefined;
    /**
     * Returns the loaded child ids in order: `[]` is a loaded empty folder, `undefined` is a leaf
     * or an unloaded folder (use `getChildrenState` to tell them apart).
     */
    getChildrenIds(id: string): string[] | undefined;
    /**
     * Returns the async subtree state of a node — distinguishes a leaf from an unloaded `lazy`
     * folder (both report `undefined` children) for chevron / `aria-expanded` / `aria-busy`.
     */
    getChildrenState(id: string): ListChildrenState | undefined;
    /** Returns whether a node is expanded. */
    isExpanded(id: string): boolean;
    /** Returns whether a node is disabled. */
    isDisabled(id: string): boolean;
    /**
     * Returns the structural role of a node — a selectable, navigable `item` or a non-interactive
     * `section` label; `item` for unknown ids.
     */
    getItemType(id: string): ListItemType;
    /**
     * Expands or collapses a node and emits `onExpandedUpdate`; a no-op when the node is already
     * in the requested state.
     */
    setExpanded(id: string, expanded: boolean): void;
}
