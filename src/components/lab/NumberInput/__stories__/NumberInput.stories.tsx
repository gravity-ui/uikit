import React from 'react';

import {ArrowShapeUpToLine} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../../demo/Showcase';
import {Button} from '../../../Button';
import {Checkbox} from '../../../Checkbox';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';
import {getNumericInputValidator} from '../utils';

export default {
    title: 'Lab/NumberInput',
    component: NumberInput,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                        selector: '.g-outer-additional-content',
                    },
                    {
                        id: 'label-title-only',
                        enabled: false,
                    },
                    {
                        id: 'label',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof NumberInput>;

function StoryWithState(args: NumberInputProps) {
    const [value, setValue] = React.useState(args.value ?? args.defaultValue ?? null);
    return <NumberInput {...args} value={value} onUpdate={setValue} />;
}

export const Default: Story = {
    args: {},
    render: StoryWithState,
};

export const Behaviour: Story = {
    args: {},
    render: (args) => (
        <Showcase>
            <StoryWithState placeholder="controlled" {...args} />
            <NumberInput placeholder="uncontrolled" {...args} />
        </Showcase>
    ),
};

export const Sizes: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <StoryWithState size="s" placeholder="size=s" {...args} />
            <StoryWithState size="m" placeholder="size=m" {...args} />
            <StoryWithState size="l" placeholder="size=l" {...args} />
            <StoryWithState size="xl" placeholder="size=xl" {...args} />
        </Showcase>
    ),
};

export const Errors: Story = {
    args: {
        ...Default.args,
        validationState: 'invalid',
    },
    render: (args) => (
        <Showcase>
            <StoryWithState placeholder="without message" {...args} />
            <StoryWithState
                placeholder="inside error placement"
                errorPlacement="inside"
                errorMessage="A validation error has occurred"
                {...args}
            />
            <StoryWithState
                placeholder="outside error placement"
                errorPlacement="outside"
                errorMessage="A validation error has occurred"
                {...args}
            />
        </Showcase>
    ),
};

export const View: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <StoryWithState placeholder="view=normal" view="normal" {...args} />
            <StoryWithState placeholder="view=normal disabled" view="normal" disabled {...args} />
            <StoryWithState placeholder="view=clear" view="clear" {...args} />
            <StoryWithState placeholder="view=clear disabled" view="clear" disabled {...args} />
        </Showcase>
    ),
};

export const Controls: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <StoryWithState placeholder="with controls" {...args} />
            <StoryWithState placeholder="without controls" hiddenControls={true} {...args} />
            <StoryWithState placeholder="has clear" value={123} hasClear {...args} />
        </Showcase>
    ),
};

export const AdditionalContent: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <StoryWithState placeholder="without start content" startContent="$" {...args} />
            <StoryWithState placeholder="without end content" endContent="$" {...args} />
            <StoryWithState
                placeholder="without button start content"
                startContent={
                    <Button size={args.size ?? 'm'} view="flat" title="example button">
                        <Icon data={ArrowShapeUpToLine} />
                    </Button>
                }
                {...args}
            />
            <StoryWithState
                placeholder="without button end content"
                endContent={
                    <Button size={args.size ?? 'm'} view="flat" title="example button">
                        <Icon data={ArrowShapeUpToLine} />
                    </Button>
                }
                {...args}
            />
        </Showcase>
    ),
};

export const Step: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <StoryWithState placeholder="default [step=1]" {...args} />
            <StoryWithState step={5} placeholder="step=5" {...args} />
            <StoryWithState shiftMultiplier={50} placeholder="shiftMultiplier=50" {...args} />
            <StoryWithState step={5} min={2} placeholder="step=5 min=2" {...args} />
            <StoryWithState
                step={1.25}
                allowDecimal
                placeholder="step=1.25 with allowDecimal"
                {...args}
            />
        </Showcase>
    ),
};

export const MinMax: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <StoryWithState min={-1000} max={1000} placeholder="min=-1000 max=1000" {...args} />
            <StoryWithState
                min={-10.25}
                max={1000}
                allowDecimal
                placeholder="min=-10.25 max=1000 with allowDecimal"
                {...args}
            />
        </Showcase>
    ),
};

export const WithValidators: Story = {
    args: {
        ...Default.args,
    },
    render: function WithValidatorsStory(args) {
        const [value, setValue] = React.useState(args.value ?? args.defaultValue ?? null);
        const [positiveOnly, setPositiveOnly] = React.useState(false);
        const [withoutFraction, setWithoutFraction] = React.useState(true);

        const validatorProps = {
            positiveOnly,
            withoutFraction,
            min: -10000,
            max: 10000,
        };

        const {pattern, validator} = getNumericInputValidator(validatorProps);
        const validationProps = {
            validationState: validator(value) ? ('invalid' as const) : undefined,
            errorMessage: validator(value),
            controlProps: {pattern},
        };

        return (
            <Flex gap={4}>
                <Flex direction="column" gap={4}>
                    <NumberInput
                        {...args}
                        {...validationProps}
                        allowDecimal
                        step={0.1}
                        value={value}
                        onUpdate={setValue}
                        placeholder={`step=0.1 allowDecimal validator=${JSON.stringify(validatorProps)}`}
                    />
                    <NumberInput
                        {...args}
                        {...validationProps}
                        allowDecimal
                        step={0.1}
                        value={value}
                        onUpdate={setValue}
                        controlProps={{pattern}}
                        placeholder={`with pattern, step=0.1 allowDecimal validator=${JSON.stringify(validatorProps)}`}
                    />
                </Flex>
                <Flex direction="column" gap={4}>
                    <Checkbox checked={positiveOnly} onUpdate={setPositiveOnly}>
                        positiveOnly
                    </Checkbox>
                    <Checkbox checked={withoutFraction} onUpdate={setWithoutFraction}>
                        withoutFraction
                    </Checkbox>
                </Flex>
            </Flex>
        );
    },
};

export const TextHints: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <StoryWithState placeholder="with label" label="Label:" {...args} />
            <StoryWithState
                placeholder="with note"
                note={<Text color="secondary">Additional</Text>}
                {...args}
            />
        </Showcase>
    ),
};
