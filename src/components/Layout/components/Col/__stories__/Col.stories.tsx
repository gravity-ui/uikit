import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Col, ColProps} from './../Col';
import {Layout, Box, RowPresenter} from '../../../storybookComponents';

export default {
    title: 'Layout/Col',
    component: Col,
} as Meta;

const DefaultTemplate: Story<ColProps> = (args) => (
    <Layout title="Change props values to see different behavior depending on different screen resolutions">
        <RowPresenter>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
            <Col {...args}>
                <Box>Col</Box>
            </Col>
        </RowPresenter>
    </Layout>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    dsktp: '1',
    lptpM: '2',
    lptpS: '4',
    tablH: '6',
    mobile: '12',
};
