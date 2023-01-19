import React from 'react';

/**
 * Callback on focus outside event.
 *
 * @callback onFocusOutsideCallback
 * @param {FocusEvent} event
 */

/**
 * Calls callback on focus element outside of some React sub-tree
 *
 * @param {onFocusOutsideCallback} onFocusOutside  - handler for focus outside event
 * @param {true} enable
 * @returns container props
 *
 * @example
 *
 * function Select() {
 *   const [open, setOpen] = React.useState(false);
 *
 *   const handleFocusOutside = React.useCallback(() => {setOpen(false);}, []);
 *
 *   const {onFocus, onBlur} = useOnFocusOutside(handleFocusOutside, open);
 *
 *   return (
 *     <span onFocus={onFocus} onBlur={onBlur}>
 *       <Button onClick={() => {setOpen(true);}}>Select</Button>
 *       <Popup open={open}>
 *          ...
 *       </Popup>
 *     </span>
 *   );
 *  }
 * }
 */
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

    const handleFocusIn = React.useCallback(() => {
        capturedRef.current = true;
    }, []);

    const handleFocusOut = React.useCallback(
        (event: React.FocusEvent) => {
            if (event.relatedTarget === null || event.relatedTarget === document.body) {
                onFocusOutside(event.nativeEvent);
            }
        },
        [onFocusOutside],
    );

    return {onFocus: handleFocusIn, onBlur: handleFocusOut};
}
