import React from 'react';

export type State = {
    active: boolean;
    innerValue: string[];
    quickSearch: string;
    quickSearchTimer?: number;
    controlRect?: DOMRect;
};

type SetActive = {type: 'SET_ACTIVE'; payload: {active: boolean}};
type SetInnerValue = {type: 'SET_INNER_VALUE'; payload: {innerValue: string[]}};
type SetQuickSearch = {type: 'SET_QUICK_SEARCH'; payload: {quickSearch: string}};
type SetQuickSearchTimer = {
    type: 'SET_QUICK_SEARCH_TIMER';
    payload: {quickSearchTimer?: number};
};
type SetControlRect = {type: 'SET_CONTROL_RECT'; payload: {controlRect?: DOMRect}};

export type Action =
    | SetActive
    | SetInnerValue
    | SetQuickSearch
    | SetQuickSearchTimer
    | SetControlRect;

export type Dispatch = React.Dispatch<Action>;
