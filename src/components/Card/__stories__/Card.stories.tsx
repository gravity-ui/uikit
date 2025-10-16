import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Showcase} from '../../../demo/Showcase';
import {Card} from '../Card';

export default {
    title: 'Components/Data Display/Card',
    component: Card,
} as Meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: 'Content',
        style: {
            width: 120,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <Card {...args} size="m">
                Size m
            </Card>
            <Card {...args} size="l">
                Size l
            </Card>
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

export const Theme: Story = {
    render: (args) => (
        <Showcase>
            <Card {...args} view="outlined" theme="normal">
                Normal
            </Card>
            <Card {...args} view="outlined" theme="info">
                Info
            </Card>
            <Card {...args} view="outlined" theme="success">
                Success
            </Card>
            <Card {...args} view="outlined" theme="warning">
                Warning
            </Card>
            <Card {...args} view="outlined" theme="danger">
                Danger
            </Card>
            <Card {...args} view="outlined" theme="utility">
                Utility
            </Card>
            <Card {...args} view="filled" theme="normal">
                Normal
            </Card>
            <Card {...args} view="filled" theme="info">
                Info
            </Card>
            <Card {...args} view="filled" theme="success">
                Success
            </Card>
            <Card {...args} view="filled" theme="warning">
                Warning
            </Card>
            <Card {...args} view="filled" theme="danger">
                Danger
            </Card>
            <Card {...args} view="filled" theme="utility">
                Utility
            </Card>
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

export const View: Story = {
    render: (args) => (
        <Showcase>
            <Card {...args} view="clear">
                Clear
            </Card>
            <Card {...args} view="outlined">
                Outlined
            </Card>
            <Card {...args} view="filled">
                Filled
            </Card>
            <Card {...args} view="raised">
                Raised
            </Card>
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

export const ActionType: Story = {
    render: (args) => (
        <Showcase>
            <Card {...args}>Default</Card>
            <Card {...args} disabled>
                Disabled
            </Card>
        </Showcase>
    ),
    args: {
        ...Default.args,
        type: 'action',
        onClick: () => action('onClick'),
    },
    name: 'Action Type',
};

export const SelectionType: Story = {
    render: (args) => (
        <Showcase>
            <Card {...args}>Default</Card>
            <Card {...args} selected>
                Selected
            </Card>
            <Card {...args} disabled>
                Disabled
            </Card>
        </Showcase>
    ),
    args: {
        ...Default.args,
        type: 'selection',
        onClick: () => action('onClick'),
    },
    name: 'Selection Type',
};

export const Custom: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <React.Fragment>
            <style>
                {`.g-root {
                    --g-card-background-color: #f08080;
                    --g-card-border-width: 5px;
                    --g-card-border-color: #fff;
                    --g-card-border-radius: 40px 20px;
                    --g-card-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
                }`}
            </style>
            <Card {...args}>Custom styles</Card>
        </React.Fragment>
    ),
};
