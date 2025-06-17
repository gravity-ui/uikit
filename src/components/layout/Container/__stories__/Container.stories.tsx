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
                <Row space="5">
                    <Col>
                        <Box>Row</Box>
                    </Col>
                </Row>
                <Row space="5">
                    <Col>
                        <Box>Row</Box>
                    </Col>
                </Row>
            </Container>
        </LayoutPresenter>
    ),
    args: {
        spaceRow: {s: 1, m: 2, l: 3},
        maxWidth: 'l',
    },
} satisfies Story;
