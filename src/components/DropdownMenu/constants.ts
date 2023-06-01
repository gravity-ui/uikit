import type {PopperPlacement} from '../utils/usePopper';

import type {DropdownMenuListItem} from './types';

export const subMenuPlacement: PopperPlacement = ['right-start', 'left-start'];

export const dropdownMenuSeparator: DropdownMenuListItem = {text: '', action: () => {}, path: []};
