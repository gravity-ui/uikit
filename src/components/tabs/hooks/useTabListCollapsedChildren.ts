import * as React from 'react';

import {useCollapseChildren} from '../../../hooks/useCollapseChildren';
import {useResizeObserver} from '../../../hooks/useResizeObserver';
import {getReactNodeHash} from '../../Breadcrumbs/utils';
import {Tab} from '../Tab';
import {bTab, bTabListCollapseItem} from '../constants';
import type {TabProps} from '../types';

export type UseTabListCollapsedChildrenResult = {
    shownChildren: React.ReactElement[];
    collapsedChildren: React.ReactElement[];
    collapseItemRef: React.RefObject<HTMLButtonElement>;
};

const getChildWidth = (el: HTMLElement) => {
    return el.offsetWidth || 0;
};

/**
 * Finds the first Tab in the subtree (e.g. Tab wrapped in Tooltip) and returns its value.
 */
function getTabValueFromReactNode(node: React.ReactNode): unknown | undefined {
    if (!React.isValidElement(node)) {
        return undefined;
    }

    if (node.type === Tab) {
        return (node.props as TabProps)['value'];
    }

    const props = node.props as {children?: React.ReactNode};
    if (props.children === null) {
        return undefined;
    }

    for (const child of React.Children.toArray(props.children)) {
        const nested = getTabValueFromReactNode(child);
        if (nested !== undefined) {
            return nested;
        }
    }

    return undefined;
}

export const useTabListCollapsedChildren = (
    children: React.ReactNode,
    tabListValue: string | undefined,
    containerRef: React.RefObject<HTMLElement>,
    enabled: boolean,
): UseTabListCollapsedChildrenResult => {
    const collapseItemRef = React.useRef<HTMLButtonElement>(null);
    const activeTabElementRef = React.useRef<HTMLElement | null>(null);

    const {recalculate, visibleCount: visibleChildrenCount} = useCollapseChildren({
        enabled,
        containerRef,
        preservedRefs: [collapseItemRef, activeTabElementRef],
        direction: 'end',
        minCount: 1,
        gap: 24,
        childSelector: `.${bTab()},.${bTabListCollapseItem()}`,
        getChildWidth: getChildWidth,
    });

    const childrenHash = getReactNodeHash(children);

    React.useEffect(() => {
        if (enabled) {
            recalculate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [childrenHash, enabled]);

    useResizeObserver({
        ref: collapseItemRef,
        onResize: recalculate,
    });

    // Don't collapse selected tab
    const isReactNodeCollapsible = React.useCallback(
        (child: React.ReactNode) => {
            const tabValue = getTabValueFromReactNode(child);

            if (tabValue === undefined) {
                return true;
            }

            return tabListValue !== tabValue;
        },
        [tabListValue],
    );

    const childrenList: React.ReactElement<unknown>[] = [];

    React.Children.forEach(children, (child, index) => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.key === undefined || child.key === null) {
            childrenList.push(React.cloneElement(child, {key: index}));
            return;
        }

        childrenList.push(child);
    });

    if (!enabled) {
        return {shownChildren: childrenList, collapsedChildren: [], collapseItemRef};
    }

    const notCollapsibleChildren = childrenList.filter((child) => !isReactNodeCollapsible(child));

    const shownChildren: typeof childrenList = [];
    const collapsedChildren: typeof childrenList = [];

    let reservedToShowChildrenCount = notCollapsibleChildren.length;

    childrenList.forEach((child) => {
        if (!isReactNodeCollapsible(child)) {
            shownChildren.push(child);
            reservedToShowChildrenCount--;
            return;
        }

        if (shownChildren.length < visibleChildrenCount - reservedToShowChildrenCount) {
            shownChildren.push(child);
        } else {
            collapsedChildren.push(child);
        }
    });

    return {shownChildren, collapsedChildren, collapseItemRef};
};
