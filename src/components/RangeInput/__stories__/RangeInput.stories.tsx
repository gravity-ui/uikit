import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {RangeInput} from '../RangeInput';
import type {RangeInputProps} from '../RangeInput';

type Story = StoryObj<typeof RangeInput>;

function ControlledRangeInput(props: RangeInputProps) {
    const [value, setValue] = React.useState(props.value ?? props.defaultValue ?? props.min ?? 0);

    return <RangeInput {...props} value={value} onUpdate={setValue} />;
}

export default {
    title: 'Components/Inputs/RangeInput',
    component: RangeInput,
    args: {
        'aria-label': 'Example range input',
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [{id: 'color-contrast', enabled: false}],
            },
        },
    },
} satisfies Meta<typeof RangeInput>;

export const Default: Story = {};

export const Controlled: Story = {
    render: (args) => <ControlledRangeInput {...args} />,
};

export const Sizes: Story = {
    render: (args) => (
        <Showcase>
            <RangeInput {...args} size="s" defaultValue={25} />
            <RangeInput {...args} size="m" defaultValue={50} />
            <RangeInput {...args} size="l" defaultValue={75} />
            <RangeInput {...args} size="xl" defaultValue={100} />
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

export const States: Story = {
    render: (args) => (
        <Showcase>
            <RangeInput {...args} defaultValue={30} />
            <RangeInput {...args} defaultValue={50} disabled />
            <RangeInput
                {...args}
                defaultValue={70}
                validationState="invalid"
                errorMessage="Invalid value"
            />
        </Showcase>
    ),
};
