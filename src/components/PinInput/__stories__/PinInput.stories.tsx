import React from 'react';

import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import type {PinInputProps} from '../PinInput';
import {PinInput} from '../PinInput';

export default {
    title: 'Components/Inputs/PinInput',
    component: PinInput,
} as Meta<PinInputProps>;

type Story = StoryObj<typeof PinInput>;

export const Default: Story = {
    args: {
        onUpdate: action('onUpdate'),
        onUpdateComplete: action('onUpdateComplete'),
        'aria-label': 'PIN code',
    },
};

export const Length: Story = {
    args: {
        ...Default.args,
        length: 6,
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase direction="column">
            <ShowcaseItem title="Size s">
                <PinInput {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <PinInput {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <PinInput {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <PinInput {...args} size="xl" />
            </ShowcaseItem>
        </Showcase>
    ),
    args: Default.args,
};

export const Type: Story = {
    render: (args) => (
        <Showcase direction="column">
            <ShowcaseItem title="Numeric">
                <PinInput {...args} type="numeric" />
            </ShowcaseItem>
            <ShowcaseItem title="Alphanumeric">
                <PinInput {...args} type="alphanumeric" />
            </ShowcaseItem>
        </Showcase>
    ),
    args: Default.args,
};

export const InitialValue: Story = {
    args: {
        ...Default.args,
        defaultValue: ['1', '2', '3', '4'],
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const Placeholder: Story = {
    args: {
        ...Default.args,
        placeholder: '●',
    },
};

export const Mask: Story = {
    args: {
        ...Default.args,
        mask: true,
    },
};

export const Invalid: Story = {
    args: {
        ...Default.args,
        validationState: 'invalid',
    },
};

export const InvalidMessage: Story = {
    args: {
        ...Default.args,
        validationState: 'invalid',
        errorMessage: 'Incorrect PIN',
    },
    name: 'Invalid + Message',
};

export const WithNote: Story = {
    args: {
        ...Default.args,
        note: 'Additional info',
    },
};
