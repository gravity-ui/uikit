import {FaceRobot} from '@gravity-ui/icons';

import {Avatar} from '../../Avatar';
import {AvatarStack} from '../AvatarStack';
import type {AvatarStackProps} from '../types';

const DEFAULT_AVATAR_COUNT = 6;

export const TestAvatarStack = (props: AvatarStackProps & {avatarCount?: number}) => {
    const {avatarCount, ...restProps} = props;

    const avatarNodes = Array.from({length: avatarCount || DEFAULT_AVATAR_COUNT}, (_, index) => {
        return <Avatar key={index} icon={FaceRobot} />;
    });

    return <AvatarStack {...restProps}>{...avatarNodes}</AvatarStack>;
};

export const TestAvatarStackWithCustomMore = (props: AvatarStackProps & {avatarCount?: number}) => {
    return (
        <TestAvatarStack
            renderMore={({count}) => <div style={{border: '1px solid tomato'}}>+{count}</div>}
            {...props}
        />
    );
};
