'use client';

import * as React from 'react';

import type {Status} from '../types';
import type {VelocityTracker} from '../utils';

export interface UseContentScrollSwipeState {
    velocityTrackerRef: React.MutableRefObject<VelocityTracker>;
    startYRef: React.MutableRefObject<number>;
    deltaYRef: React.MutableRefObject<number>;
    swipeAreaTouchedRef: React.MutableRefObject<boolean>;
    setDeltaY: (value: number) => void;
    onTouchEndAction: (deltaY: number) => void;
}

export interface UseContentScrollProps extends UseContentScrollSwipeState {
    /** Returns whether hiding the sheet on a content swipe is allowed. */
    getAllowHideOnContentScroll: () => boolean;
    /** Returns the current scroll position of the content area. */
    getSheetScrollTop: () => number;
    /** Applies transform/opacity styles to the sheet and veil during the gesture. */
    setStyles: (args: {status: Status; deltaHeight?: number}) => void;
    /** Resets the height transition of the content area after it finished. */
    resetScrollTransition: () => void;
}

export interface ContentAreaHandlers {
    onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchCancel: (event: React.TouchEvent<HTMLDivElement>) => void;
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
    getAllowHideOnContentScroll,
    getSheetScrollTop,
    setStyles,
    resetScrollTransition,
}: UseContentScrollProps): UseContentScrollResult {
    const [contentTouched, setContentTouched] = React.useState(false);

    const startScrollTopRef = React.useRef(0);
    const dragGestureRef = React.useRef(false);

    const latestRef = React.useRef({
        getAllowHideOnContentScroll,
        getSheetScrollTop,
        setStyles,
        resetScrollTransition,
    });
    latestRef.current = {
        getAllowHideOnContentScroll,
        getSheetScrollTop,
        setStyles,
        resetScrollTransition,
    };

    const onTouchStart = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            const {getAllowHideOnContentScroll: getAllow, getSheetScrollTop: getScrollTop} =
                latestRef.current;

            // Decided anew on every touch: the end of a drag may never reach the content area
            // (the library unmounts the handle under the finger for a clone)
            dragGestureRef.current = isDragHandleTarget(event.target);
            if (!getAllow() || swipeAreaTouchedRef.current || dragGestureRef.current) {
                return;
            }

            velocityTrackerRef.current.clear();

            startYRef.current = event.nativeEvent.touches[0].clientY;
            startScrollTopRef.current = getScrollTop();
            setContentTouched(true);
        },
        [startYRef, swipeAreaTouchedRef, startScrollTopRef, velocityTrackerRef],
    );

    const onTouchMove = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            const {
                getAllowHideOnContentScroll: getAllow,
                getSheetScrollTop: getScrollTop,
                setStyles: applyStyles,
            } = latestRef.current;

            if (!getAllow() || dragGestureRef.current) {
                return;
            }

            if (!startYRef.current) {
                onTouchStart(event);
                return;
            }

            if (
                swipeAreaTouchedRef.current ||
                getScrollTop() > 0 ||
                (startScrollTopRef.current > 0 && startScrollTopRef.current !== getScrollTop())
            ) {
                return;
            }

            const delta = event.nativeEvent.touches[0].clientY - startYRef.current;

            velocityTrackerRef.current.addMovement({
                x: event.nativeEvent.touches[0].clientX,
                y: event.nativeEvent.touches[0].clientY,
            });

            if (delta <= 0) {
                setDeltaY(0);
                return;
            }

            setDeltaY(delta);
            applyStyles({status: 'showing', deltaHeight: delta});
        },
        [
            onTouchStart,
            setDeltaY,
            startYRef,
            swipeAreaTouchedRef,
            startScrollTopRef,
            velocityTrackerRef,
        ],
    );

    const onTouchEnd = React.useCallback(() => {
        if (dragGestureRef.current) {
            dragGestureRef.current = false;
            return;
        }

        if (!latestRef.current.getAllowHideOnContentScroll() || swipeAreaTouchedRef.current) {
            return;
        }

        onTouchEndAction(deltaYRef.current);

        startYRef.current = 0;
        setDeltaY(0);
        setContentTouched(false);
    }, [onTouchEndAction, setDeltaY, startYRef, swipeAreaTouchedRef, deltaYRef]);

    const onTouchCancel = React.useCallback(() => {
        dragGestureRef.current = false;
    }, []);

    const onTransitionEnd = React.useCallback((event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.propertyName === 'height') {
            latestRef.current.resetScrollTransition();
        }
    }, []);

    return {
        contentTouched,
        contentAreaHandlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onTouchCancel,
            onTransitionEnd,
        },
    };
}
