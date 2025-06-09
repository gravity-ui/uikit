import type * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {ListItem} from '../components';
import type {ListItemProps, ListSortHandleAlign} from '../types';

const demoWrapperStyles: React.CSSProperties = {
    maxWidth: '300px',
    border: 'dotted 2px',
    margin: '0 auto',
    padding: '2em',
};

export default {
    title: 'Components/Data Display/List/Item',
    component: ListItem,
    args: {
        item: 'Item Content',
        itemIndex: 0,
        active: false,
        selected: false,
        sortable: false,
        sortHandleAlign: 'right',
    },
    argTypes: {
        sortHandleAlign: {
            control: {type: 'select'},
            options: ['left', 'right'] as ListSortHandleAlign[],
        },
        onClick: {action: 'onClick'},
        onActivate: {action: 'onActivate'},
    },
    decorators: [
        (Story) => (
            <div style={demoWrapperStyles}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        a11y: {
            context: '#storybook-root',
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
                        id: 'aria-required-parent',
                        enabled: false, // these stories are for list item only
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
} as Meta<typeof ListItem>;

const getComponentTemplate = <
    T extends React.JSXElementConstructor<ListItemProps<any>> = typeof ListItem,
>(): StoryFn<T> => ((args: any) => <ListItem {...args} />) as any;

const Template = getComponentTemplate();

export const Default = Template.bind({});

export const CanBeSorted = Template.bind({});
CanBeSorted.args = {
    sortable: true,
};

export const Active = Template.bind({});
Active.args = {
    active: true,
};

export const Selected = Template.bind({});
Selected.args = {
    selected: true,
};

type CustomItemComponent = React.JSXElementConstructor<ListItemProps<{title: string}>>;
export const CustomRender = getComponentTemplate<CustomItemComponent>().bind({});
CustomRender.args = {
    item: {title: 'Custom Item', disabled: true},
    renderItem(item) {
        return item.title;
    },
};
