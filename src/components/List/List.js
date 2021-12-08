import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList as ListContainer} from 'react-window';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {block} from '../utils/cn';
import {TextInput} from '../TextInput';
import {SimpleContainer} from './SimpleContainer';
import {DragHandleIcon} from './DragHandleIcon';
import {MobileContext} from '../mobile';

import './List.scss';

const b = block('list');

export class ListItem extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        itemIndex: PropTypes.number,
        itemClassName: PropTypes.string,
        item: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
        sortable: PropTypes.bool,
        sortHandleAlign: PropTypes.oneOf(['left', 'right']),
        active: PropTypes.bool,
        selected: PropTypes.bool,

        renderItem: PropTypes.func,
        onMouseMove: PropTypes.func,
        onClick: PropTypes.func,
    };
    static defaultProps = {
        renderItem: (item) => String(item),
    };
    ref = React.createRef();
    onMouseMove = () => {
        if (this.props.onMouseMove) {
            this.props.onMouseMove(this.props.itemIndex, this.props.item);
        }
    };
    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.item, this.props.itemIndex);
        }
    };
    getRef = () => this.ref;
    renderSortIcon() {
        const {sortable} = this.props;
        return sortable ? (
            <div className={b('item-sort-icon')}>
                <DragHandleIcon />
            </div>
        ) : null;
    }
    renderContent() {
        const {renderItem, item, active, itemIndex} = this.props;
        return <div className={b('item-content')}>{renderItem(item, active, itemIndex)}</div>;
    }
    render() {
        const {item, style, sortable, sortHandleAlign, itemClassName, selected, active} =
            this.props;
        return (
            <div
                className={b(
                    'item',
                    {
                        sortable,
                        active,
                        selected,
                        inactive: item.disabled,
                        'sort-handle-align': sortHandleAlign,
                    },
                    itemClassName,
                )}
                style={style}
                onClick={this.onClick}
                onMouseMove={this.onMouseMove}
                ref={this.ref}
            >
                {this.renderSortIcon()}
                {this.renderContent()}
            </div>
        );
    }
}

const SortableListItem = sortableElement(ListItem);
const SortableListContainer = sortableContainer(ListContainer, {withRef: true});

const SortableSimpleContainer = sortableContainer(SimpleContainer);

export const listDefaultProps = {
    items: [],
    itemClassName: '',

    filterable: true,
    sortable: false,
    virtualized: true,

    deactivateOnLeave: true,
};

export class List extends React.Component {
    static moveListElement(list, oldIndex, newIndex) {
        if (oldIndex !== newIndex) {
            const [item] = list.splice(oldIndex, 1);
            list.splice(newIndex, 0, item);
        }
        return list;
    }
    static findNextIndex(list, index, step) {
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
    static propTypes = {
        items: PropTypes.array.isRequired,
        itemHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        itemsHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        itemClassName: PropTypes.string,

        theme: PropTypes.string,
        view: PropTypes.string,
        tone: PropTypes.string,
        size: PropTypes.string,
        itemsClassName: PropTypes.string,
        className: PropTypes.string,

        renderItem: PropTypes.func,
        filterItem: PropTypes.func,
        onFilterEnd: PropTypes.func,

        filterable: PropTypes.bool,
        filter: PropTypes.string,
        filterPlaceholder: PropTypes.string,
        emptyPlaceholder: PropTypes.string,
        filterClassName: PropTypes.string,
        onFilterUpdate: PropTypes.func,

        virtualized: PropTypes.bool,
        sortable: PropTypes.bool,
        sortHandleAlign: PropTypes.oneOf(['left', 'right']),
        onSortEnd: PropTypes.func,

        deactivateOnLeave: PropTypes.bool,
        activeItemIndex: PropTypes.number,
        selectedItemIndex: PropTypes.number,

        onItemClick: PropTypes.func,
    };
    static defaultProps = listDefaultProps;

    state = {
        items: this.props.items,
        filter: '',
    };
    componentDidUpdate(prevProps) {
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

    refFilter = React.createRef();
    refContainer = React.createRef();
    getContainer() {
        const ref = this.refContainer.current;
        return this.props.sortable ? ref && ref.getWrappedInstance() : ref;
    }

    getActiveItem() {
        return typeof this.state.activeItem === 'number' ? this.state.activeItem : null;
    }

    filterItem = (filter) => (item) => {
        return String(item).includes(filter);
    };
    getItems() {
        return this.state.items;
    }
    getFilter() {
        const {filter = this.state.filter} = this.props;
        return filter;
    }
    getItemsStyle() {
        let {itemsHeight} = this.props;
        if (typeof itemsHeight === 'function') {
            itemsHeight = itemsHeight(this.state.items);
        }
        return itemsHeight ? {height: itemsHeight} : undefined;
    }
    scrollToIndex = (index) => {
        const container = this.getContainer();
        if (container) {
            container.scrollToItem(index);
        }
    };
    activateItem(index, scrollTo = true) {
        if (scrollTo) {
            this.scrollToIndex(index);
        }
        this.setState({activeItem: index});
    }
    deactivate = () => {
        if (this.props.deactivateOnLeave) {
            this.setState({activeItem: undefined});
        }
    };
    handleKeyMove(event, step, defaultItemIndex = 0) {
        event.preventDefault();
        const {activeItem = defaultItemIndex} = this.state;
        this.activateItem(List.findNextIndex(this.state.items, activeItem + step, Math.sign(step)));
    }
    onKeyDown = (event) => {
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
                this.handleKeyMove(event, pageSize);
                break;
            }
            case 'PageUp': {
                this.handleKeyMove(event, -pageSize);
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
                if (!isNaN(activeItem) && this.props.onItemClick) {
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
    onFocus = () => {
        if (this.blurTimer) {
            clearTimeout(this.blurTimer);
            this.blurTimer = null;
        }
    };
    onBlur = () => {
        if (!this.blurTimer) {
            this.blurTimer = setTimeout(this.deactivate, 50);
        }
    };
    onUpdateFilterInternal = (value) => {
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
    onFilterUpdate = (value) => {
        if (this.props.onFilterUpdate) {
            this.props.onFilterUpdate(value);
        } else {
            this.onUpdateFilterInternal(value);
        }
    };
    onItemsRendered = ({visibleStartIndex, visibleStopIndex}) => {
        this.setState({
            visibleStartIndex,
            visibleStopIndex,
            pageSize: visibleStopIndex - visibleStartIndex,
        });
    };
    onItemMouseMove = (index) => {
        if (!this.state.sorting) {
            this.activateItem(index, false);
        }
    };
    onMouseLeave = () => {
        this.deactivate();
    };
    onSortStart = () => {
        this.setState({sorting: true});
    };
    onSortEnd = (param) => {
        if (this.props.onSortEnd) {
            this.props.onSortEnd(param);
        }
        this.setState({
            sorting: false,
            activeItem: param.newIndex,
        });
    };
    getItemHeight = (index) => {
        const {itemHeight, virtualized} = this.props;
        if (typeof itemHeight === 'function') {
            const {items} = this.state;
            return itemHeight(items[index]);
        } else {
            return virtualized ? Number(itemHeight) || 28 : itemHeight;
        }
    };
    renderItem = ({index, style}) => {
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
    renderFilter() {
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
    renderSimpleContainer() {
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
                {items.map((item, index) =>
                    this.renderItem({index, style: {height: this.getItemHeight(index)}}),
                )}
            </Container>
        );
    }
    renderVirtualizedContainer() {
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
    renderItems() {
        if (this.props.virtualized) {
            return this.renderVirtualizedContainer();
        } else {
            return this.renderSimpleContainer();
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
}
