import React, {ReactNode, RefObject, useMemo} from 'react';
import {block} from '../utils/cn';
import {Popup, PopupPlacement} from '../Popup';
import {Menu, MenuProps} from '../Menu';
import type {DropdownMenuItem, DropdownMenuSize} from './types';
import {toItemList} from './toItemList';
import {DropdownMenuItem as DropdownMenuItemComponent} from './DropdownMenuItem';

const b = block('dropdown-menu');
const SEPARATOR: DropdownMenuItem = {text: '', action: () => {}};

export type DropdownMenuPopupProps<T> = {
    items: (DropdownMenuItem<T> | DropdownMenuItem<T>[])[];
    open: boolean;
    anchorRef?: RefObject<HTMLDivElement>;
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
                        const {className, ...itemProps} = item;

                        return (
                            <DropdownMenuItemComponent
                                key={index}
                                className={b(
                                    'menu-item',
                                    {separator: item === SEPARATOR},
                                    className,
                                )}
                                {...itemProps}
                            />
                        );
                    })}
                </Menu>
            )
        );
    }, [children, size, menuProps, items]);

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
