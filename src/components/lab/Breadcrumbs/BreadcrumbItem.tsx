'use client';

import React from 'react';

import {filterDOMProps} from '../../utils/filterDOMProps';
import {useLinkProps} from '../router/router';

import type {BreadcrumbsItemProps} from './Breadcrumbs';
import {b} from './utils';

interface BreadcrumbProps extends BreadcrumbsItemProps {
    onAction?: () => void;
    current?: boolean;
    itemType?: 'link' | 'menu';
    disabled?: boolean;
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
    };

    const isDisabled = props.disabled || props.current;
    let linkProps: React.AnchorHTMLAttributes<HTMLElement> = {
        title,
        onClick: handleAction,
        'aria-disabled': isDisabled ? true : undefined,
    };

    const linkDomProps = useLinkProps({...props, onClick: handleAction});
    if (Element === 'a') {
        linkProps = {...linkProps, ...linkDomProps};
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
        linkProps['aria-current'] = props['aria-current'] ?? 'page';
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
