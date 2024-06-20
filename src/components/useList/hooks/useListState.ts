/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import type {ListState} from '../types';

export interface UseListStateProps {
    /**
     * Initial state values
     */
    initialValues?: Partial<ListState>;
    withExpandedState?: boolean;
}

export const useListState = ({initialValues, withExpandedState}: UseListStateProps): ListState => {
    const initialValuesRef = React.useRef(initialValues);
    const needToUpdateInitValues = initialValuesRef.current !== initialValues;
    initialValuesRef.current = initialValues;

    const [disabledById, setDisabled] = React.useState(() => initialValues?.disabledById ?? {});
    const [selectedById, setSelected] = React.useState(() => initialValues?.selectedById ?? {});
    const [expandedById, setExpanded] = React.useState(() => initialValues?.expandedById ?? {});
    const [activeItemId, setActiveItemId] = React.useState(() => initialValues?.activeItemId);

    if (needToUpdateInitValues) {
        if (initialValues?.disabledById) {
            setDisabled((prevValues) => ({...initialValues.disabledById, ...prevValues}));
        }
        if (initialValues?.selectedById) {
            setSelected((prevValues) => ({...initialValues.selectedById, ...prevValues}));
        }
        if (initialValues?.expandedById) {
            setExpanded((prevValues) => ({...initialValues.expandedById, ...prevValues}));
        }
        setActiveItemId((prevValue) => prevValue ?? initialValues?.activeItemId);
    }

    const result: ListState = {
        disabledById,
        selectedById,
        activeItemId,
        setDisabled,
        setSelected,
        setActiveItemId,
    };

    if (withExpandedState) {
        result.expandedById = expandedById;
        result.setExpanded = setExpanded;
    }

    return result;
};
