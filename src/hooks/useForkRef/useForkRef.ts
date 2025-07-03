import * as React from 'react';

import {mergeRefs} from './mergeRefs';

export type UseForkRefProps<K> = Array<React.Ref<K> | undefined>;
export type UseForkRefResult<W> = React.RefCallback<W> | null;

export function useForkRef<T>(...refs: UseForkRefProps<T>): UseForkRefResult<T> {
    return React.useMemo(() => {
        if (refs.every((ref) => ref === null || ref === undefined)) {
            return null;
        }

        return mergeRefs(...refs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}
