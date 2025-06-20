import * as React from 'react';

import type {UseRadioGroupContextProps} from './types';

export const RadioGroupContext = React.createContext<UseRadioGroupContextProps>({
    name: '',
    currentValue: '',
    disabled: false,
    ref: () => {},
    onChange: () => {},
});

RadioGroupContext.displayName = 'RadioGroup.Context';
