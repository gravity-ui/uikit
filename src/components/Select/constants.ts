import {block} from '../utils/cn';

import type {SelectSize} from './types';

export const selectBlock = block('select');

export const selectControlBlock = block('select-control');

export const selectControlButtonBlock = block('select-control__button');

export const selectListBlock = block('select-list');

export const selectClearBlock = block('select-clear');

export const SIZE_TO_ITEM_HEIGHT: Record<SelectSize, number> = {
    s: 28,
    m: 28,
    l: 32,
    xl: 36,
};

export const MOBILE_ITEM_HEIGHT = 32;

export const GROUP_ITEM_MARGIN_TOP = 5;

export const BORDER_WIDTH = 1;

export const POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE = 100;

export const QUICK_SEARCH_TIMEOUT = 2000;

export const DEFAULT_VIRTUALIZATION_THRESHOLD = 50;

export const SelectQa = {
    LIST: 'select-list',
    POPUP: 'select-popup',
    SHEET: 'select-sheet',
    CLEAR: 'select-clear',
    FILTER_INPUT: 'select-filter-input',
    COUNTER: 'select-counter',
};

export const FLATTEN_KEY = Symbol('flatten');
