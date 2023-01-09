import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Row, RowProps} from './../Row';
import {Col} from '../../Col/Col';
import {Box, Layout} from '../../../storybookComponents';

export default {
    title: 'Layout/Row',
    component: Row,
} as Meta;

const DefaultTemplate: Story<RowProps> = (args) => (
    <Layout title="Change screen size to see changes">
        <Row
            space={({mobile}) => (mobile ? 'micro' : 'm')}
            spaceRow={({mobile}) => (mobile ? 'm' : 'micro')}
            {...args}
        >
            <Col size="6" mobile="12" laptopS="3">
                <Box>Col-6, Col-mobile-12 Col-laptopS-s-3</Box>
            </Col>
            <Col size="6" mobile="12" laptopS="3">
                <Box>Col-6, Col-Mobile-12 Col-laptopS-s-3</Box>
            </Col>
            <Col size="12" mobile="6" laptopS="3">
                <Box>Col-12, Col-Mobile-6 Col-laptopS-s-3</Box>
            </Col>
            <Col size="12" mobile="6" laptopS="3">
                <Box>Col-12, Col-Mobile-6 Col-laptopS-s-3</Box>
            </Col>
        </Row>
    </Layout>
);

export const Default = DefaultTemplate.bind({});
