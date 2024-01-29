import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';

import {ListWithDnd as ListWithDndExample} from './components/ListWithDnd';
import type {ListWithDndProps} from './components/ListWithDnd';

export default {
    title: 'Unstable/useList/ListWithDnd',
    component: ListWithDndExample,
    parameters: {
        // Strict mode ruins sortable list due to this react-beautiful-dnd issue
        // https://github.com/atlassian/react-beautiful-dnd/issues/2350
        disableStrictMode: true,
    },
} as Meta;

const ListWithDndTemplate: StoryFn<ListWithDndProps> = (props) => {
    return (
        <Flex width={400}>
            <ListWithDndExample {...props} />
        </Flex>
    );
};

export const ListWithDnd = ListWithDndTemplate.bind({});

ListWithDnd.args = {
    size: 's',
    itemsCount: 10,
};
