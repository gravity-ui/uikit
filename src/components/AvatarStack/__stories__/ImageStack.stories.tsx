import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';

import {Popover} from '../../Popover';
import {UserAvatar, UserAvatarSize} from '../../UserAvatar';
import {AvatarStack} from '../AvatarStack';
import type {AvatarStackProps} from '../index';
import type {AvatarStackOverlapSize} from '../types';

type ComponentType = typeof AvatarStack;

type DemoItem = {
    image: string;
    name: string;
};

function getItems(count = faker.number.int({min: 1, max: 30})) {
    return faker.helpers.uniqueArray(
        () => ({
            image: faker.image.avatar(),
            name: faker.internet.userName().toLowerCase(),
        }),
        count,
    );
}

const items = getItems();

export default {
    title: 'Components/AvatarStack',
    component: AvatarStack,
    args: {
        items,
    },
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    const overlapAvatarSizeMap: Record<AvatarStackOverlapSize, UserAvatarSize> = {
        s: 'xs',
        m: 'l',
        l: 'xl',
    };

    const avatarSize = overlapAvatarSizeMap[args.overlapSize || 's'];

    const renderItem: AvatarStackProps<DemoItem>['renderItem'] = (item) => (
        <UserAvatar size={avatarSize} imgUrl={item.image} />
    );

    const renderMore: AvatarStackProps<DemoItem>['renderMore'] = (items) => (
        <Popover
            placement={['bottom', 'bottom-end', 'bottom-start']}
            content={
                <React.Fragment>
                    Somehow display list of all other items {items.map(({name}) => name).join(', ')}
                </React.Fragment>
            }
        >
            <AvatarStack.MoreButton
                size={avatarSize}
                aria-label={'Rest of the users'}
                count={items.length}
            />
        </Popover>
    );

    return <AvatarStack {...args} renderItem={renderItem} renderMore={renderMore} />;
};

export const Default = Template.bind({});

export const WithOneItem = Template.bind({});
WithOneItem.args = {
    items: getItems(1),
};

export const WithEdgeItemsCount = Template.bind({});
WithEdgeItemsCount.args = {
    items: getItems(3),
    displayCount: 2,
};
