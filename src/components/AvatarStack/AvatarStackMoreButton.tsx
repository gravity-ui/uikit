import React from 'react';

import type {AvatarSize} from '../Avatar';
import {DEFAULT_AVATAR_SIZE} from '../Avatar';
import {block} from '../utils/cn';

const b = block('avatar-stack');

type Props = Pick<React.HTMLProps<HTMLButtonElement>, 'className' | 'onClick' | 'aria-label'> & {
    size?: AvatarSize;
    count: number;
    render?: (props: {button: React.ReactElement}) => React.ReactElement;
};

export const AvatarStackMoreButton = ({
    className,
    size = DEFAULT_AVATAR_SIZE,
    onClick,
    count,
    'aria-label': ariaLabel,
    render,
}: Props) => {
    const button = (
        <button
            className={b('more-button', {size}, className)}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            +{count}
        </button>
    );

    if (render) {
        return render({button});
    }

    return button;
};

AvatarStackMoreButton.displayName = 'AvatarStack.MoreButton';
