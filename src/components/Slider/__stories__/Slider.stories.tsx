import React from 'react';

import {action} from '@storybook/addon-actions';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Slider} from '../Slider';
import type {SliderProps, SliderValue} from '../types';

type Story = StoryObj<typeof Slider>;

export default {
    title: 'Components/Inputs/Slider',
    component: Slider,
    args: {
        'aria-label': 'Example slider field',
    },
    decorators: [
        function useTextValue(Story, ctx) {
            const [, setArgs] = useArgs<typeof ctx.args>();

            const handleUpdate = (value: SliderValue) => {
                if (ctx.args.value !== undefined) {
                    setArgs({
                        value,
                    });
                }
            };

            return <Story args={{...ctx.args, onUpdate: handleUpdate}} />;
        },
    ],
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
} as Meta<typeof Slider>;

export const Default: Story = {
    args: {
        value: 20,
        min: 0,
        max: 100,
        step: 1,
        onFocus: action('onFocus'),
        onBlur: action('onBlur'),
        onUpdate: action('onUpdate'),
        onUpdateComplete: action('onUpdateComplete'),
    },
};

export const DefaultRange: Story = {
    args: {
        ...Default.args,
        value: [20, 80],
    },
    name: 'Default (for range value)',
};

const sizeCases: Array<NonNullable<SliderProps['size']>> = ['s', 'm', 'l', 'xl'];

export const Size: Story = {
    render: (args) => (
        <Showcase isVertical>
            {sizeCases.map((size, index) => (
                <ShowcaseItem title={size} key={index}>
                    <Slider {...args} size={size} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

export const SizeRange: Story = {
    render: (args) => (
        <Showcase isVertical>
            {sizeCases.map((size, index) => (
                <ShowcaseItem title={size} key={index}>
                    <Slider {...args} size={size} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...DefaultRange.args,
    },
    name: 'Size (for range value)',
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const DisabledRange: Story = {
    args: {
        ...DefaultRange.args,
        disabled: true,
    },
    name: 'Disabled (for range value)',
};

export const Error: Story = {
    args: {
        ...Default.args,
        errorMessage: 'Error message',
        validationState: 'invalid',
    },
};

export const ErrorRange: Story = {
    args: {
        ...DefaultRange.args,
        errorMessage: 'Error message',
        validationState: 'invalid',
    },
    name: 'Error (for range value)',
};

export const Tooltip: Story = {
    args: {
        ...Default.args,
        hasTooltip: true,
    },
};

export const TooltipRange: Story = {
    args: {
        ...DefaultRange.args,
        hasTooltip: true,
    },
    name: 'Tooltip (for range value)',
};

export const MarksCount: Story = {
    args: {
        ...Default.args,
        marksCount: 11,
    },
    name: 'Marks count',
};

export const MarksCountRange: Story = {
    args: {
        ...DefaultRange.args,
        marksCount: 11,
    },
    name: 'Marks count (for range value)',
};

export const AvailableValues: Story = {
    args: {
        ...Default.args,
        availableValues: [10, 20, 50, 55, 65, 80],
    },
    name: 'Available values',
};

export const AvailableValuesRange: Story = {
    args: {
        ...DefaultRange.args,
        availableValues: [10, 20, 50, 55, 65, 80],
    },
    name: 'Available values (for range value)',
};
