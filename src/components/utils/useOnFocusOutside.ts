import React from 'react';

/**
 * Callback on focus outside event.
 *
 * @callback onFocusOutsideCallback
 * @param {FocusEvent} event
 */

interface UseOnFocusOutsideProps {
    enabled?: boolean;
    onFocusOutside: (event: FocusEvent) => void;
}

/**
 * @deprecated use useFocusWithin instead
 *
 * Calls callback on focus element outside of some React sub-tree
 *
 * @param {Object} props
 * @param {true} [props.enabled=true] - if false, will not track focus outside events
 * @param {onFocusOutsideCallback} props.onFocusOutside - handler for focus outside event
 * @returns container props
 *
 * @example
 *
 * function Select() {
 *   const [open, setOpen] = React.useState(false);
 *
 *   const handleFocusOutside = React.useCallback(() => {setOpen(false);}, []);
 *
 *   const {onFocus, onBlur} = useOnFocusOutside({onFocusOutside: handleFocusOutside, enabled: open});
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
export function useOnFocusOutside({onFocusOutside, enabled = true}: UseOnFocusOutsideProps) {
    const capturedRef = React.useRef(false);

    React.useEffect(() => {
        if (!enabled) {
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
    }, [enabled, onFocusOutside]);

    const handleFocusIn = React.useCallback(() => {
        capturedRef.current = true;
    }, []);

    const handleFocusOut = React.useCallback(
        (event: React.FocusEvent) => {
            if (
                enabled &&
                (event.relatedTarget === null || event.relatedTarget === document.body)
            ) {
                onFocusOutside(event.nativeEvent);
            }
        },
        [onFocusOutside, enabled],
    );

    return {onFocus: handleFocusIn, onBlur: handleFocusOut};
}
