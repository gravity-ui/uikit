'use client';

import * as React from 'react';

import {ChevronLeft, ChevronRight} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {Menu} from '../Menu';
import type {PopupPlacement, PopupProps} from '../Popup';
import {useDirection} from '../theme';

import {cnDropdownMenu} from './DropdownMenu.classname';
import {DropdownMenuContext} from './DropdownMenuContext';
import {DropdownMenuPopup} from './DropdownMenuPopup';
import {useSubmenu} from './hooks/useSubmenu';
import type {DropdownMenuListItem, DropdownMenuSize} from './types';

export type DropdownMenuItemProps<T> = Omit<DropdownMenuListItem<T>, 'path'> & {
    popupProps?: Partial<PopupProps>;
    closeMenu?: () => void;
    children?: React.ReactNode;
    path?: number[];
    size?: DropdownMenuSize;
};

export const DropdownMenuItem = <T,>({
    text,
    action,
    items: subMenuItems,
    popupProps,
    closeMenu,
    children,
    path,
    size,
    ...props
}: DropdownMenuItemProps<T>) => {
    const {toggle, data} = React.useContext(DropdownMenuContext);
    const menuItemRef = React.useRef(null);
    const direction = useDirection();

    const {hasSubmenu, isSubmenuOpen, closeSubmenu, openSubmenu} = useSubmenu({
        items: subMenuItems,
        path,
    });

    const handleCloseMenu = React.useCallback(() => {
        const close = () => {
            if (closeMenu) {
                closeMenu();
            } else {
                toggle(false);
            }
        };

        if (hasSubmenu) {
            closeSubmenu();
            // Wait for submenu to close
            requestAnimationFrame(close);
        } else {
            close();
        }
    }, [closeMenu, closeSubmenu, hasSubmenu, toggle]);

    const handleMenuItemClick = React.useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            if (hasSubmenu) {
                return;
            }

            action?.(event, data as unknown as T);
            handleCloseMenu();
        },
        [action, data, handleCloseMenu, hasSubmenu],
    );

    const extraProps = React.useMemo(() => {
        return {
            ...props.extraProps,
            onMouseEnter: (
                event: React.MouseEvent<HTMLDivElement, MouseEvent> &
                    React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            ) => {
                props.extraProps?.onMouseEnter?.(event);
                if (hasSubmenu) {
                    openSubmenu();
                }
            },
            onMouseLeave: (
                event: React.MouseEvent<HTMLDivElement, MouseEvent> &
                    React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            ) => {
                props.extraProps?.onMouseLeave?.(event);
                if (hasSubmenu) {
                    closeSubmenu();
                }
            },
        };
    }, [props.extraProps, closeSubmenu, hasSubmenu, openSubmenu]);

    const subMenuPlacement = React.useMemo<PopupPlacement>(
        () => (direction === 'rtl' ? ['left-start', 'right-start'] : ['right-start', 'left-start']),
        [direction],
    );

    const iconEnd = React.useMemo(
        () =>
            hasSubmenu ? (
                <Icon
                    data={direction === 'rtl' ? ChevronLeft : ChevronRight}
                    size={10}
                    className={cnDropdownMenu('sub-menu-arrow')}
                />
            ) : (
                props.iconEnd
            ),
        [hasSubmenu, direction, props.iconEnd],
    );

    return (
        <React.Fragment>
            <Menu.Item
                ref={menuItemRef}
                {...props}
                extraProps={extraProps}
                onClick={handleMenuItemClick}
                iconEnd={iconEnd}
            >
                {text || children}
            </Menu.Item>
            {hasSubmenu && subMenuItems && (
                <DropdownMenuPopup
                    popupProps={{
                        ...popupProps,
                        className: cnDropdownMenu('sub-menu', popupProps?.className),
                        placement: subMenuPlacement,
                    }}
                    size={size}
                    items={subMenuItems}
                    path={path}
                    open={isSubmenuOpen}
                    anchorRef={menuItemRef}
                    onClose={handleCloseMenu}
                />
            )}
        </React.Fragment>
    );
};
