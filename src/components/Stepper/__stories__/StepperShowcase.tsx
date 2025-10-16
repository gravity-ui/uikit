import * as React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {Stepper} from '../Stepper';
import type {StepperProps} from '../Stepper';

export const StepperInteractiveShowcase = (props: StepperProps) => {
    const [value, setValue] = React.useState<number | string | undefined>(0);

    return (
        <Stepper {...props} value={value} onUpdate={setValue}>
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item disabled>Step 2</Stepper.Item>
            <Stepper.Item>Step 3</Stepper.Item>
            <Stepper.Item>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
};

export const StepperSizeShowcase = () => {
    return (
        <Showcase direction="column">
            <Stepper size="s">
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
            </Stepper>

            <Stepper size="m">
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
            </Stepper>

            <Stepper size="l">
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
            </Stepper>
        </Showcase>
    );
};
