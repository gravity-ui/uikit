import React from 'react';
import {MobileContext, MobileContextProps as Props} from './MobileContext';

export function usePlatform(): [Props['platform'], Props['setPlatform']] {
    const {platform, setPlatform} = React.useContext(MobileContext);
    return [platform, setPlatform];
}
