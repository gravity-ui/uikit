import {modToHeight} from '../constants';
import type {ListSizeTypes} from '../types';

export const computeItemSize = (size: ListSizeTypes, hasSubRows = false) => {
    return modToHeight[size][Number(hasSubRows)];
};
