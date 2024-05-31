import React from 'react';

import type {AvatarSize} from '../Avatar';
import {Avatar, DEFAULT_AVATAR_SIZE} from '../Avatar';
import {block} from '../utils/cn';

import i18n from './i18n';

const b = block('avatar-stack');

type Props = Pick<React.HTMLProps<HTMLButtonElement>, 'className' | 'onClick' | 'aria-label'> & {
    size?: AvatarSize;
    count: number;
};

export const AvatarStackMoreButton = React.forwardRef<HTMLButtonElement, Props>(
    ({className, size = DEFAULT_AVATAR_SIZE, onClick, count, 'aria-label': ariaLabel}, ref) => {
        return (
            <button ref={ref} className={b('more-button', {size}, className)} onClick={onClick}>
                <Avatar
                    text={`+${count}`}
                    size={size}
                    aria-label={ariaLabel || i18n('more', {count})}
                />
            </button>
        );
    },
);

AvatarStackMoreButton.displayName = 'AvatarStack.MoreButton';
