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
    ListDndProps,
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
import {flattenItems, getNextActiveId, isNavigable} from './utils';
import type {ListNavigationCommand, ListRow} from './utils';

export type ListContainerDOMProps = React.HTMLAttributes<HTMLElement> & {
    ref: React.Ref<HTMLDivElement>;
};

/** Not a prop: `activedescendant` is turned on by `focusOwner` */
type ListFocusStrategy = 'roving' | 'activedescendant';

/** The list core (internal) */
export interface ListInstance<T> {
    getContainerProps(overrides?: ListPropsOverrides): ListContainerDOMProps;
    visibleIds: string[];
    getItemContext(id: string): ListItemContext<T>;
    getItemProps(id: string, overrides?: ListPropsOverrides): ListItemDOMProps;
    getCellProps(overrides?: ListPropsOverrides): ListCellDOMProps;
    role: ListRole;
    /**
     * Rows the virtualizer must keep mounted: the tab stop (focus/Tab order) and section
     * headers (aria-describedby targets)
     */
    persistedRowIndexes: readonly number[];
    /** Everything getItemProps depends on that is not in ctx */
    getItemMemoKey(id: string): string;
    /** draggingId or dropTarget present */
    dragActive: boolean;
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
    // Cell navigation is roving-only: in activedescendant the arrows belong to the input
    const cellNavigation = role === 'grid' && focusStrategy === 'roving';
    const direction = useDirection();

    const virtualized = React.useContext(ListVirtualizationContext) !== null;

    const dnd = props.dnd ?? null;
    const draggingId = dnd ? (dnd.draggingId ?? null) : null;
    const dropTarget = dnd ? (dnd.dropTarget ?? null) : null;

    const [activeItemId, setActiveItemId] = useControlledState<string | null>(
        props.activeItemId,
        props.defaultActiveItemId ?? null,
        props.onActiveItemUpdate,
    );

    // Starts visible: a programmatic activation is drawn as the keyboard cursor
    const [cursorVisible, setCursorVisible] = React.useState(true);

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Set between pointerdown/pointerup on a row: focus arriving then came from the mouse
    const pointerPressedRef = React.useRef(false);

