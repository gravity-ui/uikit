import * as React from 'react';

import {useResizeObserver} from '../useResizeObserver';

export type UseElementChildrenCollapseOptions = {
    maxItems?: number;
    reversedCollapsing?: boolean;
    recalculateDeps?: React.DependencyList;
    isChildDOMElementCollapsible?: (element: HTMLElement) => boolean;
    getChildDOMElementWidth?: (element: HTMLElement) => number;
    isReactChildNodeCollapsible?: (
        child: React.ReactNode,
        childIndex: number,
        children: Array<React.ReactNode>,
    ) => boolean;
};

export type UseElementChildrenCollapseResult = {
    calculated: boolean;
    recalculate: () => void;
    shownChildren: React.ReactElement[];
    collapsedChildren: React.ReactElement[];
};

export const useElementChildrenCollapse = (
    children: React.ReactNode,
    elementRef: React.RefObject<HTMLElement>,
    options: UseElementChildrenCollapseOptions,
): UseElementChildrenCollapseResult => {
    const {
        maxItems = Infinity,
        reversedCollapsing = false,
        recalculateDeps = [],
        isChildDOMElementCollapsible = () => true,
        getChildDOMElementWidth = (e) => e.offsetWidth,
        isReactChildNodeCollapsible = () => true,
    } = options;

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

    const notCollapsibleChildren = childrenList.filter(
        (child, index, arr) => !isReactChildNodeCollapsible(child, index, arr),
    );

    const [visibleChildrenCount, setVisibleChildrenCount] = React.useState(childrenList.length);
    const [calculated, setCalculated] = React.useState(false);

    const calculateVisibleChildrenCount = React.useCallback(() => {
        const listEl = elementRef.current;

        if (!listEl) {
            return 0;
        }

        const dirtyChildrenList = Array.from(listEl.children) as Array<HTMLElement>;
        const collapsibleChildrenList: typeof dirtyChildrenList = [];

        let listWidth = listEl.offsetWidth;
        let visibleElementsCount = 0;
        let maxItemsLeft = maxItems;

        dirtyChildrenList.forEach((element) => {
            if (isChildDOMElementCollapsible(element)) {
                collapsibleChildrenList.push(element);
                return;
            }

            listWidth -= getChildDOMElementWidth(element);
            maxItemsLeft--;
        });

        for (let index = 0; index < collapsibleChildrenList.length; index++) {
            const el = collapsibleChildrenList[index];
            const elWidth = getChildDOMElementWidth(el);

            listWidth -= elWidth;
            maxItemsLeft--;

            if (listWidth < 0 || maxItemsLeft < 0) {
                break;
            }

            visibleElementsCount++;
        }

        return visibleElementsCount + notCollapsibleChildren.length;
    }, [
        elementRef,
        getChildDOMElementWidth,
        isChildDOMElementCollapsible,
        maxItems,
        notCollapsibleChildren.length,
    ]);

    const handleResize = React.useCallback(() => {
        setCalculated(false);
        setVisibleChildrenCount(childrenList.length);
    }, [childrenList.length]);

    useResizeObserver({
        ref: elementRef,
        onResize: handleResize,
    });

    const lastChildren = React.useRef<typeof children | null>(null);

    React.useLayoutEffect(() => {
        if (calculated && children !== lastChildren.current) {
            lastChildren.current = children;
            handleResize();
        }
    }, [calculated, childrenList.length, children, handleResize]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useLayoutEffect(() => handleResize(), [handleResize, ...recalculateDeps]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useLayoutEffect(() => {
        if (calculated) {
            return;
        }

        const newVisibleChildrenCount = calculateVisibleChildrenCount();

        if (newVisibleChildrenCount === visibleChildrenCount) {
            setCalculated(true);
        } else {
            setVisibleChildrenCount(newVisibleChildrenCount);
        }
    });

    const shownChildren: typeof childrenList = [];
    const collapsedChildren: typeof childrenList = [];

    let reservedShownChildrenCount = notCollapsibleChildren.length;

    if (reversedCollapsing) {
        childrenList.reverse();
    }

    childrenList.forEach((child, index, arr) => {
        const realIndex = reversedCollapsing ? arr.length - index - 1 : index;

        if (!isReactChildNodeCollapsible(child, realIndex, arr)) {
            shownChildren.push(child);
            reservedShownChildrenCount--;
            return;
        }

        if (shownChildren.length < visibleChildrenCount - reservedShownChildrenCount) {
            shownChildren.push(child);
        } else {
            collapsedChildren.push(child);
        }
    });

    if (reversedCollapsing) {
        shownChildren.reverse();
        collapsedChildren.reverse();
    }

    return {
        calculated,
        recalculate: handleResize,
        shownChildren,
        collapsedChildren,
    };
};
