/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import type {ListState} from '../types';

interface UseListStateProps extends Partial<ListState> {}

function useControlledState<T>(value: T, defaultValue: T) {
    const [state, setState] = React.useState(value || defaultValue);

    return [value || state, setState] as const;
}

export const useListState = (props: UseListStateProps = {}) => {
    const [disabledById, setDisabled] = useControlledState(props.disabledById!, {});
    const [selectedById, setSelected] = useControlledState(props.selectedById!, {});
    const [expandedById, setExpanded] = useControlledState(props.expandedById!, {});
    const [activeItemId, setActiveItemId] = useControlledState(props.activeItemId, undefined);

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
