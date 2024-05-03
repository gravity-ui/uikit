import React from 'react';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import type {UseGeneratorColorProps} from '../types';
import {useGeneratorColor} from '../useGeneratorColor';

type ColorProps = AvatarProps & {
    withText: boolean;
    mode: UseGeneratorColorProps['mode'];
    token: UseGeneratorColorProps['token'];
};

export const Color = ({mode, theme, token, withText, ...avatarProps}: ColorProps) => {
    const {color, oppositeColor} = useGeneratorColor({
        token,
        mode,
    });

    return (
        <Avatar
            {...avatarProps}
            theme={theme}
            text={withText ? token : undefined}
            color={withText ? oppositeColor : undefined}
            backgroundColor={color}
            size="l"
        />
    );
};
