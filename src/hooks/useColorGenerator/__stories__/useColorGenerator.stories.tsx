import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../../../components/Button';
import {block} from '../../../components/utils/cn';
import {randomString} from '../__tests__/utils/randomString';

import {ColoredAvatar} from './ColoredAvatar';

import './ColorGenerator.scss';

const b = block('color-generator');

const meta: Meta = {
    title: 'Hooks/useColorGenerator',
    argTypes: {
        mode: {
            options: ['unsaturated', 'saturated', 'bright'],
            control: {type: 'radio'},
        },
        withText: {
            control: 'boolean',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ColoredAvatar>;

const initValues = () => {
    const result = Array.from({length: 10}, () => randomString(16));

    return result;
};

const Template = (args: React.ComponentProps<typeof ColoredAvatar>) => {
    const {mode, withText} = args;
    const [tokens, setTokens] = React.useState<string[]>(initValues);

    const onClick = React.useCallback(() => {
        const newToken = randomString(16);
        setTokens((prev) => [newToken, ...prev]);
    }, []);

    return (
        <React.Fragment>
            <Button title="generate color" onClick={onClick}>
                Generate color
            </Button>
            <div className={b('color-items')}>
                {tokens.map((token) => (
                    <ColoredAvatar key={token} token={token} mode={mode} withText={withText} />
                ))}
            </div>
        </React.Fragment>
    );
};

export const Default: Story = {
    render: (args) => {
        return <Template {...args} />;
    },
    args: {
        mode: 'unsaturated',
        withText: false,
    },
};
