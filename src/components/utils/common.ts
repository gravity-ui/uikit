import type * as React from 'react';

import {Icon} from '../Icon';

import {NAMESPACE} from './cn';
import {isOfType} from './isOfType';

let nextUniqueId = 1;

export function getUniqId() {
    return `${NAMESPACE}uniq-${nextUniqueId++}`;
}

export const isSvg = isOfType<React.SVGProps<SVGSVGElement>>('svg');
export const isIcon = isOfType(Icon);
