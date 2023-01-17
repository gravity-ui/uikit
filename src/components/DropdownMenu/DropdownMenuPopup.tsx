import React, {useCallback, useContext, useEffect} from 'react';
import type {ReactNode, RefObject, MouseEvent} from 'react';

import {Popup} from '../Popup';
import type {PopupPlacement, PopupProps} from '../Popup';
import {Menu} from '../Menu';
import type {MenuProps} from '../Menu';
import {useListNavigation} from '../utils/useListNavigation';

import {cnDropdownMenu} from './DropdownMenu.classname';
import {DropdownMenuContext} from './DropdownMenuContext';
import {DropdownMenuItem} from './DropdownMenuItem';
import {DropdownMenuNavigationContext} from './DropdownMenuNavigationContext';
import type {DropdownMenuListItem, DropdownMenuSize} from './types';
import {isSeparator} from './utils/isSeparator';
import {shouldSkipItemNavigation} from './utils/shouldSkipItemNavigation';
import {stringifyNavigationPath} from './utils/stringifyNavigationPath';

export type DropdownMenuPopupProps<T> = {
    items: DropdownMenuListItem<T>[];
    open: boolean;
    anchorRef: RefObject<HTMLDivElement>;
    onClose?: () => void;
    popupClassName?: string;
    placement?: PopupPlacement;
    size?: DropdownMenuSize;
    menuProps?: MenuProps;
    children?: ReactNode;
    popupProps?: Partial<PopupProps>;
    path?: number[];
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
    popupProps,
    path = [],
}: DropdownMenuPopupProps<T>) => {
    const {toggle, data} = useContext(DropdownMenuContext);

    const {
        activeMenuPath,
        setActiveMenuPath,
        anchorRef: navigationAnchorRef,
    } = useContext(DropdownMenuNavigationContext);

    const isSubmenu = path.length > 0;

    const activateParent = useCallback(() => {
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [setActiveMenuPath, path]);

    const handleMouseEnter = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            setActiveMenuPath(path);
            popupProps?.onMouseEnter?.(event);
        },
        [path, popupProps, setActiveMenuPath],
    );

    const handleMouseLeave = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            activateParent();
            popupProps?.onMouseLeave?.(event);
        },
        [activateParent, popupProps],
    );
    const handleSelect = useCallback(
        (activeItem: DropdownMenuListItem<T>, event: KeyboardEvent) => {
            if (activeItem.items && activeItem.path) {
                setActiveMenuPath(activeItem.path);
            } else {
                activeItem.action?.(event, data as unknown as T);
                toggle(false);
            }
        },
        [data, setActiveMenuPath, toggle],
    );

    const handleKeydown = useCallback(
        (activeItemIndex: number, event: KeyboardEvent) => {
            switch (event.key) {
                case 'Escape': {
                    if (isSubmenu) {
                        event.stopPropagation();
                        activateParent?.();
                    }

                    return false;
                }
                case 'Enter':
                case ' ': {
                    const activeItem = items[activeItemIndex];
                    if (activeItem) {
                        event.preventDefault();

                        handleSelect(activeItem, event);
                    }

                    return false;
                }
            }

            return true;
        },
        [activateParent, handleSelect, isSubmenu, items],
    );

    const isNavigationActive =
        open && stringifyNavigationPath(path) === stringifyNavigationPath(activeMenuPath);

    const {
        activeItemIndex,
        setActiveItemIndex,
        reset: resetNavigation,
    } = useListNavigation<DropdownMenuListItem<T>, HTMLDivElement>({
        items,
        skip: shouldSkipItemNavigation,
        anchorRef: navigationAnchorRef,
        onAnchorKeyDown: handleKeydown,
        disabled: !isNavigationActive,
        initialValue: isSubmenu ? 0 : -1,
    });

    useEffect(() => {
        if (!open) {
            resetNavigation();
        }
    }, [open, resetNavigation]);

    return (
        <Popup
            open={open}
            anchorRef={anchorRef}
            className={popupClassName}
            placement={placement}
            onClose={onClose}
            {...popupProps}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children || (
                <Menu className={cnDropdownMenu('menu')} size={size} {...menuProps}>
                    {items.map((item, index) => {
                        const isActive = isNavigationActive && activeItemIndex === index;
                        const activate = () => setActiveItemIndex(index);

                        const extraProps = {
                            ...item.extraProps,
                            onMouseEnter: activate,
                        };

                        return (
                            <DropdownMenuItem
                                key={index}
                                className={cnDropdownMenu(
                                    'menu-item',
                                    {separator: isSeparator(item)},
                                    item.className,
                                )}
                                selected={isActive}
                                popupClassName={popupClassName}
                                closeMenu={onClose}
                                {...item}
                                extraProps={extraProps}
                            />
                        );
                    })}
                </Menu>
            )}
        </Popup>
    );
};
