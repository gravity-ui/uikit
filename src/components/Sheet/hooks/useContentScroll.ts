'use client';

import * as React from 'react';

import type {Status} from '../types';
import type {VelocityTracker} from '../utils';

export interface UseContentScrollSwipeState {
    velocityTrackerRef: React.MutableRefObject<VelocityTracker>;
    startYRef: React.MutableRefObject<number | null>;
    deltaYRef: React.MutableRefObject<number>;
    swipeAreaTouchedRef: React.MutableRefObject<boolean>;
    setDeltaY: (value: number) => void;
    onTouchEndAction: (deltaY: number, event: React.TouchEvent<HTMLDivElement>) => void;
}

export interface UseContentScrollProps extends UseContentScrollSwipeState {
    /** Whether hiding the sheet on a content swipe is allowed. */
    allowHideOnContentScroll: boolean;
    /** Returns the current scroll position of the content area. */
    getSheetScrollTop: () => number;
    /** Applies transform/opacity styles to the sheet and veil during the gesture. */
    setStyles: (args: {status: Status; deltaHeight?: number}) => void;
    /** Returns whether an accepted exit animation is running. */
    getIsExitAnimating: () => boolean;
    /** Resets the height transition of the content area after it finished. */
    resetScrollTransition: () => void;
}

export interface ContentAreaHandlers {
    onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTransitionEnd: (event: React.TransitionEvent<HTMLDivElement>) => void;
}

/**
 * A touch that starts on a drag handle belongs to the drag-and-drop library, not to the swipe of
 * the sheet: a native drag source, or a handle of `@hello-pangea/dnd` (it sets `draggable="false"`,
 * which an image that only opts out of the native drag carries as well)
 */
const DRAG_HANDLE_SELECTOR = '[draggable="true"], [data-rfd-drag-handle-draggable-id]';

function isDragHandleTarget(target: EventTarget | null) {
    return target instanceof Element && target.closest(DRAG_HANDLE_SELECTOR) !== null;
}

export interface UseContentScrollResult {
    /** Whether the content area is currently being touched. */
    contentTouched: boolean;
    /** Clears state owned by the content touch surface. */
    resetContentTouch: () => void;
    /** Touch/transition handlers to be spread onto the content area element. */
    contentAreaHandlers: ContentAreaHandlers;
}

export function useContentScroll({
    velocityTrackerRef,
    startYRef,
    deltaYRef,
    swipeAreaTouchedRef,
    setDeltaY,
    onTouchEndAction,
    allowHideOnContentScroll,
    getSheetScrollTop,
    setStyles,
    getIsExitAnimating,
    resetScrollTransition,
}: UseContentScrollProps): UseContentScrollResult {
    const [contentTouched, setContentTouched] = React.useState(false);

    const startScrollTopRef = React.useRef(0);
    const dragGestureRef = React.useRef(false);

    const resetContentTouch = React.useCallback(() => {
        startScrollTopRef.current = 0;
        dragGestureRef.current = false;
        setContentTouched(false);
    }, []);

    const onTouchStart = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            // Decided anew on every touch: the end of a drag may never reach the content area
            // (the library unmounts the handle under the finger for a clone)
            dragGestureRef.current = isDragHandleTarget(event.target);
            if (
                getIsExitAnimating() ||
                !allowHideOnContentScroll ||
                swipeAreaTouchedRef.current ||
                dragGestureRef.current
            ) {
                return;
            }

            velocityTrackerRef.current.clear();

            startYRef.current = event.nativeEvent.touches[0].clientY;
            startScrollTopRef.current = getSheetScrollTop();
            setContentTouched(true);
        },
        [
            allowHideOnContentScroll,
            getIsExitAnimating,
            getSheetScrollTop,
            startYRef,
            swipeAreaTouchedRef,
            velocityTrackerRef,
        ],
    );

    const onTouchMove = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            if (getIsExitAnimating() || !allowHideOnContentScroll || dragGestureRef.current) {
                return;
            }

            const startY = startYRef.current;

            if (startY === null) {
                onTouchStart(event);
                return;
            }

            if (
                swipeAreaTouchedRef.current ||
                getSheetScrollTop() > 0 ||
                (startScrollTopRef.current > 0 && startScrollTopRef.current !== getSheetScrollTop())
            ) {
                return;
            }

            const delta = event.nativeEvent.touches[0].clientY - startY;

            velocityTrackerRef.current.addMovement({
                x: event.nativeEvent.touches[0].clientX,
                y: event.nativeEvent.touches[0].clientY,
            });

            if (delta <= 0) {
                setDeltaY(0);
                return;
            }

            setDeltaY(delta);
            setStyles({status: 'showing', deltaHeight: delta});
        },
        [
            allowHideOnContentScroll,
            getIsExitAnimating,
            getSheetScrollTop,
            onTouchStart,
            setDeltaY,
            setStyles,
            startYRef,
            swipeAreaTouchedRef,
            velocityTrackerRef,
        ],
    );

    const onTouchEnd = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            if (dragGestureRef.current) {
                dragGestureRef.current = false;
                return;
            }

            if (!allowHideOnContentScroll || swipeAreaTouchedRef.current) {
                return;
            }

            onTouchEndAction(deltaYRef.current, event);

            startYRef.current = null;
            setDeltaY(0);
            resetContentTouch();
        },
        [
            allowHideOnContentScroll,
            deltaYRef,
            onTouchEndAction,
            resetContentTouch,
            setDeltaY,
            startYRef,
            swipeAreaTouchedRef,
        ],
    );

    const onTransitionEnd = React.useCallback(
        (event: React.TransitionEvent<HTMLDivElement>) => {
            if (event.propertyName === 'height') {
                resetScrollTransition();
            }
        },
        [resetScrollTransition],
    );

    return {
        contentTouched,
        resetContentTouch,
        contentAreaHandlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onTransitionEnd,
        },
    };
}
