import React from 'react';

import {NAMESPACE_NEW} from './cn';
import {getUniqId} from './common';

function useUniqIdFallback() {
    const idRef = React.useRef<string>();
    if (idRef.current === undefined) {
        idRef.current = getUniqId();
    }
    return idRef.current;
}

function useIdNative() {
    return `${NAMESPACE_NEW}${React.useId()}`;
}

export const useUniqId: () => string =
    typeof React.useId === 'function' ? useIdNative : useUniqIdFallback;
