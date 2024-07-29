import React from 'react';

import {action} from '@storybook/addon-actions';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../../demo/Showcase';
import {ShowcaseItem} from '../../../../demo/ShowcaseItem';
import type {TextInputProps} from '../TextInput';
import {TextInput} from '../TextInput';

import {CustomThemeShowcase} from './TextInputCustomThemeShowcase';
import {TextInputShowcase} from './TextInputShowcase';

export default {
    title: 'Components/Inputs/TextInput',
    component: TextInput,
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
    decorators: [
        function useTextValue(Story, ctx) {
            const [, setArgs] = useArgs<typeof ctx.args>();

            const handleUpdate = (value: string) => {
                ctx.args.onValueChange?.(value);

                // Check if the component is controlled
                if (ctx.args.value !== undefined) {
                    setArgs({value});
                }
            };

            return <Story args={{...ctx.args, onUpdate: handleUpdate}} />;
        },
    ],
} as Meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
    args: {
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
        onKeyDown: action('onKeyDown'),
        onKeyPress: action('onKeyPress'),
        onKeyUp: action('onKeyUp'),
        onUpdate: action('onUpdate'),
        value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        placeholder: 'Type text...',
    },
};

export const AllShowcases: Story = {
    render: (args) => <TextInputShowcase {...args} />,
};

export const CustomShowcases: Story = {
    render: (args) => <CustomThemeShowcase {...args} />,
};

const viewCases: Array<NonNullable<TextInputProps['view']>> = ['normal', 'clear'];

export const View: Story = {
    render: (args) => (
        <Showcase>
            {viewCases.map((view, index) => (
                <ShowcaseItem title={view} key={index}>
                    <TextInput {...args} view={view} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const sizeCases: Array<NonNullable<TextInputProps['size']>> = ['s', 'm', 'l', 'xl'];

export const Size: Story = {
    render: (args) => (
        <Showcase>
            {sizeCases.map((size, index) => (
                <ShowcaseItem title={size} key={index}>
                    <TextInput {...args} size={size} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const pinCases: Array<NonNullable<TextInputProps['pin']>> = [
    'round-round',
    'brick-brick',
    'clear-clear',
    'round-brick',
    'brick-round',
    'round-clear',
    'clear-round',
    'brick-clear',
    'clear-brick',
];

export const Pin: Story = {
    render: (args) => (
        <Showcase>
            {pinCases.map((pin, index) => (
                <ShowcaseItem title={pin} key={index}>
                    <TextInput {...args} pin={pin} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const validationStateCases: Array<NonNullable<TextInputProps['validationState']>> = ['invalid'];

export const ValidationState: Story = {
    render: (args) => (
        <Showcase>
            {validationStateCases.map((validationState, index) => (
                <ShowcaseItem title={validationState} key={index}>
                    <TextInput {...args} validationState={validationState} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const errorPlacementCases: Array<NonNullable<TextInputProps['errorPlacement']>> = [
    'outside',
    'inside',
];

export const ErrorPlacement: Story = {
    render: (args) => (
        <Showcase>
            {errorPlacementCases.map((errorPlacement, index) => (
                <ShowcaseItem title={errorPlacement} key={index}>
                    <TextInput {...args} errorPlacement={errorPlacement} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
        errorMessage: 'Error message',
        validationState: 'invalid',
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const HasClear: Story = {
    args: {
        ...Default.args,
        hasClear: true,
    },
};

export const WithNote: Story = {
    args: {
        ...Default.args,
        note: 'Note text',
    },
};

export const WithEndContent: Story = {
    args: {
        ...Default.args,
        endContent: 'End content',
    },
};

export const WithStartContent: Story = {
    args: {
        ...Default.args,
        startContent: 'Start content',
    },
};

export const WithLabel: Story = {
    args: {
        ...Default.args,
        label: 'Label',
    },
};

export const WithEmailType: Story = {
    args: {
        ...Default.args,
        value: 'test@gravity-ui.com',
        type: 'email',
    },
};

export const WithNumberType: Story = {
    args: {
        ...Default.args,
        value: '1234',
        type: 'number',
    },
};

export const WithPasswordType: Story = {
    args: {
        ...Default.args,
        value: 'qwerty',
        type: 'password',
    },
};

export const WithSearchType: Story = {
    args: {
        ...Default.args,
        value: 'query',
        type: 'search',
    },
};

export const WithTelType: Story = {
    args: {
        ...Default.args,
        value: '+7911111111',
        type: 'tel',
    },
};

export const WithTextType: Story = {
    args: {
        ...Default.args,
        type: 'text',
    },
};

export const WithUrlType: Story = {
    args: {
        ...Default.args,
        value: 'https://gravity-ui.com/',
        type: 'url',
    },
};

export const Custom: Story = {
    render: (args) => (
        <React.Fragment>
            <style>
                {`.g-root {
                    --g-text-input-text-color: #333;
                    --g-text-input-label-color: #333;
                    --g-text-input-placeholder-color: #555;
                    --g-text-input-background-color: #f08080;
                    --g-text-input-border-radius: 20px;
                    --g-text-input-border-width: 5px;
                    --g-text-input-border-color: #fff;
                    --g-text-input-border-color-hover: #777;
                    --g-text-input-border-color-active: #000;
                    --g-text-input-focus-outline-color: #333;
                }`}
            </style>
            <TextInput {...args} />
        </React.Fragment>
    ),
    args: {
        ...Default.args,
    },
};
