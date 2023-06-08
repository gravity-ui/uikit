import React from 'react';

export type UseIntersection = {
    element: Element | null;
    options?: IntersectionObserverInit;
    onIntersect?: () => void;
};

export const useIntersection = ({element, options, onIntersect}: UseIntersection) => {
    const [isVisible, setState] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setState(entry.isIntersecting);
            if (entry.isIntersecting) {
                onIntersect?.();
            }
        }, options);

        if (element) {
            observer.observe(element);
        }

        return () => (element === null ? undefined : observer.unobserve(element));
    }, [element, options, onIntersect]);

    return isVisible;
};
