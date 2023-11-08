import React from 'react';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

import type {ButtonView} from '../../Button';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {Toast} from '../Toast/Toast';

import {ToasterDemo} from './ToasterShowcase';

const views: ButtonView[] = [
    'normal',
    'action',
    'outlined',
    'outlined-info',
    'outlined-danger',
    'raised',
    'flat',
    'flat-info',
    'flat-danger',
    'flat-secondary',
    'normal-contrast',
    'outlined-contrast',
    'flat-contrast',
];

function viewSelect(name: string) {
    return {
        name,
        control: 'select',
        defaultValue: 'outlined',
        options: views,
        if: {arg: 'setActions'},
    };
}

const disabledControl = {
    table: {
        disable: true,
    },
};

function booleanControl(label: string) {
    return {
        name: label,
        control: 'boolean',
    };
}

export default {
    title: 'Components/Feedback/Toaster',
    component: Toast,
    argTypes: {
        mobile: disabledControl,
        name: disabledControl,
        title: disabledControl,
        className: disabledControl,
        autoHiding: disabledControl,
        content: disabledControl,
        type: disabledControl,
        isClosable: disabledControl,
        actions: disabledControl,
        removeCallback: disabledControl,
        createSameName: booleanControl('Same name'),
        showCloseIcon: booleanControl('Show close icon'),
        setTimeout: booleanControl('Set custom timeout'),
        allowAutoHiding: booleanControl('Allow auto hiding'),
        setTitle: booleanControl('Add title'),
        setContent: booleanControl('Add content'),
        setActions: booleanControl('Add action'),
        action1View: viewSelect('Action 1 view'),
        action2View: viewSelect('Action 2 view'),
    },
    args: {
        setTitle: true,
        showCloseIcon: true,
        allowAutoHiding: true,
    },
    decorators: [
        function withToasters(Story) {
            return (
                <ToasterProvider>
                    <Story />
                </ToasterProvider>
            );
        },
    ],
} as ComponentMeta<typeof Toast>;

const DefaultTemplate: ComponentStory<typeof Toast & typeof ToasterDemo> = (args) => (
    <ToasterDemo {...args} />
);
export const Default = DefaultTemplate.bind({});
