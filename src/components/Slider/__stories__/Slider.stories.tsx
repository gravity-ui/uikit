import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Slider} from '../Slider';

import {SliderShowcase} from './SliderShowcase';

type Story = StoryObj<typeof Slider>;

export default {
    title: 'Components/Inputs/Slider',
    component: Slider,
    args: {
        'aria-label': 'Example slider field',
    },
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
} as Meta<typeof Slider>;

export const Default: Story = {};

export const Showcase: Story = {
    render: (args) => {
        return <SliderShowcase {...args} />;
    },
};
