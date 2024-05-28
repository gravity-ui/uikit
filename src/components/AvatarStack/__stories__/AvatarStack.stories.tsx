import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';

import type {AvatarProps, AvatarSize} from '../../Avatar';
import {AVATAR_SIZES, Avatar, DEFAULT_AVATAR_SIZE} from '../../Avatar';
import {Tooltip} from '../../Tooltip';
import {AvatarStack} from '../AvatarStack';

type ComponentType = React.ComponentProps<typeof AvatarStack> & {avatarSize: AvatarSize};

function getChildren({
    count = faker.number.int({min: 1, max: 30}),
    avatarSize = DEFAULT_AVATAR_SIZE,
}: Partial<{count: number; avatarSize: AvatarSize}>) {
    return faker.helpers.uniqueArray(
        () => (
            <Avatar
                imgUrl={faker.image.avatar()}
                size={avatarSize}
                borderColor={'var(--g-color-line-generic-solid)'}
                aria-label={'For tests'}
                alt={'For tests'}
            />
        ),
        count,
    );
}

export default {
    title: 'Components/Data Display/AvatarStack',
    component: AvatarStack,
    args: {
        overlapSize: 's',
        avatarSize: DEFAULT_AVATAR_SIZE,
    },
    argTypes: {
        avatarSize: {
            control: 'select',
            options: Object.keys(AVATAR_SIZES),
            name: 'Size of avatar',
            description: 'Not part of component API',
        },
    },
} as Meta<ComponentType>;

function getTemplateChildren(args: ComponentType) {
    const {avatarSize} = args;

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
    const {avatarSize: _, ...props} = args;
    return <AvatarStack {...props}>{getTemplateChildren(args)}</AvatarStack>;
};

const TemplateWithButtonOverride: StoryFn<ComponentType> = (args) => {
    const {avatarSize, ...props} = args;

    return (
        <AvatarStack
            {...props}
            renderMoreButton={({count}) => (
                <Tooltip content={'Somehow display list of all other items'}>
                    <AvatarStack.MoreButton
                        size={avatarSize}
                        aria-label={'Rest of the users'}
                        count={count}
                    />
                </Tooltip>
            )}
        >
            {getTemplateChildren(args)}
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
