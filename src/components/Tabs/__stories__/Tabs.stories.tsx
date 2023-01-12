import React, {useState} from 'react';
import {Meta, Story} from '@storybook/react';
import {Tabs, TabsItemProps, TabsProps} from '../Tabs';
import {GearIcon} from '../../icons/GearIcon';

export default {
    title: 'Components/Tabs',
    component: Tabs,
    args: {
        direction: 'horizontal',
    },
    argTypes: {
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
} as Meta;

const gearIcon = <GearIcon width={20} height={20} />;

const Template: Story<
    TabsProps & {
        withIcon?: boolean;
        withCounter?: boolean;
        withLabel?: boolean;
        withOverflow?: boolean;
    }
> = (args) => {
    const [activeTab, setActiveTab] = useState('active');

    const items: TabsProps['items'] = React.useMemo(
        () => [
            {
                id: 'first',
                title: 'First Tab',
                icon: args.withIcon ? gearIcon : undefined,
                counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
                label: args.withLabel ? {content: 'Normal', theme: 'normal'} : undefined,
                hasOverflow: args.withOverflow,
                extraProps: {
                    style: {
                        maxWidth: args.withOverflow ? '100px' : 'auto',
                    },
                },
            },
            {
                id: 'active',
                title: 'Active Tab',
                icon: args.withIcon ? gearIcon : undefined,
                counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
                label: args.withLabel ? {content: 'Warning', theme: 'warning'} : undefined,
                hasOverflow: args.withOverflow,
                extraProps: {
                    style: {
                        maxWidth: args.withOverflow ? '100px' : 'auto',
                    },
                },
            },
            {
                id: 'disabled',
                title: 'Disabled Tab',
                icon: args.withIcon ? gearIcon : undefined,
                counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
                label: args.withLabel ? {content: 'Danger', theme: 'danger'} : undefined,
                disabled: true,
                hasOverflow: args.withOverflow,
                extraProps: {
                    style: {
                        maxWidth: args.withOverflow ? '100px' : 'auto',
                    },
                },
            },
        ],
        [args.withIcon, args.withCounter, args.withLabel, args.withOverflow],
    );

    return <Tabs {...args} items={items} onSelectTab={setActiveTab} activeTab={activeTab} />;
};

export const Default = Template.bind({});

Default.argTypes = {
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
};

export const WithWrapTo = Template.bind({});
WithWrapTo.args = {
    wrapTo(_item: TabsItemProps, node: React.ReactNode) {
        return <a href="#">{node}</a>;
    },
};
