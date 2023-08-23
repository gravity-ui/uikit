import React from 'react';

import type {UserAvatarSize} from '../UserAvatar';
import {blockNew} from '../utils/cn';

const b = blockNew('image-stack');

type Props = Pick<React.HTMLProps<HTMLButtonElement>, 'className' | 'onClick' | 'aria-label'> & {
    size?: UserAvatarSize;
    count: number;
};

export const ImageStackMoreButton = ({
    className,
    size = 'xs',
    onClick,
    count,
    'aria-label': ariaLabel,
}: Props) => {
    return (
        <button
            className={b('more-button', {size}, className)}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            +{count}
        </button>
    );
};

ImageStackMoreButton.displayName = 'ImageStack.MoreButton';
