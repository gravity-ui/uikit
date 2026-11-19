import {Menu} from '../Menu';
import type {MenuProps} from '../types';

export function InlineMenu({size}: {size: MenuProps['size']}) {
    return (
        <Menu inline size={size}>
            <Menu.Item qa="item">
                <span data-qa="text">Item</span>
            </Menu.Item>
        </Menu>
    );
}
