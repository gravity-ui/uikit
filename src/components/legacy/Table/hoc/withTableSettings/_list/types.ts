import type * as React from 'react';

export type ListItemId = string;

export type ListItemViewContentType = {
    title: React.ReactNode;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
};

type SetStateAction<S> = S | ((prevState: S) => S);

export type ListStateHandler<S> = (arg: SetStateAction<S>) => void;

export type ListState = {
    selectedById: Record<ListItemId, boolean>;
    setSelected: ListStateHandler<Record<ListItemId, boolean>>;
    activeItemId?: ListItemId;
    setActiveItemId: ListStateHandler<ListItemId | undefined>;
};

export type UseListResult<T> = {
    state: ListState;
    structure: {
        itemsById: Record<ListItemId, T>;
        visibleFlattenIds: ListItemId[];
    };
};

export type ListOnItemClick = (payload: {id: ListItemId}, e?: React.SyntheticEvent) => void;
