import * as React from 'react';

import {Ellipsis} from '@gravity-ui/icons';

import {DEFAULT_AVATAR_SIZE} from '../Avatar';
import {Icon} from '../Icon';
import {block} from '../utils/cn';

import {COMPONENT_SIZE_TO_MORE_ICON_SIZE} from './constants';
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
            variant = 'counter',
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
                {variant === 'counter' ? (
                    `+${count}`
                ) : (
                    <Icon size={COMPONENT_SIZE_TO_MORE_ICON_SIZE[size]} data={Ellipsis} />
                )}
            </div>
        );
    },
);

AvatarStackMore.displayName = 'AvatarStack.More';
