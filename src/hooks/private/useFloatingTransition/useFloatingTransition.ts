import * as React from 'react';

import {useTransitionStatus} from '@floating-ui/react';
import type {FloatingContext, UseTransitionStatusProps} from '@floating-ui/react';

import {usePrevious} from '../usePrevious';

export interface UseFloatingTransitionProps {
    context: FloatingContext;
    duration: NonNullable<UseTransitionStatusProps['duration']>;
    /** Completes the close phase without waiting for the transition duration. */
    skipTransitionOut?: boolean;
    onTransitionIn?: () => void;
    onTransitionInComplete?: () => void;
    onTransitionOut?: () => void;
    onTransitionOutComplete?: () => void;
}

export interface UseFloatingTransitionResult {
    isMounted: boolean;
    status: 'unmounted' | 'initial' | 'open' | 'close';
}

export function useFloatingTransition({
    context,
    duration,
    skipTransitionOut = false,
    onTransitionIn,
    onTransitionInComplete,
    onTransitionOut,
    onTransitionOutComplete,
}: UseFloatingTransitionProps): UseFloatingTransitionResult {
    const transition = useTransitionStatus(context, {
        duration,
    });
    const [exitComplete, setExitComplete] = React.useState(false);
    const isMounted = transition.isMounted && (context.open || !exitComplete);
    const status = isMounted ? transition.status : 'unmounted';
    const previousStatus = usePrevious(status);
    const openDuration = (typeof duration === 'number' ? duration : duration.open) ?? 0;
    const timerIdRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Keep the close phase mounted so consumers can finish their exit cleanup.
    React.useEffect(() => {
        if (context.open) {
            setExitComplete(false);
        } else if (skipTransitionOut && transition.status === 'close') {
            setExitComplete(true);
        }
    }, [context.open, skipTransitionOut, transition.status]);

    React.useEffect(() => {
        if (status === 'open' && previousStatus === 'initial') {
            onTransitionIn?.();

            timerIdRef.current = setTimeout(() => {
                onTransitionInComplete?.();
                timerIdRef.current = null;
            }, openDuration);
        }
        if (status === 'close' && previousStatus === 'open') {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
                timerIdRef.current = null;
            }

            onTransitionOut?.();
        }
        if (status === 'unmounted' && previousStatus === 'close') {
            onTransitionOutComplete?.();
        }
    }, [
        status,
        previousStatus,
        openDuration,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
    ]);

    React.useEffect(
        () => () => {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
                timerIdRef.current = null;
            }
        },
        [],
    );

    return {isMounted, status};
}
