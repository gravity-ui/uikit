import * as React from 'react';

import Stepper from '../Stepper';
import type {StepperProps} from '../Stepper';

export const StepperShowcase = (props: StepperProps) => {
    const [value, setValue] = React.useState<number | string>();

    return (
        <Stepper {...props} value={value} onUpdate={setValue}>
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item disabled>Step 2</Stepper.Item>
            <Stepper.Item>Step 3</Stepper.Item>
            <Stepper.Item>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
};
