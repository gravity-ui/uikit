import type * as React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './ArrowToggle.scss';

export interface ArrowToggleProps extends QAProps {
    size?: number;
    direction?: 'top' | 'left' | 'bottom' | 'right';
    transitionDuration?: number;
    className?: string;
}

const b = block('arrow-toggle');

export function ArrowToggle({
    size = 16,
    direction = 'bottom',
    transitionDuration,
    className,
    qa,
}: ArrowToggleProps) {
    const style: React.CSSProperties =
        transitionDuration === undefined
            ? {width: size, height: size}
            : {width: size, height: size, transitionDuration: `${transitionDuration}ms`};

    return (
        <span style={style} className={b({direction}, className)} data-qa={qa}>
            <Icon data={ChevronDown} size={size} />
        </span>
    );
}
