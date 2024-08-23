import React from 'react';

import {MobileContext} from './MobileContext';
import type {MobileContextProps} from './MobileContext';

export function useTouch(): MobileContextProps['touch'] {
    return React.useContext(MobileContext).touch;
}
