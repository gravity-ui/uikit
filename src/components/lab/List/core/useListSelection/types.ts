/** Selection mode: at most one selected node (`single`) or many (`multiple`). */
export type ListSelectionMode = 'single' | 'multiple';

/**
 * Input source that produced a selection change, reported through `onSelectedUpdate`; the selection
 * gestures default it to `pointer`.
 */
export type ListSelectionTrigger = 'keyboard' | 'pointer';

export interface ListSelectionProps {
    /** Selection mode; omit to turn selection off (`useListSelection` returns `undefined`). */
    selectionMode?: ListSelectionMode;
    /** Selected node ids (controlled). */
    selectedIds?: string[];
    /** Initially selected node ids (uncontrolled). */
    defaultSelectedIds?: string[];
    /** Called with the next selected node ids whenever the selection changes. */
    onSelectedUpdate?: (ids: string[], details: {trigger: ListSelectionTrigger}) => void;
}

export interface ListSelection {
    /** The active selection mode. */
    mode: ListSelectionMode;
    /** The selected node ids, in selection order; test membership through `isSelected`. */
    selectedIds: string[];
    /** Returns whether a node is selected (`O(1)`). */
    isSelected(id: string): boolean;
    /**
     * Selects a node, replacing the selection, and moves the range anchor to it; a no-op when the
     * node is not selectable.
     */
    select(id: string, trigger?: ListSelectionTrigger): void;
    /** Toggles a node's selection and moves the range anchor to it; a no-op if not selectable. */
    toggle(id: string, trigger?: ListSelectionTrigger): void;
    /**
     * Extends the selection to a node as an inclusive range from the anchor along `visibleIds`;
     * falls back to `select` in `single` mode.
     */
    extendTo(id: string, trigger?: ListSelectionTrigger): void;
    /** Selects every visible, selectable node; a no-op in `single` mode. */
    selectAll(trigger?: ListSelectionTrigger): void;
    /** Clears the selection and resets the range anchor. */
    clear(trigger?: ListSelectionTrigger): void;
}
