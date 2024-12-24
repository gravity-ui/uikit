import {useCallback, useEffect, useRef, useState} from 'react';

export function useFormResetHandler<T>({
    initialValue,
    onReset,
}: {
    initialValue: T;
    onReset: (value: T) => void;
}) {
    const [formElement, setFormElement] = useState<HTMLFormElement | null>(null);

    const resetValue = useRef(initialValue);

    useEffect(() => {
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

    const ref = useCallback(
        (node: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => {
            setFormElement(node?.form ?? null);
        },
        [],
    );

    return ref;
}
