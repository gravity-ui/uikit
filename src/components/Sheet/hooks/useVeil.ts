'use client';

import * as React from 'react';

import type {UseSheetDismissResult} from './useSheetDismiss';

export interface UseVeilProps {
    /** Ref to the veil element (shared with the parent, which drives its opacity). */
    veilRef: React.RefObject<HTMLDivElement>;
    /** Guards interactions while an open/close animation is running. */
    isAnimatingRef: React.MutableRefObject<boolean>;
    /** Marks that a resize should be replayed after the closing animation finished. */
    delayedResizeRef: React.MutableRefObject<boolean>;
    /** Marks the veil as touched so transitions stay enabled during the hide. */
    setVeilTouched: (touched: boolean) => void;
    /** Sends a request to dismiss the sheet. */
    requestDismiss: UseSheetDismissResult['requestDismiss'];
    /** Completes the shared exit once the veil has fully hidden. */
    onExitComplete: () => void;
    /** Recomputes sizes after a delayed window resize. */
    onResizeWindow: () => void;
}

export interface VeilHandlers {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    onTransitionEnd: () => void;
}

export interface UseVeilResult {
    /** Click/transition handlers to be spread onto the veil element. */
    veilHandlers: VeilHandlers;
}

export function useVeil({
    veilRef,
    isAnimatingRef,
    delayedResizeRef,
    setVeilTouched,
    requestDismiss,
    onExitComplete,
    onResizeWindow,
}: UseVeilProps): UseVeilResult {
    const latestRef = React.useRef({
        setVeilTouched,
        requestDismiss,
        onExitComplete,
        onResizeWindow,
    });
    latestRef.current = {setVeilTouched, requestDismiss, onExitComplete, onResizeWindow};

    const getVeilOpacity = React.useCallback(() => veilRef.current?.style.opacity || 0, [veilRef]);

    const onClick = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (isAnimatingRef.current) {
                return;
            }

            latestRef.current.setVeilTouched(true);
            latestRef.current.requestDismiss({
                reason: 'outside-press',
                event: event.nativeEvent,
            });
        },
        [isAnimatingRef],
    );

    const onTransitionEnd = React.useCallback(() => {
        isAnimatingRef.current = false;

        if (getVeilOpacity() === '0') {
            latestRef.current.onExitComplete();
            return;
        }

        if (delayedResizeRef.current) {
            latestRef.current.onResizeWindow();
            delayedResizeRef.current = false;
        }
    }, [isAnimatingRef, delayedResizeRef, getVeilOpacity]);

    return {
        veilHandlers: {
            onClick,
            onTransitionEnd,
        },
    };
}
