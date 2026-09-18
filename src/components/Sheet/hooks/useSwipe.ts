'use client';

import * as React from 'react';

import type {Status} from '../types';
import {VelocityTracker} from '../utils';

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
    /** Animates the sheet to the hidden state. */
    hide: () => void;
    /** Immediately unmounts the sheet. */
    hideSheet: () => void;
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
    onTouchEndAction: (deltaY: number) => void;
    swipeAreaHandlers: SwipeAreaHandlers;
}

export function useSwipe({
    setStyles,
    getSheetHeight,
    show,
    hide,
    hideSheet,
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

    const latestRef = React.useRef({setStyles, getSheetHeight, show, hide, hideSheet});
    latestRef.current = {setStyles, getSheetHeight, show, hide, hideSheet};

    const setDeltaY = React.useCallback((value: number) => {
        deltaYRef.current = value;
        setDeltaYState(value);
    }, []);

    const setSwipeAreaTouched = React.useCallback((value: boolean) => {
        swipeAreaTouchedRef.current = value;
        setSwipeAreaTouchedState(value);
    }, []);

    const onTouchEndAction = React.useCallback((currentDeltaY: number) => {
        const {
            getSheetHeight: getHeight,
            hide: hideFn,
            show: showFn,
            hideSheet: hideSheetFn,
        } = latestRef.current;
        const accelerationY = velocityTrackerRef.current.getYAcceleration();

        if (getHeight() <= currentDeltaY) {
            hideSheetFn();
        } else if (
            (currentDeltaY > HIDE_THRESHOLD &&
                accelerationY <= ACCELERATION_Y_MAX &&
                accelerationY >= ACCELERATION_Y_MIN) ||
            accelerationY > ACCELERATION_Y_MAX
        ) {
            hideFn();
        } else if (currentDeltaY !== 0) {
            showFn();
        }
    }, []);

    const onTouchStart = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            velocityTrackerRef.current.clear();

            startYRef.current = event.nativeEvent.touches[0].clientY;
            setSwipeAreaTouched(true);
        },
        [setSwipeAreaTouched],
    );

    const onTouchMove = React.useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            const delta = event.nativeEvent.touches[0].clientY - startYRef.current;

            velocityTrackerRef.current.addMovement({
                x: event.nativeEvent.touches[0].clientX,
                y: event.nativeEvent.touches[0].clientY,
            });

            setDeltaY(delta);

            if (delta <= 0) {
                return;
            }

            latestRef.current.setStyles({status: 'showing', deltaHeight: delta});
        },
        [setDeltaY],
    );

    const onTouchEnd = React.useCallback(() => {
        onTouchEndAction(deltaYRef.current);

        startYRef.current = 0;
        setDeltaY(0);
        setSwipeAreaTouched(false);
    }, [onTouchEndAction, setDeltaY, setSwipeAreaTouched]);

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
