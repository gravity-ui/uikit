import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';

import {NumberInputShowcase} from './NumberInputShowcase';

export default {
    title: 'Components/Inputs/NumberInput',
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
    const [value, setValue] = React.useState(args.value ?? args.defaultValue ?? '');
    return <NumberInput {...fixConsoleErrors} {...args} value={value} onUpdate={setValue} />;
};
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = (args: NumberInputProps) => <NumberInputShowcase {...args} />;
export const Showcase = ShowcaseTemplate.bind({});
