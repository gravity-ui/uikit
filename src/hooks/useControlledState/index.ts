import React from 'react';

export function useControlledState<T>(value: T | undefined, defaultValue: T) {
    const [state, setState] = React.useState(value ?? defaultValue);

    return [
        value || state,
        setState,
        value !== undefined, // isControlled
    ] as const;
}
