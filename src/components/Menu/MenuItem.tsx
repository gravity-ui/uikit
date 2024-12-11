'use client';

import React from 'react';

import {useActionHandlers} from '../../hooks';
import {useLinkProps} from '../lab/router/router';
import type {DOMProps, Href, QAProps, RouterOptions} from '../types';
import {block} from '../utils/cn';
import {eventBroker} from '../utils/event-broker';

const b = block('menu');

export interface MenuItemProps extends DOMProps, QAProps {
    /** @deprecated use `iconStart` instead */
    icon?: React.ReactNode;
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    title?: string;
    disabled?: boolean;
    active?: boolean;
    selected?: boolean;
    href?: Href;
    target?: string;
    rel?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
    theme?: 'normal' | 'danger';
    extraProps?:
        | React.HTMLAttributes<HTMLDivElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    children?: React.ReactNode;
    routerOptions?: RouterOptions;
}

export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
    {
        icon,
        iconStart = icon,
        iconEnd,
        title,
        disabled,
        active,
        selected,
        onClick,
        style,
        className,
        theme,
        extraProps,
        children,
        qa,
        ...props
    },
    ref,
) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }

        if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    const linkProps = useLinkProps({...extraProps, ...props, onClick: handleClick});

    const {onKeyDown} = useActionHandlers(linkProps.onClick);

    const handleClickCapture = React.useCallback((event: React.SyntheticEvent) => {
        eventBroker.publish({
            componentId: 'MenuItem',
            eventId: 'click',
            domEvent: event,
        });
    }, []);

    const defaultProps = {
        role: 'menuitem',
        onKeyDown,
    };

    const commonProps = {
        ...linkProps,
        title,
        onClickCapture: disabled ? undefined : handleClickCapture,
        style,
        tabIndex: disabled ? -1 : 0,
        className: b(
            'item',
            {
                disabled,
                active,
                selected,
                theme,
                interactive: Boolean(onClick) || Boolean(props.href),
            },
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
        <div key="content" className={b('item-content')}>
            {children}
        </div>,
        iconEnd && (
            <div key={'icon-end'} className={b('item-icon-end')}>
                {iconEnd}
            </div>
        ),
    ];
    let item;

    if (props.href) {
        item = (
            <a
                {...defaultProps}
                {...(extraProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                {...commonProps}
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
        <li ref={ref as React.ForwardedRef<HTMLLIElement>} className={b('list-item')}>
            {item}
        </li>
    );
});
