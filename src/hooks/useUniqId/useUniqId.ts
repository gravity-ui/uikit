// webpack checks that namespace import (* as React) has useId
// eslint-disable-next-line no-restricted-syntax
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
    // eslint-disable-next-line no-restricted-syntax
    return `${NAMESPACE}${React.useId()}`;
}

export const useUniqId: () => UseUniqIdResult =
    // eslint-disable-next-line no-restricted-syntax
    typeof React.useId === 'function' ? useIdNative : useUniqIdFallback;
