import {State, Action} from './types';
import {initialState} from './constants';

export const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_ACTIVE': {
            const {active} = action.payload;
            return {...state, active};
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
