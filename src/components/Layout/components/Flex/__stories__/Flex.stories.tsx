import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Col} from './../../Col/Col';
import {Flex, FlexProps} from './../Flex';
import {Row} from '../../Row/Row';
import {Box, Layout} from '../../../storybookComponents';

export default {
    title: 'Layout/Flex',
    component: Flex,
} as Meta;

const DefaultTemplate: Story<FlexProps> = (args) => (
    <Layout title="Change screen size to mobile/desktop to see result">
        <Row space="micro">
            <Col>
                <Flex direction={({mobile}) => (mobile ? 'row' : 'column')} {...args}>
                    <Box w={50} h={50}>
                        Box 1
                    </Box>

                    <Box w={100} h={70}>
                        Box 2
                    </Box>
                    <Box w={200} h={150}>
                        Box 3
                    </Box>
                    <Box w={100} h={40}>
                        Box 4
                    </Box>
                </Flex>
            </Col>
        </Row>
    </Layout>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
    space: 'micro',
    alignItems: 'center',
    justifyContent: 'center',
};
