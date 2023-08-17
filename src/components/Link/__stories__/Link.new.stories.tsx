import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Link} from '../Link';

export default {
    title: 'Components/Basic/Link',
    id: 'components/Link',
    args: {
        view: 'normal',
        children: 'Link',
        href: '#',
        title: 'title',
    },
    argTypes: {
        view: {
            options: ['normal', 'primary', 'secondary'],
            control: {type: 'select'},
            description: 'test',
        },
        children: {
            control: {type: 'text'},
        },
        href: {
            control: {type: 'text'},
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
        },
        id: {
            control: {type: 'text'},
        },
    },
    parameters: {
        order: -100,
    },
} as Meta;

export const Playground: StoryFn = (args) => {
    return <Link {...args} />;
};
Playground.storyName = 'Link';
