import React from 'react';

import {setRef} from './setRef';

export type UseForkRefProps<K> = Array<React.Ref<K> | undefined>;
export type UseForkRefResult<W> = React.RefCallback<W> | null;

export function useForkRef<T>(...refs: UseForkRefProps<T>): UseForkRefResult<T> {
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
