import {modToHeight} from '../constants';
import type {ListItemSize} from '../types';

export const computeItemSize = (size: ListItemSize, hasSubRows = false) => {
    return modToHeight[size][Number(hasSubRows)];
};
