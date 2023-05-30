import type {Action, State} from './types';

export const initialState: State = {filter: ''};

export const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_FILTER': {
            const {filter} = action.payload;
            return {...state, filter};
        }
        default: {
            return state;
        }
    }
};
