import type {StoryFn} from '@storybook/react-webpack5';

import {Breadcrumbs} from '../Breadcrumbs';
import type {BreadcrumbsProps} from '../Breadcrumbs';

import {BreadcrumbsShowcase} from './BreadcrumbsShowcase';

const action = () => {};
const items = [
    {
        text: 'Region',
        action,
    },
    {
        text: 'Country',
        action,
    },
    {
        text: 'City',
        action,
    },
    {
        text: 'District',
        action,
    },
    {
        text: 'Street',
        action,
    },
];

export default {
    title: 'Legacy/Breadcrumbs',
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
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1334
                    },
                ],
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
