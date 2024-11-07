'use client';

import React from 'react';

import {useForkRef, useResizeObserver} from '../../../hooks';
import {Button} from '../../Button';
import {DropdownMenu} from '../../DropdownMenu';
import type {PopupPlacement} from '../../Popup';
import type {AriaLabelingProps, DOMProps, Href, Key, QAProps, RouterOptions} from '../../types';
import {filterDOMProps} from '../../utils/filterDOMProps';
import {useRouter} from '../router/router';

import {BreadcrumbItem} from './BreadcrumbItem';
import {BreadcrumbsSeparator} from './BreadcrumbsSeparator';
import i18n from './i18n';
import {b} from './utils';

import './Breadcrumbs.scss';

export interface BreadcrumbsItemProps {
    children: React.ReactNode;
    title?: string;
    href?: Href;
    hrefLang?: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
    download?: boolean | string;
    ping?: string;
    referrerPolicy?: React.HTMLAttributeReferrerPolicy;
    'aria-label'?: string;
    'aria-current'?: React.AriaAttributes['aria-current'];
    routerOptions?: RouterOptions;
}

function Item(_props: BreadcrumbsItemProps): React.ReactElement | null {
    return null;
}

export interface BreadcrumbsProps extends DOMProps, AriaLabelingProps, QAProps {
    id?: string;
    showRoot?: boolean;
    separator?: React.ReactNode;
    maxItems?: number;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
    children: React.ReactElement<BreadcrumbsItemProps> | React.ReactElement<BreadcrumbsItemProps>[];
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

    const {openLink} = useRouter();
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
            <BreadcrumbItem itemType="menu">
                <DropdownMenu
                    items={hiddenItems.map((el, index) => {
                        return {
                            ...el.props,
                            text: el.props.children,
                            disabled: props.disabled,
                            items: [],
                            action: (event) => {
                                if (typeof props.onAction === 'function') {
                                    props.onAction(el.key ?? index);
                                }

                                // TODO: move this logic to DropdownMenu
                                const target = event.currentTarget;
                                if (target instanceof HTMLAnchorElement) {
                                    if (
                                        el.props.href &&
                                        openLink(
                                            target,
                                            event,
                                            el.props.href,
                                            el.props.routerOptions,
                                        )
                                    ) {
                                        event.preventDefault();
                                    }
                                }
                            },
                        };
                    })}
                    popupProps={{
                        className: b('popup', {
                            staircase: props.popupStyle === 'staircase',
                        }),
                        placement: props.popupPlacement,
                    }}
                    renderSwitcher={({onClick}) => (
                        <Button
                            title={i18n('label_more')}
                            className={b('more-button')}
                            onClick={onClick}
                            size="s"
                            view="flat"
                            disabled={props.disabled}
                        >
                            <Button.Icon>...</Button.Icon>
                        </Button>
                    )}
                />
            </BreadcrumbItem>
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

        return (
            <li key={index} className={b('item', {calculating: !calculated})}>
                <BreadcrumbItem
                    {...child.props}
                    key={key}
                    current={isCurrent}
                    disabled={props.disabled}
                    onAction={handleAction}
                >
                    {child.props.children}
                </BreadcrumbItem>
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
