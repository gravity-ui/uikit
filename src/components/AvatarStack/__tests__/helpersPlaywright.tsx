import React from 'react';

import {FaceRobot} from '@gravity-ui/icons';
import times from 'lodash/times';

import {Avatar} from '../../Avatar';
import {AvatarStack} from '../AvatarStack';
import type {AvatarStackProps} from '../types';

const DEFAULT_AVATAR_COUNT = 6;

export const TestAvatarStack = (props: AvatarStackProps & {avatarCount?: number}) => {
    const {avatarCount, ...restProps} = props;

    const avatarNodes = times(avatarCount || DEFAULT_AVATAR_COUNT, (number) => {
        return <Avatar key={number} icon={FaceRobot} />;
    });

    return <AvatarStack {...restProps}>{...avatarNodes}</AvatarStack>;
};

export const TestAvatarStackWithCustomMore = (props: AvatarStackProps & {avatarCount?: number}) => {
    return <TestAvatarStack renderMore={({count}) => <button>+{count}</button>} {...props} />;
};
