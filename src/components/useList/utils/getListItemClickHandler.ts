import type {ListOnItemClick, UseListResult} from '../types';

interface GetListItemClickHandlerProps<T> {
    multiple?: boolean;
    list: UseListResult<T>;
}

export const getListItemClickHandler = <T = unknown>({
    list,
    multiple,
}: GetListItemClickHandlerProps<T>) => {
    const onItemClick: ListOnItemClick = ({id}) => {
        if (list.state.disabledById[id]) return;

        // always activate selected item
        list.state.setActiveItemId(id);

        if (list.state.expandedById && id in list.state.expandedById && list.state.setExpanded) {
            list.state.setExpanded((prevState) => ({
                ...prevState,
                [id]: !prevState[id], // expanded by id
            }));
        } else {
            list.state.setSelected((prevState) => ({
                ...(multiple ? prevState : {}),
                [id]: multiple ? !prevState[id] : true, // always select on click in single select variant
            }));
        }
    };

    return onItemClick;
};
