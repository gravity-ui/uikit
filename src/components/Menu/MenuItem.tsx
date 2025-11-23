'use client';

import * as React from 'react';

import {useActionHandlers} from '../../hooks';
import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';

const b = block('menu');

export interface MenuItemProps extends DOMProps, QAProps {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    title?: string;
    disabled?: boolean;
    active?: boolean;
    selected?: boolean;
    href?: string;
    target?: string;
    contentClassName?: string;
    rel?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
    theme?: 'normal' | 'danger';
    extraProps?:
        | React.HTMLAttributes<HTMLDivElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    children?: React.ReactNode;
}

export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
    {
        iconStart,
        iconEnd,
        title,
        disabled,
        active,
        selected,
        href,
        target,
        rel,
        onClick,
        style,
        className,
        contentClassName,
        theme,
        extraProps,
        children,
        qa,
    },
    ref,
) {
    const {onKeyDown} = useActionHandlers(onClick);

    const handleClickCapture = React.useCallback((event: React.SyntheticEvent) => {
        eventBroker.publish({
            componentId: 'MenuItem',
            eventId: 'click',
            domEvent: event,
        });
    }, []);

    const defaultProps = {
        role: 'menuitem',
        onKeyDown: onClick && !disabled ? onKeyDown : undefined,
    };

    const commonProps = {
        title,
        onClick: disabled ? undefined : onClick,
        onClickCapture: disabled ? undefined : handleClickCapture,
        style,
        tabIndex: disabled ? -1 : 0,
        className: b(
            'item',
            {disabled, active, selected, theme, interactive: Boolean(onClick) || Boolean(href)},
            className,
        ),
        'data-qa': qa,
    };
    const content = [
        iconStart && (
            <div key="icon-start" className={b('item-icon')}>
                {iconStart}
            </div>
        ),
        <div key="content" className={b('item-content', contentClassName)}>
            {children}
        </div>,
        iconEnd && (
            <div key={'icon-end'} className={b('item-icon-end')}>
                {iconEnd}
            </div>
        ),
    ];
    let item;

    if (href) {
        item = (
            <a
                {...defaultProps}
                {...(extraProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                {...commonProps}
                href={href}
                target={target}
                rel={rel}
            >
                {content}
            </a>
        );
    } else {
        item = (
            <div
                {...defaultProps}
                {...(extraProps as React.HTMLAttributes<HTMLDivElement>)}
                {...commonProps}
            >
                {content}
            </div>
        );
    }

    return (
        <li ref={ref as React.ForwardedRef<HTMLLIElement>} className={b('list-item')} role="none">
            {item}
        </li>
    );
});
