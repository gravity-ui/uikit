import type {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import {Tabs, TabsItemProps, TabsProps} from '../Tabs';
import {getTabsMock} from './getTabsMock';
import type {StoryParams} from './types';
import {useArgs} from '@storybook/client-api';

export default {
    title: 'Components/Tabs',
    component: Tabs,
    args: {
        direction: 'horizontal',
        activeTab: 'active',
    },
    argTypes: {
        activeTab: {
            control: {type: 'select'},
            options: getTabsMock({})?.map(({id}) => id),
        },
        withIcon: {
            name: 'Icons',
            type: 'boolean',
            default: false,
        },
        withCounter: {
            name: 'Counters',
            type: 'boolean',
            default: false,
        },
        withLabel: {
            name: 'Labels',
            type: 'boolean',
            default: false,
        },
        withOverflow: {
            name: 'Labels',
            type: 'boolean',
            default: false,
        },
    },
} as ComponentMeta<typeof Tabs>;

type StoriesComponent = FC<TabsProps & StoryParams>;

const Template: ComponentStory<StoriesComponent> = ({
    withIcon,
    withCounter,
    withLabel,
    withOverflow,
    ...args
}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () => getTabsMock({withIcon, withCounter, withLabel, withOverflow}),
        [withCounter, withIcon, withLabel, withOverflow],
    );

    setStoryArgs({items});

    return <Tabs {...args} items={items} onSelectTab={(activeTab) => setStoryArgs({activeTab})} />;
};

export const Default = Template.bind({});

export const WithWrapTo = Template.bind({});
WithWrapTo.args = {
    wrapTo(_item: TabsItemProps, node: React.ReactNode) {
        return <a href="#">{node}</a>;
    },
};
