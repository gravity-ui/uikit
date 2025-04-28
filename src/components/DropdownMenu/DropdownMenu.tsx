'use client';

import * as React from 'react';

import {Ellipsis} from '@gravity-ui/icons';

import {useActionHandlers} from '../../hooks/useActionHandlers';
import {Button} from '../Button';
import type {ButtonProps} from '../Button';
import {Icon} from '../Icon';
import type {MenuProps} from '../Menu';
import type {PopupProps} from '../Popup';

import {cnDropdownMenu} from './DropdownMenu.classname';
import {DropdownMenuContext} from './DropdownMenuContext';
import {DropdownMenuItem as DropdownMenuItemComponent} from './DropdownMenuItem';
import {DropdownMenuNavigationContextProvider} from './DropdownMenuNavigationContext';
import {DropdownMenuPopup} from './DropdownMenuPopup';
import {dropdownMenuSeparator} from './constants';
import {usePopupVisibility} from './hooks/usePopupVisibility';
import {useScrollHandler} from './hooks/useScrollHandler';
import type {
    DropdownMenuItem,
    DropdownMenuItemAction,
    DropdownMenuItemMixed,
    DropdownMenuListItem,
    DropdownMenuSize,
} from './types';
import {toItemList} from './utils/toItemList';

import './DropdownMenu.scss';

type SwitcherProps = {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
};

export type DropdownMenuProps<T> = {
    /**
     * Array of items.
     * Nested arrays of items represent visually separated groups.
     */
    items?: (DropdownMenuItem<T> | DropdownMenuItem<T>[])[];
    /**
     * Switcher icon.
     */
    icon?: React.ReactNode;
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
     * @deprecated Use renderSwitcher instead
     */
    switcher?: React.ReactNode;
    /**
     * Menu toggle control.
     */
    renderSwitcher?: (props: SwitcherProps) => React.ReactNode;
    switcherWrapperClassName?: string;
    /**
     * Overrides the default switcher button props.
     */
    defaultSwitcherProps?: ButtonProps;
    defaultSwitcherClassName?: string;
    onSwitcherClick?: React.MouseEventHandler<HTMLElement>;
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
    children?: React.ReactNode;
};

export type ControlledDropdownMenuProps<T> = DropdownMenuProps<T> & {
    open: boolean;
    onOpenToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownMenu = <T,>({
    items = [],
    size = 'm',
    icon = <Icon data={Ellipsis} />,
    open,
    onOpenToggle,
    hideOnScroll = true,
    data,
    disabled,
    switcher,
    renderSwitcher,
    switcherWrapperClassName,
    defaultSwitcherProps,
    defaultSwitcherClassName,
    onSwitcherClick,
    menuProps,
    popupProps,
    children,
}: DropdownMenuProps<T> | ControlledDropdownMenuProps<T>) => {
    const anchorRef = React.useRef<HTMLDivElement | null>(null);

    const {isPopupShown, togglePopup, closePopup} = usePopupVisibility(
        open,
        onOpenToggle,
        disabled,
    );

    useScrollHandler(closePopup, anchorRef, !isPopupShown || !hideOnScroll);

    const contextValue = React.useMemo(
        () => ({
            toggle: togglePopup,
            data,
        }),
        [data, togglePopup],
    );

    const itemsList = React.useMemo(
        () =>
            toItemList<DropdownMenuItem<T>, DropdownMenuListItem<T>>(items, dropdownMenuSeparator),
        [items],
    );

    const handleSwitcherClick = React.useCallback<React.MouseEventHandler<HTMLElement>>(
        (event) => {
            if (disabled) {
                return;
            }

            onSwitcherClick?.(event);

            togglePopup();
        },
        [disabled, onSwitcherClick, togglePopup],
    );

    const {onKeyDown: handleSwitcherKeyDown} = useActionHandlers(handleSwitcherClick);

    const switcherProps = React.useMemo<SwitcherProps>(
        () => ({
            onClick: handleSwitcherClick,
            onKeyDown: handleSwitcherKeyDown,
        }),
        [handleSwitcherClick, handleSwitcherKeyDown],
    );

    return (
        <DropdownMenuContext.Provider value={contextValue}>
            {/* FIXME remove switcher prop and this wrapper */}
            <div
                ref={anchorRef}
                className={cnDropdownMenu('switcher-wrapper', switcherWrapperClassName)}
                {...(renderSwitcher ? {} : switcherProps)}
            >
                {renderSwitcher?.(switcherProps) || switcher || (
                    <Button
                        view="flat"
                        size={size}
                        // FIXME remove switcher prop and uncomment onClick handler
                        // onClick={handleSwitcherClick}
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
