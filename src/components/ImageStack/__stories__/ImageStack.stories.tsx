import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';

import {Popover} from '../../Popover';
import {UserAvatar, UserAvatarSize} from '../../UserAvatar';
import {ImageStack} from '../ImageStack';
import type {ImageStackProps} from '../index';
import type {OverlapSize} from '../types';

type ComponentType = typeof ImageStack;

type DemoItem = {
    pk: string;
    image: string;
    name: string;
};

function getItems(count = faker.number.int({min: 1, max: 30})) {
    return faker.helpers.uniqueArray(() => {
        const name = faker.internet.userName().toLowerCase();

        return {
            pk: name,
            image: faker.image.avatar(),
            name,
        };
    }, count);
}

const items = getItems();

export default {
    title: 'Components/ImageStack',
    component: ImageStack,
    args: {
        items,
    },
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
    const overlapAvatarSizeMap: Record<OverlapSize, UserAvatarSize> = {
        s: 'xs',
        m: 'l',
        l: 'xl',
    };

    const avatarSize = overlapAvatarSizeMap[args.overlapSize || 's'];

    const renderItem: ImageStackProps<DemoItem>['renderItem'] = (item, {itemClassName}) => (
        <UserAvatar size={avatarSize} className={itemClassName} imgUrl={item.image} />
    );

    const renderMore: ImageStackProps<DemoItem>['renderMore'] = (items) => (
        <Popover
            placement={['bottom', 'bottom-end', 'bottom-start']}
            content={
                <React.Fragment>
                    Somehow display list of all other items {items.map(({name}) => name).join(', ')}
                </React.Fragment>
            }
        >
            <ImageStack.MoreButton
                size={avatarSize}
                aria-label={'Rest of the users'}
                count={items.length}
            />
        </Popover>
    );

    return <ImageStack {...args} renderItem={renderItem} renderMore={renderMore} />;
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
