import React from 'react';

import type {
    ListItemId,
    ListItemType,
    ListProviderProps,
    SetActiveItem,
    SetGroupState,
} from '../../types';
import {findNextIndex} from '../../utils/findNextIndex';
import {scrollToItem} from '../../utils/scrollToItem';
import {ListContext} from '../ListContext/ListContext';

import {useDisabledState} from './useDisabledState';
import {useFilterControlledState} from './useFilterControlledState';
import {useGroupsExpandedState} from './useGroupsExpandedState';
import {useItemsControlledState} from './useItemsControlledState';
import {usePreparedItemsState} from './usePreparedItemsState';
import {useSelectedState} from './useSelectedState';

export function ListProvider<T>({
    children,
    items: originalItems,
    size = 'm',
    disabled: outerDisabledState,
    expandedState: outerExpandedState,
    initialActiveItemId,
    onItemClick: _onItemClick,
    selected: userSelectedState,
    onGroupItemClick: _onGroupItemClick,
    selectable,
    filter: userControlledFilterValue,
}: ListProviderProps<T>) {
    const filterRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);

    const [disabled, setDisabled] = useDisabledState(outerDisabledState);
    const [selected, setSelected] = useSelectedState(userSelectedState);
    const [filter, setFilter] = useFilterControlledState(userControlledFilterValue);
    const [expandedState, setGroupState] = useGroupsExpandedState(outerExpandedState);

    const [activeItem, setActiveItem] = React.useState<ListItemId | null>(() => {
        if (initialActiveItemId && initialActiveItemId in byId) {
            return initialActiveItemId;
        }

        return null;
    });
    const [_items, setItems] = useItemsControlledState(originalItems);

    const formatInternalItems = React.useCallback(
        (formatFn?: (items: ListItemType<T>[]) => ListItemType<T>[]) => {
            if (formatFn) {
                setItems(formatFn(originalItems));
            }
        },
        [originalItems, setItems],
    );

    const [{order, byId, groupsState, itemsState}] = usePreparedItemsState<T>(
        _items,
        expandedState,
    );

    const itemHandlers = React.useMemo(() => {
        return (id: ListItemId) => ({
            onMouseEnter: () => setActiveItem(id),
            onMouseLeave: () => setActiveItem(null),
        });
    }, [setActiveItem]);

    const _activateItem = React.useCallback(
        (index?: number, scrollTo = true) => {
            if (typeof index === 'number' && order[index]) {
                if (scrollTo) {
                    scrollToItem(order[index], containerRef.current ?? undefined);
                }

                setActiveItem(order[index]);
            }
        },
        [order],
    );

    const handleKeyMove = React.useCallback(
        (event: React.KeyboardEvent, step: number, defaultItemIndex = 0) => {
            event.preventDefault();
            const notSureIndex = order.findIndex((i) => i === activeItem);
            const index = (notSureIndex > -1 ? notSureIndex : defaultItemIndex) + step;
            _activateItem(
                findNextIndex({
                    list: order,
                    index,
                    step: Math.sign(step),
                    disabledItems: disabled,
                }),
            );
        },
        [_activateItem, activeItem, order, disabled],
    );

    const onGroupItemClick = React.useCallback(
        (id: ListItemId, fromKeyboard = false) => {
            if (_onGroupItemClick) {
                _onGroupItemClick(byId[id], id, fromKeyboard);
            } else {
                setGroupState((x) => {
                    return {
                        ...x,
                        [id]: typeof x[id] === 'undefined' ? false : !x[id],
                    };
                });
            }
        },
        [_onGroupItemClick, byId, setGroupState],
    );

    const onItemClick = React.useMemo(() => {
        if (_onItemClick) {
            return (id: ListItemId, fromKeyboard = false) => {
                _onItemClick(byId[id], id, fromKeyboard);
            };
        }

        if (selectable) {
            return (id: ListItemId, _fromKeyboard = false) => {
                setSelected((x) =>
                    selectable === 'multiple'
                        ? {
                              ...x,
                              [id]: !x[id],
                          }
                        : {[id]: !x[id]},
                );
            };
        }

        return undefined;
    }, [selectable, _onItemClick, byId, setSelected]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLUListElement | HTMLDivElement>) => {
            switch (event.key) {
                case 'ArrowDown': {
                    handleKeyMove(event, 1, -1);
                    break;
                }
                case 'ArrowUp': {
                    handleKeyMove(event, -1);
                    break;
                }
                case ' ':
                case 'Enter': {
                    if (activeItem && !disabled[activeItem]) {
                        event.preventDefault();
                        // user try to control groups state outside
                        if (activeItem in groupsState) {
                            onGroupItemClick(activeItem, true);
                        } else {
                            onItemClick?.(activeItem, true);
                        }
                    }
                    break;
                }
                default: {
                    if (filterRef.current) {
                        filterRef.current.focus();
                    }
                }
            }
        },
        [onGroupItemClick, activeItem, groupsState, handleKeyMove, onItemClick, disabled],
    );

    return (
        <ListContext.Provider
            value={{
                itemHandlers,
                activeItem,
                size,
                handleKeyDown,
                containerRef,
                listRef,
                filterRef,
                setActiveItem: setActiveItem as SetActiveItem,
                byId,
                order,
                groupsState,
                formatInternalItems,
                filter,
                setFilter,
                expandedState,
                setSelected,
                setGroupState: setGroupState as SetGroupState,
                onItemClick,
                selected,
                onGroupItemClick,
                itemsState,
                disabled,
                setDisabled,
            }}
        >
            {children}
        </ListContext.Provider>
    );
}
