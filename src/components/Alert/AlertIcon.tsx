import type * as React from 'react';

import {
    CircleCheck,
    CircleCheckFill,
    CircleInfo,
    CircleInfoFill,
    CircleXmark,
    CircleXmarkFill,
    Thunderbolt,
    ThunderboltFill,
    TriangleExclamation,
    TriangleExclamationFill,
} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import type {IconData} from '../Icon';
import {colorText} from '../Text/colorText/colorText';
import type {ColorTextBaseProps} from '../Text/colorText/colorText';

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
    utility: {
        filled: ThunderboltFill,
        outlined: Thunderbolt,
    },
    normal: null,
    clear: null,
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
    } else if (theme !== 'normal' && theme !== 'clear') {
        color = theme;
    }

    return (
        <div className={bAlert('icon', colorText({color}, className))}>
            <Icon data={iconByTheme[view] as IconData} size={size} />
        </div>
    );
};
