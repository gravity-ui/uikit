import React from 'react';

import {useUniqId} from '../..';
import type {ControlGroupOption, ControlGroupProps} from '../../../components/types';

interface OptionsProps<ValueType extends string = string>
    extends Omit<
        ControlGroupProps<ValueType>,
        'options' | 'defaultValue' | 'aria-label' | 'aria-labelledby' | 'onUpdate' | 'value'
    > {
    value: ValueType;
    checked: boolean;
    content: ControlGroupOption['content'];
}

export type UseRadioGroupProps<ValueType extends string = string> = ControlGroupProps<ValueType>;

export type UseRadioGroupResult<ValueType extends string = string> = {
    containerProps: Pick<ControlGroupProps, 'aria-label' | 'aria-labelledby'> & {
        role: string;
        'aria-disabled': ControlGroupProps['disabled'];
    };
    optionsProps: OptionsProps<ValueType>[];
};

export function useRadioGroup<ValueType extends string = string>(
    props: UseRadioGroupProps<ValueType>,
): UseRadioGroupResult<ValueType> {
    const {
        name,
        value,
        defaultValue,
        options = [],
        disabled,
        onUpdate,
        onChange,
        onFocus,
        onBlur,
    } = props;

    const controlId = useUniqId();
    const [valueState, setValueState] = React.useState(
        defaultValue ?? options[0]?.value?.toString(),
    );
    const isControlled = typeof value !== 'undefined';
    const currentValue = isControlled ? value : valueState;

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setValueState(event.target.value);
            }
            if (onChange) {
                onChange(event);
            }
            if (onUpdate) {
                onUpdate(event.target.value as ValueType);
            }
        },
        [isControlled, onUpdate, onChange],
    );

    const containerProps = {
        role: 'radiogroup',
        'aria-disabled': disabled,
        'aria-label': props['aria-label'],
        'aria-labelledby': props['aria-labelledby'],
    };

    const optionsProps = options.map((option) => ({
        name: name || controlId,
        value: option.value,
        content: option.content,
        checked: currentValue === String(option.value),
        disabled: disabled || option.disabled,
        onChange: handleChange,
        onFocus: onFocus,
        onBlur: onBlur,
    }));

    return {containerProps, optionsProps};
}
