import {KeyboardEvent, KeyboardEventHandler, useCallback} from 'react';

interface UseActionHandlersResult<T> {
    onKeyDown: KeyboardEventHandler<T>;
}

/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 */
export function useActionHandlers<T>(
    callback?: (...args: any[]) => any,
): UseActionHandlersResult<T> {
    const onKeyDown = useCallback(
        (event: KeyboardEvent<T>) => {
            if (['Enter', ' ', 'Spacebar'].includes(event.key)) {
                callback?.(event);
            }
        },
        [callback],
    );

    return {onKeyDown};
}
