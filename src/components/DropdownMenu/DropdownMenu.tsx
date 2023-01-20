import React, {useRef, useMemo} from 'react';
import type {ReactNode, MouseEventHandler, Dispatch, SetStateAction} from 'react';

import type {PopupProps} from '../Popup';
import {Button} from '../Button';
import type {ButtonProps} from '../Button';
import {Icon} from '../Icon';
import {DotsIcon} from '../icons';
import type {MenuProps} from '../Menu';
import {DropdownMenuNavigationContextProvider} from './DropdownMenuNavigationContext';

import {usePopupVisibility} from './hooks/usePopupVisibility';
import {useScrollHandler} from './hooks/useScrollHandler';
import {toItemList} from './utils/toItemList';
import {dropdownMenuSeparator} from './constants';
import type {
    DropdownMenuSize,
    DropdownMenuItem,
    DropdownMenuItemMixed,
    DropdownMenuItemAction,
    DropdownMenuListItem,
} from './types';
import {cnDropdownMenu} from './DropdownMenu.classname';
import {DropdownMenuPopup} from './DropdownMenuPopup';
import {DropdownMenuContext} from './DropdownMenuContext';
import {DropdownMenuItem as DropdownMenuItemComponent} from './DropdownMenuItem';
import './DropdownMenu.scss';

export type DropdownMenuProps<T> = {
    /**
     * Array of items.
     * Nested arrays of items represent visually separated groups.
     */
    items?: (DropdownMenuItem<T> | DropdownMenuItem<T>[])[];
    /**
     * Switcher icon.
     */
    icon?: ReactNode;
    open?: boolean;
    onOpenToggle?: (open: boolean) => void;
    hideOnScroll?: boolean;
    /**
     * Applied for the switcher and the menu.
     */
    size?: DropdownMenuSize;
    /**
     * A payload passed to the actions called from the menu.
     * (Can be useful for context menus.)
     */
    data?: T;
    /**
     * Setting this prop to `true` disables the switcher button
     * and prevents the menu from being opened.
     */
    disabled?: boolean;
    /**
     * Menu toggle control.
     */
    switcher?: ReactNode;
    switcherWrapperClassName?: string;
    /**
     * Overrides the default switcher button props.
     */
    defaultSwitcherProps?: ButtonProps;
    defaultSwitcherClassName?: string;
    onSwitcherClick?: MouseEventHandler<HTMLElement>;
    /**
     * Overrides the default dropdown menu props.
     */
    menuProps?: Partial<MenuProps>;
    /**
     * Overrides the default dropdown popup props.
     */
    popupProps?: Partial<PopupProps>;
    /**
     * Custom content inside the menu popup.
     */
    children?: ReactNode;
};

export type ControlledDropdownMenuProps<T> = DropdownMenuProps<T> & {
    open: boolean;
    onOpenToggle: Dispatch<SetStateAction<boolean>>;
};

const DropdownMenu = <T,>({
    items = [],
    size = 'm',
    icon = <Icon data={DotsIcon} />,
    open,
    onOpenToggle,
    hideOnScroll = true,
    data,
    disabled,
    switcher,
    switcherWrapperClassName,
    defaultSwitcherProps,
    defaultSwitcherClassName,
    onSwitcherClick,
    menuProps,
    popupProps,
    children,
}: DropdownMenuProps<T> | ControlledDropdownMenuProps<T>) => {
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const {isPopupShown, togglePopup, closePopup} = usePopupVisibility(
        open,
        onOpenToggle,
        disabled,
    );

    useScrollHandler(closePopup, anchorRef, !isPopupShown || !hideOnScroll);

    const contextValue = useMemo(
        () => ({
            toggle: togglePopup,
            data,
        }),
        [data, togglePopup],
    );

    const itemsList = useMemo(
        () =>
            toItemList<DropdownMenuItem<T>, DropdownMenuListItem<T>>(items, dropdownMenuSeparator),
        [items],
    );

    const handleSwitcherClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (disabled) {
            return;
        }

        onSwitcherClick?.(event);
        togglePopup();
    };

    return (
        <DropdownMenuContext.Provider value={contextValue}>
            <div
                ref={anchorRef}
                className={cnDropdownMenu('switcher-wrapper', switcherWrapperClassName)}
                onClick={handleSwitcherClick}
            >
                {switcher || (
                    <Button
                        view="flat"
                        size={size}
                        {...defaultSwitcherProps}
                        className={cnDropdownMenu('switcher-button', defaultSwitcherClassName)}
                        disabled={disabled}
                    >
                        {icon}
                    </Button>
                )}
            </div>
            <DropdownMenuNavigationContextProvider anchorRef={anchorRef} disabled={!isPopupShown}>
                <DropdownMenuPopup
                    items={itemsList}
                    open={isPopupShown}
                    size={size}
                    menuProps={menuProps}
                    anchorRef={anchorRef}
                    onClose={closePopup}
                    popupProps={popupProps}
                >
                    {children}
                </DropdownMenuPopup>
            </DropdownMenuNavigationContextProvider>
        </DropdownMenuContext.Provider>
    );
};

const DropdownMenuExport = Object.assign(DropdownMenu, {Item: DropdownMenuItemComponent});
export {DropdownMenuExport as DropdownMenu};

export type {DropdownMenuItem, DropdownMenuItemMixed, DropdownMenuItemAction};
