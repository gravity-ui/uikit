import type {VirtualElement} from '@floating-ui/react';

import {ARROW_SIZE} from './constants';
import type {PopupAnchorEl, PopupAnchorRef, PopupOffset} from './types';

export function getAnchorElementAndRef(
    anchorEl: PopupAnchorEl | undefined,
    anchorRef: PopupAnchorRef | undefined,
) {
    let element: Element | VirtualElement | undefined;
    let ref: React.RefObject<Element | VirtualElement> | undefined;

    if (anchorEl) {
        element = anchorEl;
        ref = {current: anchorEl};
    } else if (anchorRef) {
        ref = anchorRef;
        element = anchorRef.current ?? undefined;
    }

    return {element, ref};
}

export function getOffsetValue(offset: PopupOffset, hasArrow: boolean | undefined) {
    let offsetValue = offset;
    if (hasArrow) {
        if (typeof offsetValue === 'number') {
            offsetValue += ARROW_SIZE;
        } else {
            offsetValue = {...offsetValue, mainAxis: (offsetValue.mainAxis ?? 0) + ARROW_SIZE};
        }
    }

    return offsetValue;
}
