import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Col, ColProps} from '../Col';
import {LayoutPresenter, ColPresenter} from '../../demo';
import {Space} from '../../types';
import {Container} from '../../Container/Container';
import {Row} from '../../Row/Row';

export default {
    title: 'Layout (unstable)/Col',
    component: Col,
} as Meta;

const StaticTemplate: Story<{space?: Space; spaceRow?: Space}> = ({space = '3', spaceRow}) => (
    <LayoutPresenter>
        <Row {...{space, spaceRow}}>
            {new Array(12).fill('1').map((s, i) => (
                <ColPresenter s={s} key={i} />
            ))}
            {new Array(6).fill('2').map((s, i) => (
                <ColPresenter s={s} key={i} />
            ))}
            {new Array(4).fill('3').map((s, i) => (
                <ColPresenter s={s} key={i} />
            ))}
            {new Array(3).fill('4').map((s, i) => (
                <ColPresenter s={s} key={i} />
            ))}
            {new Array(2).fill('6').map((s, i) => (
                <ColPresenter s={s} key={i} />
            ))}
            <ColPresenter s="7" />
            <ColPresenter s="5" />
            <ColPresenter s="8" />
            <ColPresenter s="4" />
            <ColPresenter s="9" />
            <ColPresenter s="3" />
            <ColPresenter s="10" />
            <ColPresenter s="2" />
            <ColPresenter s="11" />
            <ColPresenter s="1" />
            <ColPresenter s="12" />
        </Row>
    </LayoutPresenter>
);

export const Static = StaticTemplate.bind({});

Static.args = {
    space: 3,
};

const DynamicTemplate: Story<{space?: Space; spaceRow?: Space}> = ({space = '2', spaceRow}) => (
    <LayoutPresenter>
        <Container spaceRow="8">
            <Row {...{space, spaceRow}}>
                <ColPresenter s="1" l="12" />
                <ColPresenter s="1" l="12" />
                <ColPresenter s="1" l="11" />
                <ColPresenter s="1" l="1" />
                <ColPresenter s="1" l="10" />
                <ColPresenter s="1" l="2" />
                <ColPresenter s="1" l="9" />
                <ColPresenter s="1" l="3" />
                <ColPresenter s="1" l="8" />
                <ColPresenter s="1" l="4" />
                <ColPresenter s="1" l="7" />
                <ColPresenter s="1" l="5" />
            </Row>
            <Row {...{space, spaceRow}}>
                <ColPresenter s="7" l="1" />
                <ColPresenter s="5" l="1" />
                <ColPresenter s="8" l="1" />
                <ColPresenter s="4" l="1" />
                <ColPresenter s="9" l="1" />
                <ColPresenter s="3" l="1" />
                <ColPresenter s="10" l="1" />
                <ColPresenter s="2" l="1" />
                <ColPresenter s="11" l="1" />
                <ColPresenter s="1" l="1" />
                <ColPresenter s="12" l="1" />
                <ColPresenter s="12" l="1" />
            </Row>
        </Container>
    </LayoutPresenter>
);

export const Dynamic = DynamicTemplate.bind({});

Dynamic.args = {
    space: '2',
};

const AllModsTemplate: Story<ColProps & {space?: Space; spaceRow?: Space}> = ({
    space = '3',
    spaceRow,
    ...args
}) => (
    <LayoutPresenter title="Change props values to see different behavior depending on different screen resolutions">
        <Row {...{space, spaceRow}}>
            {new Array(12).fill('_').map((_, i) => (
                <ColPresenter {...args} key={i} />
            ))}
        </Row>
    </LayoutPresenter>
);

export const AllMods = AllModsTemplate.bind({});

AllMods.args = {
    xxl: '1',
    xl: '2',
    l: '4',
    m: '6',
    s: '12',
    space: 3,
};
