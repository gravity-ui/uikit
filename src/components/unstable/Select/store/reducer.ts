import {SelectProps} from '../types';
import {State, Action} from './types';

export const getInitialState = (args: {defaultValue: SelectProps['defaultValue']}): State => {
    const {defaultValue = []} = args;

    return {
        active: false,
        innerValue: defaultValue,
        quickSearch: '',
    };
};

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_ACTIVE': {
            const {active} = action.payload;
            return {...state, active};
        }
        case 'SET_INNER_VALUE': {
            const {innerValue} = action.payload;
            return {...state, innerValue};
        }
        case 'SET_QUICK_SEARCH': {
            const {quickSearch} = action.payload;
            return {...state, quickSearch};
        }
        case 'SET_QUICK_SEARCH_TIMER': {
            const {quickSearchTimer} = action.payload;
            return {...state, quickSearchTimer};
        }
        case 'SET_CONTROL_RECT': {
            const {controlRect} = action.payload;
            return {...state, controlRect};
        }
        default: {
            return state;
        }
    }
};
