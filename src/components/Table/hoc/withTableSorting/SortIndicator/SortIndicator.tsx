import React from 'react';

import {ArrowDown, ArrowUp, ArrowUpArrowDown} from '@gravity-ui/icons';

import {Icon} from '../../../../Icon';
import {block} from '../../../../utils/cn';

import './SortIndicator.scss';

export interface SortIndicatorProps {
    order?: 'asc' | 'desc';
}

const b = block('sort-indicator');

export function SortIndicator({order}: SortIndicatorProps) {
    let icon;
    switch (order) {
        case 'asc':
            icon = ArrowUp;
            break;
        case 'desc':
            icon = ArrowDown;
            break;
        default:
            icon = ArrowUpArrowDown;
    }

    return (
        <div className={b()}>
            <Icon data={icon} size={14} className={b('icon')} />
        </div>
    );
}
