import React from 'react';

import type {UseOpenProps} from '../../../hooks/useSelect/types';
import {useOpenState} from '../../../hooks/useSelect/useOpenState';
import type {ListItemId} from '../../ListNext/types';

type UseTreeSelectSelectionProps = {
    value?: ListItemId[];
    defaultValue?: ListItemId[];
    onUpdate?: (value: ListItemId[]) => void;
} & UseOpenProps;

export const useTreeSelectSelection = ({
    defaultOpen,
    onClose,
    onOpenChange,
    open: openProps,
    value: valueProps,
    defaultValue = [],
    onUpdate,
}: UseTreeSelectSelectionProps) => {
    const [innerValue, setInnerValue] = React.useState(defaultValue);

    const value = valueProps || innerValue;
    const uncontrolled = !valueProps;

    const {toggleOpen, open} = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open: openProps,
    });

    const handleSingleSelection = React.useCallback(
        (id: ListItemId) => {
            if (!value.includes(id)) {
                const nextValue = [id];
                onUpdate?.(nextValue);

                if (uncontrolled) {
                    setInnerValue(nextValue);
                }
            }

            toggleOpen(false);
        },
        [value, uncontrolled, onUpdate, toggleOpen],
    );

    const handleMultipleSelection = React.useCallback(
        (id: ListItemId) => {
            const alreadySelected = value.includes(id);
            const nextValue = alreadySelected
                ? value.filter((iteratedVal) => iteratedVal !== id)
                : [...value, id];

            onUpdate?.(nextValue);

            if (uncontrolled) {
                setInnerValue(nextValue);
            }
        },
        [value, uncontrolled, onUpdate],
    );

    const handleClearValue = React.useCallback(() => {
        onUpdate?.([]);
        setInnerValue([]);
    }, [onUpdate]);

    return {
        open,
        value,
        toggleOpen,
        handleSingleSelection,
        handleMultipleSelection,
        handleClearValue,
    };
};
