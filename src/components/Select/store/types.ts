export type State = {
    filter: string;
    controlRect?: DOMRect;
};

type SetFilter = {type: 'SET_FILTER'; payload: {filter: string}};

export type Action = SetFilter;

export type Dispatch = React.Dispatch<Action>;
