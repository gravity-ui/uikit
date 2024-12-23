import {useId, useRef} from 'react';

import {NAMESPACE} from '../../components/utils/cn';
import {getUniqId} from '../../components/utils/common';

export type UseUniqIdResult = string;

function useUniqIdFallback() {
    const idRef = useRef<string>();
    if (idRef.current === undefined) {
        idRef.current = getUniqId();
    }
    return idRef.current;
}

function useIdNative() {
    return `${NAMESPACE}${useId()}`;
}

export const useUniqId: () => UseUniqIdResult =
    typeof useId === 'function' ? useIdNative : useUniqIdFallback;
