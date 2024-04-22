/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import type {ListState} from '../types';

interface UseListStateProps {
    /**
     * Initial state values
     */
    initialValues?: Partial<ListState>;
    /**
     * Ability to pass link to another state value
     *
     * ```tsx
     * const listState = useListState()
     *
     * // inside your component
     * const innerListState = useListState({
     *  controlledValues: listState
     * })
     * ```
     */
    controlledValues?: Partial<ListState>;
}

function useControlledState<T>(value: T, defaultValue: T) {
    const [state, setState] = React.useState(value || defaultValue);

    return [value || state, setState] as const;
}

export const useListState = ({initialValues, controlledValues}: UseListStateProps = {}) => {
    const [disabledById, setDisabled] = useControlledState(
        controlledValues?.disabledById!,
        initialValues?.disabledById || {},
    );
    const [selectedById, setSelected] = useControlledState(
        controlledValues?.selectedById!,
        initialValues?.selectedById || {},
    );
    const [expandedById, setExpanded] = useControlledState(
        controlledValues?.expandedById!,
        initialValues?.expandedById || {},
    );
    const [activeItemId, setActiveItemId] = useControlledState(
        controlledValues?.activeItemId,
        initialValues?.activeItemId,
    );

    return {
        disabledById,
        setDisabled,
        selectedById,
        setSelected,
        expandedById,
        setExpanded,
        activeItemId,
        setActiveItemId,
    };
};
