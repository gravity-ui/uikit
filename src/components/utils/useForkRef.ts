import React from 'react';

function setRef<T>(
    ref: React.MutableRefObject<T | null> | React.RefCallback<T | null> | null | undefined,
    value: T | null,
) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}

export function useForkRef<T>(
    refA: React.Ref<T> | null | undefined,
    refB: React.Ref<T> | null | undefined,
): React.Ref<T> | null {
    return React.useMemo(() => {
        if (refA === null && refB === null) {
            return null;
        }

        return (value) => {
            setRef(refA, value);
            setRef(refB, value);
        };
    }, [refA, refB]);
}
