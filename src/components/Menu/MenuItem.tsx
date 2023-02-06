import React from 'react';
import {block} from '../utils/cn';
import {DOMProps, QAProps} from '../types';
import {eventBroker} from '../utils/event-broker';

const b = block('menu');

export interface MenuItemProps extends DOMProps, QAProps {
    icon?: React.ReactNode;
    title?: string;
    disabled?: boolean;
    active?: boolean;
    selected?: boolean;
    href?: string;
    target?: string;
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
        icon,
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
        theme,
        extraProps,
        children,
        qa,
    },
    ref,
) {
    const handleClickCapture = React.useCallback((event: React.SyntheticEvent) => {
        eventBroker.publish({
            componentId: 'MenuItem',
            eventId: 'click',
            domEvent: event,
        });
    }, []);

    const commonProps = {
        title,
        onClick: disabled ? undefined : onClick,
        onClickCapture: disabled ? undefined : handleClickCapture,
        style,
        tabIndex: disabled ? -1 : 0,
        className: b('item', {disabled, active, selected, theme}, className),
        qa,
    };
    const content = [
        icon && (
            <div key="icon" className={b('item-icon')}>
                {icon}
            </div>
        ),
        <div key="content" className={b('item-content')}>
            {children}
        </div>,
    ];
    let item;

    if (href) {
        item = (
            <a
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
            <div {...(extraProps as React.HTMLAttributes<HTMLDivElement>)} {...commonProps}>
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
