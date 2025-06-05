import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Link} from '../Link';
import type {LinkProps} from '../Link';

export default {
    title: 'Components/Navigation/Link',
    id: 'components/navigation/Link',
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
        underline: {
            control: {type: 'boolean'},
        },
    },
    parameters: {
        order: -100,
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
} as Meta;

export const Playground: StoryFn<LinkProps> = (args) => {
    return <Link {...args} />;
};
Playground.storyName = 'Link';
