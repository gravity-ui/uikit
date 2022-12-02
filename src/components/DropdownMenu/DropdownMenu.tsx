import React, {ReactNode, MouseEventHandler, useRef, useCallback, useEffect} from 'react';
import {block} from '../utils/cn';
import {PopupPlacement} from '../Popup';
import {Button, ButtonProps} from '../Button';
import {Icon} from '../Icon';
import {DotsIcon} from '../icons/DotsIcon';
import {useStateWithCallback} from '../utils/useStateWithCallback';
import type {
    DropdownMenuSize,
    DropdownMenuItem,
    DropdownMenuItemMixed,
    DropdownMenuItemAction,
} from './types';
import {DropdownMenuPopup} from './DropdownMenuPopup';
import {MenuProps} from '../Menu';
import './DropdownMenu.scss';

const b = block('dropdown-menu');

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
    onMenuToggle?: () => void;
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
     * Overrides the default dropdown menu popup props.
     */
    menuProps?: MenuProps;
    popupClassName?: string;
    popupPlacement?: PopupPlacement;
    /**
     * Custom content inside the menu popup.
     */
    children?: ReactNode;
};

export const DropdownMenu = <T,>({
    items = [],
    size = 'm',
    icon = <Icon data={DotsIcon} />,
    onMenuToggle,
    hideOnScroll = true,
    data,
    disabled,
    switcher,
    switcherWrapperClassName,
    defaultSwitcherProps,
    defaultSwitcherClassName,
    onSwitcherClick,
    menuProps,
    popupClassName,
    popupPlacement,
    children,
}: DropdownMenuProps<T>) => {
    const [isPopupShown, setPopupShown] = useStateWithCallback(false, onMenuToggle);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const handleSwitcherClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (disabled) {
            return;
        }

        onSwitcherClick?.(event);
        setPopupShown((value) => !value);
    };

    const handleMenuItemClick = useCallback(
        (
            event: React.MouseEvent<HTMLElement, MouseEvent>,
            action: DropdownMenuItemAction<T> | undefined,
        ) => {
            action?.(event, data);
            setPopupShown(false);
        },
        [data, setPopupShown],
    );

    const handleClose = useCallback(() => {
        setPopupShown(false);
    }, [setPopupShown]);

    const handleScroll = useCallback(
        (event: Event) => {
            if ((event.target as Node).contains(anchorRef.current)) {
                setPopupShown(false);
            }
        },
        [setPopupShown],
    );

    useEffect(() => {
        if (!isPopupShown || !hideOnScroll) {
            return;
        }

        document.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [isPopupShown, hideOnScroll, handleScroll]);

    useEffect(() => {
        if (disabled && isPopupShown) {
            setPopupShown(false);
        }
    }, [disabled, isPopupShown, setPopupShown]);

    return (
        <>
            <div
                ref={anchorRef}
                className={b('switcher-wrapper', switcherWrapperClassName)}
                onClick={handleSwitcherClick}
            >
                {switcher || (
                    <Button
                        view="flat"
                        size={size}
                        {...defaultSwitcherProps}
                        className={b('switcher-button', defaultSwitcherClassName)}
                        disabled={disabled}
                    >
                        {icon}
                    </Button>
                )}
            </div>
            <DropdownMenuPopup
                popupClassName={popupClassName}
                items={items}
                open={isPopupShown}
                size={size}
                placement={popupPlacement}
                menuProps={menuProps}
                anchorRef={anchorRef}
                onMenuItemClick={handleMenuItemClick}
                onClose={handleClose}
            >
                {children}
            </DropdownMenuPopup>
        </>
    );
};

export type {DropdownMenuItem, DropdownMenuItemMixed, DropdownMenuItemAction};
