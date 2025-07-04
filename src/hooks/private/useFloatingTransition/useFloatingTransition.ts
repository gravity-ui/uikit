import * as React from 'react';

import {useTransitionStatus} from '@floating-ui/react';
import type {FloatingContext, UseTransitionStatusProps} from '@floating-ui/react';

import {useMatchMedia} from '../useMatchMedia';
import {usePrevious} from '../usePrevious';

export interface UseFloatingTransitionProps {
    enabled?: boolean;
    context: FloatingContext;
    duration: NonNullable<UseTransitionStatusProps['duration']>;
    transitionProperty?: string;
    onTransitionIn?: () => void;
    onTransitionInComplete?: () => void;
    onTransitionOut?: () => void;
    onTransitionOutComplete?: () => void;
}

export interface UseFloatingTransitionResult {
    isMounted: boolean;
    status: 'unmounted' | 'initial' | 'open' | 'close';
    handleTransitionEnd: (event: React.TransitionEvent) => void;
}

export function useFloatingTransition({
    enabled: enabledProp = true,
    context,
    duration,
    transitionProperty = 'transform',
    onTransitionIn,
    onTransitionInComplete,
    onTransitionOut,
    onTransitionOutComplete,
}: UseFloatingTransitionProps): UseFloatingTransitionResult {
    const isPrefersReducedMotion = useMatchMedia({query: '(prefers-reduced-motion: reduce)'});
    const enabled = enabledProp && !isPrefersReducedMotion;
    const {isMounted, status} = useTransitionStatus(context, {
        duration: enabled ? duration : 0,
    });
    const previousStatus = usePrevious(status);

    const handleTransitionEnd = React.useCallback(
        (event: React.TransitionEvent) => {
            if (!enabled) {
                return;
            }

            // There are two simultaneous transitions running at the same time
            // Use specific name to only notify once
            if (status === 'open' && event.propertyName === transitionProperty) {
                onTransitionInComplete?.();
            }
        },
        [enabled, status, transitionProperty, onTransitionInComplete],
    );

    // Cannot use transitionend event for these callbacks due to unmounting from the DOM
    React.useEffect(() => {
        if (status === 'open' && previousStatus === 'initial') {
            onTransitionIn?.();

            if (!enabled) {
                requestAnimationFrame(() => {
                    onTransitionInComplete?.();
                });
            }
        }
        if (status === 'close' && previousStatus === 'open') {
            onTransitionOut?.();
        }
        if (status === 'unmounted' && previousStatus === 'close') {
            onTransitionOutComplete?.();
        }
    }, [
        enabled,
        status,
        previousStatus,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
    ]);

    return {isMounted, status, handleTransitionEnd};
}
