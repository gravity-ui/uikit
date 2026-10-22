'use client';

import * as React from 'react';

import {useLayoutEffect} from '../../../hooks';
import {block} from '../../utils/cn';

import type {ScrollShadowAxis, ScrollShadowPosition} from './ScrollShadow';

import './ScrollShadow.scss';

const b = block('scroll-shadow');
const SCROLL_THRESHOLD = 1;

type PhysicalEdge = 'top' | 'right' | 'bottom' | 'left';
type EdgeVisibility = Record<PhysicalEdge, boolean>;

export interface ScrollShadowState {
    blockStart: boolean;
    blockEnd: boolean;
    inlineStart: boolean;
    inlineEnd: boolean;
    hasOverflow: boolean;
}

interface InternalState {
    logical: ScrollShadowState;
    physical: EdgeVisibility;
}

export interface UseScrollShadowOptions {
    ref: React.RefObject<HTMLElement>;
    axis?: ScrollShadowAxis;
    position?: ScrollShadowPosition;
    disabled?: boolean;
}

const EMPTY_STATE: InternalState = {
    logical: {
        blockStart: false,
        blockEnd: false,
        inlineStart: false,
        inlineEnd: false,
        hasOverflow: false,
    },
    physical: {top: false, right: false, bottom: false, left: false},
};

function getAxisState(offset: number, scrollSize: number, clientSize: number, negative: boolean) {
    const maxOffset = Math.max(scrollSize - clientSize, 0);
    const current = Math.min(maxOffset, Math.max(0, negative ? -offset : offset));

    return {
        start: current > SCROLL_THRESHOLD,
        end: current < maxOffset - SCROLL_THRESHOLD,
        overflow: maxOffset > SCROLL_THRESHOLD,
    };
}

function measure(
    element: HTMLElement,
    axis: ScrollShadowAxis,
    position: ScrollShadowPosition,
    disabled: boolean,
): InternalState {
    const style = window.getComputedStyle(element);
    const isRtl = style.direction === 'rtl';
    const isVertical =
        style.writingMode.startsWith('vertical') || style.writingMode.startsWith('sideways');
    const isSidewaysLr = style.writingMode === 'sideways-lr';
    const isVerticalLr = style.writingMode === 'vertical-lr' || isSidewaysLr;
    const inlineStartBottom = isVertical && (isSidewaysLr ? !isRtl : isRtl);
    const blockState = isVertical
        ? getAxisState(element.scrollLeft, element.scrollWidth, element.clientWidth, !isVerticalLr)
        : getAxisState(element.scrollTop, element.scrollHeight, element.clientHeight, false);
    const inlineState = isVertical
        ? getAxisState(
              element.scrollTop,
              element.scrollHeight,
              element.clientHeight,
              inlineStartBottom,
          )
        : getAxisState(element.scrollLeft, element.scrollWidth, element.clientWidth, isRtl);
    const showBlock = !disabled && axis !== 'inline';
    const showInline = !disabled && axis !== 'block';
    const logical: ScrollShadowState = {
        blockStart: showBlock && position !== 'end' && blockState.start,
        blockEnd: showBlock && position !== 'start' && blockState.end,
        inlineStart: showInline && position !== 'end' && inlineState.start,
        inlineEnd: showInline && position !== 'start' && inlineState.end,
        hasOverflow: blockState.overflow || inlineState.overflow,
    };
    const physical: EdgeVisibility = {top: false, right: false, bottom: false, left: false};
    if (isVertical) {
        physical[isVerticalLr ? 'left' : 'right'] = logical.blockStart;
        physical[isVerticalLr ? 'right' : 'left'] = logical.blockEnd;
        physical[inlineStartBottom ? 'bottom' : 'top'] = logical.inlineStart;
        physical[inlineStartBottom ? 'top' : 'bottom'] = logical.inlineEnd;
    } else {
        physical.top = logical.blockStart;
        physical.bottom = logical.blockEnd;
        physical[isRtl ? 'right' : 'left'] = logical.inlineStart;
        physical[isRtl ? 'left' : 'right'] = logical.inlineEnd;
    }

    const borderWidth =
        (parseFloat(style.borderLeftWidth) || 0) + (parseFloat(style.borderRightWidth) || 0);
    const borderHeight =
        (parseFloat(style.borderTopWidth) || 0) + (parseFloat(style.borderBottomWidth) || 0);
    const scrollbarWidth = Math.max(0, element.offsetWidth - element.clientWidth - borderWidth);
    const scrollbarHeight = Math.max(0, element.offsetHeight - element.clientHeight - borderHeight);
    const scrollbarWidthValue = `${scrollbarWidth}px`;
    const scrollbarHeightValue = `${scrollbarHeight}px`;
    if (element.style.getPropertyValue('--_--scrollbar-width') !== scrollbarWidthValue) {
        element.style.setProperty('--_--scrollbar-width', scrollbarWidthValue);
    }
    if (element.style.getPropertyValue('--_--scrollbar-height') !== scrollbarHeightValue) {
        element.style.setProperty('--_--scrollbar-height', scrollbarHeightValue);
    }

    return {logical, physical};
}

