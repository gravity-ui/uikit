import {block} from '../utils/cn';

import type {SelectSize} from './types';

export const selectBlock = block('select');

export const selectControlBlock = block('select-control');

export const selectControlButtonBlock = block('select-control__button');

export const selectListBlock = block('select-list');

export const selectClearBlock = block('select-clear');

/**
 * The heights of the rows of the new List: the row view sizes itself, and these numbers are what
 * it comes out as — the estimate for the virtualizer and the `itemHeight` of `renderOption`
 * (ListItemView `--_--min-height`)
 */
export const SIZE_TO_ITEM_HEIGHT: Record<SelectSize, number> = {
    s: 24,
    m: 28,
    l: 32,
    xl: 36,
};

/** A row on mobile is a row of size `l` */
export const MOBILE_SIZE: SelectSize = 'l';

/**
 * The heights of a section header (ListSectionHeader): the vertical padding of `--g-spacing-1`
 * twice plus the line height of the row typography — 18px, and 20px in `xl`
 */
export const SIZE_TO_GROUP_HEIGHT: Record<SelectSize, number> = {
    s: 26,
    m: 26,
    l: 26,
    xl: 28,
};

/** A header that follows other rows gets `--g-spacing-3` above instead of `--g-spacing-1` */
export const GROUP_ITEM_MARGIN_TOP = 8;

/**
 * A group with an empty label is a separator: a line with `--g-spacing-1` above and below. As the
 * first row of the list it has nothing to separate and stays at zero
 */
export const GROUP_SEPARATOR_HEIGHT = 9;

export const BORDER_WIDTH = 1;

export const POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE = 100;

/**
 * Above this many options a dev warning suggests wrapping the Select in <ListVirtualizer>: a couple
 * of hundred rows is where the DOM of the popup starts to show
 */
export const VIRTUALIZATION_HINT_OPTIONS_COUNT = 150;

export const SelectQa = {
    LIST: 'select-list',
    /** The same string the old List used (ListQa.ACTIVE_ITEM): the e2e tests of consumers live on */
    ACTIVE_ITEM: 'list-active-item',
    POPUP: 'select-popup',
    SHEET: 'select-sheet',
    CLEAR: 'select-clear',
    FILTER_INPUT: 'select-filter-input',
    COUNTER: 'select-counter',
};

export const FLATTEN_KEY = Symbol('flatten');
