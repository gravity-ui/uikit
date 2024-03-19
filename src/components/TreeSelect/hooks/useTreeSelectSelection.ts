import React from 'react';

import type {UseOpenProps} from '../../../hooks/useSelect/types';
import {useOpenState} from '../../../hooks/useSelect/useOpenState';
import type {ListItemId} from '../../useList/types';

type UseValueProps = {
    value?: ListItemId[];
    defaultValue?: ListItemId[];
};

export const useValue = ({defaultValue, value: valueProps}: UseValueProps) => {
    const [innerValue, setInnerValue] = React.useState(defaultValue || []);

    const value = valueProps || innerValue;
    const uncontrolled = !valueProps;

    const selected = React.useMemo(
        () =>
            value.reduce<Record<ListItemId, boolean>>((acc, value) => {
                acc[value] = true;
                return acc;
            }, {}),
        [value],
    );

    return {
        selected,
        value,
        /**
         * Available only if `uncontrolled` component valiant
         */
        setInnerValue: uncontrolled ? setInnerValue : undefined,
    };
};

type UseTreeSelectSelectionProps = {
    value: ListItemId[];
    setInnerValue?(ids: ListItemId[]): void;
    onUpdate?: (value: ListItemId[]) => void;
} & UseOpenProps;

export const useTreeSelectSelection = ({
    value,
    setInnerValue,
    defaultOpen,
    onClose,
    onOpenChange,
    open: openProps,
    onUpdate,
}: UseTreeSelectSelectionProps) => {
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

                setInnerValue?.(nextValue);
            }

            toggleOpen(false);
        },
        [value, toggleOpen, onUpdate, setInnerValue],
    );

    const handleMultipleSelection = React.useCallback(
        (id: ListItemId) => {
            const alreadySelected = value.includes(id);
            const nextValue = alreadySelected
                ? value.filter((iteratedVal) => iteratedVal !== id)
                : [...value, id];

            onUpdate?.(nextValue);

            setInnerValue?.(nextValue);
        },
        [value, onUpdate, setInnerValue],
    );

    const handleClearValue = React.useCallback(() => {
        onUpdate?.([]);
        setInnerValue?.([]);
    }, [onUpdate, setInnerValue]);

    return {
        open,
        toggleOpen,
        handleSingleSelection,
        handleMultipleSelection,
        handleClearValue,
    };
};
