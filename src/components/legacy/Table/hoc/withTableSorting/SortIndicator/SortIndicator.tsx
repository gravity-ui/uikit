import {ArrowDown, ArrowUp, ArrowUpArrowDown} from '@gravity-ui/icons';

import {Icon} from '../../../../Icon';

export interface SortIndicatorProps {
    order?: 'asc' | 'desc';
}

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

    return <Icon data={icon} size={14} />;
}
