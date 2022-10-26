import React from 'react';

export type State = {
    quickSearch: string;
    quickSearchTimer?: number;
    controlRect?: DOMRect;
};

type SetQuickSearch = {type: 'SET_QUICK_SEARCH'; payload: {quickSearch: string}};
type SetQuickSearchTimer = {
    type: 'SET_QUICK_SEARCH_TIMER';
    payload: {quickSearchTimer?: number};
};
type SetControlRect = {type: 'SET_CONTROL_RECT'; payload: {controlRect?: DOMRect}};

export type Action = SetQuickSearch | SetQuickSearchTimer | SetControlRect;

export type Dispatch = React.Dispatch<Action>;
