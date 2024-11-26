import {ARROW_SIZE, AUTO_PLACEMENTS} from './constants';
import type {AutoPlacement, PopupOffset} from './types';

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

export function isAutoPlacement(placement: string): placement is AutoPlacement {
    return AUTO_PLACEMENTS.includes(placement as AutoPlacement);
}
