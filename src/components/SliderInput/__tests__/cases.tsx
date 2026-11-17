import * as React from 'react';

import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import {SliderInput} from '../SliderInput';
import type {SliderInputProps} from '../SliderInput';

export const sizeCases: Cases<SliderInputProps['size']> = ['s', 'm', 'l', 'xl'];
export const disabledCases: Cases<SliderInputProps['disabled']> = [true];
export const validationStateCases: Cases<SliderInputProps['validationState']> = ['invalid'];
export const marksCases: Cases<SliderInputProps['marks']> = [4, [10, 20, 50, 55, 65, 80]];
export const stepCases: Cases<SliderInputProps['step']> = [5];
export const labelCases: Cases<SliderInputProps['label']> = ['Label:'];
export const noteCases: Cases<SliderInputProps['note']> = ['Note'];

export function SliderInputWithEmptyMarks(props: SliderInputProps) {
    return <SliderInput {...props} markFormat={() => ''} />;
}

export function ControlledSliderInputWithSynchronousBlur(props: SliderInputProps) {
    const [value, setValue] = React.useState(props.defaultValue ?? props.min ?? 0);

    return (
        <SliderInput
            {...props}
            value={value}
            onUpdate={(nextValue) => {
                setValue(nextValue);
                props.onUpdate?.(nextValue);
            }}
            controlProps={{
                onKeyDown: (event) => {
                    if (event.key === 'ArrowUp') {
                        event.currentTarget.blur();
                    }
                },
            }}
        />
    );
}
