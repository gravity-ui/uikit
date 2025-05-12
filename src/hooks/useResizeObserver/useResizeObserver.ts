import * as React from 'react';

interface UseResizeObserverProps<T> {
    ref: React.RefObject<T | null | undefined> | undefined;
    onResize: (info: ResizeInfo) => void;
    box?: ResizeObserverBoxOptions;
}

export interface ResizeInfo {
    observer?: ResizeObserver;
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
            const handleResize = () => {
                onResize({});
            };

            window.addEventListener('resize', handleResize, false);
            return () => {
                window.removeEventListener('resize', handleResize, false);
            };
        }

        const observer = new ResizeObserver((entries) => {
            if (!entries.length) {
                return;
            }
            onResize({observer});
        });

        observer.observe(element, {box});
        return () => {
            observer.disconnect();
        };
    }, [ref, onResize, box]);
}
