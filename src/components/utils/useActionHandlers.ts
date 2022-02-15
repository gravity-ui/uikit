import {KeyboardEvent, KeyboardEventHandler, useCallback} from 'react';

interface UseButtonHandlers<T> {
    onKeyDown: KeyboardEventHandler<T>;
}

/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param onClick
 */
export function useActionHandlers<T>(onClick?: (...args: any[]) => any): UseButtonHandlers<T> {
    const onKeyDown = useCallback(
        (event: KeyboardEvent<T>) => {
            if (['Enter', ' ', 'Spacebar'].includes(event.key)) {
                onClick?.(event);
            }
        },
        [onClick],
    );

    return {onKeyDown};
}
