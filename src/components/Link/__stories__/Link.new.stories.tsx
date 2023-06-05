import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Link} from '../Link';

import Docs from './Link.docs.mdx';

export default {
    title: 'Components/Basic/Link',
    id: 'components/Link',
    argTypes: {
        view: {
            options: ['normal', 'primary', 'secondary', 'normal-visitable'],
            control: {type: 'select'},
            defaultValue: 'normal',
            description: 'test',
        },
        children: {
            control: {type: 'text'},
            defaultValue: 'Link',
        },
        href: {
            control: {type: 'text'},
            defaultValue: '#',
        },
        target: {
            control: {type: 'text'},
            if: {arg: 'href', truthy: true},
        },
        rel: {
            control: {type: 'text'},
            if: {arg: 'href', truthy: true},
        },
        title: {
            control: {type: 'text'},
            defaultValue: 'title',
        },
        id: {
            control: {type: 'text'},
        },
    },
    parameters: {
        order: -100,
        docs: {
            page: Docs,
        },
    },
} as Meta;

export const Playground: Story = (args) => {
    return <Link {...args} />;
};
Playground.storyName = 'Link';
