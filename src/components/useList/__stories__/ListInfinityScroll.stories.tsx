import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {InfinityScrollList as InfinityScrollListExample} from './components/InfinityScrollList';
import type {InfinityScrollListProps} from './components/InfinityScrollList';

export default {
    title: 'Lab/useList/InfinityScrollList',
    component: InfinityScrollListExample,
    parameters: {
        a11y: {
            context: '#storybook-root',
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
                    {
                        id: 'aria-input-field-name',
                        enabled: false,
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
