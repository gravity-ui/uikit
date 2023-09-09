import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {BrandingConfigurator} from './BrandingConfugurator/BrandingConfigurator';

export default {
    title: 'Branding/Example',
    parameters: {
        screenshot: {
            skip: true,
        },
    },
} as Meta;

export const Example: StoryFn = (_, ctx) => {
    return <BrandingConfigurator theme={ctx.globals.theme} />;
};
