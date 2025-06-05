import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Disclosure} from '../../../Disclosure';
import {TextArea} from '../TextArea';

import {TextAreaCustomShowcase, TextAreaShowcase} from './TextAreaShowcase';

const meta: Meta<typeof TextArea> = {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
    parameters: {
        a11y: {
            context: '#storybook-root',
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
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    render: (args) => <TextArea {...args} />,
    parameters: {
        controls: {
            exclude: /^on[A-Z]|Ref$/,
        },
    },
    argTypes: {
        autoComplete: {
            options: ['on', 'off', 'none'],
            mapping: {none: undefined},
            control: {type: 'radio'},
        },
        note: {
            control: 'text',
        },
        error: {
            control: 'text',
        },
        errorMessage: {
            control: 'text',
        },
        validationState: {
            options: ['invalid', 'none'],
            mapping: {none: undefined},
            control: {type: 'radio'},
        },
    },
};

export const InsideDisclosure = {
    ...Default,
    render: function InsideDisclosure(args) {
        return (
            <Disclosure summary="TextArea inside">
                <TextArea {...args} />
            </Disclosure>
        );
    },
    args: {
        ...Default.args,
        defaultValue: 'first line\nsecond line\nthird line',
    },
} satisfies Story;

export const Showcase = {
    render: () => <TextAreaShowcase />,
    parameters: {controls: {disable: true}},
} satisfies Story;

export const CustomTheme = {
    render: () => <TextAreaCustomShowcase />,
    parameters: {controls: {disable: true}},
} satisfies Story;
