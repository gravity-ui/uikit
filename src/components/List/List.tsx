import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList as ListContainer} from 'react-window';
// react-sortable-hoc actually has exported members "sortableElement" and "sortableContainer"
// https://github.com/clauderic/react-sortable-hoc/blob/master/src/index.js#L5
// @ts-ignore
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {block} from '../utils/cn';
import {MobileContext} from '../mobile';
import {TextInput} from '../TextInput';
import {ListItem, SimpleContainer} from './components';
import type {ListProps, ListItemData, ListSortParams} from './types';

import './List.scss';

const b = block('list');
const SortableListItem = sortableElement(ListItem);
const SortableListContainer = sortableContainer(ListContainer, {withRef: true});
const SortableSimpleContainer = sortableContainer(SimpleContainer);

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

export class List<T = unknown> extends React.Component<ListProps<T>, ListState<T>> {
    static defaultProps: Partial<ListProps<ListItemData<unknown>>> = listDefaultProps;

    static moveListElement(list: ListItemData<unknown>[], oldIndex: number, newIndex: number) {
        if (oldIndex !== newIndex) {
            const [item] = list.splice(oldIndex, 1);
            list.splice(newIndex, 0, item);
        }

        return list;
    }

    static findNextIndex(list: ListItemData<unknown>[], index: number, step: number) {
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
        filter: '',
    };

    refFilter = React.createRef<HTMLInputElement | HTMLTextAreaElement>();
    refContainer = React.createRef<any>();
    blurTimer: NodeJS.Timeout | null = null;

    componentDidUpdate(prevProps: ListProps<T>) {
        if (this.props.items !== prevProps.items) {
            const filter = this.getFilter();
            const internalFiltering = filter && !this.props.onFilterUpdate;

            if (internalFiltering) {
                this.onUpdateFilterInternal(filter);
            } else {
                this.setState({items: this.props.items});
            }
        }
    }

