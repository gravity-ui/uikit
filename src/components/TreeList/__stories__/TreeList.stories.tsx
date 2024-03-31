import type {Meta, StoryObj} from '@storybook/react';

import {TreeList} from '../TreeList';

import {DefaultStory} from './stories/DefaultStory';
import {InfinityScrollStory} from './stories/InfinityScrollStory';
import {WithDndListStory} from './stories/WithDndListStory';
import {WithFiltrationAndControlsStory} from './stories/WithFiltrationAndControlsStory';
import {WithGroupSelectionAndCustomIconStory} from './stories/WithGroupSelectionAndCustomIconStory';
import {WithItemLinksAndActionsStory} from './stories/WithItemLinksAndActionsStory';

export default {
    title: 'Unstable/TreeList',
    component: TreeList,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultStory>;

export const Default: DefaultStoryObj = {
    render: DefaultStory,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
};

type InfinityScrollStoryObj = StoryObj<typeof InfinityScrollStory>;

export const InfinityScroll: InfinityScrollStoryObj = {
    render: InfinityScrollStory,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'scrollable-region-focusable',
                        enabled: false,
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
};

type WithDndListStoryObj = StoryObj<typeof WithDndListStory>;

export const WithDndList: WithDndListStoryObj = {
    parameters: {
        // Strict mode ruins sortable list due to this react-beautiful-dnd issue
        // https://github.com/atlassian/react-beautiful-dnd/issues/2350
        disableStrictMode: true,
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                    {
                        id: 'aria-allowed-attr',
                        enabled: false,
                    },
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'aria-required-children',
                        enabled: false,
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
    render: WithDndListStory,
};

type WithFiltrationAndControlsStoryObj = StoryObj<typeof WithFiltrationAndControlsStory>;

export const WithFiltrationAndControls: WithFiltrationAndControlsStoryObj = {
    render: WithFiltrationAndControlsStory,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'scrollable-region-focusable',
                        enabled: false,
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
};

type WithGroupSelectionAndCustomIconStoryObj = StoryObj<
    typeof WithGroupSelectionAndCustomIconStory
>;

export const WithGroupSelectionAndCustomIcon: WithGroupSelectionAndCustomIconStoryObj = {
    render: WithGroupSelectionAndCustomIconStory,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'nested-interactive',
                        enabled: false,
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
};

type WithItemLinksAndActionsStoryObj = StoryObj<typeof WithItemLinksAndActionsStory>;

export const WithItemLinksAndActions: WithItemLinksAndActionsStoryObj = {
    render: WithItemLinksAndActionsStory,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'aria-required-children',
                        enabled: false,
                    },
                    {
                        id: 'aria-required-parent',
                        enabled: false,
                    },
                    {
                        id: 'nested-interactive',
                        enabled: false,
                    },
                ],
            },
        },
    },
};
