import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

interface UseActionHandlersResult<T> {
    onKeyDown: React.KeyboardEventHandler<T>;
}

/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @return {onKeyDown}
 */
export function useActionHandlers<T>(callback?: AnyFunction): UseActionHandlersResult<T> {
    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<T>) => {
            if (callback && ['Enter', ' ', 'Spacebar'].includes(event.key)) {
                return callback(event);
            }

            return undefined;
        },
        [callback],
    );

    return {onKeyDown};
}
