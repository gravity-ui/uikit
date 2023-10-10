import React from 'react';

import {useUniqId} from '../../hooks';
import type {ControlGroupProps} from '../types';

export function useRadioGroup(props: ControlGroupProps) {
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
    const isControlled = typeof value === 'string';
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
                onUpdate(event.target.value);
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
        value: String(option.value),
        content: option.content,
        checked: currentValue === String(option.value),
        disabled: disabled || option.disabled,
        onChange: handleChange,
        onFocus: onFocus,
        onBlur: onBlur,
    }));

    return {containerProps, optionsProps};
}
