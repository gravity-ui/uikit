import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {InfinityScrollList as InfinityScrollListExample} from './components/InfinityScrollList';
import type {InfinityScrollListProps} from './components/InfinityScrollList';

export default {
    title: 'Unstable/useList/InfinityScrollList',
    component: InfinityScrollListExample,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'label',
                        enabled: false,
                    },
                    {
                        id: 'scrollable-region-focusable',
                        enabled: false,
                        selector: '.g-list-container-view', // scrollable content is accessible via arrows
                    },
                ],
            },
        },
    },
} as Meta;

const InfinityScrollListTemplate: StoryFn<InfinityScrollListProps> = (props) => {
    return <InfinityScrollListExample {...props} />;
};

export const InfinityScrollList = InfinityScrollListTemplate.bind({});
InfinityScrollList.args = {
    size: 'm',
};
