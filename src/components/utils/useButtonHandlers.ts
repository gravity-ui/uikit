import {KeyboardEvent, KeyboardEventHandler, useCallback} from 'react';

interface UseButtonHandlers<T> {
    onKeyDown: KeyboardEventHandler<T>;
}

export function useButtonHandlers<T>(onClick?: (...args: any[]) => any): UseButtonHandlers<T> {
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
