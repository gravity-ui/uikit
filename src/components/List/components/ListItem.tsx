import React from 'react';

import {block} from '../../utils/cn';
import {eventBroker} from '../../utils/event-broker';
import {ListQa} from '../constants';
import type {ListItemProps} from '../types';

import {DragHandleIcon} from './DragHandleIcon';

const b = block('list');

const defaultRenderItem = <T extends unknown>(item: T) => String(item);

export class ListItem<T = unknown> extends React.Component<ListItemProps<T>> {
    private static publishEvent = eventBroker.withEventPublisher('List');

    ref = React.createRef<HTMLDivElement>();

    render() {
        const {item, style, sortable, sortHandleAlign, itemClassName, selected, active} =
            this.props;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                role="listitem"
                data-qa={active ? ListQa.ACTIVE_ITEM : undefined}
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
                onClick={item.disabled ? undefined : this.onClick}
                onClickCapture={item.disabled ? undefined : this.onClickCapture}
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

    private onClick = () => this.props.onClick?.(this.props.item, this.props.itemIndex);

    private onClickCapture: React.MouseEventHandler<HTMLDivElement> = (event) => {
        ListItem.publishEvent({
            domEvent: event,
            eventId: 'click',
        });
    };

    private onMouseEnter = () =>
        !this.props.item.disabled && this.props.onActivate(this.props.itemIndex);

    private onMouseLeave = () => this.props.onActivate(undefined);
}
