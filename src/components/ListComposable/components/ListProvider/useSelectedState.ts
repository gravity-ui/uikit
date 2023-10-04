import React from 'react';

import type {ListItemId} from '../../types';

export const useSelectedState = (_selected?: Record<ListItemId, boolean>) => {
    const isFirstRenderRef = React.useRef(true);
    const [selected, setSelected] = React.useState(() => _selected || {});

    React.useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
        } else {
            setSelected(_selected || {});
        }
    }, [_selected]);

    return [selected, setSelected] as const;
};
