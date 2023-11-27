import {block} from '../utils/cn';

import type {ListSizeTypes} from './types';

import './ListRadiuses.scss';

export const LIST_ITEM_DATA_ATR = 'data-list-item';

const _bListRadiuses = block('list-radiuses');
export const bListRadiuses = ({size}: {size: ListSizeTypes}, className?: string) =>
    _bListRadiuses({[size]: true}, className);

export const GROUPED_ID_SEPARATOR = '-';

export const modToHeight = {
    s: [24, 44],
    m: [28, 48],
    l: [36, 52],
    xl: [44, 58],
} as const;
