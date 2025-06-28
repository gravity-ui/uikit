import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {block} from '../../../components/utils/cn';
import {randomString} from '../../../components/utils/common';

import {ColoredAvatar} from './ColoredAvatar';

import './useColorGenerator.stories.scss';

const b = block('color-generator-stories');

const meta: Meta = {
    title: 'Hooks/useColorGenerator',
    argTypes: {
        withText: {
            control: 'boolean',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ColoredAvatar>;

const views = ['light', 'medium', 'heavy'] as const;
const states = ['view', 'colors'] as const;

const Template = (args: React.ComponentProps<typeof ColoredAvatar>) => {
    const items = [];
    const tokens = Array.from({length: 10}, () => randomString(16));

    for (const view of views) {
        for (const state of states) {
            const key = `${view}_${state}`;

            if (state === 'view') {
                items.push(
                    <div key={key} className={b('grid-cell', {head: 'left'})}>
                        <strong>{view}</strong>
                    </div>,
                );
            } else {
                const props = {
                    ...args,
                    intensity: view,
                };

                items.push(
                    <div className={b('color-items')}>
                        {tokens.map((token) => (
                            <ColoredAvatar {...props} key={token} seed={token} />
                        ))}
                    </div>,
                );
            }
        }
    }

    return (
        <div className={b()}>
            <div className={b('grid')}>{items}</div>
        </div>
    );
};

export const Default: Story = {
    render: (args) => {
        return <Template {...args} />;
    },
    args: {
        withText: false,
    },
};
