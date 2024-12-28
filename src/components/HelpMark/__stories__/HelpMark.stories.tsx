import type {Meta, StoryObj} from '@storybook/react';

import {HelpMark} from '../HelpMark';

export default {
    title: 'Components/Utils/HelpMark',
    id: 'components/utils/HelpMark',
    component: HelpMark,
    args: {
        buttonProps: {
            'aria-label': 'Note',
        },
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'help-mark',
                        enabled: false,
                        // aria-labelledby id is valid after tooltip content is rendered
                        selector: 'button[aria-labelledby="helpMarkWithoutActionsId"]',
                    },
                ],
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof HelpMark>;

export const Default: Story = {args: {children: 'Some content'}};
