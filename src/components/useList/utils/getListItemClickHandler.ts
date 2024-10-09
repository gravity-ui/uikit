import type {ListOnItemClick, UseListResult} from '../types';

interface GetListItemClickHandlerProps<T, M> {
    multiple?: M;
    list: UseListResult<T>;
}

export const getListItemClickHandler = <T = unknown, M extends boolean = false>({
    list,
    multiple,
}: GetListItemClickHandlerProps<T, M>) => {
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
