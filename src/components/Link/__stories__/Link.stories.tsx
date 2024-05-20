import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {Link} from '../Link';

export default {
    title: 'Components/Navigation/Link',
    component: Link,
    parameters: {
        a11y: {
            element: '#storybook-root',
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
} as Meta<typeof Link>;

type Story = StoryObj<typeof Link>;

export const Default: Story = {args: {href: '#', children: 'Link'}};

export const View: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => (
        <Showcase>
            <Link {...args} view="normal">
                Normal
            </Link>
            <Link {...args} view="primary">
                Primary
            </Link>
            <Link {...args} view="secondary">
                Secondary
            </Link>
        </Showcase>
    ),
};

export const Visitable = {
    args: {
        ...Default.args,
        visitable: true,
        href: '.',
    },
};
