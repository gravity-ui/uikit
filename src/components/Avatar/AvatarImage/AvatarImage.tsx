'use client';

import * as React from 'react';

import {AVATAR_SIZES, bAvatar} from '../constants';

import type {AvatarImageProps} from './types';

export const AvatarImage = ({
    imgUrl,
    fallbackImgUrl,
    sizes,
    srcSet,
    alt,
    loading,
    withImageBorder,
    size,
}: AvatarImageProps) => {
    const [isErrored, setIsErrored] = React.useState(false);

    const handleError = React.useCallback(() => {
        setIsErrored(true);
    }, []);

    // Reset error if `imgUrl` was changed to check it again
    React.useEffect(() => {
        setIsErrored(false);
    }, [imgUrl]);

    return (
        <img
            className={bAvatar('image', {'with-border': withImageBorder})}
            loading={loading}
            width={AVATAR_SIZES[size]}
            height={AVATAR_SIZES[size]}
            src={fallbackImgUrl && isErrored ? fallbackImgUrl : imgUrl}
            sizes={sizes}
            srcSet={srcSet}
            alt={alt}
            onError={handleError}
        />
    );
};
