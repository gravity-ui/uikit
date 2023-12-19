import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {
    InfinityScrollList as InfinityScrollListExample,
    InfinityScrollListProps,
} from './components/InfinityScrollList';

export default {
    title: 'Unstable/useList/InfinityScrollList',
    component: InfinityScrollListExample,
} as Meta;

const InfinityScrollListTemplate: StoryFn<InfinityScrollListProps> = (props) => {
    return <InfinityScrollListExample {...props} />;
};

export const InfinityScrollList = InfinityScrollListTemplate.bind({});
InfinityScrollList.args = {
    size: 'm',
};
