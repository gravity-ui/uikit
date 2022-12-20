import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Table} from '../../Table';
import {HotKey, HotKeyProps} from '../HotKey';

export default {
    title: 'Components/HotKey',
    component: HotKey,
} as Meta;

export const Default: Story<HotKeyProps> = (args) => <HotKey {...args} />;
Default.args = {value: 'mod+a mod+c mod+v'};

const examples = [
    'mod+a mod+c mod+v',
    'mod+alt+shift',
    'mod+shift+s',
    'alt+tab',
    'command+option+control+shift',
    'alt+f4',
    'mod+up mod+right mod+down mod+left',
    'escape',
    'control+space',
    'alt+backspace',
    'alt+s+alt+s',
    'mod+[ mod+]',
    'mod+plus',
    'mod+-',
];

export const Examples: Story = () => (
    <Table
        columns={[
            {id: 'val', name: 'Value'},
            {id: 'pc', name: 'PC'},
            {id: 'mac', name: 'Mac'},
        ]}
        data={examples.map((val) => ({
            val: <code>{val}</code>,
            pc: <HotKey value={val} platform="pc" />,
            mac: <HotKey value={val} platform="mac" />,
        }))}
    />
);
