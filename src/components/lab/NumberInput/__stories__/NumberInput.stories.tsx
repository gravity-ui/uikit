import React from 'react';

import type {Meta, StoryFn, StoryObj} from '@storybook/react';

import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';

import {NumberInputShowcase} from './NumberInputShowcase';
import {NumberInputSizes} from './NumberInputSizes';

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

        controls: {expanded: true},
    },
} as Meta;

const fixConsoleErrors = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
};

const DefaultTemplate: StoryFn<NumberInputProps> = (args) => {
    const [value, setValue] = React.useState(args.value ?? args.defaultValue ?? undefined);
    return <NumberInput {...fixConsoleErrors} {...args} value={value} onUpdate={setValue} />;
};
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn<NumberInputProps> = (args: NumberInputProps) => (
    <NumberInputShowcase {...args} />
);
export const Showcase = ShowcaseTemplate.bind({});

export const Basic: StoryObj<typeof NumberInput> = {
    args: {
        ...fixConsoleErrors,
    },
    render: (args: NumberInputProps) => <NumberInputSizes {...args} />,
};

export const WithErrors: StoryObj<typeof NumberInput> = {
    args: {
        ...fixConsoleErrors,
        validationState: 'invalid',
        errorPlacement: 'inside',
        errorMessage: 'A validation error has occurred',
        hasClear: true,
        label: 'Label:',
    },
    render: (args: NumberInputProps) => <NumberInputSizes {...args} />,
};

export const ViewClear: StoryObj<typeof NumberInput> = {
    args: {
        ...fixConsoleErrors,
        view: 'clear',
        validationState: 'invalid',
        errorPlacement: 'inside',
        errorMessage: 'A validation error has occurred',
        hasClear: true,
        label: 'Label:',
    },
    render: (args: NumberInputProps) => <NumberInputSizes {...args} />,
};
