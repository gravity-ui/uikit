import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';

import type {AvatarProps, AvatarSize} from '../../Avatar';
import {Avatar} from '../../Avatar';
import {Tooltip} from '../../Tooltip';
import {AvatarStack} from '../AvatarStack';
import type {AvatarStackOverlapSize} from '../types';

type ComponentType = typeof AvatarStack;

function getChildren({
    count = faker.number.int({min: 1, max: 30}),
    avatarSize = 'm',
}: Partial<{count: number; avatarSize: AvatarSize}>) {
    return faker.helpers.uniqueArray(
        () => <Avatar imgUrl={faker.image.avatar()} size={avatarSize} alt={'For tests'} />,
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

function getAvatarSizeForOverlap(args: React.ComponentProps<ComponentType>) {
    const overlapAvatarSizeMap: Record<AvatarStackOverlapSize, AvatarSize> = {
        s: 'xs',
        m: 'l',
        l: 'xl',
    };

    return overlapAvatarSizeMap[args.overlapSize || 's'];
}

function getTemplateChildren(args: React.ComponentProps<ComponentType>) {
    const avatarSize = getAvatarSizeForOverlap(args);

    return (
        React.Children.map(args.children, (child) =>
            React.isValidElement<AvatarProps>(child)
                ? React.cloneElement(child, {
                      size: avatarSize,
                      borderColor: 'var(--g-color-line-generic-solid)',
                  })
                : null,
        ) || getChildren({avatarSize})
    );
}

const Template: StoryFn<ComponentType> = (args) => {
    return <AvatarStack {...args}>{getTemplateChildren(args)}</AvatarStack>;
};

const TemplateWithButtonOverride: StoryFn<ComponentType> = (args) => {
    const avatarSize = getAvatarSizeForOverlap(args);

    return (
        <AvatarStack {...args}>
            {getTemplateChildren(args)}
            <AvatarStack.MoreButton
                key="more-button-override"
                size={avatarSize}
                aria-label={'Rest of the users'}
                count={24}
                render={({button}) => (
                    <Tooltip content={'Somehow display list of all other items'}>{button}</Tooltip>
                )}
            />
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
    children: getChildren({count: 6}),
};

export const EdgeCase = Template.bind({});
EdgeCase.args = {
    children: getChildren({count: 4}),
    max: 3,
};

export const WithButtonOverride = TemplateWithButtonOverride.bind({});
WithButtonOverride.args = {
    children: [...getChildren({count: 26})],
};
