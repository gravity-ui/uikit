import * as React from 'react';

export function useControlledState<T, C = T, Args extends any[] = []>(
    value: Exclude<T, undefined>,
    defaultValue: Exclude<T, undefined> | undefined,
    onChange?: (v: C, ...args: Args) => void,
): [T, (value: C, ...args: Args) => void];
export function useControlledState<T, C = T, Args extends any[] = []>(
    value: Exclude<T, undefined> | undefined,
    defaultValue: Exclude<T, undefined>,
    onChange?: (v: C, ...args: Args) => void,
): [T, (value: C, ...args: Args) => void];
export function useControlledState<T, C extends T = T, Args extends any[] = []>(
    value: T,
    defaultValue: T,
    onUpdate?: (value: C, ...args: Args) => void,
) {
    const [innerValue, setInnerValue] = React.useState(value ?? defaultValue);

    const isControlledRef = React.useRef(value !== undefined);
    const isControlled = value !== undefined;
    React.useEffect(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
            console.error(
                `[useControlledState] A component changed from ${
                    wasControlled ? 'controlled' : 'uncontrolled'
                } to ${isControlled ? 'controlled' : 'uncontrolled'}.`,
            );
        }
        isControlledRef.current = isControlled;
    }, [isControlled]);

    let currentValue = isControlled ? value : innerValue;
    const setState = React.useCallback(
        // We do not use setState callback syntax case because of a side effect
        // that we call `onUpdate` inside the callback function and onUpdate
        // in a controlling component frequently calls setState itself,
        // therefore we call `setState` while we're rendering a different component.
        (newValue: C, ...args: Args) => {
            if (!Object.is(currentValue, newValue)) {
                onUpdate?.(newValue, ...args);
            }
            if (!isControlled) {
                // If uncontrolled, mutate the currentValue local variable so that
                // calling setState multiple times with the same value only emits onChange once.
                // We do not use a ref for this because we specifically want the value to
                // reset every render, and assigning to a ref in render breaks aborted suspended renders.
                // eslint-disable-next-line react-hooks/exhaustive-deps
                currentValue = newValue;
                setInnerValue(newValue);
            }
        },
        [isControlled, onUpdate, currentValue],
    );

    return [currentValue, setState] as const;
}
