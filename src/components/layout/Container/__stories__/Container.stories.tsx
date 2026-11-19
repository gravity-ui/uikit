import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Col} from '../../Col/Col';
import {Row} from '../../Row/Row';
import {Box, LayoutPresenter} from '../../demo';
import {Container} from '../Container';

const meta = {
    title: 'Components/Layout/Container',
    component: Container,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} satisfies Meta<typeof Container>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: (args) => (
        <LayoutPresenter title="Change screen size to see different row spacing">
            <Container {...args}>
                <Row gap="spacing-5">
                    <Col>
                        <Box>Row</Box>
                    </Col>
                </Row>
                <Row gap="spacing-5">
                    <Col>
                        <Box>Row</Box>
                    </Col>
                </Row>
            </Container>
        </LayoutPresenter>
    ),
    args: {
        rowGap: {s: 'spacing-1', m: 'spacing-2', l: 'spacing-3'},
        size: 'l',
    },
} satisfies Story;
