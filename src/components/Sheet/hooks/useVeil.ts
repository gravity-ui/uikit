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
    /** Sends a request to dismiss the sheet. */
    requestDismiss: UseSheetDismissResult['requestDismiss'];
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
    requestDismiss,
    onResizeWindow,
}: UseVeilProps): UseVeilResult {
    const onClick = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (isAnimatingRef.current) {
                return;
            }

            requestDismiss({
                reason: 'outside-press',
                event: event.nativeEvent,
            });
        },
        [isAnimatingRef, requestDismiss],
    );

    const onTransitionEnd = React.useCallback(() => {
        isAnimatingRef.current = false;

        const veilOpacity = veilRef.current?.style.opacity || 0;

        if (veilOpacity === '0') {
            return;
        }

        if (delayedResizeRef.current) {
            onResizeWindow();
            delayedResizeRef.current = false;
        }
    }, [delayedResizeRef, isAnimatingRef, onResizeWindow, veilRef]);

    return {
        veilHandlers: {
            onClick,
            onTransitionEnd,
        },
    };
}
