import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {Box, Flex} from '../../layout';
import {Card} from '../Card';

export default {
    title: 'Components/Data Display/Card',
    component: Card,
} as Meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: 'Content',
        centerContent: true,
        width: 120,
        height: 120,
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
    },
    name: 'Selection Type',
};

export const WithFixedSizesType: Story = {
    render: (args) => (
        <Flex>
            <Card
                {...args}
                width={250}
                height={150}
                spacing={{mr: 3, p: 5}}
                theme="danger"
                view="outlined"
            >
                <Box overflow="auto" width={'100%'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur
                    incidunt quasi veritatis officia tenetur ratione voluptatem illo voluptatum
                    dolore illum ex magni soluta officiis maxime quia eaque, exercitationem veniam?
                </Box>
            </Card>
            <Card {...args} width={300} height={200} centerContent theme="info" view="filled">
                300x200
            </Card>
            <Card
                {...args}
                width={100}
                height={300}
                centerContent
                theme="warning"
                view="filled"
                spacing={{ml: 3, p: 2}}
                dangerouslySetInnerHTML={{__html: '<h2>100x300</h2>'}}
            />
        </Flex>
    ),
    name: 'With Fixed Sizes Type',
};
