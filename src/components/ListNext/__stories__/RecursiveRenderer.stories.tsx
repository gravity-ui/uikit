import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';

import {RecursiveList, RecursiveListProps} from './components/RecursiveList';

export default {
    title: 'Unstable/useList/RecursiveRenderer',
    component: RecursiveList,
} as Meta;

const DefaultTemplate: StoryFn<RecursiveListProps> = (props) => {
    return (
        <Flex width={400}>
            <RecursiveList {...props} />
        </Flex>
    );
};

export const Examples = DefaultTemplate.bind({});

Examples.args = {
    size: 's',
    itemsCount: 10,
};
