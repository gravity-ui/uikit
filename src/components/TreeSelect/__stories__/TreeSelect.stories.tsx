import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';
import {getListItemClickHandler} from '../../useList';
import {createRandomizedData} from '../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../TreeSelect';
import type {TreeSelectProps} from '../types';

import {InfinityScrollExample} from './components/InfinityScrollExample';
import type {InfinityScrollExampleProps} from './components/InfinityScrollExample';
import {WithDisabledElementsExample} from './components/WithDisabledElementsExample';
import type {WithDisabledElementsExampleProps} from './components/WithDisabledElementsExample';
import {WithDndListExample} from './components/WithDndListExample';
import type {WithDndListExampleProps} from './components/WithDndListExample';
import {WithFiltrationAndControlsExample} from './components/WithFiltrationAndControlsExample';
import type {WithFiltrationAndControlsExampleProps} from './components/WithFiltrationAndControlsExample';
import {WithGroupSelectionControlledStateAndCustomIconExample} from './components/WithGroupSelectionControlledStateAndCustomIcon';
import type {WithGroupSelectionControlledStateAndCustomIconExampleProps} from './components/WithGroupSelectionControlledStateAndCustomIcon';
import {WithItemLinksAndActionsExample} from './components/WithItemLinksAndActionsExample';
import type {WithItemLinksAndActionsExampleProps} from './components/WithItemLinksAndActionsExample';

export default {
    title: 'Lab/TreeSelect',
    component: TreeSelect,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<
    Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'mapItemDataToContentProps'
    > & {
        itemsCount?: number;
    }
> = ({itemsCount = 5, ...props}) => {
    const items = React.useMemo(() => createRandomizedData({num: itemsCount}), [itemsCount]);

    return (
        <Flex>
            <TreeSelect
                {...props}
                placeholder="-"
                items={items}
                mapItemDataToContentProps={(x) => x}
                onItemClick={({id, list}) => {
                    getListItemClickHandler({list})({id});
                    console.log('clicked on item with id: ', id);
                }}
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
WithGroupSelectionControlledStateAndCustomIcon.args = {};

const InfinityScrollTemplate: StoryFn<InfinityScrollExampleProps> = (props) => {
    return <InfinityScrollExample {...props} />;
};
export const InfinityScroll = InfinityScrollTemplate.bind({});
InfinityScroll.args = {
    size: 'm',
    defaultExpandedState: 'closed',
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

const WithDisabledElementsTemplate: StoryFn<WithDisabledElementsExampleProps> = (props) => {
    return <WithDisabledElementsExample {...props} />;
};
export const WithDisabledElements = WithDisabledElementsTemplate.bind({});

WithDisabledElements.args = {
    size: 'l',
};
