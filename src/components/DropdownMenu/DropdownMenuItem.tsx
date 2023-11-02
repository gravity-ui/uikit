import React from 'react';

import {ChevronRight} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {Menu} from '../Menu';
import type {PopupProps} from '../Popup';

import {cnDropdownMenu} from './DropdownMenu.classname';
import {DropdownMenuContext} from './DropdownMenuContext';
import {DropdownMenuPopup} from './DropdownMenuPopup';
import {subMenuPlacement} from './constants';
import {useSubmenu} from './hooks/useSubmenu';
import type {DropdownMenuListItem} from './types';

export type DropdownMenuItemProps<T> = Omit<DropdownMenuListItem<T>, 'path'> & {
    popupProps?: Partial<PopupProps>;
    closeMenu?: () => void;
    children?: React.ReactNode;
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
    const {toggle, data} = React.useContext(DropdownMenuContext);
    const menuItemRef = React.useRef(null);

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

    const iconEnd = hasSubmenu ? (
        <Icon data={ChevronRight} size={10} className={cnDropdownMenu('sub-menu-arrow')} />
    ) : (
        props.iconEnd
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
