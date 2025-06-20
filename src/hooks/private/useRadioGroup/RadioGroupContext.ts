import * as React from 'react';

import type {UseRadioGroupContextProps} from './types';

export const RadioGroupContext = React.createContext<UseRadioGroupContextProps | null>(null);

RadioGroupContext.displayName = 'RadioGroup.Context';
