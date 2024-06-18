import React from 'react';

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

    const ref = React.useCallback(
        (node: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => {
            setFormElement(node?.form ?? null);
        },
        [],
    );

    return ref;
}
