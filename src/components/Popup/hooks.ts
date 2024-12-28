import * as React from 'react';

import type {PopupAnchorElement, PopupAnchorRef} from './types';

export function useAnchor(
    anchorElement: PopupAnchorElement | null | undefined,
    anchorRef: PopupAnchorRef | undefined,
): {
    element: PopupAnchorElement | null | undefined;
    ref: PopupAnchorRef | undefined;
} {
    const anchorElementRef = React.useRef(anchorElement ?? null);
    React.useEffect(() => {
        anchorElementRef.current = anchorElement ?? null;
    }, [anchorElement]);

    if (anchorElement !== undefined) {
        return {element: anchorElement, ref: anchorElementRef};
    } else if (anchorRef) {
        return {element: anchorRef.current, ref: anchorRef};
    }

    return {element: undefined, ref: undefined};
}
