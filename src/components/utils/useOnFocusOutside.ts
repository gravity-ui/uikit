import React from 'react';

export function useOnFocusOutside(onFocusOutside: (event: FocusEvent) => void, enable = true) {
    const capturedRef = React.useRef(false);

    React.useEffect(() => {
        if (!enable) {
            return undefined;
        }

        const handleFocus = function (event: FocusEvent) {
            capturedRef.current = false;
            window.setTimeout(() => {
                if (!capturedRef.current) {
                    onFocusOutside(event);
                }
            }, 0);
        };

        window.addEventListener('focus', handleFocus, {capture: true});

        return () => {
            window.removeEventListener('focus', handleFocus, {capture: true});
        };
    }, [enable, onFocusOutside]);

    const handleFocus = React.useCallback(() => {
        capturedRef.current = true;
    }, []);

    return {onFocus: handleFocus};
}
