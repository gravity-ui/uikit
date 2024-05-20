import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';

import type {AvatarProps, AvatarSize} from '../../Avatar';
import {Avatar} from '../../Avatar';
import {Popover} from '../../Popover';
import {AvatarStack} from '../AvatarStack';
import type {AvatarStackOverlapSize} from '../types';

type ComponentType = typeof AvatarStack;

function getChildren({
    count = faker.number.int({min: 1, max: 30}),
    avatarSize = 'm',
}: Partial<{count: number; avatarSize: AvatarSize}>) {
    return faker.helpers.uniqueArray(
        () => <Avatar imgUrl={faker.image.avatar()} size={avatarSize} alt={''} />,
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
    const overlapAvatarSizeMap: Record<AvatarStackOverlapSize, AvatarSize> = {
        s: 'xs',
        m: 'l',
        l: 'xl',
    };

    const avatarSize = overlapAvatarSizeMap[args.overlapSize || 's'];
    const children =
        React.Children.map(args.children, (child) =>
            React.isValidElement<AvatarProps>(child)
                ? React.cloneElement(child, {size: avatarSize})
                : null,
        ) || getChildren({avatarSize});

    return (
        <AvatarStack {...args}>
            {children}
            {React.Children.count(children) > 3 ? (
                <AvatarStack.MoreButton
                    size={avatarSize}
                    aria-label={'Rest of the users'}
                    count={React.Children.count(children) - 3}
                    render={({button}) => (
                        <Popover
                            placement={['bottom', 'bottom-end', 'bottom-start']}
                            content={
                                <React.Fragment>
                                    Somehow display list of all other items
                                </React.Fragment>
                            }
                        >
                            {button}
                        </Popover>
                    )}
                />
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
