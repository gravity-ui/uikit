import React from 'react';

import {useArgs} from '@storybook/client-api';
import type {ComponentMeta, Story} from '@storybook/react';

import {Tabs} from '../Tabs';
import type {TabsItemProps, TabsProps} from '../Tabs';

import {getTabsMock} from './getTabsMock';
import type {StoryParams} from './types';

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
            name: 'Overflow',
            type: 'boolean',
            default: false,
        },
    },
} as ComponentMeta<typeof Tabs>;

const Template: Story<TabsProps & StoryParams> = ({
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

    return <Tabs {...args} items={items} onSelectTab={(activeTab) => setStoryArgs({activeTab})} />;
};

export const Default = Template.bind({});

export const WithWrapTo = Template.bind({});
WithWrapTo.args = {
    wrapTo(_item: TabsItemProps, node: React.ReactNode) {
        return (
            <a key={_item.id} href="#">
                {node}
            </a>
        );
    },
};

export const WithChildren: Story<TabsProps & StoryParams> = ({
    withIcon,
    withCounter,
    withLabel,
    withOverflow,
    ...args
}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () =>
            getTabsMock({withIcon, withCounter, withLabel, withOverflow})?.map((props) => (
                <Tabs.Item
                    key={props.id}
                    {...props}
                    onClick={(tabId) => setStoryArgs({activeTab: tabId})}
                />
            )),
        [withCounter, withIcon, withLabel, withOverflow],
    );

    return <Tabs {...args}>{items}</Tabs>;
};
