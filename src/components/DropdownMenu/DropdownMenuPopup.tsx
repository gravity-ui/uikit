import React from 'react';
import {block} from '../utils/cn';
import {Popup, PopupPlacement} from '../Popup';
import {Menu, MenuProps} from '../Menu';

import {DropdownMenuItem, DropdownMenuItemMixed, DropdownMenuSize} from './types';

const b = block('dropdown-menu');

const ITEMS_SEPARATOR: DropdownMenuItem<unknown> = {text: '', action: () => {}};

function filterAndFlat<T>(items: DropdownMenuItemMixed<T>[]): DropdownMenuItem<T>[] {
    let prevIsGroup = false;

    return items.reduce((acc: DropdownMenuItem<T>[], item) => {
        if (Array.isArray(item)) {
            const filtered = item.filter(({hidden}) => !hidden);
            if (acc.length > 0 && filtered.length > 0) {
                acc.push(ITEMS_SEPARATOR);
            }
            prevIsGroup = filtered.length > 0;
            return acc.concat(filtered);
        } else {
            if (item.hidden) {
                return acc;
            }
            if (prevIsGroup) {
                acc.push(ITEMS_SEPARATOR);
            }
            acc.push(item);
            prevIsGroup = false;
            return acc;
        }
    }, []);
}

interface DropdownMenuPopupProps<T> {
    open: boolean;
    anchorRef?: React.RefObject<HTMLDivElement>;
    items: DropdownMenuItemMixed<T>[];
    onMenuItemClick: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        action: DropdownMenuItem<T>['action'],
    ) => void;
    onClose: () => void;
    popupClassName: string | undefined;
    placement?: PopupPlacement;
    size?: DropdownMenuSize;
    defaultMenuProps?: MenuProps;
    children?: React.ReactNode;
}

export class DropdownMenuPopup<T> extends React.PureComponent<DropdownMenuPopupProps<T>, never> {
    render() {
        const {
            open,
            anchorRef,
            items,
            onClose,
            popupClassName,
            placement,
            size,
            defaultMenuProps,
            children,
        } = this.props;

        return (
            <Popup
                open={open}
                anchorRef={anchorRef}
                className={popupClassName}
                placement={placement}
                onClose={onClose}
            >
                {children ? (
                    children
                ) : (
                    <Menu className={b('menu')} size={size} {...defaultMenuProps}>
                        {filterAndFlat(items).map(this.renderMenuItem)}
                    </Menu>
                )}
            </Popup>
        );
    }

    private renderMenuItem = (item: DropdownMenuItem<T>, index: number) => {
        const separator = item === ITEMS_SEPARATOR;
        const {text, action, className, ...restProps} = item;

        return (
            <Menu.Item
                key={index}
                className={b('menu-item', {separator}, className)}
                onClick={(event) => this.props.onMenuItemClick(event, action)}
                {...restProps}
            >
                {text}
            </Menu.Item>
        );
    };
}
