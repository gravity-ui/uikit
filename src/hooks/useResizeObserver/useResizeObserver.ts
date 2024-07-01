import React from 'react';

interface UseResizeObserverProps<T> {
    ref: React.RefObject<T | null | undefined> | undefined;
    onResize: () => void;
    box?: ResizeObserverBoxOptions;
}

export function useResizeObserver<T extends Element>({
    ref,
    onResize,
    box,
}: UseResizeObserverProps<T>) {
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

        observer.observe(element, {box});
        return () => {
            observer.disconnect();
        };
    }, [ref, onResize, box]);
}
