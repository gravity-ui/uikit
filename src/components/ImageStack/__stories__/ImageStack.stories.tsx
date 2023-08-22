import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';

import {Menu} from '../../Menu';
import {Popover} from '../../Popover';
import {UserAvatar} from '../../UserAvatar';
import {ImageStack} from '../ImageStack';

type ComponentType = typeof ImageStack;

type DemoItem = {
    pk: string;
    image: string;
    name: string;
};

function getItems(count = faker.number.int({min: 1, max: 30})) {
    return faker.helpers.uniqueArray(
        () => ({
            pk: '',
            image: faker.image.avatar(),
            name: faker.internet.userName().toLowerCase(),
        }),
        count,
    );
}

const items = getItems();

export default {
    title: 'Components/ImageStack',
    component: ImageStack,
    args: {
        items,
        renderItem: (item: DemoItem, {itemClassName}) => (
            <UserAvatar size={'xs'} className={itemClassName} imgUrl={item.image} />
        ),
        renderMore: (items: DemoItem[]) => (
            <Popover
                placement={['bottom', 'bottom-end', 'bottom-start']}
                content={
                    <Menu>
                        {items.map((item) => (
                            <Menu.Item
                                key={item.pk}
                                href={new URL(item.name, 'https://example.com').toString()}
                            >
                                {item.name}
                            </Menu.Item>
                        ))}
                    </Menu>
                }
            >
                <ImageStack.MoreButton aria-label={'Rest of the users'} count={items.length} />
            </Popover>
        ),
    },
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => <ImageStack {...args} />;

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
