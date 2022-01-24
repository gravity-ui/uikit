import React from 'react';

import {block} from '../utils/cn';
import {Icon} from '../Icon';
import {ChevronDownIcon} from '../icons/ChevronDownIcon';

import './ArrowToggle.scss';

export interface ArrowToggleProps {
    size?: number;
    direction?: 'top' | 'left' | 'bottom' | 'right';
    className?: string;
}

const b = block('arrow-toggle');

export function ArrowToggle({size = 16, direction = 'bottom', className}: ArrowToggleProps) {
    return (
        <span style={{width: size, height: size}} className={b({direction}, className)}>
            <Icon data={ChevronDownIcon} size={size} />
        </span>
    );
}
