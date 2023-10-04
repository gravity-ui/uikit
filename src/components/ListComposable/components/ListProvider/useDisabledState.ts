import React from 'react';

import type {ListItemId} from '../../types';

export const useDisabledState = (outerDisabledState?: Record<ListItemId, boolean>) => {
    const firstRenderRef = React.useRef(true);
    const [state, setState] = React.useState(() => outerDisabledState || {});

    React.useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
        } else {
            setState(outerDisabledState || {});
        }
    }, [outerDisabledState]);

    return [state, setState] as const;
};
