import {ForwardedRef} from 'react';

export function setRef<T>(ref: ForwardedRef<T>, value: T) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (typeof ref === 'object' && ref !== null && ref.current) {
        ref.current = value;
    }
}
