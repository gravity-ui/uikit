'use client';

import * as React from 'react';

import {ChevronLeft, ChevronRight} from '@gravity-ui/icons';

import {useForkRef, useUniqId} from '../../../hooks';
import {Icon} from '../../Icon';
import type {PopupPlacement, PopupProps} from '../../Popup';
import {useDirection} from '../../theme';
import {Menu} from '../Menu';

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
    itemRef?: React.Ref<HTMLElement>;
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
    itemRef,
    ...props
}: DropdownMenuItemProps<T>) => {
    const {toggle, data} = React.useContext(DropdownMenuContext);
    const menuItemRef = React.useRef(null);
    const handleRef = useForkRef(menuItemRef, itemRef);
    const generatedSubmenuId = useUniqId();
    const submenuId = popupProps?.id ?? generatedSubmenuId;
    const [focusOnOpen, setFocusOnOpen] = React.useState(false);
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
        (
            event: React.MouseEvent<HTMLElement, MouseEvent> &
                React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ) => {
            props.extraProps?.onClick?.(
                event as React.MouseEvent<HTMLDivElement, MouseEvent> &
                    React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            );

            if (hasSubmenu) {
                if (event.detail === 0) {
                    event.preventDefault();
                }
                if (isSubmenuOpen) {
                    closeSubmenu();
                } else {
                    setFocusOnOpen(true);
                    openSubmenu();
                }

                return;
            }

            action?.(event, data as unknown as T);
            handleCloseMenu();
        },
        [
            action,
            data,
            handleCloseMenu,
            hasSubmenu,
            isSubmenuOpen,
            openSubmenu,
            closeSubmenu,
            props.extraProps,
        ],
    );

    const extraProps = React.useMemo(() => {
        return {
            ...props.extraProps,
            ...(hasSubmenu
                ? {
                      'aria-haspopup': 'menu' as const,
                      'aria-expanded': isSubmenuOpen,
                      'aria-controls': isSubmenuOpen ? submenuId : undefined,
                  }
                : {}),
            onMouseEnter: (
                event: React.MouseEvent<HTMLDivElement, MouseEvent> &
                    React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            ) => {
                props.extraProps?.onMouseEnter?.(event);
                if (hasSubmenu) {
                    setFocusOnOpen(false);
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
    }, [props.extraProps, closeSubmenu, hasSubmenu, isSubmenuOpen, openSubmenu, submenuId]);

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
                ref={handleRef}
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
                        id: submenuId,
                        className: cnDropdownMenu('sub-menu', popupProps?.className),
                        placement: subMenuPlacement,
                    }}
                    size={size}
                    items={subMenuItems}
                    path={path}
                    open={isSubmenuOpen}
                    anchorRef={menuItemRef}
                    onClose={handleCloseMenu}
                    focusOnOpen={focusOnOpen}
                />
            )}
        </React.Fragment>
    );
};
