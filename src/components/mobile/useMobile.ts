import * as React from 'react';

import {MobileContext} from './MobileContext';
import type {MobileContextProps} from './MobileContext';

export function useMobile(): MobileContextProps['mobile'] {
    return React.useContext(MobileContext).mobile;
}
