import React from 'react';

export function usePrevious<T>(value: T): T | undefined {
    const currentRef = React.useRef<T>(value);
    const previousRef = React.useRef<T>();
    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }
    return previousRef.current;
}
