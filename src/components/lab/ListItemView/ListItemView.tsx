import * as React from 'react';

import {Check} from '@gravity-ui/icons';
import {focusable} from 'tabbable';

import {useForkRef} from '../../../hooks';
import {ArrowToggle} from '../../ArrowToggle';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {DOMProps} from '../../types';
import {block} from '../../utils/cn';
import {filterDOMProps} from '../../utils/filterDOMProps';

import './ListItemView.scss';

const b = block('lab-list-item-view');

export interface ListItemViewProps<T extends React.ElementType = 'div'> extends DOMProps {
    id?: string;
    children: React.ReactNode;
    size?: 's' | 'm' | 'l' | 'xl';
    selected?: boolean;
    active?: boolean;
    hovered?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    selectionStyle?: 'check' | 'highlight' | 'none';
    collapsible?: boolean;
    collapsed?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
    draggable?: boolean;
    nestedLevel?: number;
    startContent?: React.ReactNode;
    description?: React.ReactNode;
    endContent?: React.ReactNode;
    isContainer?: boolean;
    component?: T;
    componentProps?: React.ComponentProps<T>;
}

export const ListItemView = React.forwardRef(ListItemViewComponent) as <
    T extends React.ElementType = 'div',
>(
    props: ListItemViewProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof ListItemViewProps<T>>,
) => React.ReactElement;

export function ListItemViewComponent(
    props: ListItemViewProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ListItemViewProps>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        size,
        active,
        selected,
        hovered,
        disabled,
        onClick,
        selectionStyle,
        className,
        style,
        collapsed,
        onCollapseChange,
        children,
        isContainer = false,
        component: Component = 'div',
        componentProps,
        collapsible: _collapsible,
        description,
        draggable: _draggable,
        startContent: _startContent,
        endContent: _endContent,
        nestedLevel: _nestedLevel,
    } = props;
    const containerRef = React.useRef(null);
    const componentRef = useForkRef(containerRef, ref);
    return (
        <Component
            ref={componentRef}
            {...componentProps}
            {...filterDOMProps(props)}
            className={b(
                {
                    size,
                    selected: selected && selectionStyle === 'highlight',
                    disabled,
                    active,
                    hovered: typeof hovered === 'boolean' && (hovered ? 'yes' : 'no'),
                    'is-container': isContainer,
                    'has-description': Boolean(description),
                },
                componentProps?.className ?? className,
            )}
            style={componentProps?.style ?? style}
            onClick={(e) => {
                if (disabled) {
                    e.preventDefault();
                    return;
                }
                const target = e.target;
                if (
                    target instanceof Element &&
                    containerRef.current &&
                    focusable(containerRef.current).some((el) => el.contains(target))
                ) {
                    return;
                }

                if (
                    typeof onClick === 'function' ||
                    typeof componentProps?.onClick === 'function'
                ) {
                    onClick?.(e);
                    componentProps?.onClick?.(e);
                } else if (typeof onCollapseChange === 'function') {
                    onCollapseChange(!collapsed);
                }
            }}
        >
            {isContainer ? (
                children
            ) : (
                <ListItemViewContent {...props}>{children}</ListItemViewContent>
            )}
        </Component>
    );
}

function ListItemViewContent({
    selected,
    disabled,
    selectionStyle,
    draggable,
    nestedLevel,
    collapsible,
    collapsed,
    onCollapseChange,
    startContent,
    children,
    description,
    endContent,
}: ListItemViewProps) {
    return (
        <React.Fragment>
            {draggable ? <Slot name="drag-handle" /> : null}
            {nestedLevel ? <Slot name="spacer" style={{'--_--nested-level': nestedLevel}} /> : null}
            {collapsible ? (
                <Slot name="collapsed-toggle">
                    <Button
                        className={b('collapsible')}
                        view="flat"
                        tabIndex={-1}
                        disabled={disabled}
                        onClick={() => {
                            onCollapseChange?.(!collapsed);
                        }}
                        aria-hidden="true"
                    >
                        <Button.Icon>
                            <ArrowToggle
                                className={b('arrow', {direction: collapsed ? 'bottom' : 'top'})}
                            />
                        </Button.Icon>
                    </Button>
                </Slot>
            ) : null}
            {selectionStyle === 'check' && (
                <Slot name="checked">
                    <div className={b('checked')}>
                        {selected ? <Icon data={Check} className={b('icon')} /> : null}
                    </div>
                </Slot>
            )}
            {startContent ? <Slot name="start-content">{startContent}</Slot> : null}
            <Slot name="content">{children}</Slot>
            {description ? <Slot name="description">{description}</Slot> : null}
            {endContent ? <Slot name="end-content">{endContent}</Slot> : null}
        </React.Fragment>
    );
}

function Slot({
    name,
    children,
    className,
    style,
}: {
    name:
        | 'drag-handle'
        | 'spacer'
        | 'collapsed-toggle'
        | 'checked'
        | 'start-content'
        | 'content'
        | 'description'
        | 'end-content'
        | 'container';
    children?: React.ReactNode;
} & DOMProps) {
    return (
        <div className={b('slot', {name}, className)} style={style}>
            {children}
        </div>
    );
}
