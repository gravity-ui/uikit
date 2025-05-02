import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {cn} from '../../utils/cn';
import {HelpMark} from '../HelpMark';

import './HelpMark.stories.scss';

const b = cn('help-mark-stories');

export default {
    title: 'Components/Utils/HelpMark',
    id: 'components/utils/HelpMark',
    component: HelpMark,
    args: {
        'aria-label': 'Note',
        children: 'Some content',
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

export const Default: Story = {};

export const Size: Story = {
    render: (args) => (
        <Showcase contentClassname={b('showcase')}>
            <HelpMark
                {...args}
                iconProps={{
                    size: 16,
                }}
            />
            <HelpMark
                {...args}
                iconProps={{
                    size: 24,
                }}
            />
            <HelpMark
                {...args}
                iconProps={{
                    size: 36,
                }}
            />
        </Showcase>
    ),
};
