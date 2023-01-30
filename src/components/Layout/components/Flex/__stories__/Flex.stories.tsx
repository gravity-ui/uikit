import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Col} from './../../Col/Col';
import {Flex, FlexProps} from './../Flex';
import {Row} from '../../Row/Row';
import {Box, LayoutPresenter} from '../../../../../demo/Layout';

export default {
    title: 'Layout (unstable)/Flex',
    component: Flex,
} as Meta;

const DefaultTemplate: Story<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Row space="micro">
            <Col>
                <Flex
                    direction={(match) => (match('m') ? 'row' : 'column')}
                    space={(match) => (match('m') ? 'l' : 'micro')}
                    {...args}
                >
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
    </LayoutPresenter>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
    alignItems: 'center',
    justifyContent: 'center',
};
