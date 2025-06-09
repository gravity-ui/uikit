import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {TextInput} from '../TextInput';
import type {TextInputProps} from '../TextInput';

import {CustomThemeShowcase} from './TextInputCustomThemeShowcase';
import {TextInputShowcase} from './TextInputShowcase';

export default {
    title: 'Components/Inputs/TextInput',
    component: TextInput,
    parameters: {
        a11y: {
            context: '#storybook-root',
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

const fixConsoleErrors = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
};

const DefaultTemplate: StoryFn<TextInputProps> = (args) => (
    <TextInput {...fixConsoleErrors} {...args} />
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = (args: TextInputProps) => <TextInputShowcase {...args} />;
export const Showcase = ShowcaseTemplate.bind({});

const CustomThemeTemplate: StoryFn = () => <CustomThemeShowcase />;
export const CustomTheme = CustomThemeTemplate.bind({});
