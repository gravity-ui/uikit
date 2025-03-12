import React from 'react';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import type {UseColorGeneratorProps} from '../types';
import {useColorGenerator} from '../useColorGenerator';

type ColoredAvatarProps = AvatarProps & {
    withText: boolean;
    intensity: UseColorGeneratorProps['intensity'];
    seed: UseColorGeneratorProps['seed'];
};

export const ColoredAvatar = ({
    intensity,
    theme,
    seed,
    withText,
    ...avatarProps
}: ColoredAvatarProps) => {
    const {color, textColor} = useColorGenerator({
        seed,
        intensity,
    });

    return (
        <Avatar
            {...avatarProps}
            theme={theme}
            text={withText ? seed : undefined}
            color={withText ? textColor : undefined}
            title={color}
            backgroundColor={color}
            size="l"
        />
    );
};
