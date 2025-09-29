'use client';

import * as React from 'react';

import {useForkRef, useResizeObserver} from '../../hooks';
import {useCollapseChildren} from '../../hooks/useCollapseChildren';
import type {PopupPlacement} from '../Popup';
import type {AriaLabelingProps, DOMProps, Key, QAProps} from '../types';
import {filterDOMProps} from '../utils/filterDOMProps';

import {BreadcrumbsDropdownMenu} from './BreadcrumbsDropdownMenu';
import {BreadcrumbsItem} from './BreadcrumbsItem';
import type {BreadcrumbsItemInnerProps} from './BreadcrumbsItem';
import {BreadcrumbsSeparator} from './BreadcrumbsSeparator';
import {b} from './utils';

import './Breadcrumbs.scss';

export interface BreadcrumbsProps extends DOMProps, AriaLabelingProps, QAProps {
    id?: string;
    showRoot?: boolean;
    separator?: React.ReactNode;
    maxItems?: number;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
    itemComponent?: React.ElementType;
    children: React.ReactNode;
    disabled?: boolean;
    onAction?: (key: Key) => void;
    endContent?: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef(function Breadcrumbs(
    props: BreadcrumbsProps,
    ref: React.Ref<HTMLOListElement>,
) {
    const listRef = React.useRef<HTMLOListElement>(null);
    const containerRef = useForkRef(ref, listRef);
    const menuRef = React.useRef<HTMLLIElement>(null);
    const endContentRef = React.useRef<HTMLLIElement>(null);

    const items: React.ReactElement<any>[] = [];
    React.Children.forEach(props.children, (child, index) => {
        if (React.isValidElement(child)) {
            if (child.key === undefined || child.key === null) {
                child = React.cloneElement(child, {key: index});
            }
            items.push(child);
        }
    });

    const {
        calculated,
        recalculate,
        visibleCount: visibleItemsCount,
    } = useCollapseChildren({
        containerRef: listRef,
        preservedRefs: [menuRef, endContentRef],
        direction: 'start',
        minCount: 1,
        maxCount:
            typeof props.maxItems === 'number' && props.maxItems < items.length
                ? props.maxItems - 1
                : undefined,
        getChildWidth: (child) => {
            const width = child.getBoundingClientRect().width;
            const maxWidth = child.dataset.current ? 200 : Infinity;
            return Math.min(maxWidth, width);
        },
    });

    useResizeObserver({
        ref: props.endContent ? endContentRef : undefined,
        onResize: recalculate,
    });

    let contents = items;
    if (items.length > visibleItemsCount) {
        contents = [];
        const breadcrumbs = [...items];
        let endItems = visibleItemsCount;
        if (props.showRoot && visibleItemsCount > 1) {
            const rootItem = breadcrumbs.shift();
            if (rootItem) {
                contents.push(rootItem);
            }
            endItems--;
        }
        const hiddenItems = breadcrumbs.slice(0, -endItems);
        const menuItem = (
            <BreadcrumbsDropdownMenu
                disabled={props.disabled}
                popupPlacement={props.popupPlacement}
                popupStyle={props.popupStyle}
                data-breadcrumbs-menu-item={true}
            >
                {hiddenItems.map((child, index) => {
                    const Component = props.itemComponent ?? BreadcrumbsItem;
                    const key = child.key ?? index;
                    const handleAction = () => {
                        if (typeof props.onAction === 'function') {
                            props.onAction(key);
                        }
                    };
                    const innerProps: BreadcrumbsItemInnerProps = {
                        __index: index,
                        __disabled: props.disabled || child.props.disabled,
                        __onAction: handleAction,
                    };
                    return (
                        <Component {...child.props} key={key} {...innerProps}>
                            {child.props.children}
                        </Component>
                    );
                })}
            </BreadcrumbsDropdownMenu>
        );

        contents.push(menuItem);
        contents.push(...breadcrumbs.slice(-endItems));
    }

    const lastIndex = contents.length - 1;
    const breadcrumbsItems = contents.map((child, index) => {
        const isCurrent = index === lastIndex;
        const key = child.key ?? index;

        const {'data-breadcrumbs-menu-item': isMenu, ...childProps} = child.props;
        let item: React.ReactNode;
        if (isMenu) {
            item = child;
        } else {
            const Component = props.itemComponent ?? BreadcrumbsItem;
            const handleAction = () => {
                if (typeof props.onAction === 'function') {
                    props.onAction(key);
                }
            };
            const innerProps: BreadcrumbsItemInnerProps = {
                __current: isCurrent,
                __disabled: props.disabled || childProps.disabled,
                __onAction: handleAction,
            };
            item = (
                <Component {...childProps} key={key} {...innerProps}>
                    {childProps.children}
                </Component>
            );
        }
        return (
            <li
                ref={isMenu ? menuRef : undefined}
                key={isMenu ? 'menu' : `item-${key}`}
                className={b('item', {calculating: isCurrent && !calculated, current: isCurrent})}
                data-current={isCurrent ? isCurrent : undefined}
            >
                {item}
                {isCurrent ? null : <BreadcrumbsSeparator separator={props.separator} />}
            </li>
        );
    });
    if (props.endContent) {
        breadcrumbsItems.push(
            <li key="end-content" ref={endContentRef} className={b('item')}>
                {props.endContent}
            </li>,
        );
    }
    return (
        <ol
            ref={containerRef}
            {...filterDOMProps(props, {labelable: true})}
            data-qa={props.qa}
            className={b(null, props.className)}
            style={props.style}
        >
            {breadcrumbsItems}
        </ol>
    );
}) as unknown as BreadcrumbsComponent;

type BreadcrumbsComponent = React.FunctionComponent<
    BreadcrumbsProps & {ref?: React.Ref<HTMLElement>}
> & {
    Item: typeof BreadcrumbsItem;
};

Breadcrumbs.Item = BreadcrumbsItem;
Breadcrumbs.displayName = 'Breadcrumbs';
