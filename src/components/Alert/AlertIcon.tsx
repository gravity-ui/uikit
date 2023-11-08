import React from 'react';

import {
    CircleCheck,
    CircleCheckFill,
    CircleInfo,
    CircleInfoFill,
    CircleXmark,
    CircleXmarkFill,
    TriangleExclamation,
    TriangleExclamationFill,
} from '@gravity-ui/icons';

import {Icon, IconData} from '../Icon';
import {ColorTextBaseProps, colorText} from '../Text/colorText/colorText';

import {DEFAULT_ICON_SIZE, bAlert} from './constants';
import type {AlertIconProps, AlertTheme} from './types';

const typeToIcon: Record<
    AlertTheme,
    {filled: React.ElementType; outlined: React.ElementType} | null
> = {
    danger: {
        filled: CircleXmarkFill,
        outlined: CircleXmark,
    },
    info: {
        filled: CircleInfoFill,
        outlined: CircleInfo,
    },
    success: {
        filled: CircleCheckFill,
        outlined: CircleCheck,
    },
    warning: {
        filled: TriangleExclamationFill,
        outlined: TriangleExclamation,
    },
    normal: null,
};

export const AlertIcon = ({
    className,
    theme,
    view = 'filled',
    size = DEFAULT_ICON_SIZE,
}: AlertIconProps) => {
    const iconByTheme = typeToIcon[theme];

    if (!iconByTheme) {
        return null;
    }

    let color: ColorTextBaseProps['color'];

    if (theme === 'success') {
        color = 'positive';
    } else if (theme !== 'normal') {
        color = theme;
    }

    return (
        <div className={bAlert('icon', colorText({color}, className))}>
            <Icon data={iconByTheme[view] as IconData} size={size} />
        </div>
    );
};
