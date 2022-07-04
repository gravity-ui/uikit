import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Toast} from './Toast';

export default {
    title: 'Components/Toaster/Toast',
    component: Toast,
    args: {
        title: 'Toaster title',
        allowAutoHiding: false,
    },
    argTypes: {
        type: {
            control: {
                type: 'select',
            },
            options: ['info', 'success', 'warning', 'error'],
        },
        removeCallback: {
            action: 'removeCallback',
        },
    },
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Default = Template.bind({});

export const Info = Template.bind({});
Info.args = {
    type: 'info',
};

export const Success = Template.bind({});
Success.args = {
    type: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
    type: 'warning',
};

export const Error = Template.bind({});
Error.args = {
    type: 'error',
};
