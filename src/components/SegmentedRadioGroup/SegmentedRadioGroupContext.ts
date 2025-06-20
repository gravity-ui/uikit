import * as React from 'react';

import type {UseRadioGroupContextProps} from '../../hooks/private/useRadioGroup/types';

export const SegmentedRadioGroupContext = React.createContext<UseRadioGroupContextProps>({
    name: '',
    currentValue: '',
    disabled: false,
    ref: () => {},
    onChange: () => {},
});

SegmentedRadioGroupContext.displayName = 'SegmentedRadioGroup.Context';
