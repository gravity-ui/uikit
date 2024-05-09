import React from 'react';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import type {UseColorGeneratorProps} from '../types';
import {useColorGenerator} from '../useColorGenerator';

type ColoredAvatarProps = AvatarProps & {
    withText: boolean;
    mode: UseColorGeneratorProps['mode'];
    token: UseColorGeneratorProps['token'];
};

export const ColoredAvatar = ({
    mode,
    theme,
    token,
    withText,
    ...avatarProps
}: ColoredAvatarProps) => {
    const {color, textColor} = useColorGenerator({
        token,
        mode,
    });

    return (
        <Avatar
            {...avatarProps}
            theme={theme}
            text={withText ? token : undefined}
            color={withText ? textColor : undefined}
            title={color}
            backgroundColor={color}
            size="l"
        />
    );
};