    // Any key pressed while the list holds DOM focus brings the cursor back (capture: nested
    // widgets may stop propagation); bare modifiers do not count
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
            if (
                containerRef.current !== null &&
                containerRef.current.contains(document.activeElement)
            ) {
                setCursorVisible(true);
            }
        };
        document.addEventListener('keydown', handleDocumentKeyDown, true);
        return () => document.removeEventListener('keydown', handleDocumentKeyDown, true);
    }, []);

    if (!props['aria-label'] && !props['aria-labelledby']) {
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

    // Selection first, onItemAction after — Shift gestures apply the row too
    const applyRow = (row: ListRow<T>, event: ListItemActionEvent, options?: {range?: boolean}) => {
        if (options?.range) {
            extendSelection(row);
        } else {
            toggleSelection(row);
        }
        onItemAction?.(row.id, row.item, event);
    };

    const dragActive = draggingId !== null || dropTarget !== null;

    const activeRow = activeItemId === null ? undefined : rowById.get(activeItemId);
    const activeOption = activeRow?.kind === 'item' ? activeRow : undefined;
    const effectiveActiveId = activeOption?.id;

    // The last requested id; not reset per commit: a controlled parent may echo asynchronously
    const requestedActiveIdRef = React.useRef<string | null>(null);
    const requestActive = (id: string) => {
        requestedActiveIdRef.current = id;
        setActiveItemId(id);
    };

    // Read at event time by row handlers: memoized rows keep stale closures
    const latestRef = React.useRef({
        rowById,
        domIdToId,
        applyRow,
        requestActive,
        activateOnHover,
        dragActive,
    });
    latestRef.current = {
        rowById,
        domIdToId,
        applyRow,
        requestActive,
        activateOnHover,
        dragActive,
    };

    const firstNavigableId = React.useMemo(() => rows.find(isNavigable)?.id, [rows]);

    const pinnedRowId = effectiveActiveId ?? firstNavigableId;
    const pinnedRowIndex = pinnedRowId === undefined ? -1 : (rowById.get(pinnedRowId)?.index ?? -1);

    const persistedRowIndexes = React.useMemo(() => {
        const indexes = rows.filter((row) => row.kind === 'section').map((row) => row.index);
        if (pinnedRowIndex >= 0) {
            indexes.push(pinnedRowIndex);
        }
        return indexes;
    }, [rows, pinnedRowIndex]);

    const registry = useItemElementRegistry({rowById});
    const dndRefTracker = useDndRefStabilityTracker({rowById});

    /**
     * Focus follows the active row only while a row of THIS list holds DOM focus (react-aria
     * useSelectableItem): hover/controlled changes never steal it. A keyboard gesture focuses
     * unconditionally and scrolls with block: 'nearest' — focus() would center the row in
     * Chromium
     */
    const syncFocusToActive = React.useCallback(
        (id: string, {gesture}: {gesture: boolean}) => {
            const element = registry.getElement(id);
            if (!element) {
                return;
            }
            if (focusStrategy === 'roving') {
                const focused = document.activeElement;
                const rowFocused =
                    focused instanceof HTMLElement &&
                    containerRef.current !== null &&
                    containerRef.current.contains(focused) &&
                    latestRef.current.domIdToId.has(focused.id);
                if (!gesture && !rowFocused) {
                    return;
                }
                if (focused !== element) {
                    element.focus({preventScroll: true});
                }
            }
            if (gesture) {
                element.scrollIntoView?.({block: 'nearest'});
            }
        },
        [focusStrategy, registry],
    );

    // Driven by the ACTUAL activity: a controlled parent may reject the request
    const gestureRequestIdRef = React.useRef<string | null>(null);
    useLayoutEffect(() => {
        if (effectiveActiveId === undefined) {
            return;
        }
        const gesture = gestureRequestIdRef.current === effectiveActiveId;
        gestureRequestIdRef.current = null;
        syncFocusToActive(effectiveActiveId, {gesture});
    }, [effectiveActiveId, syncFocusToActive]);
    useLayoutEffect(() => {
        // A gesture request lives for a single commit
        gestureRequestIdRef.current = null;
    });

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
        setCursorVisible(true);
    }, [effectiveActiveId]);

    const commitActive = (id: string | undefined) => {
        if (id === undefined) {
            return;
        }
        requestedActiveIdRef.current = id;
        setCursorVisible(true);
        if (id === effectiveActiveId) {
            // Already active: no commit follows, sync focus/scroll here
            syncFocusToActive(id, {gesture: true});
            return;
        }
        gestureRequestIdRef.current = id;
        setActiveItemId(id);
    };

    const typeahead = useListTypeahead<T>({
        rows,
        activeId: effectiveActiveId,
        onMatch: commitActive,
    });

    const handleNavigationKeys = (event: React.KeyboardEvent<HTMLElement>) => {
        const command = NAVIGATION_COMMANDS[event.key];
        if (command) {
            event.preventDefault();
            // Shift+↑/↓ extends the range without wrapping; multiple only
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

        // Ctrl/Cmd+A by key or physical KeyA (non-Latin layouts); roving + multiple only
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
            if (activeOption && !activeOption.disabled) {
                event.preventDefault();
                applyRow(activeOption, event);
            }
            return;
        }

        if (event.key === ' ') {
            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }
            if (focusStrategy === 'activedescendant') {
                return;
            }
            // APG: a space is part of the typeahead query while the buffer is not empty
            event.preventDefault();
            if (typeahead.hasQuery()) {
                typeahead.handleChar(' ');
                return;
            }
            if (!selectionMode) {
                return;
            }
            if (activeOption && !activeOption.disabled) {
                applyRow(activeOption, event, {range: event.shiftKey});
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

    // Only rows are listened to; in grid a cell hands over ←/→ only
    const handleContainerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (!(event.target instanceof HTMLElement) || event.defaultPrevented) {
            return;
        }
        if (event.key === 'Tab' && !event.ctrlKey && !event.metaKey && !event.altKey) {
            // One tab stop: focus it synchronously and let the browser continue from there
            // (react-aria useSelectableCollection)
            const tabStop =
                pinnedRowId === undefined ? undefined : registry.getElement(pinnedRowId);
            if (tabStop && tabStop !== event.target) {
                tabStop.focus({preventScroll: true});
            }
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

    const handleFocusOwnerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.defaultPrevented) {
            return;
        }
        setCursorVisible(true);
        handleNavigationKeys(event);
    };

    useGridTabStopDevCheck({enabled: cellNavigation, rows, getElements: registry.elements});

    // No deps: the handler is recreated every render, the owner dedupes by value
    useLayoutEffect(() => {
        focusOwnerChannel?.connect({
            listId,
            activeDomId: activeOption?.domId,
            onKeyDown: handleFocusOwnerKeyDown,
        });
    });
    useLayoutEffect(() => () => focusOwnerChannel?.disconnect(), [focusOwnerChannel]);

    const composeWithDnd = <
        P extends React.HTMLAttributes<HTMLElement> & {ref?: React.Ref<HTMLElement>},
    >(
        baseProps: P,
        dndProps: ListDndProps | undefined,
        track: (ref: unknown) => void,
        overrides: ListPropsOverrides | undefined,
    ): P => {
        let withDnd = baseProps;
        if (dndProps) {
            const sanitized = sanitizeDndProps(dndProps);
            track(sanitized.ref);
            withDnd = composeItemProps(baseProps, sanitized, {forkRef: registry.forkRefCached});
        }
        return composeItemProps(withDnd, overrides, {forkRef: registry.forkRefCached});
    };

    const getContainerProps = (overrides?: ListPropsOverrides): ListContainerDOMProps => {
        const baseProps = {
            role,
            id: listId,
            'aria-label': props['aria-label'],
            'aria-labelledby': props['aria-labelledby'],
            'aria-multiselectable': selectionMode === 'multiple' || undefined,
            'aria-rowcount': role === 'grid' && virtualized ? optionsCount : undefined,
            'data-drag-active': dragActive ? '' : undefined,
            onKeyDown: handleContainerKeyDown,
            // Cursor is owned by the list holding DOM focus; moves within the root are not a departure
            onFocus: (event: React.FocusEvent<HTMLElement>) => {
                if (event.currentTarget.contains(event.relatedTarget)) {
                    return;
                }
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
        return composeWithDnd(
            baseProps,
            dnd?.getContainerDndProps?.(),
            dndRefTracker.trackContainerRef,
            overrides,
        ) as ListContainerDOMProps;
    };

    const getDndState = (row: ListRow<T>) =>
        dnd && row.kind === 'item'
            ? {
                  dragging: row.id === draggingId,
                  dropTarget: dropTarget?.id === row.id ? dropTarget.position : null,
              }
            : undefined;

    const getItemProps = (id: string, overrides?: ListPropsOverrides): ListItemDOMProps => {
        warnOnOverridesCollision(overrides, 'getItemProps');
        const row = rowById.get(id);
        if (!row) {
            warnOnce(
                `[List] \`getItemProps\` was called with an unknown item id "${id}" — it is not in \`items\`, so only the passed overrides were returned.`,
            );
            return (overrides ?? {}) as ListItemDOMProps;
        }

        if (row.kind === 'section') {
            // presentation alone leaves the text in the tree
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
        const dndState = getDndState(row);
        const isGrid = role === 'grid';
        // activedescendant: rows leave the Tab order
        let tabIndex: number | undefined;
        if (focusStrategy === 'roving') {
            tabIndex = row.id === pinnedRowId ? 0 : -1;
        }
        const baseProps = {
            id: row.domId,
            role: isGrid ? 'row' : 'option',
            tabIndex,
            'aria-disabled': row.disabled || undefined,
            'aria-selected': selected,
            'aria-describedby': row.sectionDomId,
            'aria-setsize': virtualized && !isGrid ? optionsCount : undefined,
            'aria-posinset': virtualized && !isGrid ? row.posInSet : undefined,
            'aria-rowindex': virtualized && isGrid ? row.posInSet : undefined,
            'data-active': active ? '' : undefined,
            'data-disabled': row.disabled ? '' : undefined,
            'data-selected': selected ? '' : undefined,
            'data-dragging': dndState?.dragging ? '' : undefined,
            'data-drop-target': dndState?.dropTarget ?? undefined,
            ref: registry.getItemRefCallback(id),
            // Rows are not focusable here: keep focus with the owner (react-aria
            // preventFocusOnPress); a native draggable row needs the mousedown default
            ...(focusStrategy === 'activedescendant'
                ? {
                      onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
                          if (!event.currentTarget.hasAttribute('draggable')) {
                              event.preventDefault();
                          }
                      },
                  }
                : undefined),
            // Text selection is suppressed for the duration of a press (textSelection.ts);
            // restore listens on the document
            onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
                const element = event.currentTarget;
                disableTextSelection(element);
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
                setCursorVisible(false);
                latest.requestActive(currentRow.id);
                latest.applyRow(currentRow, event, {range: event.shiftKey});
            },
            onFocus: () => {
                const latest = latestRef.current;
                const currentRow = latest.rowById.get(id);
                if (!currentRow || currentRow.disabled) {
                    return;
                }
                latest.requestActive(id);
            },
            onPointerEnter: () => {
                // Hover moves the activity; suspended while dragging (synthetic-drag libraries
                // would drag the highlight along)
                const latest = latestRef.current;
                const currentRow = latest.rowById.get(id);
                if (latest.dragActive || !currentRow || currentRow.disabled) {
                    return;
                }
                // The mouse puts the cursor out regardless of activateOnHover; leaving does not
                // bring it back
                setCursorVisible(false);
                if (!latest.activateOnHover) {
                    return;
                }
                latest.requestActive(currentRow.id);
            },
        };
        return composeWithDnd(
            baseProps,
            dnd?.getItemDndProps?.(row.id),
            (ref) => dndRefTracker.trackItemRef(row.id, ref),
            overrides,
        ) as unknown as ListItemDOMProps;
    };

    const getCellProps = (overrides?: ListPropsOverrides): ListCellDOMProps => {
        const baseProps = role === 'grid' ? {role: 'gridcell'} : {};
        return composeItemProps(baseProps, overrides, {
            forkRef: registry.forkRefCached,
        }) as ListCellDOMProps;
    };

    const getRow = (id: string): ListRow<T> => {
        const row = rowById.get(id);
        if (!row) {
            throw new Error(`[List] Unknown item id "${id}"`);
        }
        return row;
    };

    const getItemContext = (id: string): ListItemContext<T> => {
        const row = getRow(id);
        return {
            id: row.id,
            item: row.item,
            index: row.index,
            kind: row.kind,
            content: row.content,
            state: {
                active: row.id === effectiveActiveId,
                ...(row.id === effectiveActiveId ? {cursorVisible} : undefined),
                disabled: row.disabled,
                ...(selectionMode && row.kind === 'item'
                    ? {selected: selectedSet.has(row.id)}
                    : undefined),
                ...getDndState(row),
            },
        };
    };

    const getItemMemoKey = (id: string): string => {
        const row = getRow(id);
        const tabStop = row.id === pinnedRowId;
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
        persistedRowIndexes,
        getItemMemoKey,
        dragActive,
    };
}
