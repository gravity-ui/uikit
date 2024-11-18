import React from 'react';

import type {PopupAnchorElement, PopupAnchorRef} from './types';

export function useAnchor(
    anchorEl: PopupAnchorElement | null | undefined,
    anchorRef: PopupAnchorRef | undefined,
): {
    element: PopupAnchorElement | null | undefined;
    ref: PopupAnchorRef | undefined;
} {
    const anchorElementRef = React.useRef(anchorEl ?? null);
    React.useEffect(() => {
        anchorElementRef.current = anchorEl ?? null;
    }, [anchorEl]);

    if (anchorEl !== undefined) {
        return {element: anchorEl, ref: anchorElementRef};
    } else if (anchorRef) {
        return {element: anchorRef.current, ref: anchorRef};
    }

    return {element: undefined, ref: undefined};
}
