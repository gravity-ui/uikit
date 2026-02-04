'use client';

import * as React from 'react';

import {Grip} from '@gravity-ui/icons';
import type {DraggableProvided} from '@hello-pangea/dnd';

import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import {eventBroker} from '../../utils/event-broker';
import {ListQa} from '../constants';
import type {ListItemProps} from '../types';
import {getElementId} from '../utils';

const b = block('list');

const ROLES_WITH_ARIA_SELECTED = new Set(['option', 'gridcell', 'row', 'tab']);

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
                aria-selected={ROLES_WITH_ARIA_SELECTED.has(role) ? selected : undefined}
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
                style={getStyle(this.props.provided, fixedStyle)}
                onClick={item.disabled ? undefined : this.onClick}
                onClickCapture={item.disabled ? undefined : this.onClickCapture}
                onMouseEnter={this.onMouseEnter}
                ref={this.setRef}
                id={getElementId(this.props.listId, this.props.itemIndex)}
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
            <div {...this.props.provided?.dragHandleProps} className={b('item-sort-icon')}>
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
