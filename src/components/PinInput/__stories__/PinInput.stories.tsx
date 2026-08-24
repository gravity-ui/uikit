import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {useUniqId} from '../../../hooks';
import {Flex} from '../../layout';
import type {PinInputApi, PinInputProps} from '../PinInput';
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
        onFocus: action('onFocus'),
        onBlur: action('onBlur'),
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

export const Responsive: Story = {
    render: (args) => (
        <div
            style={{
                resize: 'horizontal',
                width: 200,
                overflow: 'scroll',
                paddingBottom: 16,
            }}
        >
            <PinInput {...args} />
        </div>
    ),
    args: {
        ...Default.args,
        responsive: true,
    },
};

export const WithLabel = {
    render: function WithLabel(args) {
        const id = args.id ?? 'pin-input';
        const labelId = useUniqId();
        const refApi = React.useRef<PinInputApi>(null);
        /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
        return (
            <Flex direction="row" gap={2} alignItems="center">
                <label
                    id={labelId}
                    htmlFor={id}
                    onClick={() => {
                        refApi.current?.focus();
                    }}
                >
                    PIN code
                </label>
                <PinInput
                    apiRef={refApi}
                    {...args}
                    aria-labelledby={labelId}
                    id={id}
                    name="pin-field"
                />
            </Flex>
        );
        /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    },
    args: {
        ...Default.args,
    },
} satisfies Story;
