import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Col, Row} from '../../layout';
import {Alert} from '../Alert';
import type {AlertProps} from '../types';

export default {
    title: 'Components/Alert',
    component: Alert,
} as Meta;

const title = 'Where will you go, hero?';
const message = 'Choose wisely: the end of the fairy tale depends on your decision';
const right = 'To the right (lose the horse)';
const center = 'Straight (find a wife)';
const left = 'To the left (CC 235.2)';

const stories: AlertProps[] = [
    {
        title,
        message,
        theme: 'danger',
        view: 'filled',
        onClose: () => alert('Close button pressed'),
        actions: <Button>{right}</Button>,
    },
    {
        title: <div dangerouslySetInnerHTML={{__html: '<b>Some html title</b>'}} />,
        message,
        squared: true,
        theme: 'danger',
        view: 'outlined',
        onClose: () => alert('Close button pressed'),
    },
    {
        message,
        theme: 'info',
        view: 'filled',
        actions: (
            <Alert.Actions>
                <Button>{center}</Button>
            </Alert.Actions>
        ),
    },
    {
        title,
        message,
        theme: 'info',
        view: 'outlined',
    },
    {
        title,
        message,
        theme: 'positive',
        view: 'outlined',
        actions: (
            <Alert.Actions>
                <Button view="action">{right}</Button>
                <Button view="outlined">{center}</Button>
                <Button view="flat">{left}</Button>
            </Alert.Actions>
        ),
    },
    {
        title,
        message,
        theme: 'positive',
        view: 'filled',

        actions: [{text: right, handler: console.log}],
    },
    {
        title,
        message,
        theme: 'warning',
        view: 'filled',
        layout: 'horizontal',
        actions: (
            <Alert.Actions parentLayout="horizontal">
                <Button view="outlined">{left}</Button>
            </Alert.Actions>
        ),
    },
    {
        title,
        message,
        theme: 'warning',
        view: 'outlined',
        layout: 'horizontal',
        actions: <Button>{right}</Button>,
    },
    {
        message,
        theme: 'normal',
        view: 'outlined',
    },
    {
        title,
        message,
        theme: 'normal',
        view: 'filled',
    },
];

const DefaultTemplate: StoryFn<AlertProps> = () => (
    <Row space="3">
        {stories.map((props, i) => (
            <Col s="12" l="6" xxl="4" key={i}>
                <Alert {...props} />
            </Col>
        ))}
    </Row>
);
export const Examples = DefaultTemplate.bind({});
