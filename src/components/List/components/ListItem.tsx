import React from 'react';

import {Grip} from '@gravity-ui/icons';
import type {DraggableProvided} from 'react-beautiful-dnd';

import {Icon} from '../../Icon';
import {ListItemView} from '../../useList';
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
            style,
            sortable,
            sortHandleAlign,
            itemClassName,
            selected,
            hasSelectionIcon,
            active,
            size,
            role = 'listitem',
            isDragging = false,
        } = this.props;

        /*
        This fixes item drag layout for rtl direction.
        react-window has a bug where in rtl it setting "right" to 0 instead of undefined.
         */
        const fixedStyle = {
            ...style,
            right: undefined,
        };

        return (
            <ListItemView
                size={size}
                role={role}
                selected={selected}
                aria-selected={selected}
                data-qa={active ? ListQa.ACTIVE_ITEM : undefined}
                dragging={isDragging}
                active={active}
                hasSelectionIcon={hasSelectionIcon}
                disabled={item.disabled}
                className={b(
                    'item',
                    {
                        sortable,
                        'sort-handle-align': sortHandleAlign,
                    },
                    itemClassName,
                )}
                {...this.props.provided?.draggableProps}
                {...this.props.provided?.dragHandleProps}
                style={getStyle(this.props.provided, fixedStyle)}
                onClick={item.disabled ? undefined : this.onClick}
                onClickCapture={this.onClickCapture}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                ref={this.setRef}
                id={`${this.props.listId}-item-${this.props.itemIndex}`}
                startSlot={this.renderSortIcon()}
                title={this.renderContent()}
            />
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
        return renderItem(item, active, itemIndex);
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
