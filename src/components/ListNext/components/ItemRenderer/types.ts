import type {GroupParsedState, ItemParsedState, ListItemId, ListSizeTypes} from '../../types';

export type RenderItemContext = {
    itemState: ItemParsedState;
    /**
     * Exists if item is group
     */
    groupState?: GroupParsedState;
    isLastItem: boolean;
};

export type RenderItem<T> = (
    item: T,
    // required item props to render
    state: {
        size: ListSizeTypes;
        id: ListItemId;
        onClick?(): void;
        selected: boolean;
        disabled: boolean;
        expanded: boolean;
        active: boolean;
    },
    // internal list context props
    context: RenderItemContext,
) => React.JSX.Element;
