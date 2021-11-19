import {NAMESPACE} from './cn';

let nextUniqueId = 1;

export function getUniqId() {
    return `${NAMESPACE}uniq-${nextUniqueId++}`;
}
