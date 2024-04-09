import React from 'react';

interface UseResizeObserverProps<T> {
    ref: React.RefObject<T | null | undefined> | undefined;
    onResize: () => void;
}

export function useResizeObserver<T extends Element>({ref, onResize}: UseResizeObserverProps<T>) {
    React.useEffect(() => {
        const element = ref?.current;
        if (!element) {
            return undefined;
        }

        if (typeof window.ResizeObserver === 'undefined') {
            window.addEventListener('resize', onResize, false);
            return () => {
                window.removeEventListener('resize', onResize, false);
            };
        }

        const observer = new ResizeObserver((entries) => {
            if (!entries.length) {
                return;
            }
            onResize();
        });

        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [ref, onResize]);
}
