import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button, Menu} from '../../../';
import {cn} from '../../../utils/cn';
import {Sheet} from '../../Sheet';
import type {SheetProps} from '../../Sheet';

import './WithMenuShowcase.scss';

const b = cn('sheet-stories-with-menu-showcase');

export default {
    title: 'Components/Sheet',
    component: Sheet,
} as Meta;

export const WithMenuShowcase: StoryFn<SheetProps> = (args: SheetProps) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <div className={b()}>
            <Button className={b('show-btn')} onClick={() => setVisible(true)}>
                Show modal
            </Button>
            <Sheet {...args} visible={visible} onClose={() => setVisible(false)}>
                <Menu>
                    <Menu.Group>
                        <Menu.Item>menu item 1.1</Menu.Item>
                        <Menu.Item>menu item 1.2</Menu.Item>
                        <Menu.Item>menu item 1.3</Menu.Item>
                    </Menu.Group>
                    <Menu.Group>
                        <Menu.Item>menu item 2.1</Menu.Item>
                        <Menu.Item>menu item 2.2</Menu.Item>
                        <Menu.Item>menu item 2.3</Menu.Item>
                    </Menu.Group>
                </Menu>
            </Sheet>
        </div>
    );
};
