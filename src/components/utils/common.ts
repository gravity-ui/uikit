import {NAMESPACE} from './cn';
import {isOfType} from './isOfType';
import {Icon} from '../Icon';

let nextUniqueId = 1;

export function getUniqId() {
    return `${NAMESPACE}uniq-${nextUniqueId++}`;
}

export const isIcon = isOfType(Icon);
