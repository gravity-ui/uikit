import React from 'react';
import {createFocusTrap, FocusTrap} from 'focus-trap';

export interface FocusTrapProps {
    enabled: boolean;
    rootRef: React.RefObject<HTMLElement>;
}

export function useFocusTrap({enabled, rootRef}: FocusTrapProps) {
    const trap = React.useRef<FocusTrap>();

    React.useEffect(() => {
        if (enabled) {
            if (rootRef.current) {
                if (!rootRef.current.getAttribute('tabIndex')) {
                    throw new Error(
                        'Root element must be focusable. Add tabIndex="-1" attribute to the root.',
                    );
                }

                trap.current = createFocusTrap(rootRef.current, {
                    escapeDeactivates: false,
                    allowOutsideClick: true,
                    initialFocus: rootRef.current,
                    fallbackFocus: rootRef.current,
                });
                trap.current.activate();
            }

            return () => {
                if (trap.current) {
                    trap.current.deactivate();
                }
            };
        }

        return undefined;
    }, [enabled]);
}
