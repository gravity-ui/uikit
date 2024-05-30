import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryObj} from '@storybook/react';

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

const meta: Meta<ComponentType> = {
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
};

export default meta;

type Story = StoryObj<ComponentType>;

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

export const Default: Story = {
    render(args) {
        const {avatarSize, size, ...props} = args;
        return (
            <AvatarStack {...props} size={size || avatarSize}>
                {getTemplateChildren(args)}
            </AvatarStack>
        );
    },
};

export const SingleItem: Story = {
    ...Default,
    args: {
        children: getChildren({count: 1}),
    },
};

export const MoreButton: Story = {
    ...Default,
    args: {
        children: getChildren({count: 6}),
    },
};

export const MoreButtonOmit: Story = {
    ...Default,
    parameters: {
        docs: {
            description: {
                component: 'In case when only one avatar is hidden, we omit rendering more button',
            },
        },
    },
    args: {
        children: getChildren({count: 4}),
        max: 3,
    },
};

export const CustomMoreButton: Story = {
    render(args) {
        const {avatarSize, size, ...props} = args;

        return (
            <AvatarStack
                {...props}
                size={size || avatarSize}
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
    },
    args: {
        children: [...getChildren({count: 26})],
    },
};
