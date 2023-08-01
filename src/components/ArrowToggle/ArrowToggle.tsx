import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {block} from '../utils/cn';

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
            <Icon data={ChevronDown} size={size} />
        </span>
    );
}
