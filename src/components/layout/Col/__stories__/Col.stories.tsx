import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Container} from '../../Container/Container';
import {Row} from '../../Row/Row';
import type {RowProps} from '../../Row/Row';
import {DEFAULT_LAYOUT_THEME} from '../../constants';
import {ColPresenter, LayoutPresenter} from '../../demo';
import type {LayoutTheme} from '../../types';
import {Col} from '../Col';
import type {ColProps} from '../Col';

type CustomArgs = {
    theme?: LayoutTheme;
    gap?: RowProps['gap'];
    rowGap?: RowProps['rowGap'];
};

type ColPropsAndCustomArgs = ColProps & CustomArgs;

const meta = {
    title: 'Components/Layout/Col',
    component: Col,
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
    args: {
        theme: DEFAULT_LAYOUT_THEME,
        gap: 'spacing-3',
    },
} satisfies Meta<ColPropsAndCustomArgs>;
export default meta;

type Story = StoryObj<CustomArgs>;

export const Static = {
    render: ({gap, rowGap}) => (
        <LayoutPresenter>
            <Row {...{gap, rowGap}}>
                {new Array(12).fill('1').map((s, i) => (
                    <ColPresenter size={s} key={i} />
                ))}
                {new Array(6).fill('2').map((s, i) => (
                    <ColPresenter size={s} key={i} />
                ))}
                {new Array(4).fill('3').map((s, i) => (
                    <ColPresenter size={s} key={i} />
                ))}
                {new Array(3).fill('4').map((s, i) => (
                    <ColPresenter size={s} key={i} />
                ))}
                {new Array(2).fill('6').map((s, i) => (
                    <ColPresenter size={s} key={i} />
                ))}
                <ColPresenter size="7" />
                <ColPresenter size="5" />
                <ColPresenter size="8" />
                <ColPresenter size="4" />
                <ColPresenter size="9" />
                <ColPresenter size="3" />
                <ColPresenter size="10" />
                <ColPresenter size="2" />
                <ColPresenter size="11" />
                <ColPresenter size="1" />
                <ColPresenter size="12" />
            </Row>
        </LayoutPresenter>
    ),
} satisfies Story;

export const Dynamic = {
    render: ({gap, rowGap}) => (
        <LayoutPresenter>
            <Container rowGap="spacing-5" gutters={0}>
                <Row {...{gap, rowGap}}>
                    <ColPresenter size={[1, {l: 12}]} />
                    <ColPresenter size={[1, {l: 12}]} />
                    <ColPresenter size={[1, {l: 11}]} />
                    <ColPresenter size={[1, {l: 1}]} />
                    <ColPresenter size={[1, {l: 10}]} />
                    <ColPresenter size={[1, {l: 2}]} />
                    <ColPresenter size={[1, {l: 9}]} />
                    <ColPresenter size={[1, {l: 3}]} />
                    <ColPresenter size={[1, {l: 8}]} />
                    <ColPresenter size={[1, {l: 4}]} />
                    <ColPresenter size={[1, {l: 7}]} />
                    <ColPresenter size={[1, {l: 5}]} />
                </Row>
                <Row {...{gap, rowGap}}>
                    <ColPresenter size={[7, {l: 1}]} />
                    <ColPresenter size={[5, {l: 1}]} />
                    <ColPresenter size={[8, {l: 1}]} />
                    <ColPresenter size={[4, {l: 1}]} />
                    <ColPresenter size={[9, {l: 1}]} />
                    <ColPresenter size={[3, {l: 1}]} />
                    <ColPresenter size={[10, {l: 1}]} />
                    <ColPresenter size={[2, {l: 1}]} />
                    <ColPresenter size={[11, {l: 1}]} />
                    <ColPresenter size={[1, {l: 1}]} />
                    <ColPresenter size={[12, {l: 1}]} />
                    <ColPresenter size={[12, {l: 1}]} />
                </Row>
            </Container>
        </LayoutPresenter>
    ),
} satisfies Story;

export const AllMods = {
    render: ({gap, rowGap, ...args}) => (
        <LayoutPresenter title="Change size prop to see different behavior depending on different screen resolutions">
            <Row {...{gap, rowGap}}>
                {new Array(12).fill('_').map((_, i) => (
                    <ColPresenter {...args} key={i} />
                ))}
            </Row>
        </LayoutPresenter>
    ),
    args: {
        size: [12, {s: 6, m: 4, l: 3, xl: 2, '2xl': 1}],
    },
} satisfies StoryObj<ColPropsAndCustomArgs>;
