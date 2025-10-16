'use client';

import * as React from 'react';

import {KeyCode} from '../../constants';
import {useListNavigation} from '../../hooks';
import {Menu} from '../Menu';
import type {MenuProps} from '../Menu';
import {Popup} from '../Popup';
import type {PopupProps} from '../Popup';

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
    anchorRef: React.RefObject<HTMLDivElement>;
    onClose?: () => void;
    size?: DropdownMenuSize;
    menuProps?: MenuProps;
    children?: React.ReactNode;
    popupProps?: Partial<PopupProps>;
    path?: number[];
};

export const DropdownMenuPopup = <T,>({
    items,
    open,
    anchorRef,
    onClose,
    size,
    menuProps,
    children,
    popupProps,
    path = [],
}: DropdownMenuPopupProps<T>) => {
    const {toggle, data} = React.useContext(DropdownMenuContext);

    const {
        activeMenuPath,
        setActiveMenuPath,
        anchorRef: navigationAnchorRef,
    } = React.useContext(DropdownMenuNavigationContext);

    const isSubmenu = path.length > 0;

    const activateParent = React.useCallback(() => {
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [setActiveMenuPath, path]);

    const handleMouseEnter = React.useCallback(() => {
        setActiveMenuPath(path);
    }, [path, setActiveMenuPath]);

    const handleMouseLeave = React.useCallback(() => {
        activateParent();
    }, [activateParent]);

    const handleSelect = React.useCallback(
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

    const handleKeydown = React.useCallback(
        (activeItemIndex: number, event: KeyboardEvent) => {
            switch (event.key) {
                case KeyCode.ESCAPE: {
                    if (isSubmenu) {
                        event.stopPropagation();
                        activateParent?.();
                    }

                    return false;
                }
                case KeyCode.ENTER:
                case KeyCode.SPACEBAR: {
                    const activeItem = items[activeItemIndex];
                    const isSubmenuToggleActive = activeItem?.items;

                    if (isSubmenu || isSubmenuToggleActive) {
                        event.stopPropagation();
                        event.preventDefault();
                    }

                    if (activeItem) {
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

    React.useEffect(() => {
        if (!open) {
            resetNavigation();
        }
    }, [open, resetNavigation]);

    return (
        <Popup
            open={open}
            anchorRef={anchorRef}
            onClose={onClose}
            placement="bottom-start"
            {...popupProps}
        >
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cnDropdownMenu('popup-content')}
            >
                {children || (
                    <Menu className={cnDropdownMenu('menu')} size={size} {...menuProps}>
                        {items.map((item, index) => {
                            const isActive = isNavigationActive && activeItemIndex === index;
                            const activate = () => setActiveItemIndex(index);

                            const isActiveParent =
                                open &&
                                !isActive &&
                                activeMenuPath.length !== 0 &&
                                stringifyNavigationPath(item.path) ===
                                    stringifyNavigationPath(
                                        activeMenuPath.slice(0, item.path.length),
                                    );

                            const extraProps = {
                                ...item.extraProps,
                                onMouseEnter: activate,
                            };

                            return (
                                <DropdownMenuItem
                                    key={index}
                                    size={size}
                                    className={cnDropdownMenu(
                                        'menu-item',
                                        {
                                            separator: isSeparator(item),
                                            'active-parent': isActiveParent,
                                            'with-submenu': Boolean(item.items?.length),
                                        },
                                        item.className,
                                    )}
                                    selected={isActive}
                                    popupProps={popupProps}
                                    closeMenu={onClose}
                                    {...item}
                                    extraProps={extraProps}
                                />
                            );
                        })}
                    </Menu>
                )}
            </div>
        </Popup>
    );
};
