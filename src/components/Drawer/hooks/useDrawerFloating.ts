import * as React from 'react';

import type {FloatingContext} from '@floating-ui/react';

import {useFloatingTransition} from '../../../hooks/private/useFloatingTransition';
import {DRAWER_ANIMATION_DURATION_MS} from '../constants';

type UseDrawerFloatingParams = {
    onTransitionIn?: () => void;
    onTransitionInComplete?: () => void;
    onTransitionOut?: () => void;
    onTransitionOutComplete?: () => void;
    context: FloatingContext;
};

export function useDrawerFloating({
    onTransitionIn,
    onTransitionInComplete,
    onTransitionOut,
    onTransitionOutComplete,
    context,
}: UseDrawerFloatingParams) {
    const [isInitialRender, setInitialRender] = React.useState(true);
    const [isTransitionInProgress, setIsTransitionInProgress] = React.useState(false);

    const handleTransitionIn = React.useCallback(() => {
        setInitialRender(false);
        onTransitionIn?.();
        setIsTransitionInProgress(true);
    }, [onTransitionIn]);
    const handleTransitionInComplete = React.useCallback(() => {
        setInitialRender(false);
        onTransitionInComplete?.();
        setIsTransitionInProgress(false);
    }, [onTransitionInComplete]);
    const handleTransitionOut = React.useCallback(() => {
        setInitialRender(false);
        onTransitionOut?.();
        setIsTransitionInProgress(true);
    }, [onTransitionOut]);
    const handleTransitionOutComplete = React.useCallback(() => {
        setInitialRender(false);
        onTransitionOutComplete?.();
        setIsTransitionInProgress(false);
    }, [onTransitionOutComplete]);

    const {isMounted, status} = useFloatingTransition({
        context,
        duration: DRAWER_ANIMATION_DURATION_MS,
        onTransitionIn: handleTransitionIn,
        onTransitionInComplete: handleTransitionInComplete,
        onTransitionOut: handleTransitionOut,
        onTransitionOutComplete: handleTransitionOutComplete,
    });

    return {
        isInitialRender,
        isMounted,
        status,
        isTransitionInProgress,
    };
}
