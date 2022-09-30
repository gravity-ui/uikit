import React from 'react';

import {setRef} from './setRef';

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
