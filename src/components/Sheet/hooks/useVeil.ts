'use client';

import * as React from 'react';

export interface UseVeilProps {
    /** Ref to the veil element (shared with the parent, which drives its opacity). */
    veilRef: React.RefObject<HTMLDivElement>;
    /** Guards interactions while an open/close animation is running. */
    isAnimatingRef: React.MutableRefObject<boolean>;
    /** Marks that a resize should be replayed after the closing animation finished. */
    delayedResizeRef: React.MutableRefObject<boolean>;
    /** Marks the veil as touched so transitions stay enabled during the hide. */
    setVeilTouched: (touched: boolean) => void;
    /** Starts the hiding animation. */
    hide: () => void;
    /** Unmounts the sheet once it is fully hidden. */
    hideSheet: () => void;
    /** Recomputes sizes after a delayed window resize. */
    onResizeWindow: () => void;
}

export interface VeilHandlers {
    onClick: () => void;
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
    hide,
    hideSheet,
    onResizeWindow,
}: UseVeilProps): UseVeilResult {
    const latestRef = React.useRef({setVeilTouched, hide, hideSheet, onResizeWindow});
    latestRef.current = {setVeilTouched, hide, hideSheet, onResizeWindow};

    const getVeilOpacity = React.useCallback(() => veilRef.current?.style.opacity || 0, [veilRef]);

    const onClick = React.useCallback(() => {
        if (isAnimatingRef.current) {
            return;
        }

        latestRef.current.setVeilTouched(true);
        latestRef.current.hide();
    }, [isAnimatingRef]);

    const onTransitionEnd = React.useCallback(() => {
        isAnimatingRef.current = false;

        if (getVeilOpacity() === '0') {
            latestRef.current.hideSheet();
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
