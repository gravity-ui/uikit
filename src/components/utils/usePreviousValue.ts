import React from 'react';

/** @deprecated drop on next major */

export function usePreviousValue<T>(value: T) {
    const ref = React.useRef<T>();
    React.useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
