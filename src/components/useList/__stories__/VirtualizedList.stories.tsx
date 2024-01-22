import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';

import {FlattenList, FlattenListProps} from './components/FlattenList';

export default {
    title: 'Unstable/useList/VirtualizedList',
    component: FlattenList,
} as Meta;

const VirtualizedListTemplate: StoryFn<FlattenListProps> = (props) => {
    return (
        <Flex width={400} style={{height: 500}}>
            <FlattenList {...props} />
        </Flex>
    );
};

export const VirtualizedList = VirtualizedListTemplate.bind({});

VirtualizedList.args = {
    size: 's',
    itemsCount: 1000,
};
