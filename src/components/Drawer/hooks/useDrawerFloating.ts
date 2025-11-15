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

    const handleTransitionIn = React.useCallback(() => {
        setInitialRender(false);
        onTransitionIn?.();
    }, [onTransitionIn]);
    const handleTransitionInComplete = React.useCallback(() => {
        setInitialRender(false);
        onTransitionInComplete?.();
    }, [onTransitionInComplete]);
    const handleTransitionOut = React.useCallback(() => {
        setInitialRender(false);
        onTransitionOut?.();
    }, [onTransitionOut]);
    const handleTransitionOutComplete = React.useCallback(() => {
        setInitialRender(false);
        onTransitionOutComplete?.();
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
    };
}
