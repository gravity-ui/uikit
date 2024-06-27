import React from 'react';

import {action} from '@storybook/addon-actions';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../../demo/Showcase';
import {ShowcaseItem} from '../../../../demo/ShowcaseItem';
import type {TextAreaProps} from '../TextArea';
import {TextArea} from '../TextArea';

import {TextAreaCustomShowcase, TextAreaShowcase} from './TextAreaShowcase';

export default {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'label',
                        enabled: false,
                    },
                    {
                        id: 'label-title-only',
                        enabled: false,
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                        selector: '.text-input-showcase__custom-theme',
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

type Story = StoryObj<typeof TextArea>;

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
    render: (args) => <TextAreaShowcase {...args} />,
};

export const CustomShowcases: Story = {
    render: (args) => <TextAreaCustomShowcase {...args} />,
};

const viewCases: Array<NonNullable<TextAreaProps['view']>> = ['normal', 'clear'];

export const View: Story = {
    render: (args) => (
        <Showcase>
            {viewCases.map((view, index) => (
                <ShowcaseItem title={view} key={index}>
                    <TextArea {...args} view={view} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const sizeCases: Array<NonNullable<TextAreaProps['size']>> = ['s', 'm', 'l', 'xl'];

export const Size: Story = {
    render: (args) => (
        <Showcase>
            {sizeCases.map((size, index) => (
                <ShowcaseItem title={size} key={index}>
                    <TextArea {...args} size={size} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const pinCases: Array<NonNullable<TextAreaProps['pin']>> = [
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
                    <TextArea {...args} pin={pin} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const validationStateCases: Array<NonNullable<TextAreaProps['validationState']>> = ['invalid'];

export const ValidationState: Story = {
    render: (args) => (
        <Showcase>
            {validationStateCases.map((validationState, index) => (
                <ShowcaseItem title={validationState} key={index}>
                    <TextArea {...args} validationState={validationState} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const errorPlacementCases: Array<NonNullable<TextAreaProps['errorPlacement']>> = [
    'outside',
    'inside',
];

export const ErrorPlacement: Story = {
    render: (args) => (
        <Showcase>
            {errorPlacementCases.map((errorPlacement, index) => (
                <ShowcaseItem title={errorPlacement} key={index}>
                    <TextArea {...args} errorPlacement={errorPlacement} />
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
        note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
};

export const Rows: Story = {
    args: {
        ...Default.args,
        value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        maxRows: 10,
        minRows: 20,
        rows: 15,
    },
};

export const Custom: Story = {
    render: (args) => (
        <React.Fragment>
            <style>
                {`.g-root {
                    --g-text-area-text-color: #000;
                    --g-text-area-placeholder-color: #333;
                    --g-text-area-background-color: #f08080;
                    --g-text-area-border-radius: 40px;
                    --g-text-area-border-width: 5px;
                    --g-text-area-border-color: #fff;
                    --g-text-area-border-color-hover: #777;
                    --g-text-area-border-color-active: #000;
                    --g-text-area-focus-outline-color: #333;
                }`}
            </style>
            <TextArea {...args} />
        </React.Fragment>
    ),
    args: {
        ...Default.args,
    },
};
