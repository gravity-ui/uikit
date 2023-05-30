import React from 'react';

import {MobileContext, MobileContextProps as Props} from './MobileContext';

export function useMobile(): [Props['mobile'], Props['setMobile']] {
    const {mobile, setMobile} = React.useContext(MobileContext);
    return [mobile, setMobile];
}
