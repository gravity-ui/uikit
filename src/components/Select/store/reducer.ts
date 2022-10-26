import type {State, Action} from './types';

export const getInitialState = (): State => ({quickSearch: ''});

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
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
