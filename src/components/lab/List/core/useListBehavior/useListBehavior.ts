import * as React from 'react';

import {KeyCode} from '../../../../../constants';
import {useControlledState} from '../../../../../hooks/useControlledState';
import {useUniqId} from '../../../../../hooks/useUniqId';
import {warnOnce} from '../../../../utils/warn';
import type {ListState} from '../useListState';

import {getAdjacentId, getEdgeId, resolveTypeahead} from './listNavigation';
import {buildItemDomId} from './sanitizeId';
import type {ListApi, ListBehavior, ListItemContext, ListRole, UseListBehaviorProps} from './types';

/**
 * Typeahead buffer lifetime: the pause after which the typed prefix resets. There is no normative
 * value — ~1s is the common convention (native `<select>` type-ahead, and the typeahead the APG
 * listbox pattern recommends, https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
 */
const TYPEAHEAD_TIMEOUT = 1000;

/** DOM role of a row per container role. */
const ITEM_ROLE = {
    listbox: 'option',
    tree: 'treeitem',
    grid: 'row',
} as const satisfies Record<ListRole, string>;

/** Row role, derived from the container-role map. */
type ListItemRole = (typeof ITEM_ROLE)[ListRole];

/** First selected, enabled, non-section id — the initial active row (see the roving seed). */
function getInitialActiveItemId<T>(
    state: ListState<T>,
    selectedIds: string[] | undefined,
): string | undefined {
    if (!selectedIds) {
        return undefined;
    }
    for (const id of selectedIds) {
        if (state.getItemType(id) === 'item' && !state.isDisabled(id)) {
            return id;
        }
    }
    return undefined;
}

/**
 * Roles + keyboard + roving focus over a `useListState` / `useListSelection` pair. Produces the DOM
 * props for the role container and each row (`ctx.props`) — spreading them is the accessibility
 * contract — plus an imperative `api`.
 *
 * The behavior layer for the whole List family: one shared keyboard machine, one hook. This ticket
 * implements the `listbox` machine (vertical navigation, selection gestures, typeahead) in
 * roving-tabindex focus mode; `tree` and `grid` extend the same machine later. Section labels are
 * transparent to navigation; disabled rows stay navigable but never selectable (APG
 * focusable-not-selectable).
 */
