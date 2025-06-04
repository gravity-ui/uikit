import {Icon} from '../Icon';

import {NAMESPACE} from './cn';
import {isOfType} from './isOfType';

let nextUniqueId = 1;

export function getUniqId() {
    return `${NAMESPACE}uniq-${nextUniqueId++}`;
}

export const isSvg = isOfType('svg');
export const isIcon = isOfType(Icon);

const getHash = (seed: string) => {
    let hash = 0;

    for (let index = 0; index < seed.length; index++) {
        // eslint-disable-next-line no-bitwise
        hash = seed.charCodeAt(index) + ((hash << 5) - hash);
    }

    return hash;
};

export const randomIndex = (seed: string, max: number) => {
    if (max === 0) {
        return 0;
    }

    const hash = getHash(seed);

    return Math.abs(hash) % max;
};

const MASK = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const randomString = (length: number) => {
    let result = '';

    for (let index = length; index >= 0; index--) {
        result += MASK[Math.round(Math.random() * (MASK.length - 1))];
    }

    return result;
};
