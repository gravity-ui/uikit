import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Tooltip} from '../../Tooltip';
import {Tab} from '../Tab';
import {TabList} from '../TabList';
import {TabPanel} from '../TabPanel';
import {TabProvider} from '../TabProvider';

import {getTabsMock} from './getTabsMock';

export default {
    title: 'Components/Navigation/TabList',
    component: TabList,
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
} as Meta;

type Story = StoryObj<typeof TabList>;

export const Default: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [tab, setTab] = React.useState(getTabsMock({})[0].value);
        return <TabList {...args} value={tab} onUpdate={setTab} />;
    },
    args: {
        children: getTabsMock({})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const Icon: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withIcon: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const Counter: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withCounter: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const Label: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withLabel: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const CustomWidth: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({})?.map((props, i) => (
            <Tab key={i} {...props} style={{width: '50px'}} />
        )),
    },
};

export const Link: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withLink: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const CustomChildren: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withCustomChildren: true})?.map((props, i) => (
            <Tab key={i} {...props} />
        )),
    },
};

export const TooltipWrap: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withTitle: false})?.map(({value, ...props}, i) => (
            <Tooltip key={i} content={`I'm a tooltip for ${value}!`}>
                <Tab value={value} {...props} />
            </Tooltip>
        )),
    },
};

export const Panels: Story = {
    render: (args) => {
        const tabs = getTabsMock({});
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [tab, setTab] = React.useState(tabs[0].value);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const items = React.useMemo(
            () =>
                tabs.map((props, i) => (
                    <Tab key={i} {...props} aria-controls={`panel-${i}`} id={`tab-${i}`} />
                )),
            [],
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const panels = React.useMemo(
            () =>
                tabs.map((props, i) => (
                    <TabPanel
                        key={i}
                        value={props.value}
                        aria-labelledby={`tab-${i}`}
                        id={`panel-${i}`}
                    >
                        <div
                            style={{marginTop: '10px'}}
                        >{`Content of ${props.value} tab panel`}</div>
                    </TabPanel>
                )),
            [],
        );

        return (
            <TabProvider value={tab}>
                <TabList {...args} value={tab} onUpdate={setTab}>
                    {items}
                </TabList>
                <div>{panels}</div>
            </TabProvider>
        );
    },
};
