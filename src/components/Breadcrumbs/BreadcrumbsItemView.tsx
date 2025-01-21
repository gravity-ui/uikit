'use client';

import * as React from 'react';

import {ListItemView} from '../lab/ListItemView/ListItemView';
import {filterDOMProps} from '../utils/filterDOMProps';

import {useMenuContext} from './BreadcrumbsDropdownMenu';
import {b} from './utils';

export interface BreadcrumbsItemViewProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    disabled?: boolean;
    onAction?: () => void;
    current?: boolean;
    index?: number;
}

function BreadcrumbsItem(
    props: BreadcrumbsItemViewProps,
    ref: React.ForwardedRef<HTMLAnchorElement>,
) {
    const domProps = filterDOMProps(props, {labelable: true});

    const {
        disabled,
        current,
        href,
        hrefLang,
        target,
        rel,
        download,
        ping,
        referrerPolicy,
        children,
        onAction,
        index,
        ...restProps
    } = props;
    let title = props.title;
    if (!title && typeof children === 'string') {
        title = children;
    }

    const handleAction = (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
            event.preventDefault();
            return;
        }

        if (typeof restProps.onClick === 'function') {
            restProps.onClick(event as any);
        }

        if (typeof onAction === 'function') {
            onAction();
        }
    };

    const isDisabled = props.disabled;
    const linkProps: React.AnchorHTMLAttributes<HTMLElement> = {
        title,
        onClick: handleAction,
        'aria-disabled': isDisabled ? true : undefined,
    };

    if (href) {
        linkProps.href = href;
        linkProps.hrefLang = hrefLang;
        linkProps.target = target;
        linkProps.rel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;
        linkProps.download = download;
        linkProps.ping = ping;
        linkProps.referrerPolicy = referrerPolicy;
        linkProps.tabIndex = isDisabled ? -1 : undefined;
    } else {
        linkProps.role = 'link';
        linkProps.tabIndex = isDisabled ? undefined : 0;
        linkProps.onKeyDown = (event) => {
            if (disabled) {
                event.preventDefault();
                return;
            }

            if (typeof restProps.onKeyDown === 'function') {
                restProps.onKeyDown(event as any);
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
        const active = !isDisabled && activeIndex === index;
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
                disabled={isDisabled}
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
                    'is-disabled': isDisabled && !current,
                },
                props.className,
            )}
        >
            {children}
        </Element>
    );
}

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';

export const BreadcrumbsItemView = React.forwardRef(BreadcrumbsItem);
