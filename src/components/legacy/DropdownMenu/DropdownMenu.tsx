'use client';

import * as React from 'react';

import {getTabbableOptions} from '@floating-ui/react/utils';
import {Ellipsis} from '@gravity-ui/icons';
import {tabbable} from 'tabbable';

import {useActionHandlers} from '../../../hooks/useActionHandlers';
import {Button} from '../../Button';
import type {ButtonProps} from '../../Button';
import {Icon} from '../../Icon';
import type {PopupProps} from '../../Popup';
import {useDefaultProps} from '../../theme/useDefaultProps';
import type {MenuProps} from '../Menu';

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
    'aria-haspopup': 'menu';
    'aria-expanded': boolean;
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

const DropdownMenu = <T,>(rawProps: DropdownMenuProps<T> | ControlledDropdownMenuProps<T>) => {
    const {
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
    } = useDefaultProps('DropdownMenu', rawProps);
    const anchorRef = React.useRef<HTMLDivElement | null>(null);
    const popupContentRef = React.useRef<HTMLDivElement | null>(null);
    const [focusOnOpen, setFocusOnOpen] = React.useState(false);

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
            setFocusOnOpen(event.type === 'keydown' || event.detail === 0);
            togglePopup();
        },
        [disabled, onSwitcherClick, togglePopup],
    );

    const {onKeyDown: handleSwitcherKeyDown} = useActionHandlers(handleSwitcherClick);

    const switcherProps = React.useMemo<SwitcherProps>(
        () => ({
            'aria-haspopup': 'menu',
            'aria-expanded': isPopupShown,
            onClick: handleSwitcherClick,
            onKeyDown: handleSwitcherKeyDown,
        }),
        [handleSwitcherClick, handleSwitcherKeyDown, isPopupShown],
    );

    return (
        <DropdownMenuContext.Provider value={contextValue}>
            {/* FIXME remove switcher prop and this wrapper */}
            <div
                ref={anchorRef}
                onKeyDownCapture={(event) => {
                    if (
                        !event.defaultPrevented &&
                        !event.altKey &&
                        !event.ctrlKey &&
                        !event.metaKey &&
                        isPopupShown &&
                        (event.key === 'ArrowDown' ||
                            event.key === 'ArrowUp' ||
                            event.key === 'Home' ||
                            event.key === 'End')
                    ) {
                        event.preventDefault();
                        const content = popupContentRef.current;
                        if (content) {
                            const targets = tabbable(content, getTabbableOptions());
                            const index =
                                event.key === 'ArrowUp' || event.key === 'End'
                                    ? targets.length - 1
                                    : 0;
                            targets[index]?.focus({
                                preventScroll: true,
                            });
                        }
                    }
                }}
                className={cnDropdownMenu('switcher-wrapper', switcherWrapperClassName)}
                {...(renderSwitcher
                    ? {}
                    : {onClick: switcherProps.onClick, onKeyDown: switcherProps.onKeyDown})}
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
                        aria-haspopup="menu"
                        aria-expanded={isPopupShown}
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
                    focusOnOpen={focusOnOpen}
                    contentRef={popupContentRef}
                >
                    {children}
                </DropdownMenuPopup>
            </DropdownMenuNavigationContextProvider>
        </DropdownMenuContext.Provider>
    );
};

/** @deprecated Legacy component. Use `Menu` from `@gravity-ui/uikit` instead. */
const DropdownMenuExport = Object.assign(DropdownMenu, {Item: DropdownMenuItemComponent});
/** @deprecated Legacy component. Use `Menu` from `@gravity-ui/uikit` instead. */
export {DropdownMenuExport as DropdownMenu};

export type {DropdownMenuItem, DropdownMenuItemMixed, DropdownMenuItemAction};
