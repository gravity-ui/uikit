import * as React from 'react';

import type {UseFormResetHandlerParams} from './types';

export function useFormResetHandler<T>({
    initialValue,
    onReset,
}: {
    initialValue: T;
    onReset: (value: T) => void;
}) {
    const [formElement, setFormElement] = React.useState<HTMLFormElement | null>(null);

    const resetValue = React.useRef(initialValue);

    React.useEffect(() => {
        if (!formElement) {
            return undefined;
        }

        const handleReset = () => {
            onReset(resetValue.current);
        };

        formElement.addEventListener('reset', handleReset);
        return () => {
            formElement.removeEventListener('reset', handleReset);
        };
    }, [formElement, onReset]);

    const ref = React.useCallback((node: UseFormResetHandlerParams | null) => {
        setFormElement(node?.form ?? null);
    }, []);

    return ref;
}
