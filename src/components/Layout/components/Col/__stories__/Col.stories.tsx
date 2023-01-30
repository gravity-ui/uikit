import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Col} from './../Col';
import {LayoutPresenter, ColPresenter} from '../../../../../demo/Layout';
import {Space} from 'src/components/Layout/types';
import {Container} from '../../Container/Container';
import {Row} from '../../Row/Row';

export default {
    title: 'Layout (unstable)/Col',
    component: Col,
} as Meta;

const StaticTemplate: Story<{space?: Space; spaceRow?: Space}> = ({space, spaceRow}) => (
    <LayoutPresenter>
        <Row {...{space, spaceRow}}>
            {new Array(12).fill('1').map((size, i) => (
                <ColPresenter size={size} key={i} />
            ))}
            {new Array(6).fill('2').map((size, i) => (
                <ColPresenter size={size} key={i} />
            ))}
            {new Array(4).fill('3').map((size, i) => (
                <ColPresenter size={size} key={i} />
            ))}
            {new Array(3).fill('4').map((size, i) => (
                <ColPresenter size={size} key={i} />
            ))}
            {new Array(2).fill('6').map((size, i) => (
                <ColPresenter size={size} key={i} />
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
);

export const Static = StaticTemplate.bind({});

const DynamicTemplate: Story<{space?: Space; spaceRow?: Space}> = ({space, spaceRow}) => (
    <LayoutPresenter>
        <Container spaceRow="xxl">
            <Row {...{space, spaceRow}}>
                <ColPresenter size="1" l="12" />
                <ColPresenter size="1" l="12" />
                <ColPresenter size="1" l="11" />
                <ColPresenter size="1" l="1" />
                <ColPresenter size="1" l="10" />
                <ColPresenter size="1" l="2" />
                <ColPresenter size="1" l="9" />
                <ColPresenter size="1" l="3" />
                <ColPresenter size="1" l="8" />
                <ColPresenter size="1" l="4" />
                <ColPresenter size="1" l="7" />
                <ColPresenter size="1" l="5" />
            </Row>
            <Row {...{space, spaceRow}}>
                <ColPresenter size="7" l="1" />
                <ColPresenter size="5" l="1" />
                <ColPresenter size="8" l="1" />
                <ColPresenter size="4" l="1" />
                <ColPresenter size="9" l="1" />
                <ColPresenter size="3" l="1" />
                <ColPresenter size="10" l="1" />
                <ColPresenter size="2" l="1" />
                <ColPresenter size="11" l="1" />
                <ColPresenter size="1" l="1" />
                <ColPresenter size="12" l="1" />
                <ColPresenter size="12" l="1" />
            </Row>
        </Container>
    </LayoutPresenter>
);

export const Dynamic = DynamicTemplate.bind({});
