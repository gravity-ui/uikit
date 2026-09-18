import type * as React from 'react';

import {setRef} from './setRef';

export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
    return function mergedRefs(value) {
        const cleanups: (() => void)[] = [];
        for (const ref of refs) {
            const cleanup = setRef(ref, value);
            if (cleanup) {
                cleanups.push(cleanup);
            }
        }

        if (value === null || cleanups.length === 0) {
            return undefined;
        }

        return () => {
            for (const cleanup of cleanups) {
                cleanup();
            }
        };
    };
}
