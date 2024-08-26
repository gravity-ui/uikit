import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../../Button';
import type {ButtonView} from '../../Button';
import {useTheme} from '../../theme';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {Toast} from '../Toast/Toast';
import {ToasterSingletonNew} from '../ToasterSingletonNew';

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
} as Meta<typeof Toast>;

type Story = StoryObj<typeof Toast & typeof ToasterDemo>;

export const Default: Story = {
    args: {},
    render: (props) => <ToasterDemo {...props} />,
};

const toasterSingletonNew1 = new ToasterSingletonNew();

const ToastContent = () => {
    const theme = useTheme();
    return `Current theme: ${theme}`;
};

let index = 0;

const someFnOutsideReact = () => {
    const toasterSingletonNew2 = new ToasterSingletonNew();
    toasterSingletonNew2.add({
        name: `id-${index++}`,
        theme: 'info',
        title: 'Hey, toaster!',
        content: <ToastContent />,
    });
};

export const NewSingleton: Story = {
    args: {},
    render: () => {
        return (
            <React.Fragment>
                <Button onClick={someFnOutsideReact}>Add toast</Button>
                {toasterSingletonNew1.render()}
            </React.Fragment>
        );
    },
};
