import React from 'react';
import {block} from '../utils/cn';
import {DOMProps, QAProps} from '../types';
import {withEventBrokerDomHandlers} from '../utils/withEventBrokerDomHandlers';

const b = block('menu');

export interface MenuItemProps extends DOMProps, QAProps {
    icon?: React.ReactNode;
    title?: string;
    disabled?: boolean;
    active?: boolean;
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

const PureMenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(function MenuItem(
    {
        icon,
        title,
        disabled,
        active,
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
    const commonProps = {
        title,
        onClick,
        style,
        tabIndex: disabled ? -1 : 0,
        className: b('item', {disabled, active, theme}, className),
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
        <li ref={ref} className={b('list-item')}>
            {item}
        </li>
    );
});

export const MenuItem = withEventBrokerDomHandlers(PureMenuItem, ['onClick'], {
    componentId: 'MenuItem',
});
