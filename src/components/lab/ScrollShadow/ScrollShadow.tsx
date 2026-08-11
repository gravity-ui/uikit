import * as React from 'react';

import {useForkRef, useLayoutEffect} from '../../../hooks';
import {block} from '../../utils/cn';

import './ScrollShadow.scss';

const b = block('scroll-shadow');
const SCROLL_THRESHOLD = 1;

export type ScrollShadowAxis = 'block' | 'inline' | 'both';
export type ScrollShadowPosition = 'start' | 'end' | 'both';

type PhysicalEdge = 'top' | 'right' | 'bottom' | 'left';
type EdgeVisibility = Record<PhysicalEdge, boolean>;

const EMPTY_EDGE_VISIBILITY: EdgeVisibility = {
    top: false,
    right: false,
    bottom: false,
    left: false,
};

export interface ScrollShadowProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Logical axis whose scroll state controls the shadows.
     * @default 'block'
     */
    axis?: ScrollShadowAxis;
    /**
     * Logical edge on the selected axis where shadows can appear.
     * @default 'both'
     */
    position?: ScrollShadowPosition;
    /** Disables the shadows without disabling native scrolling. */
    disabled?: boolean;
}

interface LogicalAxisState {
    start: boolean;
    end: boolean;
}

interface FlowInfo {
    isRtl: boolean;
    isVertical: boolean;
    isVerticalLr: boolean;
}

function getLogicalAxisState(
    offset: number,
    scrollSize: number,
    clientSize: number,
    reverse: boolean,
) {
    const maxOffset = Math.max(scrollSize - clientSize, 0);
    const normalizedOffset = reverse ? Math.abs(offset) : offset;

    return {
        start: normalizedOffset > SCROLL_THRESHOLD,
        end: normalizedOffset < maxOffset - SCROLL_THRESHOLD,
    };
}

function withAxisVisibility(
    result: EdgeVisibility,
    state: LogicalAxisState,
    startEdge: PhysicalEdge,
    endEdge: PhysicalEdge,
    position: ScrollShadowPosition,
) {
    return {
        ...result,
        ...(position !== 'end' && {[startEdge]: state.start}),
        ...(position !== 'start' && {[endEdge]: state.end}),
    };
}

function getEdgeVisibility(
    element: HTMLDivElement,
    axis: ScrollShadowAxis,
    position: ScrollShadowPosition,
    flowInfo: FlowInfo,
): EdgeVisibility {
    let result = {...EMPTY_EDGE_VISIBILITY};
    const {isRtl, isVertical, isVerticalLr} = flowInfo;

    const verticalState = getLogicalAxisState(
        element.scrollTop,
        element.scrollHeight,
        element.clientHeight,
        isVertical && isRtl,
    );
    const horizontalState = getLogicalAxisState(
        element.scrollLeft,
        element.scrollWidth,
        element.clientWidth,
        isVertical ? !isVerticalLr : isRtl,
    );

    if (axis === 'block' || axis === 'both') {
        if (isVertical) {
            result = withAxisVisibility(
                result,
                horizontalState,
                isVerticalLr ? 'left' : 'right',
                isVerticalLr ? 'right' : 'left',
                position,
            );
        } else {
            result = withAxisVisibility(result, verticalState, 'top', 'bottom', position);
        }
    }

    if (axis === 'inline' || axis === 'both') {
        if (isVertical) {
            result = withAxisVisibility(
                result,
                verticalState,
                isRtl ? 'bottom' : 'top',
                isRtl ? 'top' : 'bottom',
                position,
            );
        } else {
            result = withAxisVisibility(
                result,
                horizontalState,
                isRtl ? 'right' : 'left',
                isRtl ? 'left' : 'right',
                position,
            );
        }
    }

    return result;
}

function getFlowInfo(element: HTMLDivElement): FlowInfo {
    const {direction, writingMode} = window.getComputedStyle(element);

    return {
        isRtl: direction === 'rtl' || (!direction && Boolean(element.closest('[dir="rtl"]'))),
        isVertical: writingMode.startsWith('vertical') || writingMode.startsWith('sideways'),
        isVerticalLr: writingMode === 'vertical-lr',
    };
}

