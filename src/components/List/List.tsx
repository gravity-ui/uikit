'use client';

import * as React from 'react';

import type {
    DraggableProvided,
    DraggableRubric,
    DraggableStateSnapshot,
    DropResult,
    DroppableProvided,
} from '@hello-pangea/dnd';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import type {Size} from 'react-virtualized-auto-sizer';
import AutoSizer from 'react-virtualized-auto-sizer';
import type {VariableSizeListProps} from 'react-window';
import {VariableSizeList} from 'react-window';

import {KeyCode} from '../../constants';
import {TextInput} from '../controls';
import {MobileContext} from '../mobile';
import {useDirection} from '../theme';
import {block} from '../utils/cn';
import {getUniqId} from '../utils/common';

import {ListLoadingIndicator} from './ListLoadingIndicator';
import {ListItem, SimpleContainer, defaultRenderItem} from './components';
import {listNavigationIgnoredKeys} from './constants';
import type {ListItemData, ListItemProps, ListProps} from './types';

import './List.scss';

const b = block('list');
const DEFAULT_ITEM_HEIGHT = 28;
const DEFAULT_PAGE_SIZE = 10;

type ListState<T> = {
    items: ListProps<T>['items'];
    filter: string;
    activeItem?: number;
    pageSize?: number;
    sorting?: boolean;
};

export const listDefaultProps: Partial<ListProps<ListItemData<unknown>>> = {
    items: [],
    itemClassName: '',
    filterable: true,
    sortable: false,
    virtualized: true,
    deactivateOnLeave: true,
};

const reorder = <T extends unknown>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const ListContainer = React.forwardRef<VariableSizeList, VariableSizeListProps>((props, ref) => {
    return <VariableSizeList ref={ref} {...props} direction={useDirection()} />;
});
ListContainer.displayName = 'ListContainer';

export class List<T = unknown> extends React.Component<ListProps<T>, ListState<T>> {
    static defaultProps: Partial<ListProps<ListItemData<unknown>>> = listDefaultProps;

    static moveListElement<T = unknown>(
        list: ListItemData<T>[],
        oldIndex: number,
        newIndex: number,
    ) {
        if (oldIndex !== newIndex) {
            const [item] = list.splice(oldIndex, 1);
            list.splice(newIndex, 0, item);
        }

        return list;
    }

    static findNextIndex<T = unknown>(list: ListItemData<T>[], index: number, step: number) {
        const dataLength = list.length;
        let currentIndex = (index + dataLength) % dataLength;

        for (let i = 0; i < dataLength; i += 1) {
            if (list[currentIndex] && !list[currentIndex].disabled) {
                return currentIndex;
            }
            currentIndex = (currentIndex + dataLength + step) % dataLength;
        }

        return undefined;
    }

    state: ListState<T> = {
        items: this.props.items,
        activeItem: this.props.activeItemIndex,
        filter: '',
    };

    refFilter = React.createRef<HTMLInputElement>();
    refContainer = React.createRef<any>();
    blurTimer: ReturnType<typeof setTimeout> | null = null;
    loadingItem = {value: '__LIST_ITEM_LOADING__', disabled: false} as unknown as ListItemData<
        T & {value: string}
    >;
    uniqId = getUniqId();

    componentDidMount(): void {
        this.activateItem(this.props.activeItemIndex, true);
    }

    componentDidUpdate(prevProps: ListProps<T>, prevState: ListState<T>) {
        if (!isEqual(this.props.items, prevProps.items)) {
            const filter = this.getFilter();
            const internalFiltering = filter && !this.props.onFilterUpdate;

            if (internalFiltering) {
                this.onUpdateFilterInternal(filter);
            } else {
                this.setState({items: this.props.items});
            }
        }

        if (this.props.activeItemIndex !== prevProps.activeItemIndex) {
            this.activateItem(this.props.activeItemIndex);
        }

        if (this.props.onChangeActive && this.state.activeItem !== prevState.activeItem) {
            this.props.onChangeActive(this.state.activeItem);
        }
    }

    componentWillUnmount() {
        this.blurTimer = null;
    }