export function useListBehavior<T>(props: UseListBehaviorProps<T>): ListBehavior<T> {
    const {
        state,
        selection,
        role,
        typeahead = true,
        activateOnHover = 'reset-on-leave',
        onItemAction,
        disabled = false,
    } = props;

    const generatedId = useUniqId();
    const listId = props.id ?? generatedId;

    if (process.env.NODE_ENV !== 'production') {
        if (props.focus?.mode === 'virtual') {
            warnOnce(
                '[useListBehavior] Virtual focus is not implemented yet; falling back to roving focus.',
            );
        }
    }

    // Active row — controlled through the symmetric activeItemId channel. `null` is the empty value
    // (useControlledState reserves `undefined` for "uncontrolled"); it is mapped back to `undefined`
    // at every public boundary.
    const onActiveItemUpdateRef = React.useRef(props.onActiveItemUpdate);
    onActiveItemUpdateRef.current = props.onActiveItemUpdate;
    const emitActiveUpdate = React.useCallback((id: string | null) => {
        onActiveItemUpdateRef.current?.(id ?? undefined);
    }, []);
    const [activeItemIdInternal, setActiveInternal] = useControlledState<
        string | null,
        string | null
    >(
        props.activeItemId,
        props.defaultActiveItemId ?? getInitialActiveItemId(state, selection?.selectedIds) ?? null,
        emitActiveUpdate,
    );
    const currentActive = activeItemIdInternal ?? undefined;

    const visibleIds = state.visibleIds;
    const navigableIds = React.useMemo(
        () => visibleIds.filter((id) => state.getItemType(id) === 'item'),
        [visibleIds, state],
    );
    const navigableSet = React.useMemo(() => new Set(navigableIds), [navigableIds]);
    // The single tabbable row (roving): the active row when navigable, else the first navigable row
    // so the list is always reachable by Tab.
    const tabbableId =
        currentActive !== undefined && navigableSet.has(currentActive)
            ? currentActive
            : navigableIds[0];
    // Root order → O(1) sibling index for roots; children use their parent's child ids.
    const rootIndexMap = React.useMemo(() => {
        const map = new Map<string, number>();
        let rootIndex = 0;
        for (const id of visibleIds) {
            if (state.getParentId(id) === undefined) {
                map.set(id, rootIndex++);
            }
        }
        return map;
    }, [visibleIds, state]);

    // Latest render values, read by the stable event handlers below.
    const stateRef = React.useRef(state);
    stateRef.current = state;
    const selectionRef = React.useRef(selection);
    selectionRef.current = selection;
    const activeRef = React.useRef(currentActive);
    activeRef.current = currentActive;
    const disabledRef = React.useRef(disabled);
    disabledRef.current = disabled;
    const typeaheadRef = React.useRef(typeahead);
    typeaheadRef.current = typeahead;
    const activateOnHoverRef = React.useRef(activateOnHover);
    activateOnHoverRef.current = activateOnHover;
    const onItemActionRef = React.useRef(onItemAction);
    onItemActionRef.current = onItemAction;
    const onLoadChildrenRef = React.useRef(props.onLoadChildren);
    onLoadChildrenRef.current = props.onLoadChildren;
    const getItemTextValueRef = React.useRef(props.getItemTextValue);
    getItemTextValueRef.current = props.getItemTextValue;
    const navigableIdsRef = React.useRef(navigableIds);
    navigableIdsRef.current = navigableIds;
    const navigableSetRef = React.useRef(navigableSet);
    navigableSetRef.current = navigableSet;
    const setActiveInternalRef = React.useRef(setActiveInternal);
    setActiveInternalRef.current = setActiveInternal;

    // Element registries, maintained by the per-row callback refs (avoids DOM id escaping and works
    // without querying the tree).
    const elementById = React.useRef(new Map<string, HTMLElement>());
    const idByElement = React.useRef(new WeakMap<Element, string>());
    const itemRefCache = React.useRef(new Map<string, (el: HTMLElement | null) => void>());
    const containerElRef = React.useRef<HTMLElement | null>(null);

    const typeaheadBufferRef = React.useRef('');
    const typeaheadTimerRef = React.useRef<ReturnType<typeof setTimeout>>();
    React.useEffect(() => () => clearTimeout(typeaheadTimerRef.current), []);

    // Set while we move focus ourselves (keyboard/api): the resulting focus event then skips the
    // redundant `setActive`, so a controlled active row emits `onActiveItemUpdate` only once.
    const programmaticFocusRef = React.useRef(false);

    const getItemRef = React.useCallback((id: string) => {
        let cb = itemRefCache.current.get(id);
        if (!cb) {
            cb = (el: HTMLElement | null) => {
                const prev = elementById.current.get(id);
                if (prev && prev !== el) {
                    idByElement.current.delete(prev);
                }
                if (el) {
                    elementById.current.set(id, el);
                    idByElement.current.set(el, id);
                } else {
                    elementById.current.delete(id);
                }
            };
            itemRefCache.current.set(id, cb);
        }
        return cb;
    }, []);

    const setContainerRef = React.useCallback((el: HTMLElement | null) => {
        containerElRef.current = el;
    }, []);

    const setActive = React.useCallback((id: string | undefined) => {
        setActiveInternalRef.current(id ?? null);
    }, []);

    // Focuses a row's element, flagging the focus as ours so `handleContainerFocus` skips its
    // `setActive` (the caller has already set it).
    const focusRow = React.useCallback((id: string) => {
        const el = elementById.current.get(id);
        if (!el) {
            return;
        }
        programmaticFocusRef.current = true;
        el.focus();
        programmaticFocusRef.current = false;
    }, []);

    // Moves the active row and DOM focus (roving) — the keyboard/programmatic path.
    const moveActiveTo = React.useCallback(
        (id: string) => {
            setActive(id);
            focusRow(id);
        },
        [setActive, focusRow],
    );

    const getText = React.useCallback((id: string): string => {
        const item = stateRef.current.getItemById(id);
        if (item === undefined) {
            return '';
        }
        const getter = getItemTextValueRef.current;
        if (getter) {
            return getter(item);
        }
        return typeof item === 'string' ? item : '';
    }, []);

    const getItemIdByElement = React.useCallback((el: Element): string | undefined => {
        let node: Element | null = el;
        while (node && node !== containerElRef.current) {
            const id = idByElement.current.get(node);
            if (id !== undefined) {
                return id;
            }
            node = node.parentElement;
        }
        return undefined;
    }, []);

    // `getItemContext` is rebuilt each render (it closes over the current selection/active/tabbable);
    // handlers read the latest through this ref.
    const getItemContextRef = React.useRef<(id: string) => ListItemContext<T>>(() => {
        throw new Error('getItemContext read before render');
    });

    const focusItem = React.useCallback(
        (id: string) => {
            if (disabledRef.current) {
                return;
            }
            // Section labels are transparent — focusItem(headerId) is a no-op.
            if (stateRef.current.getItemType(id) !== 'item') {
                return;
            }
            setActive(id);
            focusRow(id);
        },
        [setActive, focusRow],
    );

    const runKeyDown = React.useCallback(
        (e: React.KeyboardEvent | KeyboardEvent) => {
            if (disabledRef.current) {
                return;
            }
            const currentState = stateRef.current;
            const currentSelection = selectionRef.current;
            const active = activeRef.current;
            const ids = navigableIdsRef.current;
            const navSet = navigableSetRef.current;
            const multiple = currentSelection?.mode === 'multiple';
            const key = e.key;
            const fromId = active !== undefined && navSet.has(active) ? active : undefined;
            // The active row when it can take a Space/Enter action (navigable and enabled), else
            // `undefined` — captured as an id so no non-null assertion is needed downstream.
            const actionableId =
                active !== undefined && navSet.has(active) && !currentState.isDisabled(active)
                    ? active
                    : undefined;

            // Ctrl/Cmd+A — select all visible (multiple).
            if (
                (e.metaKey || e.ctrlKey) &&
                !e.shiftKey &&
                !e.altKey &&
                (key === 'a' || key === 'A')
            ) {
                if (currentSelection && multiple) {
                    currentSelection.selectAll('keyboard');
                    e.preventDefault();
                }
                return;
            }

            switch (key) {
                case KeyCode.ARROW_DOWN:
                case KeyCode.ARROW_UP: {
                    const target = getAdjacentId(ids, fromId, key === KeyCode.ARROW_DOWN ? 1 : -1);
                    e.preventDefault();
                    if (target === undefined) {
                        return;
                    }
                    moveActiveTo(target);
                    if (e.shiftKey && currentSelection && multiple) {
                        currentSelection.extendTo(target, 'keyboard');
                    }
                    return;
                }
                case KeyCode.HOME:
                case KeyCode.END: {
                    const target = getEdgeId(ids, key === KeyCode.HOME ? 'first' : 'last');
                    e.preventDefault();
                    if (target === undefined) {
                        return;
                    }
                    moveActiveTo(target);
                    if (e.shiftKey && currentSelection && multiple) {
                        currentSelection.extendTo(target, 'keyboard');
                    }
                    return;
                }
                case KeyCode.SPACEBAR:
                case KeyCode.SPACEBAR_OLD: {
                    if (!currentSelection) {
                        return;
                    }
                    e.preventDefault();
                    if (actionableId === undefined) {
                        return;
                    }
                    if (multiple) {
                        currentSelection.toggle(actionableId, 'keyboard');
                    } else {
                        currentSelection.select(actionableId, 'keyboard');
                    }
                    return;
                }
                case KeyCode.ENTER: {
                    if (actionableId === undefined) {
                        return;
                    }
                    if (onItemActionRef.current) {
                        onItemActionRef.current(getItemContextRef.current(actionableId));
                        e.preventDefault();
                    } else if (currentSelection) {
                        currentSelection.select(actionableId, 'keyboard');
                        e.preventDefault();
                    }
                    return;
                }
                case KeyCode.ARROW_RIGHT:
                case KeyCode.ARROW_LEFT:
                    // Inline (horizontal) navigation is role-specific and RTL-aware — tree
                    // expand/collapse, grid cell entry — resolved via `resolveInlineArrow`. The
                    // listbox has no inline axis (APG), so the machine ignores these keys.
                    return;
                default:
                    break;
            }

            // Typeahead — a printable character with no command modifiers.
            if (typeaheadRef.current && key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                const {buffer, matchId} = resolveTypeahead(
                    ids,
                    getText,
                    typeaheadBufferRef.current,
                    key,
                    active,
                );
                typeaheadBufferRef.current = buffer;
                clearTimeout(typeaheadTimerRef.current);
                typeaheadTimerRef.current = setTimeout(() => {
                    typeaheadBufferRef.current = '';
                }, TYPEAHEAD_TIMEOUT);
                if (matchId !== undefined) {
                    moveActiveTo(matchId);
                }
            }
        },
        [moveActiveTo, getText],
    );

    const handleContainerFocus = React.useCallback(
        (e: React.FocusEvent<HTMLElement>) => {
            // Our own focus moves already set the active row — avoid a second (controlled) update.
            if (disabledRef.current || programmaticFocusRef.current) {
                return;
            }
            const id = getItemIdByElement(e.target);
            if (id !== undefined && stateRef.current.getItemType(id) === 'item') {
                setActive(id);
            }
        },
        [getItemIdByElement, setActive],
    );

    const handleItemClick = React.useCallback((id: string, e: React.MouseEvent) => {
        if (disabledRef.current) {
            return;
        }
        const currentState = stateRef.current;
        if (currentState.getItemType(id) !== 'item' || currentState.isDisabled(id)) {
            return;
        }
        const currentSelection = selectionRef.current;
        if (currentSelection) {
            if (currentSelection.mode === 'multiple') {
                if (e.shiftKey) {
                    currentSelection.extendTo(id, 'pointer');
                } else {
                    currentSelection.toggle(id, 'pointer');
                }
            } else {
                currentSelection.select(id, 'pointer');
            }
        } else {
            onItemActionRef.current?.(getItemContextRef.current(id));
        }
    }, []);

    const handleItemDoubleClick = React.useCallback((id: string) => {
        if (disabledRef.current) {
            return;
        }
        const currentState = stateRef.current;
        if (currentState.getItemType(id) !== 'item' || currentState.isDisabled(id)) {
            return;
        }
        onItemActionRef.current?.(getItemContextRef.current(id));
    }, []);

    const handleItemPointerEnter = React.useCallback(
        (id: string) => {
            if (disabledRef.current || activateOnHoverRef.current === false) {
                return;
            }
            if (stateRef.current.getItemType(id) !== 'item') {
                return;
            }
            setActive(id);
        },
        [setActive],
    );

    const handleItemPointerLeave = React.useCallback(
        (id: string) => {
            if (disabledRef.current || activateOnHoverRef.current !== 'reset-on-leave') {
                return;
            }
            if (activeRef.current === id) {
                setActive(undefined);
            }
        },
        [setActive],
    );

    const api = React.useMemo<ListApi>(
        () => ({
            focusItem,
            getActiveItemId: () => activeRef.current,
            setActiveItemId: (id) => setActive(id),
            scrollToItem: (id, opts) => {
                const el = elementById.current.get(id);
                if (!el) {
                    return;
                }
                const align = opts?.align ?? 'auto';
                el.scrollIntoView({block: align === 'auto' ? 'nearest' : align});
            },
            handleKeyDown: (e) => runKeyDown(e),
            getVisibleItems: () => {
                const s = stateRef.current;
                const rootIdx = new Map<string, number>();
                let rootIndex = 0;
                for (const id of s.visibleIds) {
                    if (s.getParentId(id) === undefined) {
                        rootIdx.set(id, rootIndex++);
                    }
                }
                return s.visibleIds.map((id) => {
                    const parentId = s.getParentId(id);
                    const index =
                        parentId === undefined
                            ? (rootIdx.get(id) ?? 0)
                            : (s.getChildrenIds(parentId)?.indexOf(id) ?? 0);
                    return {
                        id,
                        level: s.getLevel(id),
                        index,
                        parentId,
                        selfRect: elementById.current.get(id)?.getBoundingClientRect() ?? null,
                    };
                });
            },
            getItemIdByElement,
            getElementById: (id) => elementById.current.get(id) ?? null,
            expand: (id) => {
                const s = stateRef.current;
                if (s.isExpanded(id)) {
                    return;
                }
                s.setExpanded(id, true);
                if (s.getChildrenState(id) === 'lazy') {
                    onLoadChildrenRef.current?.(getItemContextRef.current(id));
                }
            },
            collapse: (id) => {
                stateRef.current.setExpanded(id, false);
            },
        }),
        [focusItem, setActive, runKeyDown, getItemIdByElement],
    );

    const itemRole: ListItemRole = ITEM_ROLE[role];

    const getItemContext = (id: string): ListItemContext<T> => {
        const item = state.getItemById(id) as T;
        const parentId = state.getParentId(id);
        const index =
            parentId === undefined
                ? (rootIndexMap.get(id) ?? 0)
                : (state.getChildrenIds(parentId)?.indexOf(id) ?? 0);
        const type = state.getItemType(id);
        const navigable = type === 'item';
        const itemDisabled = state.isDisabled(id);
        const hasChildren =
            state.getChildrenIds(id) !== undefined || state.getChildrenState(id) === 'lazy';
        const domId = buildItemDomId(listId, id);

        let itemProps: ListItemContext<T>['props'];
        if (navigable) {
            itemProps = {
                role: itemRole,
                id: domId,
                ref: getItemRef(id),
                tabIndex: !disabled && id === tabbableId ? 0 : -1,
            };
            if (selection) {
                itemProps['aria-selected'] = selection.isSelected(id);
            }
            if (itemDisabled) {
                itemProps['aria-disabled'] = true;
            }
            if (!disabled) {
                itemProps.onClick = (e) => handleItemClick(id, e);
                itemProps.onDoubleClick = () => handleItemDoubleClick(id);
                if (activateOnHover !== false) {
                    itemProps.onPointerEnter = () => handleItemPointerEnter(id);
                    if (activateOnHover === 'reset-on-leave') {
                        itemProps.onPointerLeave = () => handleItemPointerLeave(id);
                    }
                }
            }
        } else {
            // Section label / presentation row: transparent to navigation and selection.
            itemProps = {role: 'presentation', id: domId, ref: getItemRef(id)};
        }

        return {
            id,
            item,
            index,
            level: state.getLevel(id),
            parentId,
            state: {
                selected: selection ? selection.isSelected(id) : false,
                active: currentActive === id,
                disabled: itemDisabled,
                expanded: hasChildren ? state.isExpanded(id) : undefined,
                childrenState: state.getChildrenState(id),
            },
            props: itemProps,
            content: undefined,
            list: api,
        };
    };
    getItemContextRef.current = getItemContext;

    const containerProps: ListBehavior<T>['containerProps'] = {
        role,
        id: listId,
        ref: setContainerRef,
        onKeyDown: runKeyDown,
        onFocus: handleContainerFocus,
    };
    if (role === 'listbox' && selection?.mode === 'multiple') {
        containerProps['aria-multiselectable'] = true;
    }
    if (disabled) {
        containerProps['aria-disabled'] = true;
    }

    return {
        containerProps,
        getItemContext,
        virtualFocusTargetProps: undefined,
        api,
    };
}
