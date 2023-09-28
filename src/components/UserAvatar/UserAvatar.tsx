import React from 'react';

import {block} from '../utils/cn';

import {SIZES} from './constants';
import type {UserAvatarSize} from './types';

import './UserAvatar.scss';

export interface UserAvatarProps {
    imgUrl?: string;
    fallbackImgUrl?: string;
    size?: UserAvatarSize;
    srcSet?: string;
    sizes?: string;
    title?: string;
    className?: string;
    /** @deprecated Use appropriate component, like `<Button/>` instead */
    onClick?: () => void;
}

const b = block('user-avatar');

export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
    ({imgUrl, fallbackImgUrl, size = 'm', srcSet, sizes, title, className, onClick}, ref) => {
        const [isErrored, setIsErrored] = React.useState(false);

        const handleError = React.useCallback(() => {
            setIsErrored(true);
        }, []);

        // Reset error if `imgUrl` was changed to check it again
        React.useEffect(() => {
            setIsErrored(false);
        }, [imgUrl]);

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div className={b({size}, className)} title={title} onClick={onClick} ref={ref}>
                <img
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
