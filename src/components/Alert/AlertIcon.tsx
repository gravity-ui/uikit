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
import {colorText} from '../Text';

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
    positive: {
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

    return (
        <div
            className={bAlert(
                'icon',
                colorText({color: theme === 'normal' ? undefined : theme}, className),
            )}
        >
            <Icon data={iconByTheme[view] as IconData} size={size} />
        </div>
    );
};
