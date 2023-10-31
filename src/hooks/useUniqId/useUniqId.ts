import React from 'react';

import {NAMESPACE_NEW} from '../../components/utils/cn';
import {getUniqId} from '../../components/utils/common';

export type UseUniqIdResult = string;

export function useUniqIdFallback() {
    return React.useMemo(() => getUniqId(), []);
}

export function useIdNative() {
    return `${NAMESPACE_NEW}${React.useId()}`;
}

export const useUniqId: () => UseUniqIdResult =
    typeof React.useId === 'function' ? useIdNative : useUniqIdFallback;
