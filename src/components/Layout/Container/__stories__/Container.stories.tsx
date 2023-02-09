import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Container, ContainerProps} from '../Container';
import {Col} from '../../Col/Col';
import {Box, LayoutPresenter} from '../../demo';
import {Row} from '../../Row/Row';

export default {
    title: 'Layout (unstable)/Container',
    component: Container,
} as Meta;

const DefaultTemplate: Story<ContainerProps> = (args) => (
    <LayoutPresenter title="Change screen size to see different row spacing">
        <Container {...args}>
            <Row>
                <Col>
                    <Box>Row</Box>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Box>Row</Box>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    spaceRow: (matchMedia) => (matchMedia('m') ? 'l' : 'nano'),
    maxWidth: 'l',
};
