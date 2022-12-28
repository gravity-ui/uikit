import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ButtonView} from '../../Button';
import {Toast} from '../Toast/Toast';
import {ToasterDemo} from './ToasterShowcase';
import {ToasterProvider} from '../Provider/ToasterProvider';

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

function booleanControl(label: string, defaultValue = false) {
    return {
        name: label,
        defaultValue,
        control: 'boolean',
    };
}

export default {
    title: 'Components/Toaster',
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
        isOverride: disabledControl,
        actions: disabledControl,
        removeCallback: disabledControl,
        createSameName: booleanControl('Same name'),
        showCloseIcon: booleanControl('Show close icon', true),
        setTimeout: booleanControl('Set custom timeout'),
        allowAutoHiding: booleanControl('Allow auto hiding', true),
        setContent: booleanControl('Add content'),
        setActions: booleanControl('Add action'),
        action1View: viewSelect('Action 1 view'),
        action2View: viewSelect('Action 2 view'),
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
