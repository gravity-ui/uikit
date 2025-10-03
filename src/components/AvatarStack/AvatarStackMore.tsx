import * as React from 'react';

import {DEFAULT_AVATAR_SIZE} from '../Avatar';
import {block} from '../utils/cn';

import i18n from './i18n';
import type {AvatarStackMoreProps} from './types';

const b = block('avatar-stack');

/**
 * Badge for displaying count of remaining avatars
 */
export const AvatarStackMore = React.forwardRef<HTMLDivElement, AvatarStackMoreProps>(
    (
        {
            className,
            count,
            'aria-label': ariaLabel,
            borderColor = 'var(--g-color-line-generic-solid)',
            size = DEFAULT_AVATAR_SIZE,
        },
        ref,
    ) => {
        const {t} = i18n.useTranslation();
        return (
            <div
                ref={ref}
                className={b('more', {size, 'has-border': Boolean(borderColor)}, className)}
                aria-label={ariaLabel || t('more', {count})}
                style={{borderColor}}
            >
                +{count}
            </div>
        );
    },
);

AvatarStackMore.displayName = 'AvatarStack.More';
