import React from 'react';

import type {UseOpenProps} from '../../../hooks/useSelect/types';
import {useOpenState} from '../../../hooks/useSelect/useOpenState';
import type {ListItemId} from '../../useList/types';

type UseValueProps = {
    value?: string[];
    defaultValue?: string[];
};

export const useValue = ({defaultValue = [], value: valueProps}: UseValueProps) => {
    const [innerValue, setInnerValue] = React.useState<string[]>(defaultValue);

    const value: string[] = valueProps ?? innerValue;

    const uncontrolled = !valueProps;

    const selected: Record<string, boolean> = React.useMemo(() => {
        return value.reduce<Record<ListItemId, boolean>>((acc, val) => {
            acc[val] = true;

            return acc;
        }, {});
    }, [value]);

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