function sameState(first: InternalState, second: InternalState) {
    return (
        first.logical.blockStart === second.logical.blockStart &&
        first.logical.blockEnd === second.logical.blockEnd &&
        first.logical.inlineStart === second.logical.inlineStart &&
        first.logical.inlineEnd === second.logical.inlineEnd &&
        first.logical.hasOverflow === second.logical.hasOverflow &&
        first.physical.top === second.physical.top &&
        first.physical.right === second.physical.right &&
        first.physical.bottom === second.physical.bottom &&
        first.physical.left === second.physical.left
    );
}

/** Attaches edge fading to an existing native scroll element. */
export function useScrollShadow({
    ref,
    axis = 'block',
    position = 'both',
    disabled = false,
}: UseScrollShadowOptions) {
    const [current, setCurrent] = React.useState(EMPTY_STATE);
    const update = React.useCallback(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const next = measure(element, axis, position, disabled);
        setCurrent((previous) => (sameState(previous, next) ? previous : next));
    }, [ref, axis, position, disabled]);

    useLayoutEffect(() => update(), [update]);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) {
            return undefined;
        }

        let animationFrameId: number | undefined;
        const scheduleUpdate = () => {
            if (animationFrameId === undefined) {
                animationFrameId = requestAnimationFrame(() => {
                    animationFrameId = undefined;
                    update();
                });
            }
        };
        const resizeObserver =
            typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(scheduleUpdate);
        const observedChildren = new Set<Element>();
        const observeChildren = () => {
            const children = new Set(Array.from(element.children));
            observedChildren.forEach((child) => {
                if (!children.has(child)) {
                    resizeObserver?.unobserve(child);
                    observedChildren.delete(child);
                }
            });
            children.forEach((child) => {
                if (!observedChildren.has(child)) {
                    resizeObserver?.observe(child);
                    observedChildren.add(child);
                }
            });
        };

        resizeObserver?.observe(element);
        observeChildren();
        const mutationObserver = new MutationObserver(() => {
            observeChildren();
            scheduleUpdate();
        });
        mutationObserver.observe(element, {childList: true});
        const flowObserver = new MutationObserver(scheduleUpdate);
        flowObserver.observe(element, {
            attributes: true,
            attributeFilter: ['dir', 'style', 'class'],
        });
        for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
            flowObserver.observe(ancestor, {
                attributes: true,
                attributeFilter: ['dir', 'style', 'class'],
            });
        }
        if (!resizeObserver) {
            window.addEventListener('resize', scheduleUpdate);
        }

        return () => {
            if (animationFrameId !== undefined) {
                cancelAnimationFrame(animationFrameId);
            }
            resizeObserver?.disconnect();
            mutationObserver.disconnect();
            flowObserver.disconnect();
            window.removeEventListener('resize', scheduleUpdate);
        };
    }, [ref, update]);

    return {
        state: current.logical,
        className: b(current.physical),
        onScroll: update,
    };
}
