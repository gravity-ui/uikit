import type * as React from 'react';

export function setRef<T>(ref: React.Ref<T | null> | undefined, value: T | null) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
    }
}
