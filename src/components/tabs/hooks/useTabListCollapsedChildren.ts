import * as React from 'react';

import {useCollapseChildren} from '../../../hooks/useCollapseChildren';
import {useResizeObserver} from '../../../hooks/useResizeObserver';
import {getReactNodeHash} from '../../Breadcrumbs/utils';
import {bTab} from '../constants';
import {getTabNodePropsFromReactNode} from '../utils';

import {useTabListGapFromContainer} from './useTabListGapFromContainer';

const TAB_LIST_CHILD_SELECTOR = `.${bTab()}`;

export type UseTabListCollapsedChildrenResult = {
    shownChildren: React.ReactElement[];
    collapsedChildren: React.ReactElement[];
    triggerChild: React.ReactElement | null;
    collapseItemRef: React.RefObject<HTMLButtonElement>;
};

export const useTabListCollapsedChildren = (
    children: React.ReactNode,
    tabListValue: string | undefined,
    containerRef: React.RefObject<HTMLElement>,
    enabled: boolean,
): UseTabListCollapsedChildrenResult => {
    const collapseItemRef = React.useRef<HTMLButtonElement>(null);

    const childrenHash = getReactNodeHash(children);

    const listGap = useTabListGapFromContainer(containerRef, {
        enabled,
        childrenHash,
        childSelector: TAB_LIST_CHILD_SELECTOR,
    });

    const {recalculate, visibleCount: visibleChildrenCount} = useCollapseChildren({
        enabled,
        containerRef,
        preservedRefs: [collapseItemRef],
        direction: 'end',
        minCount: 0,
        gap: listGap,
        childSelector: TAB_LIST_CHILD_SELECTOR,
    });

    React.useEffect(() => {
        recalculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [childrenHash, tabListValue]);

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
        return {
            shownChildren: childrenList,
            collapsedChildren: [],
            collapseItemRef,
            triggerChild: null,
        };
    }

    if (visibleChildrenCount === 0) {
        const selectedChild =
            childrenList.find((child) => !isReactNodeCollapsible(child)) ?? childrenList[0];
        const otherChildren = childrenList.filter((c) => c !== selectedChild);

        // Only 1 tab is provided, so we don't need to collapse it
        if (otherChildren.length === 0) {
            return {
                shownChildren: selectedChild ? [selectedChild] : [],
                collapsedChildren: [],
                collapseItemRef,
                triggerChild: null,
            };
        }

        return {
            shownChildren: [],
            collapsedChildren: otherChildren,
            collapseItemRef,
            triggerChild: selectedChild,
        };
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

    return {shownChildren, collapsedChildren, triggerChild: null, collapseItemRef};
};
