import {useContext} from 'react';

import {MobileContext} from './MobileContext';
import type {MobileContextProps} from './MobileContext';

export function usePlatform(): MobileContextProps['platform'] {
    return useContext(MobileContext).platform;
}
