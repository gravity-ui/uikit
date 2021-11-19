import React, {useState} from 'react';
import {Meta, Story} from '@storybook/react';
import {Tabs, TabsProps} from '../Tabs';

export default {
    title: 'Components/Tabs',
    component: Tabs,
    args: {
        direction: 'horizontal',
    },
} as Meta;

const Template: Story<TabsProps> = (args: any) => {
    const [activeTab, setActiveTab] = useState('secondTab');
    const items = [
        {
            id: 'firstTab',
        },
        {
            id: 'secondTab',
            title: 'Second Tab',
        },
        {
            id: 'thirdTab',
            title: 'Third Tab',
        },
        {
            id: 'disabledTab',
            title: 'This tab is disabled',
            disabled: true,
        },
    ];

    return <Tabs {...args} items={items} onSelectTab={setActiveTab} activeTab={activeTab} />;
};

export const Default = Template.bind({});
