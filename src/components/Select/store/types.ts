import React from 'react';

export type State = {
    active: boolean;
    controlRect?: DOMRect;
};

type SetActive = {type: 'SET_ACTIVE'; payload: {active: boolean}};
type SetControlRect = {type: 'SET_CONTROL_RECT'; payload: {controlRect?: DOMRect}};

export type Action = SetActive | SetControlRect;

export type Dispatch = React.Dispatch<Action>;
