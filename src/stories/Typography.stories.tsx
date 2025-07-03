import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {RenderFonts} from '../demo/typography/Fonts';
import {RenderVariants} from '../demo/typography/Variants';

export default {
    title: 'Typography',
    parameters: {
        a11y: {
            context: '#storybook-root',
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

export const Fonts: StoryFn = () => <RenderFonts />;
export const Variants: StoryFn = () => <RenderVariants />;
