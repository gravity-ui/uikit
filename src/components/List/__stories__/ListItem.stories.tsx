import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {CSSProperties, JSXElementConstructor} from 'react';
import {ListItem} from '../components';
import {ListItemProps, ListSortHandleAlign} from '../types';

const demoWrapperStyles: CSSProperties = {
    maxWidth: '300px',
    border: 'dotted 2px',
    margin: '0 auto',
    padding: '2em',
};

export default {
    title: 'Components/List/Item',
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
} as ComponentMeta<typeof ListItem>;

const getComponentTemplate =
    <T extends JSXElementConstructor<ListItemProps<any>> = typeof ListItem>(): ComponentStory<T> =>
    // eslint-disable-next-line react/display-name
    (args) =>
        <ListItem {...args} />;

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

type CustomItemComponent = JSXElementConstructor<ListItemProps<{title: string}>>;
export const CustomRender = getComponentTemplate<CustomItemComponent>().bind({});
CustomRender.args = {
    item: {title: 'Custom Item', disabled: true},
    renderItem(item) {
        return item.title;
    },
};
