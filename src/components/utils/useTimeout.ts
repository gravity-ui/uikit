import React from 'react';

export function useTimeout(callback: VoidFunction, ms: number | null | undefined): void {
    React.useEffect(() => {
        if (typeof ms !== 'number') {
            return;
        }

        const timer = setTimeout(() => {
            callback();
        }, ms);

        return () => {
            clearTimeout(timer);
        };
    }, [callback, ms]);
}
