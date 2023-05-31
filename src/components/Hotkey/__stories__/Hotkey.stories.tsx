import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Table} from '../../Table';
import {Hotkey} from '../Hotkey';
import type {HotkeyProps} from '../Hotkey';

export default {
    title: 'Components/Hotkey',
    component: Hotkey,
} as Meta;

export const Default: Story<HotkeyProps> = (args) => <Hotkey {...args} />;
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
            pc: <Hotkey value={val} platform="pc" />,
            mac: <Hotkey value={val} platform="mac" />,
        }))}
    />
);
