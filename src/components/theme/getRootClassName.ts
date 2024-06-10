import {block} from '../utils/cn';

import {ROOT_CLASSNAME} from './constants';
import type {RealTheme} from './types';

const b = block(ROOT_CLASSNAME);

interface RootMods {
    theme?: RealTheme;
}

export function getRootClassName({theme}: RootMods = {}, className?: string) {
    return b({theme}, className);
}