function isSameVisibility(first: EdgeVisibility, second: EdgeVisibility) {
    return (
        first.top === second.top &&
        first.right === second.right &&
        first.bottom === second.bottom &&
        first.left === second.left
    );
}

export const ScrollShadow = React.forwardRef<HTMLDivElement, ScrollShadowProps>(
    function ScrollShadow(
        {
            axis = 'block',
            position = 'both',
            disabled = false,
            className,
            children,
            onScroll,
            tabIndex = 0,
            ...restProps
        },
        forwardedRef,
    ) {
        const innerRef = React.useRef<HTMLDivElement>(null);
        const flowInfoRef = React.useRef<FlowInfo | null>(null);
        const ref = useForkRef(innerRef, forwardedRef);
        const [edgeVisibility, setEdgeVisibility] = React.useState(EMPTY_EDGE_VISIBILITY);

        const updateEdgeVisibility = React.useCallback(
            (refreshFlowInfo = false) => {
                const element = innerRef.current;
                let nextVisibility = EMPTY_EDGE_VISIBILITY;

                if (!disabled && element) {
                    if (!flowInfoRef.current || refreshFlowInfo) {
                        flowInfoRef.current = getFlowInfo(element);
                    }
                    nextVisibility = getEdgeVisibility(
                        element,
                        axis,
                        position,
                        flowInfoRef.current,
                    );
                }

                setEdgeVisibility((currentVisibility) =>
                    isSameVisibility(currentVisibility, nextVisibility)
                        ? currentVisibility
                        : nextVisibility,
                );
            },
            [axis, disabled, position],
        );

        useLayoutEffect(() => updateEdgeVisibility(true));

        useLayoutEffect(() => {
            const element = innerRef.current;
            if (!element || disabled) {
                return undefined;
            }

            const resizeObserver =
                typeof ResizeObserver === 'undefined'
                    ? undefined
                    : new ResizeObserver(() => updateEdgeVisibility());
            const observedChildren = new Set<Element>();
            const handleWindowResize = () => updateEdgeVisibility();
            const observeChildren = () => {
                const currentChildren = new Set(Array.from(element.children));

                observedChildren.forEach((child) => {
                    if (!currentChildren.has(child)) {
                        resizeObserver?.unobserve(child);
                        observedChildren.delete(child);
                    }
                });
                currentChildren.forEach((child) => {
                    if (!observedChildren.has(child)) {
                        resizeObserver?.observe(child);
                        observedChildren.add(child);
                    }
                });
            };

            resizeObserver?.observe(element);
            observeChildren();
            if (!resizeObserver) {
                window.addEventListener('resize', handleWindowResize);
            }

            const mutationObserver = new MutationObserver(() => {
                observeChildren();
                updateEdgeVisibility();
            });
            mutationObserver.observe(element, {
                childList: true,
                subtree: true,
                characterData: true,
            });

            return () => {
                resizeObserver?.disconnect();
                mutationObserver.disconnect();
                window.removeEventListener('resize', handleWindowResize);
            };
        }, [disabled, updateEdgeVisibility]);

        const handleScroll = React.useCallback<React.UIEventHandler<HTMLDivElement>>(
            (event) => {
                updateEdgeVisibility();
                onScroll?.(event);
            },
            [onScroll, updateEdgeVisibility],
        );

        return (
            <div
                {...restProps}
                ref={ref}
                className={b(null, className)}
                data-scroll-shadow-top={edgeVisibility.top || undefined}
                data-scroll-shadow-right={edgeVisibility.right || undefined}
                data-scroll-shadow-bottom={edgeVisibility.bottom || undefined}
                data-scroll-shadow-left={edgeVisibility.left || undefined}
                tabIndex={tabIndex}
                onScroll={handleScroll}
            >
                {children}
            </div>
        );
    },
);

ScrollShadow.displayName = 'ScrollShadow';
