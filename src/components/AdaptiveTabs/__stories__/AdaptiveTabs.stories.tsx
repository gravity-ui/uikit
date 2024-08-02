import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import type {AdaptiveTabsProps} from '../AdaptiveTabs';
import {AdaptiveTabs} from '../AdaptiveTabs';

import {adaptiveTabsItems} from './AdaptiveTabsItems';

export default {
    title: 'Components/Navigation/AdaptiveTabs',
    component: AdaptiveTabs,
    argTypes: {
        size: {
            options: ['m', 'l', 'xl'],
            control: {type: 'radio'},
            defaultValue: 'm',
        },
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;
const Template: StoryFn<{size: 'm' | 'l' | 'xl'} & AdaptiveTabs<{}>> = (args) => {
    const [activeTab, setActiveTab] = React.useState('active');
    const items: AdaptiveTabsProps<{}>['items'] = React.useMemo(
        () => [
            {
                id: 'first',
                title: 'First Tab',
            },
            {
                id: 'active',
                title: 'Active Tab',
            },
            {
                id: 'disabled',
                title: 'Disabled With Long Text Tab',
                disabled: true,
            },
            {
                id: 'fourth',
                title: 'Fourth Long Text To Show Tab',
            },
            {
                id: 'fifth',
                title: 'One More Long Text Tab To Show',
            },
        ],
        [],
    );

    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs
                {...args}
                items={items}
                onSelectTab={setActiveTab}
                activeTab={activeTab}
            />
        </div>
    );
};
export const Default = Template.bind({});

const WrapTemplate: StoryFn<AdaptiveTabsProps<{}>> = (args) => {
    const [activeTab, setActiveTab] = React.useState('active');
    const items: AdaptiveTabsProps<{}>['items'] = React.useMemo(
        () => [
            {
                id: 'first',
                title: 'First Tab',
            },
            {
                id: 'active',
                title: 'Active Tab',
            },
            {
                id: 'disabled',
                title: 'Disabled With Long Text Tab',
                disabled: true,
            },
            {
                id: 'fourth',
                title: 'Fourth Long Text To Show Tab',
            },
            {
                id: 'fifth',
                title: 'One More Long Text Tab To Show',
            },
        ],
        [],
    );

    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs
                {...args}
                items={items}
                onSelectTab={setActiveTab}
                activeTab={activeTab}
                wrapTo={(_, node) => {
                    return (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span>extra</span>
                            {node}
                        </div>
                    );
                }}
            />
        </div>
    );
};
export const Wrap = WrapTemplate.bind({});

const CustomTabTemplate: StoryFn<AdaptiveTabsProps<{}>> = (args) => {
    const [activeTab, setActiveTab] = React.useState('active');
    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs
                {...args}
                items={adaptiveTabsItems}
                onSelectTab={setActiveTab}
                activeTab={activeTab}
            />
        </div>
    );
};
export const CustomTab = CustomTabTemplate.bind({});
