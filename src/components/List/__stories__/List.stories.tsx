import React, {JSXElementConstructor} from 'react';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

import {List, ListProps, listDefaultProps} from '..';

import {ListShowcase} from './ListShowcase';

type ComponentType = JSXElementConstructor<ListProps<string>>;

export default {
    title: 'Components/List',
    component: List,
    args: {
        ...listDefaultProps,
    },
} as ComponentMeta<ComponentType>;

const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

const DefaultTemplate: ComponentStory<ComponentType> = (args) => <List {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    items,
    itemsHeight: 150,
};

const SortableTemplate: ComponentStory<ComponentType> = (args) => <List {...args} />;
export const Sortable = SortableTemplate.bind({});
Sortable.args = {
    items,
    sortable: true,
    itemsHeight: 150,
};

const RenderItemTemplate: ComponentStory<ComponentType> = (args) => <List {...args} />;
export const RenderItem = RenderItemTemplate.bind({});
RenderItem.args = {
    items,
    renderItem: (item) => `🔥🔥🔥 ${item} 🔥🔥🔥`,
    itemsHeight: 150,
};

const ShowcaseTemplate: ComponentStory<ComponentType> = () => <ListShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
