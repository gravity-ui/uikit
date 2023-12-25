import {block, blockNew} from '../utils/cn';

import type {RealTheme} from './types';
import type {BodyClassNameModifiers} from './updateBodyClassName';

const ROOT_CLASS_NAME = 'root';

const bNew = blockNew(ROOT_CLASS_NAME);
const b = block(ROOT_CLASS_NAME);

export function getDeprecatedBodyRootClassName(
    modifier?: Partial<BodyClassNameModifiers & {theme: RealTheme | boolean}>,
) {
    return b(modifier);
}
export function getBodyRootClassName(
    modifier?: Partial<BodyClassNameModifiers & {theme: RealTheme | boolean}>,
    addition?: string[],
) {
    return bNew(modifier, addition);
}

export function getBaseBodyRootClassName(theme?: RealTheme) {
    return getBodyRootClassName({theme});
}
