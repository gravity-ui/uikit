import React from 'react';

import {ArrowDown, ArrowUp} from '@gravity-ui/icons';

import {Icon} from '../../../../Icon';
import {block} from '../../../../utils/cn';

import './SortIndicator.scss';

export interface SortIndicatorProps {
    order?: 'asc' | 'desc';
}

const b = block('sort-indicator');

export function SortIndicator({order = 'asc'}: SortIndicatorProps) {
    return (
        <div className={b()}>
            <Icon data={order === 'asc' ? ArrowUp : ArrowDown} size={14} className={b('icon')} />
        </div>
    );
}
