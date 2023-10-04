import React from 'react';

export const useGroupsExpandedState = (groupsExpandedState?: Record<string, boolean>) => {
    const isFirstRenderRef = React.useRef(true);
    const [state, setState] = React.useState(() => groupsExpandedState || {});

    React.useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
        } else {
            setState(groupsExpandedState || {});
        }
    }, [groupsExpandedState]);

    return [state, setState] as const;
};
