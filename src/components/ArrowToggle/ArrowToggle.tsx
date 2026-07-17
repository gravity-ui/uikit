import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './ArrowToggle.scss';

export interface ArrowToggleProps extends QAProps {
    size?: number;
    direction?: 'top' | 'left' | 'bottom' | 'right';
    className?: string;
}

const b = block('arrow-toggle');

export function ArrowToggle(rawProps: ArrowToggleProps) {
    const {
        size = 16,
        direction = 'bottom',
        className,
        qa,
    } = useDefaultProps('ArrowToggle', rawProps);
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
