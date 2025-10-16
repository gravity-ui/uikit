import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {TreeList} from '../TreeList';

import {DefaultStory} from './stories/DefaultStory';
import {InfinityScrollStory} from './stories/InfinityScrollStory';
import {WithDisabledElementsStory} from './stories/WithDisabledElementsStory';
import {WithDndListStory} from './stories/WithDndListStory';
import {WithFiltrationAndControlsStory} from './stories/WithFiltrationAndControlsStory';
import {WithGroupSelectionAndCustomIconStory} from './stories/WithGroupSelectionAndCustomIconStory';
import {WithItemLinksAndActionsStory} from './stories/WithItemLinksAndActionsStory';

export default {
    title: 'Lab/TreeList',
    component: TreeList,
} as Meta;

type DefaultStoryObj = StoryObj<typeof DefaultStory>;

export const Default: DefaultStoryObj = {
    render: DefaultStory,
    parameters: {
        a11y: {
            context: '#storybook-root',
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
            context: '#storybook-root',
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
        a11y: {
            context: '#storybook-root',
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
            context: '#storybook-root',
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
            context: '#storybook-root',
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
            context: '#storybook-root',
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

type WithDisabledElementsStoryObj = StoryObj<typeof WithDisabledElementsStory>;

export const WithDisabledElements: WithDisabledElementsStoryObj = {
    render: WithDisabledElementsStory,
    parameters: {
        a11y: {
            context: '#storybook-root',
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
