import React from 'react';
import {block} from '../../utils/cn';
import {DragHandleIcon} from './DragHandleIcon';
import type {ListProps, ListItemData, ListSortHandleAlign} from '../types';

const b = block('list');

type ListItemProps<T> = {
    item: ListItemData<T>;
    itemIndex: number;
    active: boolean;
    selected: boolean;
    itemClassName?: string;
    sortable?: boolean;
    sortHandleAlign?: ListSortHandleAlign;
    style?: React.CSSProperties;
    renderItem?: ListProps<T>['renderItem'];
    onClick?: ListProps<T>['onItemClick'];
    onMouseMove?: (index: number) => void;
};

const defaultRenderItem = <T extends unknown>(item: T) => String(item);

export class ListItem<T = unknown> extends React.Component<ListItemProps<T>> {
    ref = React.createRef<HTMLDivElement>();

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

    getRef = () => this.ref;

    private renderSortIcon() {
        const {sortable} = this.props;
        return sortable ? (
            <div className={b('item-sort-icon')}>
                <DragHandleIcon />
            </div>
        ) : null;
    }

    private renderContent() {
        const {renderItem = defaultRenderItem, item, active, itemIndex} = this.props;
        return <div className={b('item-content')}>{renderItem(item, active, itemIndex)}</div>;
    }

    private onClick = () => this.props.onClick?.(this.props.item, this.props.itemIndex);

    private onMouseMove = () => this.props.onMouseMove?.(this.props.itemIndex);
}
