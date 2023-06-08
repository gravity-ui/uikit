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

import {Icon} from '../Icon';
import type {SVGIconData} from '../Icon/types';
import {colorText} from '../Text';

import {DEFAULT_ICONS_SIZE, bAlert} from './constants';
import type {AlertIconProps, AlertTypes} from './types';

const typeToIcon: Record<
    AlertTypes,
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
    type,
    view = 'filled',
    size = DEFAULT_ICONS_SIZE,
}: AlertIconProps) => {
    const a = typeToIcon[type];

    if (!a) {
        return null;
    }

    return (
        <Icon
            data={a[view] as SVGIconData}
            size={size}
            className={bAlert(
                'icon',
                colorText({color: type === 'normal' ? undefined : type}, className),
            )}
        />
    );
};
