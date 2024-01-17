import {modToHeight} from '../constants';
import type {ListItemSizeType} from '../types';

export const computeItemSize = (size: ListItemSizeType, hasSubRows = false) => {
    return modToHeight[size][Number(hasSubRows)];
};
