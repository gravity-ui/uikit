import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ColorPicker} from '../ColorPicker';

export default {
    title: 'Components/Inputs/ColorPicker',
    component: ColorPicker,
    args: {size: 20},
} as Meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {args: {}};
export const WithoutAlpha: Story = {args: {withAlpha: false}};
