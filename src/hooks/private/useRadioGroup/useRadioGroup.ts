import * as React from 'react';

import {useControlledState, useFocusWithin, useUniqId} from '../..';
import type {ControlGroupOption, ControlGroupProps} from '../../../components/types';
import {filterDOMProps} from '../../../components/utils/filterDOMProps';
import {useFormResetHandler} from '../useFormResetHandler';

import type {RadioGroupContextProps} from './types';

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
    contextProps: RadioGroupContextProps;
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
    const [currentValue, setValueState] = useControlledState<string | null, ValueType>(
        value,
        defaultValue ?? null,
        onUpdate,
    );

    const fieldRef = useFormResetHandler({
        initialValue: currentValue as ValueType,
        onReset: setValueState,
    });

    const {focusWithinProps} = useFocusWithin({onFocusWithin: onFocus, onBlurWithin: onBlur});

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValueState(event.target.value as ValueType);

            if (onChange) {
                onChange(event);
            }
        },
        [onChange, setValueState],
    );

    const contextProps = React.useMemo(
        () => ({
            name: name || controlId,
            currentValue,
            disabled: Boolean(disabled),
            ref: fieldRef,
            onChange: handleChange,
        }),
        [controlId, currentValue, disabled, fieldRef, handleChange, name],
    );

    const containerProps = {
        ...filterDOMProps(props, {labelable: true}),
        ...focusWithinProps,
        role: 'radiogroup',
        'aria-disabled': disabled,
    };

    const optionsProps: OptionsProps<ValueType>[] = options.map((option) => ({
        name: name || controlId,
        value: option.value,
        content: option.content,
        title: option.title,
        checked: currentValue === String(option.value),
        disabled: disabled || option.disabled,
        onChange: handleChange,
        ref: fieldRef,
    }));

    return {containerProps, optionsProps, contextProps};
}
