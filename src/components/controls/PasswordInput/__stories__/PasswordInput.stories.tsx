import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../../Button';
import {cn} from '../../../utils/cn';
import type {PasswordInputProps} from '../PasswordInput';
import {PasswordInput} from '../PasswordInput';

import './PasswordInputStories.scss';

const b = cn('password-input-stories');

export default {
    title: 'Components/Inputs/PasswordInput',
    component: PasswordInput,
    args: {
        showCopyButton: true,
        showRevealButton: true,
        controlProps: {
            'aria-label': 'Password',
        },
    },
} as Meta<typeof PasswordInput>;

const DefaultTemplate: StoryFn<PasswordInputProps> = (args) => {
    const [value, setValue] = React.useState('');

    return <PasswordInput {...args} onUpdate={setValue} value={value} />;
};

export const Default = DefaultTemplate.bind({});

const WithGenerateRandomValueTemplate: StoryFn<PasswordInputProps> = (args) => {
    const [value, setValue] = React.useState('');

    const generateRandomValue = React.useCallback(() => {
        let randomValue = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;

        while (counter < charactersLength) {
            randomValue += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        setValue(randomValue);
    }, []);

    return (
        <div className={b()}>
            <PasswordInput {...args} onUpdate={setValue} value={value} />
            <Button onClick={generateRandomValue} className={b('button-generate-random-value')}>
                Generate random value
            </Button>
        </div>
    );
};

export const WithGenerateRandomValue = WithGenerateRandomValueTemplate.bind({});
