import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Col} from '../../Col/Col';
import {Row} from '../../Row/Row';
import {Box, LayoutPresenter} from '../../demo';
import {Container} from '../Container';
import type {ContainerProps} from '../Container';

export default {
    title: 'Components/Layout/Container',
    component: Container,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<ContainerProps> = (args) => (
    <LayoutPresenter title="Change screen size to see different row spacing">
        <Container {...args}>
            <Row space="5">
                <Col>
                    <Box>Row</Box>
                </Col>
            </Row>
            <Row space="5">
                <Col>
                    <Box>Row</Box>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    spaceRow: {m: '1'},
    maxWidth: 'l',
};
