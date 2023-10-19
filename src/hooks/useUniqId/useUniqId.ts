import React from 'react';

import {NAMESPACE_NEW} from '../../components/utils/cn';
import {getUniqId} from '../../components/utils/common';

export type UseUniqIdResult = string;

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

export const useUniqId: () => UseUniqIdResult =
    typeof React.useId === 'function' ? useIdNative : useUniqIdFallback;
