import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Flex} from '../../layout';

import {RecursiveList} from './components/RecursiveList';
import type {RecursiveListProps} from './components/RecursiveList';

export default {
    title: 'Lab/useList/RecursiveRenderer',
    component: RecursiveList,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'label',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const RecursiveRendererTemplate: StoryFn<RecursiveListProps> = (props) => {
    return (
        <Flex width={400}>
            <RecursiveList aria-label="Recursive list sample" {...props} />
        </Flex>
    );
};

export const RecursiveRenderer = RecursiveRendererTemplate.bind({});

RecursiveRenderer.args = {
    size: 's',
    itemsCount: 10,
};
