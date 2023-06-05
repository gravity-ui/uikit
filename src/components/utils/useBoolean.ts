import React from 'react';

type SetTrue = () => void;
type SetFalse = () => void;
type Toggle = () => void;

export function useBoolean(
    initialState: boolean | (() => boolean),
): [boolean, SetTrue, SetFalse, Toggle] {
    const [value, setValue] = React.useState<boolean>(initialState);
    return [
        value,
        React.useCallback(() => setValue(true), []),
        React.useCallback(() => setValue(false), []),
        React.useCallback(() => setValue((val) => !val), []),
    ];
}
