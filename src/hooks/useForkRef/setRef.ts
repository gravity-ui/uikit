import * as React from 'react';

const version19plus = parseInt(React.version, 10) >= 19;

export function setRef<T>(ref: React.Ref<T | null> | undefined, value: T | null) {
    if (typeof ref === 'function') {
        const cleanup = ref(value);
        if (!version19plus) {
            return undefined;
        }
        return typeof cleanup === 'function'
            ? cleanup
            : () => {
                  ref(null);
              };
    } else if (ref) {
        const mutableRef = ref as {current: T | null};
        mutableRef.current = value;
        if (!version19plus) {
            return undefined;
        }
        return () => {
            mutableRef.current = null;
        };
    }
    return undefined;
}
