import * as React from 'react';

import {useResizeObserver} from '../useResizeObserver';

export type UseElementChildrenCollapseOptions = {
    maxItems?: number;
    recalculateDeps?: React.DependencyList;
    isChildDOMElementCollapsible?: (element: HTMLElement) => boolean;
    getChildDOMElementWidth?: (element: HTMLElement) => number;
};

export type UseElementChildrenCollapseResult = {
    visibleChildrenCount: number;
    calculated: boolean;
    recalculate: () => void;
};

export const useElementChildrenCollapse = (
    children: React.ReactNode,
    elementRef: React.RefObject<HTMLElement>,
    options: UseElementChildrenCollapseOptions,
): UseElementChildrenCollapseResult => {
    const {
        maxItems = Infinity,
        recalculateDeps = [],
        isChildDOMElementCollapsible = () => true,
        getChildDOMElementWidth = (e) => e.offsetWidth,
    } = options;

    const items: React.ReactElement<unknown>[] = [];

    React.Children.forEach(children, (child, index) => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.key === undefined || child.key === null) {
            items.push(React.cloneElement(child, {key: index}));
            return;
        }

        items.push(child);
    });

    const [visibleChildrenCount, setVisibleChildrenCount] = React.useState(items.length);
    const [calculated, setCalculated] = React.useState(false);

    const calculateVisibleChildrenCount = () => {
        const listEl = elementRef.current;

        if (!listEl) {
            return 0;
        }

        const dirtyChildrenList = Array.from(listEl.children) as Array<HTMLElement>;
        const childrenList: typeof dirtyChildrenList = [];

        let listWidth = listEl.offsetWidth;
        let visibleElementsCount = 0;
        let maxItemsLeft = maxItems;

        dirtyChildrenList.forEach((element) => {
            if (isChildDOMElementCollapsible(element)) {
                childrenList.push(element);
                return;
            }

            listWidth -= getChildDOMElementWidth(element);
            maxItemsLeft--;
        });

        for (let index = 0; index < childrenList.length; index++) {
            const el = childrenList[index];
            const elWidth = getChildDOMElementWidth(el);

            listWidth -= elWidth;
            maxItemsLeft--;

            if (listWidth < 0 || maxItemsLeft < 0) {
                break;
            }

            visibleElementsCount++;
        }

        return visibleElementsCount;
    };

    const recalculate = () => {
        const newVisibleChildrenCount = calculateVisibleChildrenCount();

        if (newVisibleChildrenCount === visibleChildrenCount) {
            setCalculated(true);
        } else {
            setVisibleChildrenCount(newVisibleChildrenCount);
        }
    };

    const handleResize = React.useCallback(() => {
        setCalculated(false);
        setVisibleChildrenCount(items.length);
    }, [items.length]);

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
    }, [calculated, items.length, children, handleResize]);

    React.useLayoutEffect(() => handleResize(), [handleResize, ...recalculateDeps]);

    React.useLayoutEffect(() => {
        if (!calculated) {
            recalculate();
        }
    });

    return {
        visibleChildrenCount,
        calculated,
        recalculate,
    };
};
