import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {BrandingConfigurator} from './BrandingConfugurator/BrandingConfigurator';

export default {
    title: 'Branding/Example',
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
                        id: 'label',
                        enabled: false,
                        selector: '.g-switch__control',
                    },
                ],
            },
        },
    },
} as Meta;

export const Example: StoryFn = (_, ctx) => {
    return <BrandingConfigurator theme={ctx.globals.theme} />;
};
