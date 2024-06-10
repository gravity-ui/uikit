import {block} from '../utils/cn';

import {ROOT_CLASSNAME} from './constants';

const b = block(ROOT_CLASSNAME);

interface RootMods {
    theme?: string;
}

export function getRootClassName({theme}: RootMods = {}, className?: string) {
    return b({theme}, className);
}
