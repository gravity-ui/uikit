import React from 'react';

import {Meta, Story} from '@storybook/react';

import {Col} from '../../Col/Col';
import {Row} from '../../Row/Row';
import {Box, LayoutPresenter} from '../../demo';
import {Container, ContainerProps} from '../Container';

export default {
    title: 'Layout/Container',
    component: Container,
} as Meta;

const DefaultTemplate: Story<ContainerProps> = (args) => (
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
