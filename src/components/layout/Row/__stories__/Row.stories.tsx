import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ColPresenter, LayoutPresenter} from '../../demo';
import {Row} from '../Row';

const meta = {
    title: 'Components/Layout/Row',
    component: Row,
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
    decorators: [
        (Story) => (
            <LayoutPresenter title="Change screen size to see changes">
                <Story />
            </LayoutPresenter>
        ),
    ],
} satisfies Meta<typeof Row>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: (args) => (
        <Row {...args}>
            <ColPresenter size={[12, {s: 6, l: 8, xl: 3}]} />
            <ColPresenter size={[12, {s: 6, l: 4, xl: 3}]} />
            <ColPresenter size={[6, {m: 12, xl: 3}]} />
            <ColPresenter size={[6, {m: 12, xl: 3}]} />
        </Row>
    ),
    args: {
        gap: {xs: 'spacing-1', m: 'spacing-5'},
        rowGap: {xs: 'spacing-5', m: 'spacing-1'},
    },
} satisfies Story;

export const ZeroSpacings = {
    render: (args) => (
        <Row {...args}>
            <ColPresenter size={[12, {s: 6, l: 8, xl: 3}]} />
            <ColPresenter size={[12, {s: 6, l: 4, xl: 3}]} />
            <ColPresenter size={[6, {m: 12, xl: 3}]} />
            <ColPresenter size={[6, {m: 12, xl: 3}]} />
        </Row>
    ),
    args: {
        gap: {xs: 0, m: 'spacing-2'},
        rowGap: {xs: 'spacing-5', m: 0},
    },
} satisfies Story;

export const FullWidthColumns = {
    render: (args) => (
        <Row {...args}>
            <ColPresenter size={6} />
            <ColPresenter size={6} />
            <ColPresenter />
            <ColPresenter />
        </Row>
    ),
    args: {
        gap: 'spacing-3',
    },
} satisfies Story;