    render() {
        const {
            id,
            emptyPlaceholder,
            virtualized,
            className,
            itemsClassName,
            qa,
            role = 'list',
        } = this.props;

        const {items} = this.state;

        return (
            <MobileContext.Consumer>
                {({mobile}) => (
                    // The event handler should only be used to capture bubbled events
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        className={b({mobile}, className)}
                        data-qa={qa}
                        tabIndex={-1}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onKeyDown={this.onKeyDown}
                    >
                        {this.renderFilter()}
                        <div
                            id={id}
                            className={b('items', {virtualized}, itemsClassName)}
                            style={this.getItemsStyle()}
                            onMouseLeave={this.onMouseLeave}
                            role={role}
                        >
                            {this.renderItems()}
                            {items.length === 0 && Boolean(emptyPlaceholder) && (
                                <div className={b('empty-placeholder')}>{emptyPlaceholder}</div>
                            )}
                        </div>
                    </div>
                )}
            </MobileContext.Consumer>
        );
    }

    getItems() {
        return this.state.items;
    }

    getItemsWithLoading() {
        if (this.props.sortable) {
            return this.getItems();
        }

        return this.props.loading ? [...this.state.items, this.loadingItem] : this.getItems();
    }

    getActiveItem() {
        return typeof this.state.activeItem === 'number' ? this.state.activeItem : null;
    }

    activateItem(index?: number, scrollTo = true) {
        this.setState({activeItem: index}, () => {
            if (typeof index === 'number' && scrollTo) {
                this.scrollToIndex(index);
            }
        });
    }

    onKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
        const {activeItem, pageSize} = this.state;

        if (listNavigationIgnoredKeys.includes(event.key)) {
            return;
        }

        const isInputTarget = event.target instanceof HTMLInputElement;

