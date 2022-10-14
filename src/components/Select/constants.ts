import {block} from '../utils/cn';
import {SelectProps} from './types';

export const LIST_CLASSNAME = block('select-popup')('list');

export const SIZE_TO_ITEM_HEIGHT: Record<NonNullable<SelectProps['size']>, number> = {
    s: 28,
    m: 28,
    l: 32,
    xl: 36,
};

export const GROUP_ITEM_MARGIN_TOP = 5;

export const CONTAINER_VERTICAL_MARGIN = 4;

export const BORDER_WIDTH = 1;

export const POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE = 100;

export const QUICK_SEARCH_TIMEOUT = 2000;

export const SelectQa = {
    POPUP: 'select-popup',
};
