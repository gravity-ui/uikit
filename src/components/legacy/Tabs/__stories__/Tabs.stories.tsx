import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';
import {useArgs} from 'storybook/preview-api';

import {Tabs, TabsDirection} from '../Tabs';
import type {TabsItemProps, TabsProps} from '../Tabs';

import {getTabsMock} from './getTabsMock';
import type {StoryParams} from './types';

const meta: Meta<typeof Tabs> = {
    title: 'Legacy/Tabs',
    component: Tabs,
    args: {
        direction: TabsDirection.Horizontal,
        activeTab: 'active',
    },
    argTypes: {
        activeTab: {
            control: {type: 'select'},
            options: getTabsMock({})?.map(({id}) => id),
        },
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-required-children',
                        enabled: false,
                        selector: '[id^="wrapped"]',
                    },
                    {
                        id: 'aria-required-parent',
                        enabled: false,
                        selector: '[id^="wrapped"]',
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export default meta;

const Template: StoryFn<TabsProps & StoryParams> = ({
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
    wrapTo(item: TabsItemProps, node: React.ReactNode) {
        return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key={item.id} href="#" style={{textDecoration: 'none'}} id={`wrapped-${item.id}`}>
                {node}
            </a>
        );
    },
};

export const WithChildren: StoryFn<TabsProps & StoryParams> = ({
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
