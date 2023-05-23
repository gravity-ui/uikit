import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Row, RowProps} from '../Row';
import {Col} from '../../Col/Col';
import {Box, LayoutPresenter} from '../../demo';

export default {
    title: 'Layout/Row',
    component: Row,
} as Meta;

const DefaultTemplate: Story<RowProps> = (args) => (
    <LayoutPresenter title="Change screen size to see changes">
        <Row {...args} space={{s: 1, m: '5'}} spaceRow={{s: 5, m: '1'}}>
            <Col s="12" m="6" l="2" xl="3">
                <Box>s-12 m-6 l-2 xl-3</Box>
            </Col>
            <Col s="12" m="6" l="2" xl="3">
                <Box>s-12 m-6 l-2 xl-3</Box>
            </Col>
            <Col s="6" m="12" xl="3">
                <Box>s-6 m-12 xl-3</Box>
            </Col>
            <Col s="6" m="12" xl="3">
                <Box>s-6 m-12 xl-3</Box>
            </Col>
        </Row>
    </LayoutPresenter>
);

export const Default = DefaultTemplate.bind({});

const ZeroSpacingsTemplate: Story<RowProps> = (args) => (
    <LayoutPresenter title="Change screen size to see changes">
        <Row {...args} space={{s: 0.5, m: 2}} spaceRow={{s: 5, m: '0'}}>
            <Col s="12" m="6" l="2" xl="3">
                <Box>s-12 m-6 l-2 xl-3</Box>
            </Col>
            <Col s="12" m="6" l="2" xl="3">
                <Box>s-12 m-6 l-2 xl-3</Box>
            </Col>
            <Col s="6" m="12" xl="3">
                <Box>s-6 m-12 xl-3</Box>
            </Col>
            <Col s="6" m="12" xl="3">
                <Box>s-6 m-12 xl-3</Box>
            </Col>
        </Row>
    </LayoutPresenter>
);

export const ZeroSpacings = ZeroSpacingsTemplate.bind({});
