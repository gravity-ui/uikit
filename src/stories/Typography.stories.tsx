import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {RenderFonts} from '../demo/typography/Fonts';
import {RenderVariants} from '../demo/typography/Variants';

export default {
    title: 'Typography',
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
            options: {},
        },
    },
} as Meta;

export const Fonts: StoryFn = () => <RenderFonts />;
export const Variants: StoryFn = () => <RenderVariants />;
