import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {InfinityScrollList, InfinityScrollListProps} from './components/InfinityScrollList';

export default {
    title: 'Unstable/useList/InfinityScrollList',
    component: InfinityScrollList,
} as Meta;

const ListInfinityScroll: StoryFn<InfinityScrollListProps> = (props) => {
    return <InfinityScrollList {...props} />;
};
export const Examples = ListInfinityScroll.bind({});
Examples.args = {
    size: 'm',
};
