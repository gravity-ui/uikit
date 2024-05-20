import React from 'react';

import type {AvatarSize} from '../Avatar';
import {block} from '../utils/cn';

const b = block('avatar-stack');

type Props = Pick<React.HTMLProps<HTMLButtonElement>, 'className' | 'onClick' | 'aria-label'> & {
    size?: AvatarSize;
    count: number;
};

export const AvatarStackMoreButton = ({
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

AvatarStackMoreButton.displayName = 'AvatarStack.MoreButton';
