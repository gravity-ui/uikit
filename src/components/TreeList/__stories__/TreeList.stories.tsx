import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';
import {createRandomizedData} from '../../useList/__stories__/utils/makeData';
import {TreeList} from '../TreeList';
import type {TreeListProps} from '../types';

import {InfinityScrollExample} from './components/InfinityScrollExample';
import type {InfinityScrollExampleProps} from './components/InfinityScrollExample';
import {WithDndListExample} from './components/WithDndListExample';
import type {WithDndListExampleProps} from './components/WithDndListExample';
import {WithFiltrationAndControlsExample} from './components/WithFiltrationAndControlsExample';
import type {WithFiltrationAndControlsExampleProps} from './components/WithFiltrationAndControlsExample';
import {WithGroupSelectionControlledStateAndCustomIconExample} from './components/WithGroupSelectionControlledStateAndCustomIcon';
import type {WithGroupSelectionControlledStateAndCustomIconExampleProps} from './components/WithGroupSelectionControlledStateAndCustomIcon';
import {WithItemLinksAndActionsExample} from './components/WithItemLinksAndActionsExample';
import type {WithItemLinksAndActionsExampleProps} from './components/WithItemLinksAndActionsExample';

export default {
    title: 'Unstable/TreeList',
    component: TreeList,
} as Meta;

const DefaultTemplate: StoryFn<
    Omit<
        TreeListProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'renderControlContent'
    > & {
        itemsCount?: number;
    }
> = ({itemsCount = 5, ...props}) => {
    const items = React.useMemo(() => createRandomizedData({num: itemsCount}), [itemsCount]);

    return (
        <Flex width="500">
            <TreeList {...props} items={items} />
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
WithGroupSelectionControlledStateAndCustomIcon.args = {};

const InfinityScrollTemplate: StoryFn<InfinityScrollExampleProps> = (props) => {
    return <InfinityScrollExample {...props} />;
};
export const InfinityScroll = InfinityScrollTemplate.bind({});
InfinityScroll.args = {
    size: 'm',
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
