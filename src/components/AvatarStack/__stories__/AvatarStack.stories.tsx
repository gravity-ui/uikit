import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';

import {Popover} from '../../Popover';
import {UserAvatar, UserAvatarProps, UserAvatarSize} from '../../UserAvatar';
import {AvatarStack} from '../AvatarStack';
import type {AvatarStackOverlapSize} from '../types';

type ComponentType = typeof AvatarStack;

function getChildren({
    count = faker.number.int({min: 1, max: 30}),
    avatarSize = 'm',
}: Partial<{count: number; avatarSize: UserAvatarSize}>) {
    console.log('getChildren', avatarSize);
    return faker.helpers.uniqueArray(
        () => <UserAvatar imgUrl={faker.image.avatar()} size={avatarSize} />,
        count,
    );
}

export default {
    title: 'Components/Data Display/AvatarStack',
    component: AvatarStack,
    args: {
        overlapSize: 's',
    },
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    const overlapAvatarSizeMap: Record<AvatarStackOverlapSize, UserAvatarSize> = {
        s: 'xs',
        m: 'l',
        l: 'xl',
    };

    const avatarSize = overlapAvatarSizeMap[args.overlapSize || 's'];
    const children =
        React.Children.map(args.children, (child) =>
            React.isValidElement<UserAvatarProps>(child)
                ? React.cloneElement(child, {size: avatarSize})
                : null,
        ) || getChildren({avatarSize});

    return (
        <AvatarStack {...args}>
            {children}
            {React.Children.count(children) > 3 ? (
                <Popover
                    placement={['bottom', 'bottom-end', 'bottom-start']}
                    content={
                        <React.Fragment>Somehow display list of all other items</React.Fragment>
                    }
                >
                    <AvatarStack.MoreButton
                        size={avatarSize}
                        aria-label={'Rest of the users'}
                        count={React.Children.count(children) - 3}
                    />
                </Popover>
            ) : null}
        </AvatarStack>
    );
};

export const Default = Template.bind({});

export const WithOneItem = Template.bind({});
WithOneItem.args = {
    children: getChildren({count: 1}),
};

export const WithMoreButton = Template.bind({});
WithMoreButton.args = {
    children: getChildren({count: 5}),
};
