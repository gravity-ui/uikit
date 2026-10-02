import {dropdownMenuSeparator} from '../constants';
import type {DropdownMenuListItem} from '../types';

export function isSeparator<T>(item: DropdownMenuListItem<T>) {
    return item === dropdownMenuSeparator;
}
