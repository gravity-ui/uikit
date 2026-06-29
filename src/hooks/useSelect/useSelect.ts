import * as React from 'react';

import {useControlledState} from '../useControlledState';

import type {UseSelectOption, UseSelectProps, UseSelectResult} from './types';
import {useOpenState} from './useOpenState';

export function useSelect<T extends unknown, V = string>(
    props: UseSelectProps<V>,
): UseSelectResult<T, V>;
// Non-generic overload: keeps type utilities that do not go through inference
// (e.g. ReturnType/Parameters of useSelect) resolving to string values
export function useSelect(props: UseSelectProps): UseSelectResult<unknown>;
export function useSelect<T extends unknown, V = string>({
    defaultOpen,
    onClose,
    onOpenChange,
    open,
    value: valueProps,
    defaultValue = [],
    multiple,
    onUpdate,
    disabled,
}: UseSelectProps<V>): UseSelectResult<T, V> {
    const [value, setValueInner] = useControlledState(valueProps, defaultValue, onUpdate);
    const [activeIndex, setActiveIndex] = React.useState<number>();
    const {toggleOpen, ...openState} = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open,
    });

    const setValue = React.useCallback(
        (v: V[]) => {
            if (!disabled) {
                setValueInner(v);
            }
        },
        [setValueInner, disabled],
    );

    const handleSingleSelection = React.useCallback(
        (option: UseSelectOption<T, V>) => {
            if (!value.includes(option.value)) {
                const nextValue = [option.value];
                setValue(nextValue);
            }

            toggleOpen(false);
        },
        [value, setValue, toggleOpen],
    );

    const handleMultipleSelection = React.useCallback(
        (option: UseSelectOption<T, V>) => {
            const alreadySelected = value.includes(option.value);
            const nextValue = alreadySelected
                ? value.filter((iteratedVal) => iteratedVal !== option.value)
                : [...value, option.value];

            setValue(nextValue);
        },
        [value, setValue],
    );

    const handleSelection = React.useCallback(
        (option: UseSelectOption<T, V>) => {
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
}
