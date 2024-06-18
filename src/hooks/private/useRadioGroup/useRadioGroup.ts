import {useControlledState, useUniqId} from '../..';
import type {ControlGroupOption, ControlGroupProps} from '../../../components/types';
import {filterDOMProps} from '../../../components/utils/filterDOMProps';
import {useFormResetHandler} from '../useFormResetHandler';

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
    const [currentValue, setValueState] = useControlledState<string | null, ValueType>(
        value,
        // FIXME: Do not set defaultValue to first option value
        defaultValue ?? options[0]?.value ?? null,
        onUpdate,
    );

    const fieldRef = useFormResetHandler({
        initialValue: currentValue as ValueType,
        onReset: setValueState,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueState(event.target.value as ValueType);

        if (onChange) {
            onChange(event);
        }
    };

    const containerProps = {
        ...filterDOMProps(props, {labelable: true}),
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
        // FIXME: onFocus and onBlur should be on the container via useFocusWithin hook
        onFocus: onFocus,
        onBlur: onBlur,
        ref: fieldRef,
    }));

    return {containerProps, optionsProps};
}
