import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Col, ColProps} from './../Col';
import {Layout, Box, RowPresenter} from '../../../storybookComponents';
import {Space} from 'src/components/Layout/types';

export default {
    title: 'Layout/Col',
    component: Col,
} as Meta;

const DefaultTemplate: Story<ColProps & {space?: Space; spaceRow?: Space}> = ({
    space,
    spaceRow,
    ...args
}) => (
    <Layout title="Change props values to see different behavior depending on different screen resolutions">
        <RowPresenter {...{space, spaceRow}}>
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
    desktop: '1',
    laptopM: '2',
    laptopS: '4',
    tabletH: '6',
    mobile: '12',
    space: 'm',
};
