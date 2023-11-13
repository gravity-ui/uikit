import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Container} from '../..';
import {Button} from '../../../Button/Button';
import {Text} from '../../../Text';
import {Col} from '../../Col/Col';
import {Row} from '../../Row/Row';
import {Box, LayoutPresenter} from '../../demo';
import {Flex} from '../Flex';
import type {FlexProps} from '../Flex';

export default {
    title: 'Components/Layout/Flex',
    component: Flex,
} as Meta;

const DefaultTemplate: StoryFn<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Row space="1">
            <Col>
                <Flex direction={{s: 'column', m: 'row'}} space={{s: '1', m: '4'}} {...args}>
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

const FlexGapTemplate: StoryFn<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row space="5">
                <Col>
                    <Flex {...args} wrap="wrap">
                        {new Array(20).fill('_').map((_, i) => (
                            <Box w={100} h={50} key={i}>
                                <Text color="secondary">Fixed size 100x50</Text>
                            </Box>
                        ))}
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const FlexGap = FlexGapTemplate.bind({});
FlexGap.args = {
    gap: {s: '1', m: '6'},
};

const GapAndRowGapTemplate: StoryFn<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row space="5">
                <Col>
                    <Flex {...args} wrap="wrap">
                        {new Array(20).fill('_').map((_, i) => (
                            <Box w={100} h={50} key={i}>
                                <Text color="secondary">Fixed size 100x50</Text>
                            </Box>
                        ))}
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const GapAndRowGap = GapAndRowGapTemplate.bind({});
GapAndRowGap.args = {
    gap: {s: '1', m: '6'},
    gapRow: {s: '6', m: '1'},
};

const ChildrenWithBgColorTemplate: StoryFn<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row space="5">
                <Col>
                    <Flex {...args} space="5" wrap>
                        <Button>Some element with background</Button>
                        <Button>Some element with background</Button>
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const ChildrenWithBgColor = ChildrenWithBgColorTemplate.bind({});
ChildrenWithBgColor.args = {};

const WithNullChildrenTemplate: StoryFn<FlexProps<'div'>> = (args) => (
    <LayoutPresenter title="Change screen size to 's' to see result">
        <Container>
            <Row space="5">
                <Col>
                    <Flex {...args} space={5} direction="column">
                        <Box />
                        {null}
                        {null}
                        <Box />
                        {null}
                        <Box />
                    </Flex>
                </Col>
            </Row>
        </Container>
    </LayoutPresenter>
);

export const WithNullChildren = WithNullChildrenTemplate.bind({});
WithNullChildren.args = {};
