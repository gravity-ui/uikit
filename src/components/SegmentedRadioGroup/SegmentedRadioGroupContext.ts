import * as React from 'react';

import type {UseRadioGroupContextProps} from '../../hooks/private/useRadioGroup/types';

export const SegmentedRadioGroupContextStable = React.createContext<
    UseRadioGroupContextProps['stable']
>({
    name: '',
    disabled: false,
    ref: () => {},
    onChange: () => {},
});

SegmentedRadioGroupContextStable.displayName = 'SegmentedRadioGroup.Context';

export const SegmentedRadioGroupContextValue = React.createContext<
    UseRadioGroupContextProps['value']
>({
    currentValue: '',
});
