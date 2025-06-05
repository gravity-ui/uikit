import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ClipboardIcon} from '../ClipboardIcon';

export default {
    title: 'Components/Utils/ClipboardIcon',
    component: ClipboardIcon,
    args: {size: 20},
} as Meta;

type Story = StoryObj<typeof ClipboardIcon>;

export const Default: Story = {args: {status: 'pending'}};

export const Success: Story = {args: {status: 'success'}};

export const Error: Story = {args: {status: 'error'}};
