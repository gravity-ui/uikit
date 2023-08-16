import React from 'react';

import {EKeyCode, KeyCode} from '../constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

interface UseActionHandlersResult<T> {
    onKeyDown: React.KeyboardEventHandler<T>;
}

/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @param keyCodes
 * @return {onKeyDown}
 */
export function useActionHandlers<T>(
    callback?: AnyFunction,
    keyCodes: EKeyCode[] = [],
): UseActionHandlersResult<T> {
    const keyCodesValues = React.useMemo(() => keyCodes.map((key) => KeyCode[key]), [keyCodes]);

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<T>) => {
            if (callback && keyCodesValues.includes(event.key)) {
                callback(event);
            }
        },
        [callback, keyCodesValues],
    );

    return {onKeyDown};
}
