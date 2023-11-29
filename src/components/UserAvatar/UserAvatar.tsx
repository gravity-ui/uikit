import React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {SIZES} from './constants';
import type {UserAvatarSize} from './types';

import './UserAvatar.scss';

export interface UserAvatarProps extends QAProps {
    imgUrl?: string;
    fallbackImgUrl?: string;
    size?: UserAvatarSize;
    srcSet?: string;
    sizes?: string;
    title?: string;
    className?: string;
    loading?: 'eager' | 'lazy';
    /** @deprecated Use appropriate component, like `<Button/>` instead */
    onClick?: () => void;
}

const b = block('user-avatar');

export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
    (
        {imgUrl, fallbackImgUrl, size = 'm', srcSet, sizes, title, className, loading, onClick, qa},
        ref,
    ) => {
        const [isErrored, setIsErrored] = React.useState(false);

        const handleError = React.useCallback(() => {
            setIsErrored(true);
        }, []);

        // Reset error if `imgUrl` was changed to check it again
        React.useEffect(() => {
            setIsErrored(false);
        }, [imgUrl]);

        return (
            // FIXME OnClick deprecated, will be deleted
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
                className={b({size}, className)}
                title={title}
                onClick={onClick}
                ref={ref}
                data-qa={qa}
            >
                <img
                    loading={loading}
                    className={b('figure')}
                    width={SIZES[size]}
                    height={SIZES[size]}
                    src={fallbackImgUrl && isErrored ? fallbackImgUrl : imgUrl}
                    srcSet={srcSet}
                    sizes={sizes}
                    alt=""
                    onError={handleError}
                />
            </div>
        );
    },
);

UserAvatar.displayName = 'UserAvatar';
