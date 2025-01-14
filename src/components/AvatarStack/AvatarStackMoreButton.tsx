import * as React from 'react';

import {DEFAULT_AVATAR_SIZE} from '../Avatar';
import {block} from '../utils/cn';

import {AvatarStackMore} from './AvatarStackMore';
import type {AvatarStackMoreButtonProps} from './types';

const b = block('avatar-stack');

export const AvatarStackMoreButton = React.forwardRef<
    HTMLButtonElement,
    AvatarStackMoreButtonProps
>(
    (
        {
            className,
            badgeClassName,
            size = DEFAULT_AVATAR_SIZE,
            onClick,
            count,
            'aria-label': ariaLabel,
            borderColor,
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                type="button"
                className={b('more-button', {size}, className)}
                onClick={onClick}
            >
                <AvatarStackMore
                    className={badgeClassName}
                    size={size}
                    count={count}
                    aria-label={ariaLabel}
                    borderColor={borderColor}
                />
            </button>
        );
    },
);

AvatarStackMoreButton.displayName = 'AvatarStack.MoreButton';
