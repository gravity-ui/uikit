import React from 'react';

import {KeyCode} from '../../constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export type UseActionHandlersProps = AnyFunction;

export interface UseActionHandlersResult<T> {
    onKeyDown: React.KeyboardEventHandler<T>;
}

export const getKeyDownHandler = <T>(callback?: UseActionHandlersProps) => {
    return (event: React.KeyboardEvent<T>) => {
        if (
            callback &&
            [KeyCode.ENTER, KeyCode.SPACEBAR, KeyCode.SPACEBAR_OLD].includes(event.key)
        ) {
            // eslint-disable-next-line callback-return
            callback(event);
        }
    };
};

/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @return {onKeyDown}
 */
export function useActionHandlers<T>(
    callback?: UseActionHandlersProps,
): UseActionHandlersResult<T> {
    const onKeyDown = React.useCallback(getKeyDownHandler(callback), [callback]);

    return {onKeyDown};
}
