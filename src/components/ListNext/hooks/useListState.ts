/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import type {ListItemId} from '../types';

interface UseListStateProps {
    disabled?: Record<ListItemId, boolean>;
    selected?: Record<ListItemId, boolean>;
    expanded?: Record<ListItemId, boolean>;
    initialActiveItemId?: ListItemId;
    controlled?: boolean;
}

function useControlledState<T>(value: T, defaultValue: T, controlled = false) {
    const initialValueRef = React.useRef(value);
    const [state, setState] = React.useState(value || defaultValue);

    if (initialValueRef.current !== value && controlled) {
        initialValueRef.current = value;
        setState(value);
    }

    return [state, setState] as const;
}

export const useListState = (props: UseListStateProps = {}) => {
    // state default value infered by second argument
    const [disabled, setDisabled] = useControlledState(props.disabled!, {}, props.controlled);
    const [selected, setSelected] = useControlledState(props.selected!, {}, props.controlled);
    const [expanded, setExpanded] = useControlledState(props.expanded!, {}, props.controlled);
    const [activeItemId, setActiveItemId] = useControlledState(
        props.initialActiveItemId,
        undefined,
        props.controlled,
    );

    return {
        disabled,
        setDisabled,
        selected,
        setSelected,
        expanded,
        setExpanded,
        activeItemId,
        setActiveItemId,
    };
};
