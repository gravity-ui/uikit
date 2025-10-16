import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Flex} from '../../layout';

import {ListWithDnd as ListWithDndExample} from './components/ListWithDnd';
import type {ListWithDndProps} from './components/ListWithDnd';

export default {
    title: 'Lab/useList/ListWithDnd',
    component: ListWithDndExample,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-required-children',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1346
                    },
                    {
                        id: 'label',
                        enabled: false,
                    },
                    {
                        id: 'aria-allowed-attr',
                        enabled: false,
                    },
                ],
            },
        },
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
    'aria-label': 'Sample list with DnD',
};