    render() {
        const {emptyPlaceholder, virtualized, className, itemsClassName} = this.props;

        const {items} = this.state;

        return (
            <MobileContext.Consumer>
                {({mobile}) => (
                    <div
                        className={b({mobile}, className)}
                        tabIndex={-1}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onKeyDown={this.onKeyDown}
                    >
                        {this.renderFilter()}
                        <div
                            className={b('items', {virtualized}, itemsClassName)}
                            style={this.getItemsStyle()}
                            onMouseLeave={this.onMouseLeave}
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

    getActiveItem() {
        return typeof this.state.activeItem === 'number' ? this.state.activeItem : null;
    }

    activateItem(index?: number, scrollTo = true) {
        if (index && scrollTo) {
            this.scrollToIndex(index);
        }

        this.setState({activeItem: index});
    }

    onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        const {activeItem, pageSize} = this.state;

        switch (event.key) {
            case 'ArrowDown': {
                this.handleKeyMove(event, 1, -1);
                break;
            }
            case 'ArrowUp': {
                this.handleKeyMove(event, -1);
                break;
            }
            case 'PageDown': {
                this.handleKeyMove(event, pageSize!);
                break;
            }
            case 'PageUp': {
                this.handleKeyMove(event, -pageSize!);
                break;
            }
            case 'Home': {
                this.handleKeyMove(event, this.state.items.length - (activeItem || 0));
                break;
            }
            case 'End': {
                this.handleKeyMove(event, -(activeItem || 0) - 1);
                break;
            }
            case 'Enter': {
                if (activeItem && !isNaN(activeItem) && this.props.onItemClick) {
                    this.props.onItemClick(this.state.items[activeItem], activeItem, true);
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

    private getContainer() {
        const ref = this.refContainer.current;
        const wrappedInstance =
            ref &&
            'getWrappedInstance' in ref &&
            typeof ref.getWrappedInstance === 'function' &&
            ref.getWrappedInstance();

        return this.props.sortable ? wrappedInstance : ref;
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
        const container = this.getContainer();

        if (container) {
            container.scrollToItem(index);
        }
    };

    private deactivate = () => {
        if (this.props.deactivateOnLeave) {
            this.setState({activeItem: undefined});
        }
    };

    private handleKeyMove(event: React.KeyboardEvent, step: number, defaultItemIndex = 0) {
        event.preventDefault();
        const {activeItem = defaultItemIndex} = this.state;
        this.activateItem(List.findNextIndex(this.state.items, activeItem + step, Math.sign(step)));
    }

    private onFocus = () => {
        if (this.blurTimer) {
            clearTimeout(this.blurTimer);
            this.blurTimer = null;
        }
    };

    private onBlur = () => {
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

    private onItemMouseMove = (index: number) => {
        if (!this.state.sorting) {
            this.activateItem(index, false);
        }
    };

    private onMouseLeave = () => {
        this.deactivate();
    };

    private onSortStart = () => {
        this.setState({sorting: true});
    };

    private onSortEnd = (params: ListSortParams) => {
        if (this.props.onSortEnd) {
            this.props.onSortEnd(params);
        }

        this.setState({
            sorting: false,
            activeItem: params.newIndex,
        });
    };

    private getItemHeight = (index: number) => {
        const {itemHeight, virtualized} = this.props;

        if (typeof itemHeight === 'function') {
            const {items} = this.state;
            return itemHeight(items[index]);
        } else {
            return virtualized ? Number(itemHeight) || 28 : itemHeight;
        }
    };

    private renderItem = ({index, style}: {index: number; style?: React.CSSProperties}) => {
        const {sortHandleAlign} = this.props;
        const {items, activeItem} = this.state;
        const item = items[index];
        const sortable = this.props.sortable && items.length > 1 && !this.getFilter();
        const active = index === activeItem || index === this.props.activeItemIndex;
        const Item = sortable ? SortableListItem : ListItem;

        return (
            <Item
                key={index}
                style={style}
                index={index}
                itemIndex={index}
                item={item}
                sortable={sortable}
                sortHandleAlign={sortHandleAlign}
                renderItem={this.props.renderItem}
                itemClassName={this.props.itemClassName}
                active={active}
                selected={index === this.props.selectedItemIndex}
                onMouseMove={this.onItemMouseMove}
                onClick={this.props.onItemClick}
            />
        );
    };

    private renderFilter() {
        const {
            size,
            filterable,
            filter = this.state.filter,
            filterPlaceholder,
            filterClassName = '',
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
                />
            </div>
        );
    }

    private renderSimpleContainer() {
        const {sortable} = this.props;
        const {items} = this.state;
        const Container = sortable ? SortableSimpleContainer : SimpleContainer;

        return (
            <Container
                helperClass={b('item', {sorting: true})}
                distance={5}
                lockAxis="y"
                onSortStart={this.onSortStart}
                onSortEnd={this.onSortEnd}
                itemCount={items.length}
                ref={this.refContainer}
            >
                {items.map((_item, index) =>
                    this.renderItem({index, style: {height: this.getItemHeight(index)}}),
                )}
            </Container>
        );
    }

    private renderVirtualizedContainer() {
        const {sortable, activeItemIndex} = this.props;
        const {items, activeItem} = this.state;
        const Container = sortable ? SortableListContainer : ListContainer;

        return (
            <AutoSizer>
                {({width, height}) => (
                    <Container
                        ref={this.refContainer}
                        width={width}
                        height={height}
                        itemSize={this.getItemHeight}
                        itemData={items}
                        itemCount={items.length}
                        activeItem={activeItem}
                        activeItemIndex={activeItemIndex}
                        overscanCount={10}
                        helperClass={b('item', {sorting: true})}
                        distance={5}
                        lockAxis="y"
                        onItemsRendered={this.onItemsRendered}
                        onSortStart={this.onSortStart}
                        onSortEnd={this.onSortEnd}
                    >
                        {this.renderItem}
                    </Container>
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
}
