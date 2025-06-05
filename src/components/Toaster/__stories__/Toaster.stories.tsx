import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {toaster} from '../../../toaster-singleton';
import type {ButtonView} from '../../Button';
import {BUTTON_VIEWS} from '../../Button/constants';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {Toast} from '../Toast/Toast';
import {ToasterComponent} from '../ToasterComponent/ToasterComponent';
import {TOAST_THEMES} from '../constants';
import {useToaster} from '../hooks/useToaster';
import type {ToastAction} from '../types';

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
        control: 'select' as const,
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
        control: 'boolean' as const,
    };
}

export default {
    title: 'Components/Feedback/Toaster',
    component: Toast,
    decorators: [
        function withToasters(Story) {
            return (
                <ToasterProvider toaster={toaster}>
                    <Story />
                </ToasterProvider>
            );
        },
    ],
} as Meta<typeof Toast>;

type Story = StoryObj<
    React.ComponentProps<typeof Toast> & React.ComponentProps<typeof ToasterDemo>
>;

export const Default: Story = {
    args: {
        setTitle: true,
        showCloseIcon: true,
        allowAutoHiding: true,
    },
    argTypes: {
        mobile: disabledControl,
        name: disabledControl,
        title: disabledControl,
        className: disabledControl,
        autoHiding: disabledControl,
        content: disabledControl,
        theme: disabledControl,
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
    render: (props) => <ToasterDemo {...props} />,
};

function getAction(): ToastAction {
    return {
        onClick: () => {},
        label: faker.lorem.words(1),
        view: faker.helpers.arrayElement(BUTTON_VIEWS),
        removeAfterClick: false,
    };
}

export const ToastPlayground: Story = {
    name: 'Toast (Playground)',
    args: {
        mobile: false,
        autoHiding: false,
        isClosable: faker.datatype.boolean(),
        title: faker.lorem.words(5),
        content: faker.lorem.sentences(2),
        theme: faker.helpers.arrayElement(TOAST_THEMES),
        actions: faker.helpers.uniqueArray(getAction, faker.number.int({min: 1, max: 2})),
    },
    argTypes: {
        name: disabledControl,
        addedAt: disabledControl,
        renderIcon: disabledControl,
        removeCallback: disabledControl,
    },
    render: (args, context) => {
        const toaster = useToaster();

        React.useEffect(() => {
            const toastId = 'demo-toast';
            toaster.add({
                ...args,
                name: toastId,
            });

            return () => toaster.remove(toastId);
        }, [args, toaster]);

        return (
            <ToasterComponent
                mobile={args.mobile}
                hasPortal={context.globals.screenshotTests !== true}
            />
        );
    },
};
