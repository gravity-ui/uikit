import {useStateWithCallback} from '../useStateWithCallback';

export type UseConditionallyControlledStateResult<T extends unknown> = [
    T,
    React.Dispatch<React.SetStateAction<T>>,
];

export function useConditionallyControlledState<T>(
    property?: T,
    setProperty?: React.Dispatch<React.SetStateAction<T>> | ((value: T) => void),
    initialState?: T | (() => T),
    isControlled = property !== undefined && setProperty !== undefined,
): UseConditionallyControlledStateResult<T> {
    const state = useStateWithCallback<T>((property || initialState) as T, setProperty);

    if (isControlled) {
        return [property, setProperty] as UseConditionallyControlledStateResult<T>;
    }

    return state;
}
