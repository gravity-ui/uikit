import type {DropdownMenuListItem} from '../types';

import {isSeparator} from './isSeparator';

export function shouldSkipItemNavigation<T>(item: DropdownMenuListItem<T>) {
    return item.disabled || isSeparator(item);
}
