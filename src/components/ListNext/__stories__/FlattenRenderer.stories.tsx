import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';

import {FlattenList, FlattenListProps} from './components/FlattenList';

export default {
    title: 'Unstable/useList/FlattenRenderer(Virtualized)',
    component: FlattenList,
} as Meta;

const DefaultTemplate: StoryFn<FlattenListProps> = (props) => {
    return (
        <Flex width={400} style={{height: 500}}>
            <FlattenList {...props} />
        </Flex>
    );
};

export const Examples = DefaultTemplate.bind({});

Examples.args = {
    size: 's',
    itemsCount: 1000,
};
