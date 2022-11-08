import React from 'react';
import type {UseSelectOption, UseSelectProps} from './types';

export const useSelect = <T extends unknown>(props: UseSelectProps) => {
    const {value: valueProps, defaultValue = [], multiple, defaultOpen = false, onUpdate} = props;
    const [innerValue, setInnerValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(defaultOpen);
    const value = valueProps || innerValue;
    const uncontrolled = !valueProps;

    const handleSingleSelection = React.useCallback(
        (option: UseSelectOption<T>) => {
            if (!value.includes(option.value)) {
                const nextValue = [option.value];
                onUpdate?.(nextValue);

                if (uncontrolled) {
                    setInnerValue(nextValue);
                }
            }

            setOpen(false);
        },
        [value, uncontrolled, onUpdate],
    );

    const handleMultipleSelection = React.useCallback(
        (option: UseSelectOption<T>) => {
            const alreadySelected = value.includes(option.value);
            const nextValue = alreadySelected
                ? value.filter((iteratedVal) => iteratedVal !== option.value)
                : [...value, option.value];

            onUpdate?.(nextValue);

            if (uncontrolled) {
                setInnerValue(nextValue);
            }
        },
        [value, uncontrolled, onUpdate],
    );

    const handleSelection = React.useCallback(
        (option: UseSelectOption<T>) => {
            if (multiple) {
                handleMultipleSelection(option);
            } else {
                handleSingleSelection(option);
            }
        },
        [multiple, handleSingleSelection, handleMultipleSelection],
    );

    return {
        value,
        open,
        setOpen,
        handleSelection,
    };
};
