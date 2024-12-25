import * as React from 'react';

export type UseIntersectionProps = {
    element: Element | null;
    options?: IntersectionObserverInit;
    onIntersect?: () => void;
};

export const useIntersection = ({element, options, onIntersect}: UseIntersectionProps) => {
    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect?.();
            }
        }, options);

        if (element) {
            observer.observe(element);
        }

        return () => (element === null ? undefined : observer.unobserve(element));
    }, [element, options, onIntersect]);
};
