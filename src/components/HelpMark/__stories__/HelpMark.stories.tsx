import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {HelpMark} from '../HelpMark';
import type {HelpMarkProps} from '../HelpMark';

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
                        id: 'button-name',
                        enabled: false,
                        // aria-labelledby id is valid after tooltip content is rendered
                        selector: 'button[aria-labelledby="helpMarkWithoutActionsId"]',
                    },
                ],
            },
        },
    },
} as Meta<typeof HelpMark>;

const DefaultTemplate: StoryFn<HelpMarkProps> = (args) => <HelpMark {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    children: 'Some content',
};
