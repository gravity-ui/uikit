import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Container, ContainerProps} from './../Container';
import {Col} from '../../Col/Col';
import {RowPresenter, Box, Layout} from '../../../storybookComponents';

export default {
    title: 'Layout/Container',
    component: Container,
} as Meta;

const DefaultTemplate: Story<ContainerProps> = (args) => (
    <Layout title="Change screen size to see different row spacing">
        <Container {...args}>
            <RowPresenter>
                <Col>
                    <Box>Row</Box>
                </Col>
            </RowPresenter>
            <RowPresenter>
                <Col>
                    <Box>Row</Box>
                </Col>
            </RowPresenter>
        </Container>
    </Layout>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    spaceRow: ({mobile, desktop, laptopM, laptopS, tabletH}) => {
        if (desktop) return 'xxl';
        if (laptopM) return 'l';
        if (laptopS) return 'm';
        if (tabletH) return 's';
        if (mobile) return 'micro';

        return 'none';
    },
};
