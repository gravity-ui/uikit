import React from 'react';

import {ChevronRight, Flame, House, Rocket} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react';

import {Breadcrumbs} from '..';
import {Text} from '../../../Text';
import {Box, Flex} from '../../../layout';
import type {Key} from '../../../types';

const meta: Meta<typeof Breadcrumbs.Root> = {
    title: 'Lab/Breadcrumbs',
    component: Breadcrumbs.Root,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default = {
    render: (args) => (
        <Breadcrumbs.Root {...args}>
            <Breadcrumbs.Item>Region</Breadcrumbs.Item>
            <Breadcrumbs.Item>Country</Breadcrumbs.Item>
            <Breadcrumbs.Item>City</Breadcrumbs.Item>
            <Breadcrumbs.Item>District</Breadcrumbs.Item>
            <Breadcrumbs.Item>Street</Breadcrumbs.Item>
        </Breadcrumbs.Root>
    ),
} satisfies Story;

export const Events = {
    render: function BreadcrumbsEvents(props) {
        const [currentId, setCurrentId] = React.useState<Key>();
        const items = [
            {id: 1, label: 'Region'},
            {id: 2, label: 'Country'},
            {id: 3, label: 'City'},
            {id: 4, label: 'District'},
            {id: 5, label: 'Street'},
        ];
        return (
            <div>
                <Breadcrumbs.Root {...props} onAction={setCurrentId}>
                    {items.map((i) => (
                        <Breadcrumbs.Item key={i.id}>{i.label}</Breadcrumbs.Item>
                    ))}
                </Breadcrumbs.Root>
                <p>You clicked item ID: {currentId}</p>
            </div>
        );
    },
} satisfies Story;

export const Links = {
    render: (args) => (
        <Breadcrumbs.Root {...args}>
            <Breadcrumbs.Item href="https://gravity-ui.com" target="_blank">
                Home
            </Breadcrumbs.Item>
            <Breadcrumbs.Item href="https://gravity-ui.com/components" target="_blank">
                Components
            </Breadcrumbs.Item>
            <Breadcrumbs.Item
                href="https://gravity-ui.com/components/uikit/breadcrumbs"
                target="_blank"
            >
                Breadcrumbs
            </Breadcrumbs.Item>
        </Breadcrumbs.Root>
    ),
} satisfies Story;

export const RootContext = {
    render: (args) => (
        <Box overflow="hidden" width={200} style={{padding: 2}}>
            <Breadcrumbs.Root {...args} showRoot>
                <Breadcrumbs.Item key="home">Home</Breadcrumbs.Item>
                <Breadcrumbs.Item key="trendy">Trendy</Breadcrumbs.Item>
                <Breadcrumbs.Item key="2020 assets">March 2020 Assets</Breadcrumbs.Item>
                <Breadcrumbs.Item key="winter">Winter</Breadcrumbs.Item>
                <Breadcrumbs.Item key="holiday">Holiday</Breadcrumbs.Item>
            </Breadcrumbs.Root>
        </Box>
    ),
} satisfies Story;

export const Separator = {
    render: (args) => {
        const breadcrumbs = [
            <Breadcrumbs.Item key={1}>uikit</Breadcrumbs.Item>,
            <Breadcrumbs.Item key={2}>components</Breadcrumbs.Item>,
            <Breadcrumbs.Item key={3}>Breadcrumbs</Breadcrumbs.Item>,
        ];
        return (
            <div>
                <Breadcrumbs.Root {...args} separator="›">
                    {breadcrumbs}
                </Breadcrumbs.Root>
                <Breadcrumbs.Root {...args} separator="—">
                    {breadcrumbs}
                </Breadcrumbs.Root>
                <Breadcrumbs.Root {...args} separator={<ChevronRight />}>
                    {breadcrumbs}
                </Breadcrumbs.Root>
            </div>
        );
    },
} satisfies Story;

export const WithIcons = {
    render: (args) => (
        <Breadcrumbs.Root {...args}>
            <Breadcrumbs.Item>
                <Flex alignItems="center" gap={1}>
                    <House /> uikit
                </Flex>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
                <Flex alignItems="center" gap={1}>
                    <Flame /> components
                </Flex>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
                <Flex alignItems="center" gap={1}>
                    <Rocket style={{minWidth: 16}} />
                    <Text ellipsis variant="inherit">
                        Breadcrumbs
                    </Text>
                </Flex>
            </Breadcrumbs.Item>
        </Breadcrumbs.Root>
    ),
} satisfies Story;

export const Landmarks = {
    render: (args) => <nav aria-label="Breadcrumb">{Links.render(args)}</nav>,
} satisfies Story;
