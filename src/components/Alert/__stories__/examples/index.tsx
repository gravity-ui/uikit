import React from 'react';

import {HandOk} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Col, Row} from '../../../layout';
import {Alert} from '../../Alert';
import type {AlertProps} from '../../types';

const title = 'Good news, everyone!';
const message = 'Today is a good day to do something!';

export const DefaultUsage = () => <Alert theme="info" title={title} message={message} />;

const variants: AlertProps[] = [
    {
        theme: 'info',
        title,
        message,
    },
    {theme: 'warning', title, message},
    {theme: 'danger', title, message},
    {theme: 'positive', title, message},
    {theme: 'normal', title, message},
    {theme: 'info', view: 'outlined', title, message},
    {theme: 'warning', view: 'outlined', title, message},
    {theme: 'danger', view: 'outlined', title, message},
    {theme: 'positive', view: 'outlined', title, message},
    {theme: 'normal', view: 'outlined', title, message},
];

export const Variants = () => (
    <Row space="3">
        {variants.map((props, i) => (
            <Col key={i} s="12" l="6">
                <Alert {...props} />
            </Col>
        ))}
    </Row>
);

export const WithPlaneActions = () => (
    <Alert
        theme="danger"
        message="Are you sure?"
        actions={[
            {
                text: 'Do it!',
                handler: () => {},
            },
            {
                text: 'No way!',
                handler: () => {},
            },
        ]}
    />
);

export const WithActionsOverride = () => (
    <Alert
        theme="positive"
        squared
        title="Are you sure?"
        onClose={() => alert('Ok!')}
        view="outlined"
        actions={
            <Alert.Actions>
                <Button view="outlined">Do it!</Button>
                <Button view="flat">No way!</Button>
            </Alert.Actions>
        }
    />
);

export const WithCloseButton = () => (
    <Alert
        theme="info"
        title="Hey, Hero!"
        message="Wanna save the World?"
        onClose={() => alert('Ok!')}
        actions={<Button view="action">Do it!</Button>}
    />
);

export const WithHtmlMessageAndTitle = () => (
    <Alert
        theme="normal"
        title={<span dangerouslySetInnerHTML={{__html: '<b>Alert title</b>'}} />}
        message={<div dangerouslySetInnerHTML={{__html: '<i>Some message text</i>'}} />}
        onClose={() => alert('Ok!')}
    />
);

export const HorizontalLayoutAndCustomIcon = () => (
    <Alert
        theme="positive"
        icon={<Icon data={HandOk} size={16} />}
        title="Everything is ok, mister!"
        layout="horizontal"
        actions={<Button view="outlined">Thanks</Button>}
    />
);
