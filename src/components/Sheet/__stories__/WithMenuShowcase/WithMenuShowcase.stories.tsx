import React, {useState} from 'react';

import {Story} from '@storybook/react';
import block from 'bem-cn-lite';

import {Button, Menu} from '../../../';
import {Sheet, SheetProps} from '../../Sheet';

import './WithMenuShowcase.scss';

const b = block('sheet-stories-with-menu-showcase');

export const WithMenuShowcase: Story<SheetProps> = (args: SheetProps) => {
    const [visible, setVisible] = useState(false);

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
