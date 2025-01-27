import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './ArrowToggle.scss';

export interface ArrowToggleProps extends QAProps {
    size?: number;
    direction?: 'top' | 'left' | 'bottom' | 'right';
    className?: string;
}

const b = block('arrow-toggle');

export function ArrowToggle({size = 16, direction = 'bottom', className, qa}: ArrowToggleProps) {
    return (
        <span
            style={{width: size, height: size}}
            className={b({direction}, className)}
            data-qa={qa}
        >
            <Icon data={ChevronDown} size={size} />
        </span>
    );
}
