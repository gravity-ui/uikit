import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {SliderInput} from '../SliderInput';
import type {SliderInputProps} from '../SliderInput';

type Story = StoryObj<typeof SliderInput>;

function ControlledSliderInput(props: SliderInputProps) {
    const [value, setValue] = React.useState(props.value ?? props.defaultValue ?? props.min ?? 0);

    return <SliderInput {...props} value={value} onUpdate={setValue} />;
}

export default {
    title: 'Components/Inputs/SliderInput',
    component: SliderInput,
    args: {
        'aria-label': 'Example slider input',
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [{id: 'color-contrast', enabled: false}],
            },
        },
    },
} satisfies Meta<typeof SliderInput>;

export const Default: Story = {};

export const Controlled: Story = {
    render: (args) => <ControlledSliderInput {...args} />,
};

export const Sizes: Story = {
    render: (args) => (
        <Showcase>
            <SliderInput {...args} size="s" defaultValue={25} />
            <SliderInput {...args} size="m" defaultValue={50} />
            <SliderInput {...args} size="l" defaultValue={75} />
            <SliderInput {...args} size="xl" defaultValue={100} />
        </Showcase>
    ),
};

export const Marks: Story = {
    args: {
        min: 0,
        max: 100,
        step: null,
        marks: [0, 25, 50, 75, 100],
        defaultValue: 50,
    },
};

export const EmptyMarkLabels: Story = {
    args: {
        ...Marks.args,
        markFormat: () => '',
    },
};

export const FixedValue: Story = {
    args: {
        min: 5,
        max: 5,
        name: 'amount',
    },
};

export const States: Story = {
    render: (args) => (
        <Showcase>
            <SliderInput {...args} defaultValue={30} />
            <SliderInput {...args} defaultValue={50} disabled />
            <SliderInput
                {...args}
                defaultValue={70}
                validationState="invalid"
                errorMessage="Invalid value"
            />
        </Showcase>
    ),
};
