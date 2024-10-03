import React from 'react';

import {DEFAULT_AVATAR_SIZE} from '../Avatar';
import {block} from '../utils/cn';

import {AvatarStackMore} from './AvatarStackMore';
import type {AvatarStackMoreButtonProps} from './types';

const b = block('avatar-stack');

export const AvatarStackMoreButton = React.forwardRef<
    HTMLButtonElement,
    AvatarStackMoreButtonProps
>(({className, size = DEFAULT_AVATAR_SIZE, onClick, count, 'aria-label': ariaLabel}, ref) => {
    return (
        <button
            ref={ref}
            type="button"
            className={b('more-button', {size}, className)}
            onClick={onClick}
        >
            <AvatarStackMore size={size} count={count} aria-label={ariaLabel} />
        </button>
    );
});

AvatarStackMoreButton.displayName = 'AvatarStack.MoreButton';
