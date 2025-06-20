import * as React from 'react';

import type {RadioGroupContextProps} from './types';

export const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(null);

RadioGroupContext.displayName = 'RadioGroup.Context';
