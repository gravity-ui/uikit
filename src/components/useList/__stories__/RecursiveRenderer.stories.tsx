import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';

import {RecursiveList} from './components/RecursiveList';
import type {RecursiveListProps} from './components/RecursiveList';

export default {
    title: 'Unstable/useList/RecursiveRenderer',
    component: RecursiveList,
} as Meta;

const RecursiveRendererTemplate: StoryFn<RecursiveListProps> = (props) => {
    return (
        <Flex width={400}>
            <RecursiveList aria-label={'Recursive list sample'} {...props} />
        </Flex>
    );
};

export const RecursiveRenderer = RecursiveRendererTemplate.bind({});

RecursiveRenderer.args = {
    size: 's',
    itemsCount: 10,
};
