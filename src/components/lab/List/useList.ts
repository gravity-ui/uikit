import * as React from 'react';

import {useControlledState, useLayoutEffect, useUniqId} from '../../../hooks';
import {useDirection} from '../../theme';
import {warnOnce} from '../../utils/warn';

import {ListVirtualizationContext} from './VirtualizationContext';
import {navigateCells} from './cellNavigation';
import {composeItemProps} from './composeItemProps';
import {
    sanitizeDndProps,
    useDndRefStabilityTracker,
    useGridTabStopDevCheck,
    warnOnOverridesCollision,
} from './contractChecks';
import {LIST_FOCUS_OWNER_CHANNEL} from './focusOwnerChannel';
import {disableTextSelection, restoreTextSelection} from './textSelection';
import type {
    ListCellDOMProps,
    ListFocusStrategy,
    ListItemActionEvent,
    ListItemContext,
    ListItemDOMProps,
    ListProps,
    ListPropsOverrides,
    ListRole,
} from './types';
import {useItemElementRegistry} from './useItemElementRegistry';
import {useListSelection} from './useListSelection';
import {useListTypeahead} from './useListTypeahead';
import {flattenItems, getNextActiveId} from './utils';
import type {ListNavigationCommand, ListRow} from './utils';

export type ListContainerDOMProps = React.HTMLAttributes<HTMLElement> & {
    ref: React.Ref<HTMLDivElement>;
};

/**
 * The internal core of the list. It is not exported from the package; the
 * shape is fixed so that it can be opened up additively later.
 */
export interface ListInstance<T> {
    /** Container props: role="listbox", onKeyDown (one machine per list), id, ref */
    getContainerProps(overrides?: ListPropsOverrides): ListContainerDOMProps;
    /** The render slice: ids in display order (options and section headers) */
    visibleIds: string[];
    getItemContext(id: string): ListItemContext<T>;
    getItemProps(id: string, overrides?: ListPropsOverrides): ListItemDOMProps;
    /** Props of a row cell: role="gridcell" in the grid mode, empty in listbox */
    getCellProps(overrides?: ListPropsOverrides): ListCellDOMProps;
    /** The ARIA role of the list: the value of the `role` prop, listbox by default */
    role: ListRole;
    /**
     * The index in visibleIds of the row that holds the roving tab stop (the
     * active one, or the first navigable one when there is none); −1 when
     * there are no options. It is part of persistedRowIndexes: unmounting the
     * focused row drops focus to the body, and unmounting the tab stop takes
     * the list out of the Tab order
     */
    pinnedRowIndex: number;
    /**
     * Indexes of the rows in visibleIds that the virtualization renderer must
     * always keep mounted: the row with the tab stop (pinnedRowIndex) and the
     * section headers — the targets of the options' aria-describedby: an
     * unmounted header would turn the reference into a dangling IDREF, and a
     * screen reader would lose the section context exactly on long sections,
     * where it matters most
     */
    persistedRowIndexes: readonly number[];
    /**
     * The memoization key of a row: it changes when something that is NOT
     * expressed in the row's ctx slice changes — the DOM id, the roving tab
     * stop without an active row, the aria numbering under virtualization.
     * An internal memoization channel of List, not a part of the renderItem
     * contract
     */
    getItemMemoKey(id: string): string;
}

const NAVIGATION_COMMANDS: Record<string, ListNavigationCommand> = {
    ArrowDown: 'next',
    ArrowUp: 'prev',
    Home: 'first',
    End: 'last',
};

