import React from 'react';

import {MobileContext} from './MobileContext';
import type {MobileContextProps as Props} from './MobileContext';

export function usePlatform(): [Props['platform'], Props['setPlatform']] {
    const {platform, setPlatform} = React.useContext(MobileContext);
    return [platform, setPlatform];
}
