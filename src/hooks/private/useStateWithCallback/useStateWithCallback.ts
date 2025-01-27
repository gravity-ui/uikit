import * as React from 'react';

import {isFunction} from '../../../components/utils/typeCheckers';

export function useStateWithCallback<T>(
    initialValue: T,
    callback?: (value: T) => void,
): [T, (nextValue: T | ((prevValue: T) => T)) => void] {
    const [state, setState] = React.useState(initialValue);

    const setWithCallback = React.useCallback(
        (nextValue: T | ((value: T) => T)) => {
            if (isFunction(nextValue)) {
                setState((previousState: T) => {
                    const newState = nextValue(previousState);
                    callback?.(newState);
                    return newState;
                });
            } else {
                callback?.(nextValue);
                setState(nextValue);
            }
        },
        [callback],
    );

    return [state, setWithCallback];
}
