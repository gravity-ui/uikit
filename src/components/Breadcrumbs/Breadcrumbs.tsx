'use client';

import * as React from 'react';

import {useForkRef, useResizeObserver} from '../../hooks';
import {useElementChildrenCollapse} from '../../hooks/useElementChildrenCollapse';
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

const isReactChildNodeCollapsible = (
    child: React.ReactNode,
    childIndex: number,
    children: Array<React.ReactNode>,
) => {
    return (
        React.isValidElement(child) &&
        // not last item
        childIndex !== children.length - 1
    );
};

const renderBreadcrumbsMenuItem = ({
    children,
    ...props
}: {children: React.ReactElement[]} & Pick<
    BreadcrumbsProps,
    'disabled' | 'popupPlacement' | 'popupStyle' | 'itemComponent' | 'onAction'
>) => {
    if (!children.length) {
        return null;
    }

    return (
        <BreadcrumbsDropdownMenu
            disabled={props.disabled}
            popupPlacement={props.popupPlacement}
            popupStyle={props.popupStyle}
            data-breadcrumbs-menu-item={true}
        >
            {children.map((child, index) => {
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
};

const getBreadcrumbsChildrenAfterCollapsing = ({
    props,
    shownChildren,
    collapsedChildren,
}: {
    props: BreadcrumbsProps;
    shownChildren: React.ReactElement[];
    collapsedChildren: React.ReactElement[];
}) => {
    if (!collapsedChildren.length) {
        return shownChildren;
    }

    if (!props.showRoot || shownChildren.length <= 1) {
        const menuItem = renderBreadcrumbsMenuItem({
            ...props,
            children: collapsedChildren,
        }) as JSX.Element;

        return [menuItem, ...shownChildren];
    }

    const rootChild = collapsedChildren[0];
    const newShownChildren = shownChildren.slice(1);
    const newCollapsedChildren = [shownChildren[0], ...collapsedChildren.slice(1)];

    const menuItem = renderBreadcrumbsMenuItem({
        ...props,
        children: newCollapsedChildren,
    }) as JSX.Element;

    return [rootChild, menuItem, ...newShownChildren];
};

export const Breadcrumbs = React.forwardRef(function Breadcrumbs(
    props: BreadcrumbsProps,
    ref: React.Ref<HTMLOListElement>,
) {
    const listRef = React.useRef<HTMLOListElement>(null);
    const containerRef = useForkRef(ref, listRef);
    const endContentRef = React.useRef<HTMLLIElement>(null);

    const isChildDOMElementCollapsible = React.useCallback((el: HTMLElement) => {
        if (!el.classList.contains(b('item'))) {
            return false;
        }

        if (el.classList.contains(b('item') + '_current')) {
            return false;
        }

        if (el === endContentRef.current) {
            return false;
        }

        return !Array.from(el.children).find((child) => child.classList.contains(b('menu')));
    }, []);

    const {shownChildren, collapsedChildren, calculated, recalculate} = useElementChildrenCollapse(
        props.children,
        listRef,
        {
            maxItems: props.maxItems,
            reversedCollapsing: true,
            isReactChildNodeCollapsible,
            isChildDOMElementCollapsible,
        },
    );

    const contents = getBreadcrumbsChildrenAfterCollapsing({
        props,
        shownChildren,
        collapsedChildren,
    });

    useResizeObserver({
        ref: props.endContent ? endContentRef : undefined,
        onResize: recalculate,
    });

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
