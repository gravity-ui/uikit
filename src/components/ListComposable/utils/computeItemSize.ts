import {modToHeight} from '../constants';
import type {ListItemBaseData, ListSizeTypes} from '../types';

export const computeItemSize = (size: ListSizeTypes, item?: ListItemBaseData) => {
    return modToHeight[size][item ? Number(Boolean(item.subtitle)) : 0];
};
