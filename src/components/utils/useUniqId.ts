import React from 'react';

import {getUniqId} from './common';

function useUniqIdFallback() {
    const idRef = React.useRef<string>();
    if (idRef.current === undefined) {
        idRef.current = getUniqId();
    }
    return idRef.current;
}

export const useUniqId: () => string =
    typeof React.useId === 'function' ? React.useId : useUniqIdFallback;
