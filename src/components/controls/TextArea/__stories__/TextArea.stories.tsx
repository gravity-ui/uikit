import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {TextArea} from '../TextArea';
import type {TextAreaProps} from '../TextArea';

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
} as Meta;

const fixConsoleErrors = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
};

const DefaultTemplate: StoryFn<TextAreaProps> = (args) => (
    <TextArea {...fixConsoleErrors} {...args} />
);

export const Default = {
    render: DefaultTemplate,
};

const ShowcaseTemplate: StoryFn = () => <TextAreaShowcase />;
export const Showcase = {
    render: ShowcaseTemplate,
};

const CustomThemeTemplate: StoryFn = () => <TextAreaCustomShowcase />;
export const CustomTheme = {
    render: CustomThemeTemplate,
};
