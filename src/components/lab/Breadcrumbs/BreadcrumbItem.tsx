'use client';

import React from 'react';

import type {Href, RouterOptions} from '../../types';
import {filterDOMProps} from '../../utils/filterDOMProps';

import type {BreadcrumbsItemProps} from './Breadcrumbs';
import {b, shouldClientNavigate} from './utils';

interface BreadcrumbProps extends BreadcrumbsItemProps {
    onAction?: () => void;
    current?: boolean;
    itemType?: 'link' | 'menu';
    disabled?: boolean;
    navigate?: (href: Href, routerOptions: RouterOptions | undefined) => void;
}
export function BreadcrumbItem(props: BreadcrumbProps) {
    const Element = props.href ? 'a' : 'span';
    const domProps = filterDOMProps(props, {labelable: true});

    let title = props.title;
    if (!title && typeof props.children === 'string') {
        title = props.children;
    }

    const handleAction = (event: React.MouseEvent | React.KeyboardEvent) => {
        if (props.disabled || props.current) {
            event.preventDefault();
            return;
        }

        if (typeof props.onAction === 'function') {
            props.onAction();
        }

        const target = event.currentTarget;
        if (typeof props.navigate === 'function' && target instanceof HTMLAnchorElement) {
            if (props.href && !event.isDefaultPrevented() && shouldClientNavigate(target, event)) {
                event.preventDefault();
                props.navigate(props.href, props.routerOptions);
            }
        }
    };

    const isDisabled = props.disabled || props.current;
    let linkProps: React.AnchorHTMLAttributes<HTMLElement> = {
        title,
        onClick: handleAction,
        'aria-disabled': isDisabled ? true : undefined,
    };
    if (Element === 'a') {
        linkProps.href = props.href;
        linkProps.hrefLang = props.hrefLang;
        linkProps.target = props.target;
        linkProps.rel = props.target === '_blank' && !props.rel ? 'noopener noreferrer' : props.rel;
        linkProps.download = props.download;
        linkProps.ping = props.ping;
        linkProps.referrerPolicy = props.referrerPolicy;
    } else {
        linkProps.role = 'link';
        linkProps.tabIndex = isDisabled ? undefined : 0;
        linkProps.onKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleAction(event);
            }
        };
    }

    if (props.current) {
        linkProps['aria-current'] = 'page';
    }

    if (props.itemType === 'menu') {
        linkProps = {};
    }

    return (
        <Element
            {...domProps}
            {...linkProps}
            className={
                props.itemType === 'menu'
                    ? b('menu')
                    : b('link', {
                          'is-current': props.current,
                          'is-disabled': isDisabled && !props.current,
                      })
            }
        >
            {props.children}
        </Element>
    );
}

BreadcrumbItem.displayName = 'Breadcrumbs.Item';
