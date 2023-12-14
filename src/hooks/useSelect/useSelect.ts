import React from 'react';

import type {UseSelectOption, UseSelectProps, UseSelectResult} from './types';
import {useOpenState} from './useOpenState';

export const useSelect = <T extends unknown>(props: UseSelectProps): UseSelectResult<T> => {
    const {value: valueProps, defaultValue = [], multiple, onUpdate} = props;
    const [innerValue, setInnerValue] = React.useState(defaultValue);
    const [activeIndex, setActiveIndex] = React.useState<number>();
    const value = valueProps || innerValue;
    const uncontrolled = !valueProps;
    const {toggleOpen, ...openState} = useOpenState(props);

    const handleUpdateValue = React.useCallback(
        (nextValue: string[]) => {
            onUpdate?.(nextValue);

            if (uncontrolled) {
                setInnerValue(nextValue);
            }
        },
        [uncontrolled, onUpdate],
    );

    const handleSingleSelection = React.useCallback(
        (option: UseSelectOption<T>) => {
            if (!value.includes(option.value)) {
                const nextValue = [option.value];
                handleUpdateValue(nextValue);
            }

            toggleOpen(false);
        },
        [value, handleUpdateValue, toggleOpen],
    );

    const handleMultipleSelection = React.useCallback(
        (option: UseSelectOption<T>) => {
            const alreadySelected = value.includes(option.value);
            const nextValue = alreadySelected
                ? value.filter((iteratedVal) => iteratedVal !== option.value)
                : [...value, option.value];
            handleUpdateValue(nextValue);
        },
        [value, handleUpdateValue],
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
        onUpdate?.([]);
        setInnerValue([]);
    }, [onUpdate]);

    return {
        value,
        activeIndex,
        handleSelection,
        handleClearValue,
        handleUpdateValue,
        /**
         * @deprecated use toggleOpen
         */
        setOpen: toggleOpen,
        toggleOpen,
        setActiveIndex,
        ...openState,
    };
};
