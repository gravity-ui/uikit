import React from 'react';

export type UseIntersection = {
    element: Element | null;
    options?: IntersectionObserverInit;
    onIntersect?: () => void;
};

export const useIntersection = ({element, options, onIntersect}: UseIntersection) => {
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