        switch (event.key) {
            case KeyCode.ARROW_DOWN: {
                this.handleKeyMove(event, 1, -1);
                break;
            }
            case KeyCode.ARROW_UP: {
                this.handleKeyMove(event, -1);
                break;
            }
            case KeyCode.PAGE_DOWN: {
                this.handleKeyMove(event, pageSize ?? DEFAULT_PAGE_SIZE);
                break;
            }
            case KeyCode.PAGE_UP: {
                this.handleKeyMove(event, -(pageSize ?? DEFAULT_PAGE_SIZE));
                break;
            }
            case KeyCode.HOME: {
                // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
                // ... if the combobox is editable, returns focus to the combobox and places the cursor on the first character (c)
                if (isInputTarget) {
                    return;
                }

                this.handleKeyMove(event, this.state.items.length - (activeItem || 0));
                break;
            }
            case KeyCode.END: {
                // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
                // ... if the combobox is editable, returns focus to the combobox and places the cursor after the last character (c)
                if (isInputTarget) {
                    return;
                }

                this.handleKeyMove(event, -(activeItem || 0) - 1);
                break;
            }
            case KeyCode.ENTER: {
                if (typeof activeItem === 'number' && this.props.onItemClick) {
                    this.props.onItemClick(this.state.items[activeItem], activeItem, true, event);
                }
                break;
            }
            default: {
                if (this.refFilter.current) {
                    this.refFilter.current.focus();
                }
            }
        }
    };

    private renderItemContent: ListItemProps<T>['renderItem'] = (item, isItemActive, itemIndex) => {
        const {onLoadMore} = this.props;

        if (isObject(item) && 'value' in item && item.value === this.loadingItem.value) {
            return <ListLoadingIndicator onIntersect={itemIndex === 0 ? undefined : onLoadMore} />;
        }

        return this.props.renderItem
            ? this.props.renderItem(item, isItemActive, itemIndex)
            : defaultRenderItem(item);
    };

    private renderItem = ({
        index,
        style,
        height,
        provided,
        isDragging,
    }: {
        index: number;
        style?: React.CSSProperties;
        provided?: DraggableProvided;
        isDragging?: boolean;
        height?: number;
    }) => {
        const {sortHandleAlign, role} = this.props;
        const {items, activeItem} = this.state;
        const item = this.getItemsWithLoading()[index];
        const sortable = this.props.sortable && items.length > 1 && !this.getFilter();
        const active = index === activeItem || index === this.props.activeItemIndex;
        const selected = Array.isArray(this.props.selectedItemIndex)
            ? this.props.selectedItemIndex.includes(index)
            : index === this.props.selectedItemIndex;

        return (
            <ListItem
                key={index}
                style={style}
                height={height}
                itemIndex={index}
                item={item}
                sortable={sortable}
                sortHandleAlign={sortHandleAlign}
                renderItem={this.renderItemContent}
                itemClassName={this.props.itemClassName}
                active={active}
                selected={selected}
                onActivate={this.onItemActivate}
                onClick={this.props.onItemClick}
                role={role === 'listbox' ? 'option' : 'listitem'}
                listId={this.props.id ?? this.uniqId}
                provided={provided}
                isDragging={isDragging}
            />
        );
    };

    private renderVirtualizedItem = ({
        index,
        style,
    }: {
        index: number;
        style?: React.CSSProperties;
    }) => {
        return (
            <Draggable draggableId={String(index)} index={index} key={`item-key-${index}`}>
                {(provided: DraggableProvided) => this.renderItem({index, style, provided})}
            </Draggable>
        );
    };

    private renderFilter() {
        const {
            size,
            filterable,
            filter = this.state.filter,
            filterPlaceholder,
            filterClassName = '',
            autoFocus,
        } = this.props;

        if (!filterable) {
            return null;
        }

        return (
            <div className={b('filter', filterClassName)}>
                <TextInput
                    controlRef={this.refFilter}
                    size={size}
                    placeholder={filterPlaceholder}
                    value={filter}
                    hasClear={true}
                    onUpdate={this.onFilterUpdate}
                    autoFocus={autoFocus}
                />
            </div>
        );
    }

    private renderSimpleContainer() {
        const {sortable} = this.props;
        const items = this.getItemsWithLoading();

        if (sortable) {
            return (
                <DragDropContext onDragStart={this.onSortStart} onDragEnd={this.onSortEnd}>
                    <Droppable
                        droppableId="droppable"
                        renderClone={(
                            provided: DraggableProvided,
                            snapshot: DraggableStateSnapshot,
                            rubric: DraggableRubric,
                        ) => {
                            return this.renderItem({
                                index: rubric.source.index,
                                provided,
                                isDragging: snapshot.isDragging,
                            });
                        }}
                    >
                        {(droppableProvided: DroppableProvided) => (
                            <SimpleContainer
                                ref={this.refContainer}
                                itemCount={items.length}
                                provided={droppableProvided}
                                onScrollToItem={this.props.onScrollToItem}
                            >
                                {items.map((_item, index) => {
                                    return (
                                        <Draggable
                                            draggableId={String(index)}
                                            index={index}
                                            key={`item-key-${index}`}
                                        >
                                            {(
                                                provided: DraggableProvided,
                                                snapshot: DraggableStateSnapshot,
                                            ) => {
                                                return this.renderItem({
                                                    index,
                                                    isDragging: snapshot.isDragging,
                                                    provided,
                                                    height: this.getItemHeight(index),
                                                });
                                            }}
                                        </Draggable>
                                    );
                                })}
                            </SimpleContainer>
                        )}
                    </Droppable>
                </DragDropContext>
            );
        }

        return (
            <SimpleContainer
                itemCount={items.length}
                ref={this.refContainer}
                onScrollToItem={this.props.onScrollToItem}
            >
                {items.map((_item, index) =>
                    this.renderItem({index, height: this.getItemHeight(index)}),
                )}
            </SimpleContainer>
        );
    }

    private renderVirtualizedContainer() {
        // Otherwise, react-window will not update the list items
        const items = [...this.getItemsWithLoading()];

        if (this.props.sortable) {
            return (
                <DragDropContext onDragStart={this.onSortStart} onDragEnd={this.onSortEnd}>
                    <Droppable
                        droppableId="droppable"
                        mode="virtual"
                        renderClone={(
                            provided: DraggableProvided,
                            snapshot: DraggableStateSnapshot,
                            rubric: DraggableRubric,
                        ) => {
                            return this.renderItem({
                                index: rubric.source.index,
                                provided,
                                isDragging: snapshot.isDragging,
                            });
                        }}
                    >
                        {(droppableProvided: DroppableProvided) => (
                            <AutoSizer>
                                {({width, height}: Size) => (
                                    <ListContainer
                                        ref={this.refContainer}
                                        outerRef={droppableProvided.innerRef}
                                        width={width}
                                        height={height}
                                        itemSize={this.getVirtualizedItemHeight}
                                        itemData={items}
                                        itemCount={items.length}
                                        overscanCount={10}
                                        onItemsRendered={this.onItemsRendered}
                                        // this property used to rerender items in viewport
                                        // must be last, typescript skips checks for all props behind ts-ignore/ts-expect-error
                                        // @ts-expect-error
                                        activeItem={this.state.activeItem}
                                    >
                                        {this.renderVirtualizedItem}
                                    </ListContainer>
                                )}
                            </AutoSizer>
                        )}
                    </Droppable>
                </DragDropContext>
            );
        }

        return (
            <AutoSizer>
                {({width, height}: Size) => (
                    <ListContainer
                        ref={this.refContainer}
                        width={width}
                        height={height}
                        itemSize={this.getVirtualizedItemHeight}
                        itemData={items}
                        itemCount={items.length}
                        overscanCount={10}
                        onItemsRendered={this.onItemsRendered}
                        // this property used to rerender items in viewport
                        // must be last, typescript skips checks for all props behind ts-ignore/ts-expect-error
                        // @ts-expect-error
                        activeItem={this.state.activeItem}
                    >
                        {this.renderItem}
                    </ListContainer>
                )}
            </AutoSizer>
        );
    }

    private renderItems() {
        if (this.props.virtualized) {
            return this.renderVirtualizedContainer();
        } else {
            return this.renderSimpleContainer();
        }
    }

    private filterItem = (filter: string) => (item: ListItemData<T>) => {
        return String(item).includes(filter);
    };

    private getFilter() {
        const {filter = this.state.filter} = this.props;
        return filter;
    }

    private getItemsStyle() {
        let {itemsHeight} = this.props;

        if (typeof itemsHeight === 'function') {
            itemsHeight = itemsHeight(this.state.items);
        }

        return itemsHeight ? {height: itemsHeight} : undefined;
    }

    private scrollToIndex = (index: number) => {
        const container = this.refContainer.current;

        if (container) {
            container.scrollToItem(index);
        }
    };

    private deactivate = () => {
        if (!this.blurTimer) {
            return;
        }
        this.blurTimer = null;
        if (this.props.deactivateOnLeave) {
            this.setState({activeItem: undefined});
        }
    };

    private handleKeyMove(event: React.KeyboardEvent, step: number, defaultItemIndex = 0) {
        const {activeItem = defaultItemIndex} = this.state;

        event.preventDefault();

        const items = this.getItemsWithLoading();

        this.activateItem(List.findNextIndex<T>(items, activeItem + step, Math.sign(step)));
    }

    private handleFocus = () => {
        if (this.blurTimer) {
            clearTimeout(this.blurTimer);
            this.blurTimer = null;
        }
    };

    private handleBlur = () => {
        if (!this.blurTimer) {
            this.blurTimer = setTimeout(this.deactivate, 50);
        }
    };

    private onUpdateFilterInternal = (value: string) => {
        const {items, filterItem = this.filterItem, onFilterEnd} = this.props;
        this.setState(
            {
                filter: value,
                items: value ? items.filter(filterItem(value)) : items,
            },
            () => {
                if (onFilterEnd) {
                    onFilterEnd({items: this.state.items});
                }
            },
        );
    };

    private onFilterUpdate = (value: string) => {
        if (this.props.onFilterUpdate) {
            this.props.onFilterUpdate(value);
        } else {
            this.onUpdateFilterInternal(value);
        }
    };

    private onItemsRendered = ({
        visibleStartIndex,
        visibleStopIndex,
    }: {
        visibleStartIndex: number;
        visibleStopIndex: number;
    }) => {
        this.setState({
            pageSize: visibleStopIndex - visibleStartIndex,
        });
    };

    private onItemActivate = (index?: number) => {
        if (!this.state.sorting) {
            this.activateItem(index, false);
        }
    };

    private onMouseLeave = () => {
        this.handleBlur();
    };

    private onSortStart = () => {
        this.setState({sorting: true});
    };

    private onSortEnd = (result: DropResult) => {
        if (!result.destination) {
            this.setState({sorting: false});
            return;
        }

        if (result.source.index === result.destination.index) {
            this.setState({sorting: false});
            return;
        }

        const oldIndex = result.source.index;
        const newIndex = result.destination.index;

        if (this.props.onSortEnd) {
            this.props.onSortEnd({oldIndex, newIndex});
        }

        const nextItems = reorder(this.getItems(), oldIndex, newIndex);

        this.setState({
            activeItem: newIndex,
            items: nextItems,
            sorting: false,
        });
    };

    private getItemHeight = (index: number) => {
        const {itemHeight} = this.props;

        if (typeof itemHeight === 'function') {
            const {items} = this.state;
            return itemHeight(items[index], index);
        }
        return itemHeight;
    };

    private getVirtualizedItemHeight = (index: number) => {
        return this.getItemHeight(index) || DEFAULT_ITEM_HEIGHT;
    };
}