export function useList<T>(props: ListProps<T>): ListInstance<T> {
    const {
        items,
        getItemId,
        getItemDisabled,
        getItemChildren,
        getItemContent,
        getItemTextValue,
        onItemAction,
        activateOnHover = true,
        selectionMode,
        role = 'listbox',
    } = props;

    const fallbackId = useUniqId();
    const listId = props.id ?? fallbackId;

    const focusOwner = props.focusOwner ?? null;
    const focusOwnerChannel = focusOwner ? focusOwner[LIST_FOCUS_OWNER_CHANNEL] : null;
    const focusStrategy: ListFocusStrategy = focusOwner ? 'activedescendant' : 'roving';
    // Entering the interactive content of a cell and returning from it is
    // available in the roving strategy only: in activedescendant the arrows
    // belong to the input caret, and aria-activedescendant points at ONE
    // element
    const cellNavigation = role === 'grid' && focusStrategy === 'roving';
    const direction = useDirection();

    const virtualized = React.useContext(ListVirtualizationContext) !== null;

    const dnd = props.dnd ?? null;
    const draggingId = dnd ? (dnd.draggingId ?? null) : null;
    const dropTarget = dnd ? (dnd.dropTarget ?? null) : null;

    // The `?? null` default also closes the useControlledState overload hole
    // "value and defaultValue are both undefined": with it the call matches
    // the "uncontrolled with a default" overload without a cast
    const [activeItemId, setActiveItemId] = useControlledState<string | null>(
        props.activeItemId,
        props.defaultActiveItemId ?? null,
        props.onActiveItemUpdate,
    );

    // Whether the active row shows the keyboard cursor (the dark active
    // color). It is a fact about THIS list rather than about the input
    // modality of the page: the cursor belongs to the list the user is
    // driving, so a key pressed in a neighbouring list must not light this one
    // up. It starts out visible — a programmatic activation
    // (defaultActiveItemId) is shown dark
    const [cursorVisible, setCursorVisible] = React.useState(true);

    const containerRef = React.useRef<HTMLDivElement>(null);

    // DOM focus is the gate of every "the keyboard is in use" signal. The
    // check is synchronous rather than a focus-within flag on purpose: the
    // focused row may be removed from the DOM (filtering, a dnd library hiding
    // the original), and removal fires no focusout — a flag would stay stale,
    // document.activeElement never does
    const hasDomFocus = () =>
        containerRef.current !== null && containerRef.current.contains(document.activeElement);

    // A pointer press on a row is held from pointerdown to pointerup (see
    // onPointerDown below): DOM focus that lands inside the list within that
    // window came from the mouse, any other focus came from the keyboard or
    // from code. react-aria answers the same question with a global modality
    // tracker; the list needs no such thing — it only has to classify the
    // focus that arrives at ITSELF
    const pointerPressedRef = React.useRef(false);

    // Any key pressed while this list holds DOM focus brings the cursor back
    // — including the ones the machinery does not handle (Escape, Tab). A
    // document capture listener rather than the onKeyDown of the root: a
    // nested widget may stop the propagation of its keys. Bare modifiers do
    // not count as input (isValidKey of react-aria; combinations with Shift do
    // — that is Shift+Tab); repeated presses are free: setState with the same
    // value does not render. In activedescendant DOM focus lives with the
    // owner outside the root — there the cursor is brought back by the keys
    // the owner routes into the machinery
    React.useEffect(() => {
        const handleDocumentKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }
            if (
                event.key === 'Shift' ||
                event.key === 'Control' ||
                event.key === 'Alt' ||
                event.key === 'Meta'
            ) {
                return;
            }
            if (hasDomFocus()) {
                setCursorVisible(true);
            }
        };
        document.addEventListener('keydown', handleDocumentKeyDown, true);
        return () => document.removeEventListener('keydown', handleDocumentKeyDown, true);
    }, []);

    if (!props['aria-label'] && !props['aria-labelledby']) {
        // Options take their name from the content, but the container has
        // nowhere to take one from: an unnamed listbox/grid violates ARIA
        warnOnce('[List] The list has no accessible name. Pass `aria-label` or `aria-labelledby`.');
    }

    const {rows, rowById, domIdToId, optionsCount} = React.useMemo(
        () =>
            flattenItems(listId, items, {
                getItemId,
                getItemDisabled,
                getItemChildren,
                getItemContent,
                getItemTextValue,
            }),
        [
            listId,
            items,
            getItemId,
            getItemDisabled,
            getItemChildren,
            getItemContent,
            getItemTextValue,
        ],
    );

    const {selectedSet, toggleSelection, extendSelection, selectAllOptions} = useListSelection<T>(
        props,
        {rows, rowById},
    );

    /**
     * The "apply" gesture of a row: the selection first — plain or by range,
     * — and onItemAction after it, so that Shift+click and Shift+Space apply
     * the row just like a plain gesture. The event of the gesture travels to
     * the consumer as it is: a link row tells a modified click from Enter by
     * it, and the native default is theirs to suppress
     */
    const applyRow = (row: ListRow<T>, event: ListItemActionEvent, options?: {range?: boolean}) => {
        if (options?.range) {
            extendSelection(row);
        } else {
            toggleSelection(row);
        }
        onItemAction?.(row.id, row.item, event);
    };

    // A "fresh" environment for the row handlers: the handlers themselves
    // close over the row id and this ref only, so a row that skipped a
    // re-render because of memoization does not hold a stale rowById or
    // selectedIds — the state is read at the moment of the event rather than
    // at the moment of the row's last render. An insertion target means "a
    // drag is in progress" as well: an adapter that fills in dropTarget only
    // still gets activation on hover suspended
    const dragActive = draggingId !== null || dropTarget !== null;

    const activeRow = activeItemId === null ? undefined : rowById.get(activeItemId);
    const effectiveActiveId = activeRow?.kind === 'item' ? activeRow.id : undefined;

    const latestRef = React.useRef({
        rowById,
        applyRow,
        setActiveItemId,
        activateOnHover,
        dragActive,
    });
    latestRef.current = {rowById, applyRow, setActiveItemId, activateOnHover, dragActive};

    const firstNavigableId = React.useMemo(
        () => rows.find((row) => row.kind === 'item' && !row.disabled)?.id,
        [rows],
    );

    // The row holding the roving tab stop — a mirror of the tabIndex logic in
    // getItemProps
    const pinnedRowId = effectiveActiveId ?? firstNavigableId;
    const pinnedRowIndex = pinnedRowId === undefined ? -1 : (rowById.get(pinnedRowId)?.index ?? -1);

    // Section headers are a handful at most, so the price of pinning them is a
    // few extra DOM nodes; the tab stop is an option and never coincides with
    // a header
    const persistedRowIndexes = React.useMemo(() => {
        const indexes = rows.filter((row) => row.kind === 'section').map((row) => row.index);
        if (pinnedRowIndex >= 0) {
            indexes.push(pinnedRowIndex);
        }
        return indexes;
    }, [rows, pinnedRowIndex]);

    const registry = useItemElementRegistry({rowById});
    const dndRefTracker = useDndRefStabilityTracker({rowById});

    // Scrolling is done by hand: the native scrolling of focus() in Chromium
    // CENTERS an element that is fully invisible (and at the viewport edge the
    // next row always is), which turns walking the list with the arrows into
    // half-screen jumps; scrollIntoView with block: 'nearest' scrolls by
    // exactly the missing height (jsdom has no such method)
    const syncFocusToActive = React.useCallback(
        (id: string) => {
            const element = registry.getElement(id);
            if (!element) {
                return;
            }
            if (focusStrategy === 'roving') {
                element.focus({preventScroll: true});
            }
            // In activedescendant DOM focus does not move at all: the row is
            // "highlighted" by the owner's aria-activedescendant, while
            // scrolling stays with the list
            element.scrollIntoView?.({block: 'nearest'});
        },
        [focusStrategy, registry],
    );

    // Focus moves in an effect driven by the ACTUAL activity rather than by
    // the requested one: a controlled parent may have rejected the update —
    // then focus stays where it is, and onFocus of the focused row does not
    // produce a second onActiveItemUpdate
    const pendingFocusIdRef = React.useRef<string | null>(null);
    useLayoutEffect(() => {
        if (pendingFocusIdRef.current !== null && pendingFocusIdRef.current === effectiveActiveId) {
            pendingFocusIdRef.current = null;
            syncFocusToActive(effectiveActiveId);
        }
    }, [effectiveActiveId, syncFocusToActive]);
    useLayoutEffect(() => {
        // A focus request lives for a single commit: if the activity did not
        // apply right away, focus does not move at all
        pendingFocusIdRef.current = null;
    });

    // The last id this list ASKED for, by any gesture. Unlike the focus
    // request it is not reset per commit: a controlled parent may echo the
    // update asynchronously, and the echo still has to read as "this list did
    // it". Everything else is an activity that came from the outside
    const requestedActiveIdRef = React.useRef<string | null>(null);
    const previousActiveIdRef = React.useRef(effectiveActiveId);
    useLayoutEffect(() => {
        const previousActiveId = previousActiveIdRef.current;
        previousActiveIdRef.current = effectiveActiveId;
        if (
            effectiveActiveId === undefined ||
            effectiveActiveId === previousActiveId ||
            effectiveActiveId === requestedActiveIdRef.current
        ) {
            return;
        }
        // The activity was moved by the consumer (a controlled activeItemId),
        // not by a gesture of this list — the cursor has to show even though
        // the user may be holding the mouse: the UI that moves the activity
        // (a button next to the list) would look broken otherwise
        setCursorVisible(true);
    }, [effectiveActiveId]);

    const commitActive = (id: string | undefined) => {
        if (id === undefined) {
            return;
        }
        pendingFocusIdRef.current = id;
        requestedActiveIdRef.current = id;
        // Every commitActive call is a keyboard gesture of THIS list: the
        // cursor comes back even when the document listener misses the event
        // (a portal into another document) or the keys arrive from the
        // external focus owner, which the list root never sees
        setCursorVisible(true);
        setActiveItemId(id);
    };

    const typeahead = useListTypeahead<T>({
        rows,
        activeId: effectiveActiveId,
        onMatch: commitActive,
    });

    const getActiveRow = () =>
        effectiveActiveId === undefined ? undefined : rowById.get(effectiveActiveId);

    /**
     * Step "a" of the keyboard machinery: the activity transitions. It is the
     * same in both focus strategies — only the source of the event differs (a
     * row in roving, the owner's input in activedescendant), the transitions
     * themselves are identical
     */
    const handleNavigationKeys = (event: React.KeyboardEvent<HTMLElement>) => {
        const command = NAVIGATION_COMMANDS[event.key];
        if (command) {
            event.preventDefault();
            // With Shift+↑/↓ the range boundary moves TOGETHER with the
            // activity (react-aria: setFocusedKey + extendSelection), but
            // without cycling — wrapping around the edge would throw the range
            // to the other end of the list (react-aria does not cycle at all by
            // default; our plain arrows do). Multiple only: in single and
            // without the layer Shift+arrow is plain navigation. Shift+Home/End
            // do not extend the range (react-aria extends on Ctrl+Shift only)
            const extendRange =
                event.shiftKey &&
                selectionMode === 'multiple' &&
                (command === 'next' || command === 'prev');
            const nextId = getNextActiveId(command, rows, effectiveActiveId, {
                wrap: !extendRange,
            });
            commitActive(nextId);
            if (extendRange && nextId !== undefined) {
                const nextRow = rowById.get(nextId);
                if (nextRow) {
                    extendSelection(nextRow);
                }
            }
            return;
        }

        // Ctrl/Cmd+A selects all non-disabled options — multiple only ('Mod+A'
        // in react-aria) and in the roving strategy only: in activedescendant
        // Ctrl+A belongs to the owner's input (selecting the typed text). The
        // match is by key with a fallback to the physical code for non-Latin
        // layouts (Ctrl+ф on a ЙЦУКЕН keyboard; react-aria matches 'a' only);
        // outside multiple the key is not intercepted and stays with the browser
        if (
            selectionMode === 'multiple' &&
            focusStrategy === 'roving' &&
            (event.ctrlKey || event.metaKey) &&
            !event.altKey &&
            !event.shiftKey &&
            (event.key.toLowerCase() === 'a' ||
                (event.code === 'KeyA' && !/^[a-z]$/i.test(event.key)))
        ) {
            event.preventDefault();
            selectAllOptions();
            return;
        }

        if (event.key === 'Enter') {
            const row = getActiveRow();
            if (row && !row.disabled) {
                event.preventDefault();
                applyRow(row, event);
            }
            return;
        }

        if (event.key === ' ') {
            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }
            // Character keys (a space is a character too) go to the focus
            // owner in activedescendant: they are typed into the input, and
            // filtering replaces typeahead
            if (focusStrategy === 'activedescendant') {
                return;
            }
            // Space priority (APG): while the typeahead buffer is not empty a
            // space is part of the search; otherwise Space works in the
            // selection layer only. The default page scroll is suppressed in
            // both cases
            event.preventDefault();
            if (typeahead.hasQuery()) {
                typeahead.handleChar(' ');
                return;
            }
            if (!selectionMode) {
                return;
            }
            const row = getActiveRow();
            if (row && !row.disabled) {
                applyRow(row, event, {range: event.shiftKey});
            }
            return;
        }

        if (
            focusStrategy === 'roving' &&
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
        ) {
            event.preventDefault();
            typeahead.handleChar(event.key);
        }
    };

    /**
     * The keyboard of the list root (roving): the machinery listens to the
     * rows themselves only — it does not intercept nested interactive elements
     * (buttons in endContent and the like). The exception is grid: from a cell
     * the core owns exactly ←/→ (returning to the row), while the other keys
     * stay with the nested widget (↑/↓ on an rbd drag handle are its own
     * keyboard drag and drop)
     */
    const handleContainerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (!(event.target instanceof HTMLElement) || event.defaultPrevented) {
            return;
        }
        if (!domIdToId.has(event.target.id)) {
            if (cellNavigation) {
                const rowElement = event.target.closest<HTMLElement>('[role="row"]');
                if (rowElement && domIdToId.has(rowElement.id)) {
                    navigateCells(event, rowElement, true, direction);
                }
            }
            return;
        }
        if (cellNavigation && navigateCells(event, event.target, false, direction)) {
            return;
        }
        handleNavigationKeys(event);
    };

    /**
     * The keyboard of the external focus owner (activedescendant): there is no
     * gate on the target row — the events come from the input, which lives
     * outside the list root
     */
    const handleFocusOwnerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.defaultPrevented) {
            return;
        }
        // DOM focus lives with the owner outside the root, so the document
        // listener never sees this list as focused: a key routed through the
        // channel is what brings the cursor back — including the ones the
        // machinery leaves to the input (filtering types into it and moves the
        // activity from the outside)
        setCursorVisible(true);
        handleNavigationKeys(event);
    };

    useGridTabStopDevCheck({enabled: cellNavigation, rows, getElements: registry.elements});

    // Publishing the connection to the focus owner: the list id for
    // aria-controls, the DOM id of the active row for aria-activedescendant
    // and the machinery itself. The effect has no dependencies — the handler
    // is recreated on every render, while the connection is deduplicated by
    // value on the owner's side
    const activeDomId =
        effectiveActiveId === undefined ? undefined : rowById.get(effectiveActiveId)?.domId;
    useLayoutEffect(() => {
        focusOwnerChannel?.connect({listId, activeDomId, onKeyDown: handleFocusOwnerKeyDown});
    });
    useLayoutEffect(() => () => focusOwnerChannel?.disconnect(), [focusOwnerChannel]);

    const getContainerProps = (overrides?: ListPropsOverrides): ListContainerDOMProps => {
        const baseProps = {
            role,
            id: listId,
            'aria-label': props['aria-label'],
            'aria-labelledby': props['aria-labelledby'],
            'aria-multiselectable': selectionMode === 'multiple' || undefined,
            // The grid counterpart of aria-setsize: under virtualization only
            // a window of rows is present in the DOM. The numbering follows
            // the data rows, section headers do not count
            'aria-rowcount': role === 'grid' && virtualized ? optionsCount : undefined,
            // A CSS hook for custom markup: suppress your own hover styles
            // while dragging (the core suppresses them for the default view
            // with the hovered={false} prop of getItemViewProps)
            'data-drag-active': dragActive ? '' : undefined,
            onKeyDown: handleContainerKeyDown,
            // The cursor belongs to the list that holds DOM focus: a click
            // outside takes the focus away and puts the cursor out, coming
            // back brings it in. Focus moving between the rows of this list
            // (or into the interactive content of a cell) is not a departure —
            // relatedTarget stays inside
            onFocus: (event: React.FocusEvent<HTMLElement>) => {
                if (event.currentTarget.contains(event.relatedTarget)) {
                    return;
                }
                // Focus that arrives while a row is being pressed came from
                // the mouse — there the cursor is owned by the pointer
                // handlers below
                if (!pointerPressedRef.current) {
                    setCursorVisible(true);
                }
            },
            onBlur: (event: React.FocusEvent<HTMLElement>) => {
                if (event.currentTarget.contains(event.relatedTarget)) {
                    return;
                }
                setCursorVisible(false);
            },
            ref: containerRef,
        };
        warnOnOverridesCollision(overrides, 'getContainerProps');
        let withDnd = baseProps;
        if (dnd?.getContainerDndProps) {
            const dndProps = sanitizeDndProps(dnd.getContainerDndProps());
            if (process.env.NODE_ENV !== 'production') {
                dndRefTracker.trackContainerRef(dndProps.ref);
            }
            withDnd = composeItemProps(baseProps, dndProps, {forkRef: registry.forkRefCached});
        }
        return composeItemProps(withDnd, overrides, {
            forkRef: registry.forkRefCached,
        }) as ListContainerDOMProps;
    };

    const getItemProps = (id: string, overrides?: ListPropsOverrides): ListItemDOMProps => {
        warnOnOverridesCollision(overrides, 'getItemProps');
        const row = rowById.get(id);
        if (!row) {
            // getItemContext throws on an unknown id; here the reaction is
            // softer (a getter may outlive its row by a frame), but staying
            // silent is not an option — a spread without the core props
            // quietly kills the role, the id and the keyboard for that row
            warnOnce(
                `[List] \`getItemProps\` was called with an unknown item id "${id}" — it is not in \`items\`, so only the passed overrides were returned.`,
            );
            return (overrides ?? {}) as ListItemDOMProps;
        }

        if (row.kind === 'section') {
            // presentation alone removes the role but does not hide the text
            // of the node — without aria-hidden the listbox would get bare
            // text nodes between its options
            const baseProps = {
                id: row.domId,
                role: 'presentation',
                'aria-hidden': true,
                ref: registry.getItemRefCallback(id),
            };
            return composeItemProps(baseProps, overrides, {
                forkRef: registry.forkRefCached,
            }) as ListItemDOMProps;
        }

        const active = row.id === effectiveActiveId;
        const selected = selectionMode ? selectedSet.has(row.id) : undefined;
        const dragging = dnd ? row.id === draggingId : undefined;
        let rowDropTarget: 'before' | 'after' | null | undefined;
        if (dnd) {
            rowDropTarget = dropTarget?.id === row.id ? dropTarget.position : null;
        }
        const isGrid = role === 'grid';
        const baseProps = {
            id: row.domId,
            role: isGrid ? 'row' : 'option',
            // Roving: one tab stop per list; with no active row it is the
            // first navigable one. In activedescendant the rows leave the Tab
            // order entirely: DOM focus lives with the external owner
            tabIndex:
                focusStrategy === 'roving'
                    ? active || (effectiveActiveId === undefined && row.id === firstNavigableId)
                        ? 0
                        : -1
                    : undefined,
            'aria-disabled': row.disabled || undefined,
            // "Not selected" ≠ "not selectable": with the selection layer on
            // aria-selected is present on every row, without the layer it is
            // on none of them. In grid the attribute lives on the row
            // (role="row"), not on the cell
            'aria-selected': selected,
            // The section header itself is hidden from the tree (presentation
            // + aria-hidden), but an explicit reference legitimately brings it
            // into the description computation — a screen reader announces the
            // option together with the name of its section, and the flat model
            // of the list is preserved
            'aria-describedby': row.sectionDomId,
            // Under virtualization only a window of rows is present in the DOM
            // — without explicit numbering a screen reader would announce "3
            // of 12" for a list of thousands of options. The numbering follows
            // the data rows: section headers do not count
            'aria-setsize': virtualized && !isGrid ? optionsCount : undefined,
            'aria-posinset': virtualized && !isGrid ? row.posInSet : undefined,
            // The grid counterpart of posinset; the total is aria-rowcount on
            // the container
            'aria-rowindex': virtualized && isGrid ? row.posInSet : undefined,
            'data-active': active ? '' : undefined,
            'data-disabled': row.disabled ? '' : undefined,
            'data-selected': selected ? '' : undefined,
            'data-dragging': dragging ? '' : undefined,
            // data-drop-target carries the edge as its value: the indicator
            // (and the consumer's CSS) has to tell before from after
            'data-drop-target': rowDropTarget ?? undefined,
            ref: registry.getItemRefCallback(id),
            // Text selection is suppressed for the duration of a press (the
            // react-aria model, textSelection.ts): dragging with the mouse,
            // shift+click in the selection mode and starting a drag create no
            // text selection, while at rest the rows stay a part of the page
            // selection. The release may happen anywhere — restore listens on
            // the document and removes itself. The closure uses no render
            // state, which makes it stale-safe for memoized rows
            onPointerDown: (event: React.PointerEvent) => {
                const element = event.currentTarget as HTMLElement;
                disableTextSelection(element);
                // The same window classifies the DOM focus that lands on the
                // row: the browser focuses it as the default action of
                // mousedown, that is between pointerdown and pointerup
                pointerPressedRef.current = true;
                const restore = () => {
                    document.removeEventListener('pointerup', restore, true);
                    document.removeEventListener('pointercancel', restore, true);
                    pointerPressedRef.current = false;
                    restoreTextSelection(element);
                };
                document.addEventListener('pointerup', restore, true);
                document.addEventListener('pointercancel', restore, true);
            },
            onClick: (event: React.MouseEvent<HTMLElement>) => {
                const latest = latestRef.current;
                const currentRow = latest.rowById.get(id);
                if (!currentRow || currentRow.disabled || event.defaultPrevented) {
                    return;
                }
                // setCursorVisible is stable, so calling it directly is safe
                // even from the stale closure of a memoized row
                setCursorVisible(false);
                requestedActiveIdRef.current = currentRow.id;
                latest.setActiveItemId(currentRow.id);
                latest.applyRow(currentRow, event, {range: event.shiftKey});
            },
            onFocus: () => {
                const latest = latestRef.current;
                const currentRow = latest.rowById.get(id);
                // Disabled rows do not take the activity through focus either
                // (the React Spectrum model: they are focusable neither by
                // mouse nor by keyboard)
                if (!currentRow || currentRow.disabled) {
                    return;
                }
                // Focus itself does not touch the cursor — that is decided by
                // the onFocus of the container, which knows whether the focus
                // arrived from the keyboard or from a press
                requestedActiveIdRef.current = id;
                latest.setActiveItemId(id);
            },
            onPointerEnter: () => {
                // Hover changes the activity and the roving tabIndex, but does
                // not move DOM focus; focus catches up with the activity on
                // the first keyboard interaction.
                // While a drag is in progress activation on hover is
                // suspended: the cursor positions the insertion point instead
                // of choosing a row — otherwise libraries with a synthetic
                // drag (dnd-kit, hello-pangea; with the native HTML5 dnd the
                // browser suppresses pointer events itself) would drag the
                // highlight along with the dragged element
                const latest = latestRef.current;
                const currentRow = latest.rowById.get(id);
                if (latest.dragActive || !currentRow || currentRow.disabled) {
                    return;
                }
                // The mouse entering a row puts the cursor out regardless of
                // activateOnHover: the dark indication is not needed while the
                // user works with the mouse (the analogue of the global
                // pointermove listener of react-aria, reduced to the rows of
                // the list). The mouse leaving is not an event: the cursor is
                // brought back by the next key pressed in the list
                setCursorVisible(false);
                if (!latest.activateOnHover) {
                    return;
                }
                requestedActiveIdRef.current = currentRow.id;
                latest.setActiveItemId(currentRow.id);
            },
        };
        // The adapter ref must be stable per id — the fork is cached by the
        // identity of the pair
        let withDnd = baseProps;
        if (dnd?.getItemDndProps) {
            const dndProps = sanitizeDndProps(dnd.getItemDndProps(row.id));
            if (process.env.NODE_ENV !== 'production') {
                dndRefTracker.trackItemRef(row.id, dndProps.ref);
            }
            withDnd = composeItemProps(baseProps, dndProps, {forkRef: registry.forkRefCached});
        }
        return composeItemProps(withDnd, overrides, {
            forkRef: registry.forkRefCached,
        }) as unknown as ListItemDOMProps;
    };

    const getCellProps = (overrides?: ListPropsOverrides): ListCellDOMProps => {
        const baseProps = role === 'grid' ? {role: 'gridcell'} : {};
        return composeItemProps(baseProps, overrides, {
            forkRef: registry.forkRefCached,
        }) as ListCellDOMProps;
    };

    const getItemContext = (id: string): ListItemContext<T> => {
        const row = rowById.get(id);
        if (!row) {
            throw new Error(`[List] Unknown item id "${id}"`);
        }
        return {
            id: row.id,
            item: row.item,
            index: row.index,
            kind: row.kind,
            content: row.content,
            state: {
                active: row.id === effectiveActiveId,
                // Exposed on the active row only, so that a change of the
                // cursor does not re-render the others
                ...(row.id === effectiveActiveId ? {cursorVisible} : undefined),
                disabled: row.disabled,
                ...(selectionMode && row.kind === 'item'
                    ? {selected: selectedSet.has(row.id)}
                    : undefined),
                ...(dnd && row.kind === 'item'
                    ? {
                          dragging: row.id === draggingId,
                          dropTarget: dropTarget?.id === row.id ? dropTarget.position : null,
                      }
                    : undefined),
            },
        };
    };

    const getItemMemoKey = (id: string): string => {
        const row = rowById.get(id);
        if (!row) {
            return '';
        }
        // Everything that affects the output of getItemProps but is not
        // expressed in the ctx slice: the DOM id (it changes with the list's
        // props.id), the roving tab stop without an active row, the aria
        // numbering under virtualization, both axes of the role model and of
        // the focus strategy, and the reference to the section header
        // (aria-describedby)
        const tabStop = row.index === pinnedRowIndex;
        const numbering =
            virtualized && row.kind === 'item' ? `${row.posInSet}/${optionsCount}` : '';
        return `${row.domId}|${tabStop ? 1 : 0}|${numbering}|${role}|${focusStrategy}|${row.sectionDomId ?? ''}`;
    };

    const visibleIds = React.useMemo(() => rows.map((row) => row.id), [rows]);

    return {
        getContainerProps,
        visibleIds,
        getItemContext,
        getItemProps,
        getCellProps,
        role,
        pinnedRowIndex,
        persistedRowIndexes,
        getItemMemoKey,
    };
}
