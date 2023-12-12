import {block, blockNew} from '../utils/cn';

import type {RealTheme} from './types';

const ROOT_CLASS_NAME = 'root';

const bNew = blockNew(ROOT_CLASS_NAME);
const b = block(ROOT_CLASS_NAME);

export function getDeprecatedBodyRootClassName(
    modifier?: Record<string, string | boolean | undefined>,
) {
    return b(modifier);
}
export function getBodyRootClassName(
    modifier?: Record<string, string | boolean | undefined>,
    addition?: string[],
) {
    return bNew(modifier, addition);
}

export function getBaseBodyRootClassName(theme?: RealTheme) {
    return getBodyRootClassName({theme});
}
