import * as React from 'react';

import {tabbable} from 'tabbable';

type InitialFocus = number | React.RefObject<HTMLElement>;

interface UseInitialFocusParams {
    open: boolean | undefined;
    initialFocus: InitialFocus | undefined;
    floatingRef: React.RefObject<HTMLElement | null>;
}

export function useInitialFocus({open, initialFocus, floatingRef}: UseInitialFocusParams) {
    React.useEffect(() => {
        if (!open || initialFocus === undefined) return;

        const timerId = setTimeout(() => {
            const floatingEl = floatingRef.current;
            if (!floatingEl) return;

            let elToFocus: HTMLElement | null = null;

            if (typeof initialFocus === 'number') {
                const tabbableEls = tabbable(floatingEl);
                elToFocus = (tabbableEls[initialFocus] as HTMLElement) ?? null;
            } else {
                elToFocus = initialFocus.current;
            }

            elToFocus?.focus({preventScroll: true});
        }, 0);

        return () => clearTimeout(timerId);
    }, [open, initialFocus, floatingRef]);
}
