import * as React from 'react';

export const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
    const isInitial = React.useRef(true);

    React.useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }

        effect();
    }, deps);
};
