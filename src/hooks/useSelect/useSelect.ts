import * as React from 'react';

import {useControlledState} from '../useControlledState';

import type {UseSelectOption, UseSelectProps, UseSelectResult} from './types';
import {useOpenState} from './useOpenState';

export const useSelect = <T extends unknown>({
    defaultOpen,
    onClose,
    onOpenChange,
    open,
    value: valueProps,
    defaultValue = [],
    multiple,
    onUpdate,
    disabled,
}: UseSelectProps): UseSelectResult<T> => {
    const [value, setValueInner] = useControlledState(valueProps, defaultValue, onUpdate);
    const [activeIndex, setActiveIndex] = React.useState<number>();
    const {toggleOpen, ...openState} = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open,
    });

    const setValue = React.useCallback(
        (v: string[]) => {
            if (!disabled) {
                setValueInner(v);
            }
        },
        [setValueInner, disabled],
    );

    const handleSingleSelection = React.useCallback(
        (option: UseSelectOption<T>) => {
            if (!value.includes(option.value)) {
                const nextValue = [option.value];
                setValue(nextValue);
            }

            toggleOpen(false);
        },
        [value, setValue, toggleOpen],
    );

    const handleMultipleSelection = React.useCallback(
        (option: UseSelectOption<T>) => {
            const alreadySelected = value.includes(option.value);
            const nextValue = alreadySelected
                ? value.filter((iteratedVal) => iteratedVal !== option.value)
                : [...value, option.value];

            setValue(nextValue);
        },
        [value, setValue],
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

    const handleClearValue = React.useCallback(() => {
        setValue([]);
    }, [setValue]);

    return {
        value,
        activeIndex,
        setValue,
        handleSelection,
        handleClearValue,
        toggleOpen,
        setActiveIndex,
        ...openState,
    };
};
