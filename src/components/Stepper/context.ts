'use client';
import * as React from 'react';

import type {StepperProps} from './Stepper';

export type StepperContextProps = Pick<StepperProps, 'size' | 'onUpdate' | 'value'>;

export const StepperContext = React.createContext<StepperContextProps>({
    size: 'm',
    onUpdate: undefined,
    value: undefined,
});

export const useStepperContext = () => {
    const data = React.useContext(StepperContext);

    return data;
};
