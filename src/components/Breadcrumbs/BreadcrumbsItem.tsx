'use client';

import * as React from 'react';

import {ListItemView} from '../lab/ListItemView/ListItemView';
import {filterDOMProps} from '../utils/filterDOMProps';

import {useMenuContext} from './BreadcrumbsDropdownMenu';
import {b} from './utils';

export interface BreadcrumbsItemInnerProps {
    __disabled?: boolean;
    __onAction?: () => void;
    __current?: boolean;
    __index?: number;
}

export interface BreadcrumbsItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    disabled?: boolean;
    children?: React.ReactNode;
}

function BreadcrumbsItem(props: BreadcrumbsItemProps, ref: React.ForwardedRef<HTMLAnchorElement>) {
    const domProps = filterDOMProps(props, {labelable: true});

    const {
        href,
        hrefLang,
        target,
        rel,
        download,
        ping,
        referrerPolicy,
        children,
        __disabled: disabled,
        __current: current,
        __onAction: onAction,
        __index: index,
        ...restProps
    } = props as BreadcrumbsItemProps & BreadcrumbsItemInnerProps;

    let title = props.title;
    if (!title && typeof children === 'string') {
        title = children;
    }

    const handleAction = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
            event.preventDefault();
            return;
        }

        if (typeof restProps.onClick === 'function') {
            restProps.onClick(event);
        }

        if (typeof onAction === 'function') {
            onAction();
        }
    };

    const linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        title,
        onClick: handleAction,
        'aria-disabled': disabled ? true : undefined,
    };

    if (href) {
        linkProps.href = href;
        linkProps.hrefLang = hrefLang;
        linkProps.target = target;
        linkProps.rel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;
        linkProps.download = download;
        linkProps.ping = ping;
        linkProps.referrerPolicy = referrerPolicy;
        linkProps.tabIndex = disabled ? -1 : undefined;
    } else {
        linkProps.role = 'link';
        linkProps.tabIndex = disabled ? undefined : 0;
        linkProps.onKeyDown = (event) => {
            if (disabled) {
                event.preventDefault();
                return;
            }

            if (typeof restProps.onKeyDown === 'function') {
                restProps.onKeyDown(event);
            }

            if (event.key === 'Enter') {
                if (typeof onAction === 'function') {
                    onAction();
                }
            }
        };
    }

    if (current) {
        linkProps['aria-current'] = props['aria-current'] ?? 'page';
    }

    const Element = href ? 'a' : 'span';

    const {isMenu, getItemProps, listItemsRef, activeIndex, popupStyle} = useMenuContext();
    if (isMenu) {
        const active = !disabled && activeIndex === index;
        return (
            <ListItemView
                {...getItemProps({
                    ...restProps,
                    ...domProps,
                    ...linkProps,
                    role: 'menuitem',
                    active,
                })}
                ref={(node: HTMLElement | null) => {
                    listItemsRef.current[index ?? 0] = node;
                }}
                nestedLevel={popupStyle === 'staircase' ? index : undefined}
                tabIndex={active ? 0 : -1}
                active={active}
                size="m"
                className={b('menu-link', props.className)}
                component={Element}
                disabled={disabled}
            >
                {children}
            </ListItemView>
        );
    }

    return (
        <Element
            ref={ref}
            {...restProps}
            {...domProps}
            {...linkProps}
            className={b(
                'link',
                {
                    'is-current': current,
                    'is-disabled': disabled && !current,
                },
                props.className,
            )}
        >
            {children}
        </Element>
    );
}

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';

const _BreadcrumbsItem = React.forwardRef(BreadcrumbsItem);
export {_BreadcrumbsItem as BreadcrumbsItem};
