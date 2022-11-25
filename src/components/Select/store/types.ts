import React from 'react';

export type State = {
    filter: string;
    controlRect?: DOMRect;
};

type SetControlRect = {type: 'SET_CONTROL_RECT'; payload: {controlRect?: DOMRect}};
type SetFilter = {type: 'SET_FILTER'; payload: {filter: string}};

export type Action = SetControlRect | SetFilter;

export type Dispatch = React.Dispatch<Action>;
