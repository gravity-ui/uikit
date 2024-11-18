import {ARROW_SIZE} from './constants';
import type {PopupOffset} from './types';

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
