import {useContext} from 'react';

import {MobileContext} from './MobileContext';
import type {MobileContextProps} from './MobileContext';

export function useMobile(): MobileContextProps['mobile'] {
    return useContext(MobileContext).mobile;
}
