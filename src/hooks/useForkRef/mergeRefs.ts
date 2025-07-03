import type * as React from 'react';

import {setRef} from './setRef';

export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
    return function mergedRefs(value) {
        for (const ref of refs) {
            setRef(ref, value);
        }
    };
}
