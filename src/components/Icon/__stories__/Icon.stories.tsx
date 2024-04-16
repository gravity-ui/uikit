import React from 'react';

import {Envelope, Gear, Rocket} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {Icon} from '../Icon';

const icons = {Gear, Envelope, Rocket};

const meta: Meta<typeof Icon> = {
    title: 'Components/Data Display/Icon',
    component: Icon,
    argTypes: {
        data: {
            options: Object.keys(icons),
            mapping: icons,
        },
    },
    args: {
        data: 'Gear',
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <Icon {...args} size={16} />
            <Icon {...args} size={24} />
            <Icon {...args} size={36} />
        </Showcase>
    ),
};
