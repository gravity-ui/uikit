import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {List, listDefaultProps} from '..';
import type {ListProps} from '..';

import {ListShowcase} from './ListShowcase';
import {ListWithLoader} from './ListWithLoader';

type ComponentType = React.JSXElementConstructor<ListProps<string>>;

export default {
    title: 'Components/Data Display/List',
    component: List,
    args: {
        ...listDefaultProps,
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-allowed-attr',
                        enabled: false,
                        selector: '.g-list__item', // https://github.com/gravity-ui/uikit/issues/1336
                    },
                    {
                        id: 'aria-required-children',
                        enabled: false,
                        selector: '.g-list-items', // https://github.com/gravity-ui/uikit/issues/1338
                    },
                    {
                        id: 'scrollable-region-focusable',
                        enabled: false,
                        selector: '.g-list', // scrollable content is accessible via arrows
                    },
                    {
                        id: 'label',
                        enabled: false,
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<ComponentType>;

const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

const DefaultTemplate: StoryFn<ComponentType> = (args) => <List {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    items,
    itemsHeight: 150,
};

const SortableTemplate: StoryFn<ComponentType> = (args) => <List {...args} />;
export const Sortable = SortableTemplate.bind({});
Sortable.args = {
    items,
    sortable: true,
    itemsHeight: 150,
};
Sortable.parameters = {
    // Strict mode ruins sortable list due to this react-beautiful-dnd issue
    // https://github.com/atlassian/react-beautiful-dnd/issues/2350
    disableStrictMode: true,
};

const RenderItemTemplate: StoryFn<ComponentType> = (args) => <List {...args} />;
export const RenderItem = RenderItemTemplate.bind({});
RenderItem.args = {
    items,
    renderItem: (item) => `🔥🔥🔥 ${item} 🔥🔥🔥`,
};

const TemplateWithState: StoryFn<ComponentType> = (args) => <ListWithLoader {...args} />;

export const WithLoadingMoreItems = TemplateWithState.bind({});
WithLoadingMoreItems.args = {
    items: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
    itemsHeight: 150,
    itemHeight: 28,
    loading: true,
    virtualized: false,
};

const ShowcaseTemplate: StoryFn<ComponentType> = () => <ListShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
    // Strict mode ruins sortable list due to this react-beautiful-dnd issue
    // https://github.com/atlassian/react-beautiful-dnd/issues/2350
    disableStrictMode: true,
};
