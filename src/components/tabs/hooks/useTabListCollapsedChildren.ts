import * as React from 'react';

import {useCollapseChildren} from '../../../hooks/useCollapseChildren';
import {useResizeObserver} from '../../../hooks/useResizeObserver';
import {getReactNodeHash} from '../../Breadcrumbs/utils';
import {bTab, bTabListCollapseItem} from '../constants';
import {getTabNodePropsFromReactNode} from '../utils';

export type UseTabListCollapsedChildrenResult = {
    shownChildren: React.ReactElement[];
    collapsedChildren: React.ReactElement[];
    collapseItemRef: React.RefObject<HTMLButtonElement>;
};

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
            const tabProps = getTabNodePropsFromReactNode(child);

            if (tabProps === undefined) {
                return true;
            }

            return tabListValue !== tabProps['value'];
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
