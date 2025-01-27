import * as React from 'react';

import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryFn} from '@storybook/react';

import {Tooltip} from '../../Tooltip';
import {Tab} from '../Tab';
import {TabList} from '../TabList';
import type {TabListProps} from '../TabList';

import {getTabsMock} from './getTabsMock';

const meta: Meta<typeof TabList> = {
    title: 'Components/Navigation/tabs',
    component: TabList,
    args: {
        value: 'active',
    },
    argTypes: {
        value: {
            control: {type: 'select'},
            options: getTabsMock({})?.map(({value}) => value),
        },
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
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

export const Default: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () => getTabsMock({})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );

    return (
        <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
            {items}
        </TabList>
    );
};

export const WithIcons: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () => getTabsMock({withIcon: true})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );
    return (
        <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
            {items}
        </TabList>
    );
};

export const WithCounter: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () => getTabsMock({withCounter: true})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );
    return (
        <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
            {items}
        </TabList>
    );
};

export const WithLabel: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () => getTabsMock({withLabel: true})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );
    return (
        <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
            {items}
        </TabList>
    );
};

export const WithCustomWidth: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () =>
            getTabsMock({})?.map((props, i) => <Tab key={i} {...props} style={{width: '50px'}} />),
        [],
    );
    return (
        <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
            {items}
        </TabList>
    );
};

export const WithLink: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () => getTabsMock({withLink: true})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );
    return (
        <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
            {items}
        </TabList>
    );
};

export const CustomTab: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () =>
            getTabsMock({withCustomChildren: true})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );
    return (
        <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
            {items}
        </TabList>
    );
};

export const WrapTab: StoryFn<TabListProps> = ({...props}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () =>
            getTabsMock({withTitle: false})?.map(({value, ...props}, i) => (
                <Tooltip key={i} content={`I'm a tooltip for ${value}!`}>
                    <Tab value={value} {...props} />
                </Tooltip>
            )),
        [],
    );
    return (
        <React.Fragment>
            <TabList {...props} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
                {items}
            </TabList>
        </React.Fragment>
    );
};
