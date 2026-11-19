import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Button} from '../../..';
import {Menu, MenuDivider, MenuItem} from '../../../Menu';
import {cn} from '../../../utils/cn';
import {Sheet} from '../../Sheet';
import type {SheetProps} from '../../Sheet';

import './WithMenuShowcase.scss';

const b = cn('sheet-stories-with-menu-showcase');

export default {
    title: 'Components/Overlays/Sheet',
    component: Sheet,
} as Meta;

export const WithMenuShowcase: StoryFn<SheetProps> = (args: SheetProps) => {
    const [open, setOpen] = React.useState(false);

    const generateMenuItems = () => {
        return Array.from({length: 50}, (_, index) => {
            return <MenuItem key={index}>menu item 2.{index}</MenuItem>;
        });
    };

    return (
        <div className={b()}>
            <Button className={b('show-btn')} onClick={() => setOpen(true)}>
                Show modal
            </Button>
            <Sheet {...args} open={open} onOpenChange={setOpen}>
                <Menu inline className={b('menu')}>
                    <MenuItem>menu item 1.1</MenuItem>
                    <MenuItem>menu item 1.2</MenuItem>
                    <MenuItem>menu item 1.3</MenuItem>
                    <MenuDivider />
                    {generateMenuItems()}
                </Menu>
            </Sheet>
        </div>
    );
};
