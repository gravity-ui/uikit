import * as React from 'react';

interface UseResizeObserverProps<T> {
    ref:
        | React.RefObject<T | null | undefined>
        | undefined
        | (React.RefObject<T | null | undefined> | undefined)[];
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
        const elements = (Array.isArray(ref) ? ref : [ref])
            .map((elementRef) => elementRef?.current)
            .filter((element): element is T => Boolean(element));

        if (!elements.length) {
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

        elements.forEach((element) => observer.observe(element, {box}));
        return () => {
            observer.disconnect();
        };
    }, [onResize, box, ref]);
}
