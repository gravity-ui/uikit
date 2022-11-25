import type {State, Action} from './types';

export const initialState: State = {filter: ''};

export const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_CONTROL_RECT': {
            const {controlRect} = action.payload;
            return {...state, controlRect};
        }
        case 'SET_FILTER': {
            const {filter} = action.payload;
            return {...state, filter};
        }
        default: {
            return state;
        }
    }
};
