'use client';

import * as React from 'react';

import type {Status} from '../types';
import {VelocityTracker} from '../utils';

import type {UseSheetDismissResult} from './useSheetDismiss';

const HIDE_THRESHOLD = 50;
const ACCELERATION_Y_MAX = 0.08;
const ACCELERATION_Y_MIN = -0.02;

export interface UseSwipeProps {
    /** Applies transform/opacity styles to the sheet and veil during the gesture. */
    setStyles: (args: {status: Status; deltaHeight?: number}) => void;
    /** Returns the current sheet height. */
    getSheetHeight: () => number;
    /** Animates the sheet to the shown state. */
    show: () => void;
    /** Returns whether an accepted exit animation is running. */
    getIsExitAnimating: () => boolean;
    /** Sends a request to dismiss the sheet. */
    requestDismiss: UseSheetDismissResult['requestDismiss'];
}

export interface SwipeAreaHandlers {
    onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
}

export interface UseSwipeResult {
    deltaY: number;
    swipeAreaTouched: boolean;

    velocityTrackerRef: React.MutableRefObject<VelocityTracker>;
    startYRef: React.MutableRefObject<number>;
    deltaYRef: React.MutableRefObject<number>;
    swipeAreaTouchedRef: React.MutableRefObject<boolean>;
    setDeltaY: (value: number) => void;
    setSwipeAreaTouched: (value: boolean) => void;
    onTouchEndAction: (deltaY: number, event: React.TouchEvent<HTMLDivElement>) => void;
    swipeAreaHandlers: SwipeAreaHandlers;
}

export function useSwipe({
    setStyles,
    getSheetHeight,
    show,
    getIsExitAnimating,
    requestDismiss,
}: UseSwipeProps): UseSwipeResult {
    const velocityTrackerRef = React.useRef<VelocityTracker>(null as unknown as VelocityTracker);
    if (!velocityTrackerRef.current) {
        velocityTrackerRef.current = new VelocityTracker();
    }

    const [deltaY, setDeltaYState] = React.useState(0);
    const [swipeAreaTouched, setSwipeAreaTouchedState] = React.useState(false);

    const startYRef = React.useRef(0);
    const deltaYRef = React.useRef(0);
    const swipeAreaTouchedRef = React.useRef(false);

    const setDeltaY = React.useCallback((value: number) => {
        deltaYRef.current = value;
        setDeltaYState(value);
    }, []);

    const setSwipeAreaTouched = React.useCallback((value: boolean) => {
        swipeAreaTouchedRef.current = value;
        setSwipeAreaTouchedState(value);
    }, []);

    const onTouchEndAction = React.useCallback(
        (currentDeltaY: number, event: React.TouchEvent<HTMLDivElement>) => {
            if (getIsExitAnimating()) {
                return;
            }

            const accelerationY = velocityTrackerRef.current.getYAcceleration();

            const immediate = getSheetHeight() <= currentDeltaY;
            const shouldDismiss =
                immediate ||
                (currentDeltaY > HIDE_THRESHOLD &&
                    accelerationY <= ACCELERATION_Y_MAX &&
                    accelerationY >= ACCELERATION_Y_MIN) ||
                accelerationY > ACCELERATION_Y_MAX;

            if (shouldDismiss) {
                requestDismiss({reason: 'swipe', event: event.nativeEvent, immediate});
                if (!getIsExitAnimating()) {
                    show();
                }
            } else if (currentDeltaY !== 0) {
                show();
            }
        },
        [getIsExitAnimating, getSheetHeight, requestDismiss, show],
    );

    const onTouchStart = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            if (getIsExitAnimating()) {
                return;
            }

            velocityTrackerRef.current.clear();

            startYRef.current = event.nativeEvent.touches[0].clientY;
            setSwipeAreaTouched(true);
        },
        [getIsExitAnimating, setSwipeAreaTouched],
    );

    const onTouchMove = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            if (getIsExitAnimating()) {
                return;
            }

            const delta = event.nativeEvent.touches[0].clientY - startYRef.current;

            velocityTrackerRef.current.addMovement({
                x: event.nativeEvent.touches[0].clientX,
                y: event.nativeEvent.touches[0].clientY,
            });

            setDeltaY(delta);

            if (delta <= 0) {
                return;
            }

            setStyles({status: 'showing', deltaHeight: delta});
        },
        [getIsExitAnimating, setDeltaY, setStyles],
    );

    const onTouchEnd = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            onTouchEndAction(deltaYRef.current, event);

            startYRef.current = 0;
            setDeltaY(0);
            setSwipeAreaTouched(false);
        },
        [onTouchEndAction, setDeltaY, setSwipeAreaTouched],
    );

    return {
        deltaY,
        swipeAreaTouched,
        velocityTrackerRef,
        startYRef,
        deltaYRef,
        swipeAreaTouchedRef,
        setDeltaY,
        setSwipeAreaTouched,
        onTouchEndAction,
        swipeAreaHandlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd,
        },
    };
}
