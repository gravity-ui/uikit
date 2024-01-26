import {useControlledState} from '../../../hooks';
import type {ListState} from '../types';

interface UseListStateProps extends Partial<ListState> {}

export const useListState = (props: UseListStateProps = {}) => {
    const [disabledById, setDisabled] = useControlledState(props.disabledById, {});
    const [selectedById, setSelected] = useControlledState(props.selectedById, {});
    const [expandedById, setExpanded] = useControlledState(props.expandedById, {});
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
