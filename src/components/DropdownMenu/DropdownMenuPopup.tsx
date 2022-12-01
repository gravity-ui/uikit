import React, {ReactNode, RefObject, useMemo} from 'react';
import {block} from '../utils/cn';
import {Popup, PopupPlacement} from '../Popup';
import {Menu, MenuProps} from '../Menu';
import type {DropdownMenuItem, DropdownMenuItemAction, DropdownMenuSize} from './types';
import {toItemList} from './toItemList';

const b = block('dropdown-menu');
const SEPARATOR: DropdownMenuItem = {text: '', action: () => {}};

export type DropdownMenuPopupProps<T> = {
    items: (DropdownMenuItem<T> | DropdownMenuItem<T>[])[];
    open: boolean;
    anchorRef?: RefObject<HTMLDivElement>;
    onMenuItemClick: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        action: DropdownMenuItemAction<T> | undefined,
    ) => void;
    onClose: () => void;
    popupClassName?: string;
    placement?: PopupPlacement;
    size?: DropdownMenuSize;
    menuProps?: MenuProps;
    children?: ReactNode;
};

export const DropdownMenuPopup = <T,>({
    items,
    open,
    anchorRef,
    onMenuItemClick,
    onClose,
    popupClassName,
    placement,
    size,
    menuProps,
    children,
}: DropdownMenuPopupProps<T>) => {
    const content = useMemo(() => {
        return (
            children || (
                <Menu className={b('menu')} size={size} {...menuProps}>
                    {toItemList(items, SEPARATOR).map((item, index) => {
                        const {text, action, className, ...itemProps} = item;
                        return (
                            <Menu.Item
                                key={index}
                                className={b(
                                    'menu-item',
                                    {separator: item === SEPARATOR},
                                    className,
                                )}
                                onClick={(event) => onMenuItemClick(event, action)}
                                {...itemProps}
                            >
                                {text}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            )
        );
    }, [children, size, menuProps, items, onMenuItemClick]);

    return (
        <Popup
            open={open}
            anchorRef={anchorRef}
            className={popupClassName}
            placement={placement}
            onClose={onClose}
        >
            {content}
        </Popup>
    );
};
