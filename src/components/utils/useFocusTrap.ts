import * as React from 'react';
import {createFocusTrap, FocusTrap} from 'focus-trap';

import {useRestoreFocus} from './useRestoreFocus';

interface UseFocusTrapProps {
    enabled?: boolean;
    disableRestoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    disableAutoFocus?: boolean;
    autoFocusRef?: React.RefObject<HTMLElement>;
}

export function useFocusTrap({
    enabled = true,
    disableRestoreFocus,
    restoreFocusRef,
    disableAutoFocus = false,
    autoFocusRef,
}: UseFocusTrapProps = {}) {
    const containerProps = useRestoreFocus({
        enabled: enabled && !disableRestoreFocus,
        restoreFocusRef,
        focusTrapped: true,
    });

    const initialFocusRef = React.useRef<HTMLElement | undefined | false>(
        disableAutoFocus ? false : autoFocusRef?.current ?? undefined,
    );
    React.useEffect(() => {
        initialFocusRef.current = disableAutoFocus ? false : autoFocusRef?.current ?? undefined;
    });

    const trapRef = React.useRef<FocusTrap>();

    const setFocusTrap = React.useCallback(
        (node: HTMLElement | null) => {
            if (node && enabled) {
                trapRef.current = createFocusTrap(node, {
                    // @ts-expect-error () => undefined is the same as undefined here
                    initialFocus: () => initialFocusRef.current,
                    fallbackFocus: () => node,
                    returnFocusOnDeactivate: false,
                    escapeDeactivates: false,
                    clickOutsideDeactivates: false,
                    allowOutsideClick: true,
                });
                trapRef.current.activate();
            } else {
                trapRef.current?.deactivate();
                trapRef.current = undefined;
            }
        },
        [enabled],
    );

    return [setFocusTrap, containerProps] as const;
}
