import {useCallback, useState} from 'react';

type SetTrue = () => void;
type SetFalse = () => void;
type Toggle = () => void;

export function useBoolean(
    initialState: boolean | (() => boolean),
): [boolean, SetTrue, SetFalse, Toggle] {
    const [value, setValue] = useState<boolean>(initialState);
    return [
        value,
        useCallback(() => setValue(true), []),
        useCallback(() => setValue(false), []),
        useCallback(() => setValue((val) => !val), []),
    ];
}
