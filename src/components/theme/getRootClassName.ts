import {block} from '../utils/cn';
import type {CnMods} from '../utils/cn';

import {ROOT_CLASSNAME} from './constants';

const b = block(ROOT_CLASSNAME);

export function getRootClassName(mods: CnMods, className: string) {
    return b(mods, className);
}
