'use client';

import * as React from 'react';

import {useForkRef, useResizeObserver} from '../../hooks';
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

    const [visibleItemsCount, setVisibleItemsCount] = React.useState(items.length);
    const [calculated, setCalculated] = React.useState(false);
    const recalculate = (visibleItems: number) => {
        const list = listRef.current;
        if (!list) {
            return;
        }
        const listItems = Array.from(list.children) as HTMLElement[];
        const endElement = endContentRef.current;
        if (endElement) {
            listItems.pop();
        }
        if (listItems.length === 0) {
            setCalculated(true);
            return;
        }
        const containerWidth = list.offsetWidth - (endElement?.offsetWidth ?? 0);
        let newVisibleItemsCount = 0;
        let calculatedWidth = 0;
        let maxItems = props.maxItems || Infinity;

        let rootWidth = 0;
        if (props.showRoot) {
            const item = listItems.shift();
            if (item) {
                rootWidth = item.offsetWidth;
                calculatedWidth += rootWidth;
            }
            newVisibleItemsCount++;
        }

        const hasMenu = items.length > visibleItems;
        if (hasMenu) {
            const item = listItems.shift();
            if (item) {
                calculatedWidth += item.offsetWidth;
            }
            maxItems--;
        }

        if (props.showRoot && calculatedWidth >= containerWidth) {
            calculatedWidth -= rootWidth;
            newVisibleItemsCount--;
        }

        const lastItem = listItems.pop();
        if (lastItem) {
            calculatedWidth += Math.min(lastItem.offsetWidth, 200);
            if (calculatedWidth < containerWidth) {
                newVisibleItemsCount++;
            }
        }

        for (let i = listItems.length - 1; i >= 0; i--) {
            const item = listItems[i];
            calculatedWidth += item.offsetWidth;
            if (calculatedWidth >= containerWidth) {
                break;
            }
            newVisibleItemsCount++;
        }

        newVisibleItemsCount = Math.max(Math.min(maxItems, newVisibleItemsCount), 1);
        if (newVisibleItemsCount === visibleItemsCount) {
            setCalculated(true);
        } else {
            setVisibleItemsCount(newVisibleItemsCount);
        }
    };

    const handleResize = React.useCallback(() => {
        setVisibleItemsCount(items.length);
        setCalculated(false);
    }, [items.length]);
    useResizeObserver({
        ref: listRef,
        onResize: handleResize,
    });
    useResizeObserver({
        ref: props.endContent ? endContentRef : undefined,
        onResize: handleResize,
    });

    const lastChildren = React.useRef<typeof props.children | null>(null);
    React.useLayoutEffect(() => {
        if (calculated && props.children !== lastChildren.current) {
            lastChildren.current = props.children;
            setVisibleItemsCount(items.length);
            setCalculated(false);
        }
    }, [calculated, items.length, props.children]);

    React.useLayoutEffect(() => {
        if (!calculated) {
            recalculate(visibleItemsCount);
        }
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
                key={isMenu ? 'menu' : `item-${key}`}
                className={b('item', {calculating: isCurrent && !calculated, current: isCurrent})}
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
