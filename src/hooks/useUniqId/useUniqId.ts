import React from 'react';

import {NAMESPACE} from '../../components/utils/cn';
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
    return `${NAMESPACE}${React.useId()}`;
}

export const useUniqId: () => UseUniqIdResult =
    typeof React.useId === 'function' ? useIdNative : useUniqIdFallback;
