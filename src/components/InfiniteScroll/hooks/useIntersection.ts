import {useState, useEffect} from 'react';

export const useIntersection = (element: Element | null, options?: IntersectionObserverInit) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setState(entry.isIntersecting);
        }, options);

        if (element) {
            observer.observe(element);
        }

        return () => (element === null ? undefined : observer.unobserve(element));
    }, [element, options]);

    return isVisible;
};
