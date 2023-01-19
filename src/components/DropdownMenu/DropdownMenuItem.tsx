import React, {useRef, useCallback, useContext, useMemo} from 'react';
import type {ReactNode} from 'react';
import type {PopupProps} from '../Popup';

import {Icon} from '../Icon';
import {Menu} from '../Menu';
import {Chevron} from '../icons';

import {subMenuPlacement} from './constants';
import {useSubmenu} from './hooks/useSubmenu';
import type {DropdownMenuListItem} from './types';
import {cnDropdownMenu} from './DropdownMenu.classname';
import {DropdownMenuPopup} from './DropdownMenuPopup';
import {DropdownMenuContext} from './DropdownMenuContext';

export type DropdownMenuItemProps<T> = DropdownMenuListItem<T> & {
    popupProps?: Partial<PopupProps>;
    closeMenu?: () => void;
    children?: ReactNode;
    path?: number[];
};

export const DropdownMenuItem = <T,>({
    text,
    action,
    items: subMenuItems,
    popupProps,
    closeMenu,
    children,
    path,
    ...props
}: DropdownMenuItemProps<T>) => {
    const {toggle, data} = useContext(DropdownMenuContext);
    const menuItemRef = useRef(null);

    const {hasSubmenu, isSubmenuOpen, closeSubmenu, openSubmenu} = useSubmenu({
        items: subMenuItems,
        path,
    });

    const handleCloseMenu = useCallback(() => {
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

    const handleMenuItemClick = useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            if (hasSubmenu) {
                return;
            }

            action?.(event, data as unknown as T);
            handleCloseMenu();
        },
        [action, data, handleCloseMenu, hasSubmenu],
    );

    const extraProps = useMemo(() => {
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

    return (
        <>
            <Menu.Item
                ref={menuItemRef}
                {...props}
                extraProps={extraProps}
                onClick={handleMenuItemClick}
            >
                <div className={cnDropdownMenu('menu-item-content')}>
                    <div>{text || children}</div>
                    {hasSubmenu && (
                        <Icon
                            data={Chevron}
                            className={cnDropdownMenu('menu-item-chevron')}
                            size={8}
                        />
                    )}
                </div>
            </Menu.Item>
            {hasSubmenu && subMenuItems && (
                <DropdownMenuPopup
                    popupProps={{
                        ...popupProps,
                        className: cnDropdownMenu('sub-menu', popupProps?.className),
                        placement: subMenuPlacement,
                    }}
                    items={subMenuItems}
                    path={path}
                    open={isSubmenuOpen}
                    anchorRef={menuItemRef}
                    onClose={handleCloseMenu}
                />
            )}
        </>
    );
};
