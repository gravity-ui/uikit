import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase as ShowcaseComponent} from '../../../demo/Showcase';
import {Link} from '../Link';
import {LinkShowcase} from '../__stories__/LinkShowcase';

export default {
    title: 'Components/Navigation/Link',
    component: Link,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
    args: {
        children: 'Link',
    },
} as Meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Showcase: Story = {
    render: () => <LinkShowcase />,
};

export const View: Story = {
    render: (args) => (
        <ShowcaseComponent>
            <Link {...args} view="normal">
                Normal
            </Link>
            <Link {...args} view="primary">
                Primary
            </Link>
            <Link {...args} view="secondary">
                Secondary
            </Link>
        </ShowcaseComponent>
    ),
};
