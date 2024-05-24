import React from 'react';

import {Gear} from '@gravity-ui/icons';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Icon as IconComponent} from '../../Icon';
import {Alert} from '../Alert';
import type {AlertProps} from '../types';

export default {
    title: 'Components/Feedback/Alert',
    component: Alert,
} as Meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
    args: {
        onClose: action('onClose'),
        title: 'Where will you go, hero?',
        message: 'Choose wisely: the end of the fairy tale depends on your decision',
    },
};

const themeCases: Array<NonNullable<AlertProps['theme']>> = [
    'normal',
    'info',
    'success',
    'warning',
    'danger',
    'utility',
];

export const Theme: Story = {
    render: (args) => (
        <Showcase>
            {themeCases.map((theme, index) => (
                <ShowcaseItem title={theme} key={index}>
                    <Alert {...args} theme={theme} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

export const CustomIcon: Story = {
    args: {
        ...Default.args,
        icon: <IconComponent size={16} data={Gear} />,
    },
};

const cornersCases: Array<NonNullable<AlertProps['corners']>> = ['rounded', 'square'];

export const Corners: Story = {
    render: (args) => (
        <Showcase>
            {cornersCases.map((corners, index) => (
                <ShowcaseItem title={corners} key={index}>
                    <Alert {...args} corners={corners} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const viewCases: Array<NonNullable<AlertProps['view']>> = ['filled', 'outlined'];

export const View: Story = {
    render: (args) => (
        <Showcase>
            {viewCases.map((view, index) => (
                <ShowcaseItem title={view} key={index}>
                    <Alert {...args} view={view} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const layoutCases: Array<NonNullable<AlertProps['layout']>> = ['vertical', 'horizontal'];

export const Layout: Story = {
    render: (args) => (
        <Showcase>
            {layoutCases.map((layout, index) => (
                <ShowcaseItem title={layout} key={index}>
                    <Alert {...args} layout={layout} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
        actions: [{text: 'First action'}, {text: 'Second action'}],
    },
};

const rightActionText = 'To the right (lose the horse)';
const centerActionText = 'Straight (find a wife)';
const leftActionText = 'To the left (CC 235.2)';

const actionCases: Array<{
    caseTitle: string;
    propValue: AlertProps['actions'];
}> = [
    {
        caseTitle: 'Full width action',
        propValue: <Alert.Action>{rightActionText}</Alert.Action>,
    },
    {
        caseTitle: 'One action',
        propValue: [{text: rightActionText, handler: action('actionHandler')}],
    },
    {
        caseTitle: 'Tree actions via array',
        propValue: [{text: leftActionText}, {text: centerActionText}, {text: rightActionText}],
    },
];

export const Actions: Story = {
    render: (args) => (
        <Showcase>
            {actionCases.map(({caseTitle, propValue}, index) => (
                <ShowcaseItem title={caseTitle} key={index}>
                    <Alert {...args} actions={propValue} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

const alignCases: Array<NonNullable<AlertProps['align']>> = ['center', 'baseline'];

export const Align: Story = {
    render: (args) => (
        <Showcase>
            {alignCases.map((align, index) => (
                <ShowcaseItem title={align} key={index}>
                    <Alert {...args} align={align} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};
