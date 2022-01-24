import React from 'react';
import {Meta, Story} from '@storybook/react';
import {List, ListWrapper, ListProps} from '..';
import {ListShowcase} from './ListShowcase';

export default {
    title: 'Components/List',
    component: ListWrapper,
    args: {
        ...ListWrapper.defaultProps,
    },
} as Meta;

const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

const DefaultTemplate: Story<ListProps<any>> = (args) => <List {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    items,
    itemsHeight: 150,
};

const SortableTemplate: Story<ListProps<any>> = (args) => <List {...args} />;
export const Sortable = SortableTemplate.bind({});
Sortable.args = {
    items,
    sortable: true,
    itemsHeight: 150,
};

const RenderItemTemplate: Story<ListProps<any>> = (args) => <List {...args} />;
export const RenderItem = RenderItemTemplate.bind({});
RenderItem.args = {
    items,
    renderItem: (item) => `🔥🔥🔥 ${item} 🔥🔥🔥`,
    itemsHeight: 150,
};

const ShowcaseTemplate: Story<ListProps<any>> = () => <ListShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
