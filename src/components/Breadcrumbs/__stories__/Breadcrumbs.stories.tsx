import React from 'react';

import type {StoryFn} from '@storybook/react';

import {Breadcrumbs} from '../Breadcrumbs';
import type {BreadcrumbsProps} from '../Breadcrumbs';

import {BreadcrumbsShowcase} from './BreadcrumbsShowcase';

const items = [
    {
        text: 'Region',
        href: '#',
    },
    {
        text: 'Country',
        href: '#',
    },
    {
        text: 'City',
        href: '#',
    },
    {
        text: 'District',
        href: '#',
    },
    {
        text: 'Street',
        href: '#',
    },
];

export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    // TODO: debug why it can't parse enum
    argTypes: {
        firstDisplayedItemsCount: {
            control: {
                type: 'radio',
                options: [0, 1],
            },
        },
        lastDisplayedItemsCount: {
            control: {
                type: 'radio',
                options: [1, 2],
            },
        },
    },
};

const DefaultTemplate: StoryFn<BreadcrumbsProps> = (args) => <Breadcrumbs {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    items,
    firstDisplayedItemsCount: 0,
    lastDisplayedItemsCount: 1,
};

const ShowcaseTemplate: StoryFn<BreadcrumbsProps> = (args) => <BreadcrumbsShowcase {...args} />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.args = {
    firstDisplayedItemsCount: 0,
    lastDisplayedItemsCount: 1,
};
