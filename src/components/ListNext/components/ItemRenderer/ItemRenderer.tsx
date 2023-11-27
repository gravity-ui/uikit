import type {
    ItemsParsedState,
    ListGroupState,
    ListItemId,
    ListSizeTypes,
    RenderItem,
} from '../../types';

type ItemRendererProps<T> = {
    id: ListItemId;
    size?: ListSizeTypes;
    byId: Record<ListItemId, T>;
    itemsState: ItemsParsedState;
    groupsState: ListGroupState;
    selected: Record<ListItemId, boolean>;
    expanded: Record<ListItemId, boolean>;
    disabled: Record<ListItemId, boolean>;
    activeItemId?: ListItemId;
    lastItemId: ListItemId;
    onItemClick?(id: ListItemId): void;
    renderItem: RenderItem<T>;
};

export const ItemRenderer = <T,>({
    byId,
    disabled,
    expanded,
    groupsState,
    onItemClick,
    id,
    size = 'm',
    itemsState,
    lastItemId,
    selected,
    activeItemId,
    renderItem,
}: ItemRendererProps<T>) => {
    return renderItem(
        byId[id],
        {
            id,
            size,
            expanded: expanded[id],
            active: id === activeItemId,
            disabled: disabled[id],
            selected: selected[id],
            onClick: onItemClick ? () => onItemClick(id) : undefined,
        },
        {
            itemState: itemsState[id],
            groupState: groupsState[id],
            isLastItem: id === lastItemId,
        },
    );
};
