import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../ListItemView/constants';
import {block} from '../utils/cn';

import type {SelectSize} from './types';

export const selectBlock = block('select');

export const selectControlBlock = block('select-control');

export const selectControlButtonBlock = block('select-control__button');

export const selectListBlock = block('select-list');

export const selectClearBlock = block('select-clear');

/** The heights of the rows and group headers: the estimate and the `itemHeight` of `renderOption` */
export const SIZE_TO_ITEM_HEIGHT: Record<SelectSize, number> = LIST_ITEM_VIEW_MIN_HEIGHT;

/** A row on mobile is a row of size `xl`: 44px of height and the bigger text */
export const MOBILE_SIZE: SelectSize = 'xl';

/** A header that follows other rows gets `--g-spacing-2` more above, for the separating line */
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
