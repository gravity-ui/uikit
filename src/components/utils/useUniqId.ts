import React from 'react';
import {getUniqId} from './common';

export function useUniqId() {
    const idRef = React.useRef(getUniqId());
    return idRef.current;
}
