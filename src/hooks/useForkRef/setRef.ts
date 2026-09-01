import type * as React from 'react';

export function setRef<T>(ref: React.Ref<T | null> | undefined, value: T | null) {
    if (typeof ref === 'function') {
        const cleanup = ref(value);
        return typeof cleanup === 'function'
            ? cleanup
            : () => {
                  ref(null);
              };
    } else if (ref) {
        const mutableRef = ref as {current: T | null};
        mutableRef.current = value;
        return () => {
            mutableRef.current = null;
        };
    }
    return undefined;
}
