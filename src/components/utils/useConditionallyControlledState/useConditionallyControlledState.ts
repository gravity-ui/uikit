import type {Dispatch, SetStateAction} from 'react';

import {useStateWithCallback} from '../useStateWithCallback';

type UseConditionallyControlledStateResult<T extends unknown> = [T, Dispatch<SetStateAction<T>>];

export function useConditionallyControlledState<T>(
    property?: T,
    setProperty?: Dispatch<SetStateAction<T>> | ((value: T) => void),
    initialState?: T | (() => T),
    isControlled = property !== undefined && setProperty !== undefined,
): UseConditionallyControlledStateResult<T> {
    const state = useStateWithCallback<T>((property || initialState) as T, setProperty);

    if (isControlled) {
        return [property, setProperty] as UseConditionallyControlledStateResult<T>;
    }

    return state;
}
