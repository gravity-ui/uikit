import React from 'react';
import {block} from '../../utils/cn';
import {eventBroker} from '../../utils/event-broker';
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
    onActivate: (index?: number) => void;
    renderItem?: ListProps<T>['renderItem'];
    onClick?: ListProps<T>['onItemClick'];
};

const defaultRenderItem = <T extends unknown>(item: T) => String(item);

export class ListItem<T = unknown> extends React.Component<ListItemProps<T>> {
    private static publishEvent = eventBroker.withEventPublisher('List');

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
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
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

    private onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        ListItem.publishEvent({
            domEvent: event,
            eventId: 'click',
        });
        this.props.onClick?.(this.props.item, this.props.itemIndex);
    };

    private onMouseEnter = () => this.props.onActivate(this.props.itemIndex);

    private onMouseLeave = () => this.props.onActivate(undefined);
}
