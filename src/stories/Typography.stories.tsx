import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {RenderFonts} from '../demo/typography/Fonts';
import {RenderVariants} from '../demo/typography/Variants';

export default {
    title: 'Typography',
} as Meta;

export const Fonts: StoryFn = () => <RenderFonts />;
export const Variants: StoryFn = () => <RenderVariants />;
