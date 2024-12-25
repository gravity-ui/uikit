import * as React from 'react';

import type {ListItemId, ListState, ListStateHandler} from '../../useList/types';

type UseControlledValueProps = {
    value?: string[];
    defaultValue?: string[];
    onUpdate?(ids: ListItemId[]): void;
};

const prepareParams = (selectedById: ListState['selectedById']): ListItemId[] =>
    Object.entries(selectedById).reduce<ListItemId[]>((acc, [id, value]) => {
        if (value) {
            acc.push(id);
        }
        return acc;
    }, []);

export const useControlledValue = ({
    defaultValue = [],
    value: valueProps,
    onUpdate,
}: UseControlledValueProps) => {
    const [innerValue, setInnerValue] = React.useState<string[]>(defaultValue);

    const value: string[] = valueProps ?? innerValue;

    const uncontrolled = !valueProps;

    const result = React.useMemo(() => {
        const selectedById = value.reduce<ListState['selectedById']>((acc, val) => {
            acc[val] = true;

            return acc;
        }, {});

        const setSelected: ListStateHandler<Record<ListItemId, boolean>> = (payload) => {
            const nextValue = typeof payload === 'function' ? payload(selectedById) : payload;
            const preparedValue = prepareParams(nextValue);

            if (uncontrolled) {
                setInnerValue(preparedValue);
            } else {
                onUpdate?.(preparedValue);
            }
        };

        return {
            value,
            selectedById,
            setSelected,
            /**
             * Available only if `uncontrolled` component valiant
             */
            setInnerValue: uncontrolled ? setInnerValue : undefined,
        };
    }, [onUpdate, uncontrolled, value]);

    return result;
};
