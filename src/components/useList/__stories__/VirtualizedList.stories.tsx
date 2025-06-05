import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Flex} from '../../layout';

import {FlattenList} from './components/FlattenList';
import type {FlattenListProps} from './components/FlattenList';

export default {
    title: 'Lab/useList/VirtualizedList',
    component: FlattenList,
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
                        id: 'aria-input-field-name',
                        enabled: false,
                    },
                    {
                        id: 'scrollable-region-focusable',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1343
                    },
                ],
            },
        },
    },
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
