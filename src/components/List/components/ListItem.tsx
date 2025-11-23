'use client';

import * as React from 'react';

import {Grip} from '@gravity-ui/icons';
import type {DraggableProvided} from '@hello-pangea/dnd';

import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import {eventBroker} from '../../utils/event-broker';
import {ListQa} from '../constants';
import type {ListItemProps} from '../types';

const b = block('list');

export const defaultRenderItem = <T extends unknown>(item: T) => String(item);

function getStyle(provided?: DraggableProvided, style?: React.CSSProperties) {
    if (!style) {
        return provided?.draggableProps.style;
    }

    return {
        ...provided?.draggableProps.style,
        ...style,
    };
}

export class ListItem<T = unknown> extends React.Component<ListItemProps<T>> {
    private static publishEvent = eventBroker.withEventPublisher('List');

    node: HTMLDivElement | null = null;

    render() {
        const {
            item,
            height,
            style,
            sortable,
            sortHandleAlign,
            itemClassName,
            selected,
            active,
            role = 'listitem',
            isDragging = false,
        } = this.props;

        /*
        This fixes item drag layout for rtl direction.
        react-window has a bug where in rtl it setting "right" to 0 instead of undefined.
         */
        const fixedStyle = {
            height,
            ...style,
            right: undefined,
        };

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                role={role}
                aria-selected={selected}
                aria-disabled={item.disabled}
                data-qa={active ? ListQa.ACTIVE_ITEM : undefined}
                className={b(
                    'item',
                    {
                        sortable,
                        active,
                        selected,
                        inactive: item.disabled,
                        'sort-handle-align': sortHandleAlign,
                        dragging: isDragging,
                    },
                    itemClassName,
                )}
                {...this.props.provided?.draggableProps}
                {...this.props.provided?.dragHandleProps}
                style={getStyle(this.props.provided, fixedStyle)}
                onClick={item.disabled ? undefined : this.onClick}
                onClickCapture={item.disabled ? undefined : this.onClickCapture}
                onMouseEnter={this.onMouseEnter}
                ref={this.setRef}
                id={`${this.props.listId}-item-${this.props.itemIndex}`}
            >
                {this.renderSortIcon()}
                {this.renderContent()}
            </div>
        );
    }

    getNode = () => this.node;

    private setRef = (node: HTMLDivElement) => {
        this.node = node;
        this.props.provided?.innerRef(node);
    };

    private renderSortIcon() {
        const {sortable} = this.props;
        return sortable ? (
            <div className={b('item-sort-icon')}>
                <Icon data={Grip} size={12} />
            </div>
        ) : null;
    }

    private renderContent() {
        const {renderItem = defaultRenderItem, item, active, itemIndex} = this.props;
        return <div className={b('item-content')}>{renderItem(item, active, itemIndex)}</div>;
    }

    private onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (!this.props.onClick) {
            return;
        }
        this.props.onClick(this.props.item, this.props.itemIndex, false, event);
    };

    private onClickCapture: React.MouseEventHandler<HTMLDivElement> = (event) => {
        ListItem.publishEvent({
            domEvent: event,
            eventId: 'click',
        });
    };

    private onMouseEnter = () =>
        !this.props.item.disabled && this.props.onActivate(this.props.itemIndex);
}
