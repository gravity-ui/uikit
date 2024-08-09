import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {PlaceholderContainer} from '../PlaceholderContainer';

import {PlaceholderContainerShowcase} from './PlaceholderContainerShowcase';

export default {
    title: 'Components/PlaceholderContainer',
    component: PlaceholderContainer,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const ShowcaseTemplate: StoryFn = () => <PlaceholderContainerShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
