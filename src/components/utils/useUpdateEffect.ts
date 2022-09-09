import {useEffect, useRef} from 'react';

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const isInitial = useRef(true);

    useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }

        effect();
    }, deps);
};
