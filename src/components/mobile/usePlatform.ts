import * as React from 'react';

import {MobileContext} from './MobileContext';
import type {MobileContextProps} from './MobileContext';

export function usePlatform(): MobileContextProps['platform'] {
    return React.useContext(MobileContext).platform;
}
