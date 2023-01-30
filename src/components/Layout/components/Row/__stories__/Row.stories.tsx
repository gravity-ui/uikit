import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Row, RowProps} from './../Row';
import {Col} from '../../Col/Col';
import {Box, LayoutPresenter} from '../../../../../demo/Layout';

export default {
    title: 'Layout (unstable)/Row',
    component: Row,
} as Meta;

const DefaultTemplate: Story<RowProps> = (args) => (
    <LayoutPresenter title="Change screen size to see changes">
        <Row
            space={(match) => (match('m') ? 'm' : 'micro')}
            spaceRow={(match) => (match('m') ? 'micro' : 'l')}
            {...args}
        >
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
