import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Button} from '../../../Button';
import {Flex, spacing} from '../../../layout';
import type {PasswordInputProps} from '../PasswordInput';
import {PasswordInput} from '../PasswordInput';

export default {
    title: 'Components/Inputs/PasswordInput',
    component: PasswordInput,
    args: {
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
        <Flex>
            <PasswordInput {...args} onUpdate={setValue} value={value} />
            <Flex className={spacing({ml: 2})}>
                <Button onClick={generateRandomValue}>Generate random value</Button>
            </Flex>
        </Flex>
    );
};

export const WithGenerateRandomValue = WithGenerateRandomValueTemplate.bind({});
