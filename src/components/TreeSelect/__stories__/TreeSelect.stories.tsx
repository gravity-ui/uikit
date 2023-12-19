import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';
import identity from 'lodash/identity';

import {createRandomizedData} from '../../ListNext/__stories__/utils/makeData';
import {Flex} from '../../layout';
import {TreeSelect} from '../TreeSelect';
import type {TreeSelectProps} from '../types';

import {
    InfinityScrollExample,
    InfinityScrollExampleProps,
} from './components/InfinityScrollExample';
import {WithDndListExample, WithDndListExampleProps} from './components/WithDndListExample';
import {
    WithFiltrationAndControlsExample,
    WithFiltrationAndControlsExampleProps,
} from './components/WithFiltrationAndControlsExample';
import {
    WithGroupSelectionControlledStateAndCustomIconExample,
    WithGroupSelectionControlledStateAndCustomIconExampleProps,
} from './components/WithGroupSelectionControlledStateAndCustomIcon';
import {
    WithItemLinksAndActionsExample,
    WithItemLinksAndActionsExampleProps,
} from './components/WithItemLinksAndActionsExample';

export default {
    title: 'Unstable/TreeSelect',
    component: TreeSelect,
} as Meta;

const DefaultTemplate: StoryFn<
    Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'renderControlContent'
    > & {
        itemsCount?: number;
    }
> = ({itemsCount = 5, ...props}) => {
    const items = React.useMemo(() => createRandomizedData({num: itemsCount}), [itemsCount]);
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <Flex>
            <TreeSelect
                {...props}
                value={value}
                renderControlContent={identity}
                items={items}
                onUpdate={setValue}
            />
        </Flex>
    );
};
export const Default = DefaultTemplate.bind({});
Default.args = {
    size: 'm',
};

const WithGroupSelectionControlledStateAndCustomIconTemplate: StoryFn<
    WithGroupSelectionControlledStateAndCustomIconExampleProps
> = (props) => {
    return <WithGroupSelectionControlledStateAndCustomIconExample {...props} />;
};

export const WithGroupSelectionControlledStateAndCustomIcon =
    WithGroupSelectionControlledStateAndCustomIconTemplate.bind({});
WithGroupSelectionControlledStateAndCustomIcon.args = {
    multiple: true,
    groupsBehavior: 'selectable',
};

const InfinityScrollTemplate: StoryFn<InfinityScrollExampleProps> = (props) => {
    return <InfinityScrollExample {...props} />;
};
export const InfinityScroll = InfinityScrollTemplate.bind({});
InfinityScroll.args = {
    size: 'm',
    multiple: true,
};

const WithFiltrationAndControlsTemplate: StoryFn<WithFiltrationAndControlsExampleProps> = (
    props,
) => {
    return <WithFiltrationAndControlsExample {...props} />;
};
export const WithFiltrationAndControls = WithFiltrationAndControlsTemplate.bind({});
WithFiltrationAndControls.args = {
    size: 'l',
};

const WithItemLinksAndActionsTemplate: StoryFn<WithItemLinksAndActionsExampleProps> = (props) => {
    return <WithItemLinksAndActionsExample {...props} />;
};
export const WithItemLinksAndActions = WithItemLinksAndActionsTemplate.bind({});
WithItemLinksAndActions.args = {};

const WithDndListTemplate: StoryFn<WithDndListExampleProps> = (props) => {
    return <WithDndListExample {...props} />;
};
export const WithDndList = WithDndListTemplate.bind({});

WithDndList.args = {
    size: 'l',
};
WithDndList.parameters = {
    // Strict mode ruins sortable list due to this react-beautiful-dnd issue
    // https://github.com/atlassian/react-beautiful-dnd/issues/2350
    disableStrictMode: true,
};
