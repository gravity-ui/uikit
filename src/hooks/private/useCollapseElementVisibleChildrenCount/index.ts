import * as React from 'react';

import {useResizeObserver} from '../../useResizeObserver';

export const useCollapseElementVisibleChildrenCount = ({
    children,
    elementRef,
    calculateVisibleChildrenCount,
    recalculateDeps = [],
}: {
    children: React.ReactNode;
    elementRef: React.RefObject<HTMLElement>;
    calculateVisibleChildrenCount: (options: {prevVisibleChildrenCount: number}) => number;
    recalculateDeps?: React.DependencyList;
}) => {
    const items: React.ReactElement<any>[] = [];

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

    const recalculate = (visibleItems: number) => {
        const newVisibleChildrenCount = calculateVisibleChildrenCount({
            prevVisibleChildrenCount: visibleItems,
        });

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

    React.useLayoutEffect(
        () => handleResize(),
        [
            handleResize,
            // eslint-disable-next-line react-hooks/exhaustive-deps
            ...recalculateDeps,
        ],
    );

    React.useLayoutEffect(() => {
        if (!calculated) {
            recalculate(visibleChildrenCount);
        }
    });

    return {calculated, visibleChildrenCount, handleResize};
};
