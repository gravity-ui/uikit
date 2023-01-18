import * as React from 'react';
import {createFocusTrap, FocusTrap} from 'focus-trap';

import {useRestoreFocus} from './useRestoreFocus';

interface UseFocusTrapProps {
    enabled?: boolean;
    disableRestoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    disableAutoFocus?: boolean;
}

export function useFocusTrap({
    enabled = true,
    disableRestoreFocus,
    restoreFocusRef,
    disableAutoFocus = false,
}: UseFocusTrapProps = {}) {
    const containerProps = useRestoreFocus({
        enabled: enabled && !disableRestoreFocus,
        restoreFocusRef,
        focusTrapped: true,
    });

    const setAutoFocusRef = React.useRef(!disableAutoFocus);
    React.useEffect(() => {
        setAutoFocusRef.current = !disableAutoFocus;
    });

    const trapRef = React.useRef<FocusTrap>();

    const setFocusTrap = React.useCallback(
        (node: HTMLElement | null) => {
            if (node && enabled) {
                trapRef.current = createFocusTrap(node, {
                    initialFocus: () => setAutoFocusRef.current && getFocusElement(node),
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

function getFocusElement(root: HTMLElement) {
    if (
        !(document.activeElement instanceof HTMLElement) ||
        !root.contains(document.activeElement)
    ) {
        if (!root.hasAttribute('tabIndex')) {
            if (process.env.NODE_ENV !== 'production') {
                // used only in dev build
                // eslint-disable-next-line no-console
                console.error('@gravity-ui/uikit: focus-trap content node does node accept focus.');
            }
            root.setAttribute('tabIndex', '-1');
        }
        return root;
    }

    return document.activeElement;
}
