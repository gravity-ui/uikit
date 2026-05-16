import * as React from 'react';

import {SyntheticFocusEvent} from './SyntheticFocusEvent';
import {useSyntheticBlurEvent} from './useSyntheticBlurEvent';

export interface UseFocusWithinProps<T extends Element = Element> {
    /** Whether the focus within events should be disabled. */
    isDisabled?: boolean;
    /** Handler that is called when the target element or a descendant receives focus. */
    onFocusWithin?: (e: React.FocusEvent<T>) => void;
    /** Handler that is called when the target element and all descendants lose focus. */
    onBlurWithin?: (e: React.FocusEvent<T>) => void;
    /** Handler that is called when the focus within state changes. */
    onFocusWithinChange?: (isFocusWithin: boolean) => void;
}

export interface UseFocusWithinResult<T extends Element = Element> {
    focusWithinProps: {
        onFocus?: (event: React.FocusEvent<T>) => void;
        onBlur?: (event: React.FocusEvent<T>) => void;
    };
}

/**
 * Callback on focus outside event.
 * @callback onFocusEventCallback
 * @param {FocusEvent} event
 */

/**
 * Callback on focus change event.
 * @callback onFocusChangeCallback
 * @param {boolean} isFocusWithin
 */

/**
 * Handles focus events for the target and its descendants.
 * @param {object} props
 * @param {boolean} [props.isDisabled] - whether the focus within events should be disabled.
 * @param {onFocusEventCallback} props.onFocusWithin - handler that is called when the target element or a descendant receives focus.
 * @param {onFocusEventCallback} props.onBlurWithin - handler that is called when the target element and all descendants lose focus.
 * @param {onFocusChangeCallback} props.onFocusChange - handler that is called when the the focus within state changes.
 * @returns container props
 * @example
 *
 * function Select() {
 *   const [open, setOpen] = React.useState(false);
 *
 *   const handleFocusOutside = React.useCallback(() => {setOpen(false);}, []);
 *
 *   const {focusWithinProps} = useFocusWithin({onBlurWithin: handleFocusOutside});
 *
 *   return (
 *     <span {...focusWithinProps}>
 *       <Button onClick={() => {setOpen(true)}}>Select</Button>
 *       <Popup open={open}>
 *          ...
 *       </Popup>
 *     </span>
 *   );
 *  }
 */
export function useFocusWithin<T extends Element = Element>(
    props: UseFocusWithinProps<T>,
): UseFocusWithinResult<T> {
    const {onFocusWithin, onBlurWithin, onFocusWithinChange, isDisabled} = props;

    const isFocusWithinRef = React.useRef(false);

    const onFocus = React.useCallback(
        (event: React.FocusEvent<T>) => {
            if (!isFocusWithinRef.current && document.activeElement === event.target) {
                isFocusWithinRef.current = true;

                if (onFocusWithin) {
                    onFocusWithin(event);
                }

                if (onFocusWithinChange) {
                    onFocusWithinChange(true);
                }
            }
        },
        [onFocusWithin, onFocusWithinChange],
    );

    const onBlur = React.useCallback(
        (event: React.FocusEvent<T>) => {
            if (!isFocusWithinRef.current) {
                return;
            }

            isFocusWithinRef.current = false;

            if (onBlurWithin) {
                onBlurWithin(event);
            }

            if (onFocusWithinChange) {
                onFocusWithinChange(false);
            }
        },
        [onBlurWithin, onFocusWithinChange],
    );

    const {onBlur: onBlurHandler, onFocus: onFocusHandler} = useFocusEvents<T>({
        onFocus,
        onBlur,
    });

    if (isDisabled) {
        return {
            focusWithinProps: {
                onFocus: undefined,
                onBlur: undefined,
            },
        };
    }

    return {
        focusWithinProps: {
            onFocus: onFocusHandler,
            onBlur: onBlurHandler,
        },
    };
}

function useFocusEvents<T extends Element = Element>({
    onFocus,
    onBlur,
}: {
    onFocus: (event: React.FocusEvent<T>) => void;
    onBlur: (event: React.FocusEvent<T>) => void;
}) {
    const capturedRef = React.useRef(false);

    const onBlurHandler = React.useCallback(
        (event: React.FocusEvent<T>) => {
            if (event.currentTarget.contains(event.relatedTarget)) {
                return;
            }
            capturedRef.current = false;
            const newEvent = new SyntheticFocusEvent<T>('blur', event.nativeEvent, {
                currentTarget: event.currentTarget,
            });
            setTimeout(() => {
                if (!capturedRef.current) {
                    onBlur(newEvent);
                }
            }, 0);
        },
        [onBlur],
    );

    const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

    const onFocusHandler = React.useCallback(
        (event: React.FocusEvent<T>) => {
            capturedRef.current = true;
            onSyntheticFocus(event);
            onFocus(event);
        },
        [onSyntheticFocus, onFocus],
    );

    return {onBlur: onBlurHandler, onFocus: onFocusHandler};
}
