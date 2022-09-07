import React from 'react';

import {setRef} from './setRef';

export function useForkRef<T>(
    ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> | null {
    return React.useMemo(() => {
        if (refs.every((ref) => ref === null || ref === undefined)) {
            return null;
        }

        return (value: T | null) => {
            for (const ref of refs) {
                setRef(ref, value);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}
