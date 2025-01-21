'use client';

import * as React from 'react';

import {useForkRef, useResizeObserver} from '../../hooks';
import type {PopupPlacement} from '../Popup';
import type {AriaLabelingProps, DOMProps, Key, QAProps} from '../types';
import {filterDOMProps} from '../utils/filterDOMProps';

import {BreadcrumbsDropdownMenu} from './BreadcrumbsDropdownMenu';
import {BreadcrumbsItemView} from './BreadcrumbsItemView';
import {BreadcrumbsSeparator} from './BreadcrumbsSeparator';
import {b} from './utils';

import './Breadcrumbs.scss';

export type BreadcrumbsItemProps<T extends React.ElementType> =
    React.ComponentPropsWithoutRef<T> & {
        component?: T;
        disabled?: boolean;
    };

function Item<T extends React.ElementType = 'a'>(
    _props: BreadcrumbsItemProps<T>,
): React.ReactElement | null {
    return null;
}

export interface BreadcrumbsProps<T extends React.ElementType = 'a'>
    extends DOMProps,
        AriaLabelingProps,
        QAProps {
    id?: string;
    showRoot?: boolean;
    separator?: React.ReactNode;
    maxItems?: number;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
    children:
        | React.ReactElement<BreadcrumbsItemProps<T>>
        | React.ReactElement<BreadcrumbsItemProps<T>>[];
    disabled?: boolean;
    onAction?: (key: Key) => void;
}

export const Breadcrumbs = React.forwardRef(function Breadcrumbs(
    props: BreadcrumbsProps,
    ref: React.Ref<HTMLOListElement>,
) {
    const listRef = React.useRef<HTMLOListElement>(null);
    const containerRef = useForkRef(ref, listRef);

    const items: React.ReactElement[] = [];
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
        if (listItems.length === 0) {
            return;
        }
        const containerWidth = list.offsetWidth;
        let newVisibleItemsCount = 0;
        let calculatedWidth = 0;
        let maxItems = props.maxItems || Infinity;

        let rootWidth = 0;
        if (props.showRoot) {
            const item = listItems.shift();
            if (item) {
                rootWidth = item.scrollWidth;
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
        setCalculated(false);
        setVisibleItemsCount(items.length);
    }, [items.length]);
    useResizeObserver({
        ref: listRef,
        onResize: handleResize,
    });

    const lastChildren = React.useRef<typeof props.children | null>(null);
    React.useLayoutEffect(() => {
        if (calculated && props.children !== lastChildren.current) {
            lastChildren.current = props.children;
            setCalculated(false);
            setVisibleItemsCount(items.length);
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
                component={BreadcrumbsDropdownMenu}
            >
                {hiddenItems.map((child, index) => {
                    const Component = child.props.component ?? BreadcrumbsItemView;
                    return (
                        <Component
                            {...child.props}
                            index={index}
                            key={child.key}
                            disabled={props.disabled || child.props.disabled}
                            onAction={() => {
                                if (typeof props.onAction === 'function') {
                                    props.onAction(child.key ?? index);
                                }
                            }}
                        >
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
    const breadcrumbItems = contents.map((child, index) => {
        const isCurrent = index === lastIndex;
        const key = child.key ?? index;
        const handleAction = () => {
            if (typeof props.onAction === 'function') {
                props.onAction(key);
            }
        };

        const {component: Component = BreadcrumbsItemView, ...childProps} = child.props;
        return (
            <li key={index} className={b('item', {calculating: !calculated})}>
                <Component
                    {...childProps}
                    key={key}
                    current={isCurrent}
                    disabled={props.disabled || childProps.disabled}
                    onAction={handleAction}
                >
                    {childProps.children}
                </Component>
                {isCurrent ? null : <BreadcrumbsSeparator separator={props.separator} />}
            </li>
        );
    });
    return (
        <ol
            ref={containerRef}
            {...filterDOMProps(props, {labelable: true})}
            data-qa={props.qa}
            className={b(null, props.className)}
            style={props.style}
        >
            {breadcrumbItems}
        </ol>
    );
}) as unknown as BreadcrumbsComponent;

type BreadcrumbsComponent = React.FunctionComponent<
    BreadcrumbsProps & {ref?: React.Ref<HTMLElement>}
> & {
    Item: typeof Item;
};

Breadcrumbs.Item = Item;
Breadcrumbs.displayName = 'Breadcrumbs';

export {Item as BreadcrumbsItem};
