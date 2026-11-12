'use client';

import * as React from 'react';

import {getTabbableOptions} from '@floating-ui/react/utils';
import {focusable, tabbable} from 'tabbable';

import {KeyCode} from '../../../constants';
import {useForkRef, useLayoutEffect} from '../../../hooks';
import {moveBack} from '../../../hooks/useListNavigation/moveBack';
import {moveForward} from '../../../hooks/useListNavigation/moveForward';
import type {PopupProps} from '../../Popup';
import {Popup} from '../../Popup';
import {useDirection} from '../../theme';
import type {MenuProps} from '../Menu';
import {Menu} from '../Menu';

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
    anchorRef: React.RefObject<HTMLDivElement | null>;
    onClose?: () => void;
    size?: DropdownMenuSize;
    menuProps?: MenuProps;
    children?: React.ReactNode;
    popupProps?: Partial<PopupProps>;
    path?: number[];
    focusOnOpen?: boolean;
    contentRef?: React.Ref<HTMLDivElement>;
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
    focusOnOpen = false,
    contentRef,
}: DropdownMenuPopupProps<T>) => {
    const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => setAnchorElement(anchorRef.current), [anchorRef]);

    const {toggle} = React.useContext(DropdownMenuContext);
    const navigation = React.useContext(DropdownMenuNavigationContext);
    const {activeMenuPath, setActiveMenuPath, anchorRef: navigationAnchorRef} = navigation;
    const [menuContainer, setMenuContainer] = React.useState<HTMLDivElement | null>(null);
    const handleContentRef = useForkRef(setMenuContainer, contentRef);
    const [popupContainer, setPopupContainer] = React.useState<HTMLDivElement | null>(null);
    const handleFloatingRef = useForkRef(setPopupContainer, popupProps?.floatingRef);
    const [activeItemIndex, setActiveItemIndex] = React.useState(-1);
    const itemRefs = React.useRef<Array<HTMLElement | null>>([]);
    const menuRef = React.useRef<HTMLUListElement>(null);
    const isRTL = useDirection() === 'rtl';
    const isSubmenu = path.length > 0;
    const initialFocus = popupProps?.initialFocus ?? (focusOnOpen ? 0 : undefined);
    const initialFocusHandled = React.useRef(false);

    useLayoutEffect(() => {
        if (!open) {
            initialFocusHandled.current = false;
            return;
        }
        if (!menuContainer || initialFocusHandled.current) {
            return;
        }
        initialFocusHandled.current = true;
        if (initialFocus === undefined || (typeof initialFocus === 'number' && initialFocus < 0)) {
            return;
        }
        const target =
            typeof initialFocus === 'number'
                ? tabbable(menuContainer, getTabbableOptions())[initialFocus]
                : initialFocus.current;
        // Focusing a menu item must not scroll an ancestor and trigger hideOnScroll.
        if (
            !menuContainer.contains(document.activeElement) &&
            (!popupProps?.focusOrder ||
                (popupProps.focusOrder.length === 1 && popupProps.focusOrder[0] === 'content'))
        ) {
            (target ?? menuContainer).focus({preventScroll: true});
        }
    }, [open, menuContainer, initialFocus, popupProps?.focusOrder]);

    const activateParent = React.useCallback(() => {
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [setActiveMenuPath, path]);

    const getNavigationTargets = React.useCallback(() => {
        return items.flatMap((item, index) => {
            const element = itemRefs.current[index]?.firstElementChild;
            if (!(element instanceof HTMLElement) || isSeparator(item)) {
                return [];
            }
            const controls = focusable(element, getTabbableOptions());
            return [...(shouldSkipItemNavigation(item) ? [] : [element]), ...controls];
        });
    }, [items]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
            !(event.target instanceof HTMLElement) ||
            (event.target !== menuContainer &&
                event.target.closest('[role="menu"]') !== menuRef.current) ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.defaultPrevented
        ) {
            return;
        }

        if (event.key === KeyCode.TAB) {
            event.stopPropagation();
            if (event.shiftKey) {
                event.preventDefault();
            }
            toggle(false);
            const trigger = navigationAnchorRef.current;
            if (trigger) {
                focusable(trigger, getTabbableOptions())[0]?.focus({preventScroll: true});
            }
            return;
        }

        if (
            event.key !== KeyCode.ESCAPE &&
            (event.target.matches('input, textarea, select') || event.target.isContentEditable)
        ) {
            return;
        }

        if (
            isSubmenu &&
            (event.key === KeyCode.ESCAPE ||
                event.key === (isRTL ? KeyCode.ARROW_RIGHT : KeyCode.ARROW_LEFT))
        ) {
            event.preventDefault();
            event.stopPropagation();
            activateParent();
            if (anchorRef.current) {
                focusable(anchorRef.current, getTabbableOptions())[0]?.focus({preventScroll: true});
            }
            return;
        }

        if (
            event.key === (isRTL ? KeyCode.ARROW_LEFT : KeyCode.ARROW_RIGHT) &&
            event.target.getAttribute('aria-haspopup') === 'menu'
        ) {
            event.preventDefault();
            event.stopPropagation();
            const submenu = document.getElementById(
                event.target.getAttribute('aria-controls') || '',
            );
            if (submenu) {
                tabbable(submenu, getTabbableOptions())[0]?.focus({preventScroll: true});
            } else {
                event.target.click();
            }
            return;
        }

        const targets = getNavigationTargets();
        if (!targets.length) {
            return;
        }
        const currentIndex = targets.indexOf(event.target);
        let nextIndex;
        switch (event.key) {
            case KeyCode.ARROW_DOWN:
                nextIndex = moveForward(targets, currentIndex);
                break;
            case KeyCode.ARROW_UP:
                nextIndex = moveBack(targets, currentIndex < 0 ? 0 : currentIndex);
                break;
            case KeyCode.HOME:
                nextIndex = 0;
                break;
            case KeyCode.END:
                nextIndex = targets.length - 1;
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
        targets[nextIndex]?.focus({preventScroll: true});
    };

    React.useEffect(() => {
        if (!open) {
            setActiveItemIndex(-1);
        }
    }, [open]);

    const isNavigationActive =
        open && stringifyNavigationPath(path) === stringifyNavigationPath(activeMenuPath);
    const contextValue = React.useMemo(
        () => ({...navigation, popupContainer}),
        [navigation, popupContainer],
    );

    return (
        <Popup
            open={open}
            anchorElement={anchorElement}
            placement="bottom-start"
            initialFocus={initialFocus}
            disableFocusOut={isSubmenu}
            container={navigation.popupContainer ?? undefined}
            {...popupProps}
            onOpenChange={(isOpen, event, reason) => {
                popupProps?.onOpenChange?.(isOpen, event, reason);
                if (!isOpen) onClose?.();
            }}
            floatingRef={handleFloatingRef}
        >
            <DropdownMenuNavigationContext.Provider value={contextValue}>
                <div
                    ref={handleContentRef}
                    role="presentation"
                    onMouseEnter={() => setActiveMenuPath(path)}
                    onMouseLeave={activateParent}
                    onFocusCapture={(event) => {
                        const target = event.target as HTMLElement;
                        if (
                            !popupContainer ||
                            !popupContainer.contains(target) ||
                            target.closest('[role="menu"]') !== menuRef.current
                        ) {
                            return;
                        }
                        // Scroll only within this popup so hideOnScroll does not close the menu.
                        let container = target.parentElement;
                        while (container && container !== popupContainer) {
                            if (
                                container.scrollHeight > container.clientHeight &&
                                /auto|scroll|hidden/.test(getComputedStyle(container).overflowY)
                            ) {
                                const targetRect = target.getBoundingClientRect();
                                const top =
                                    container.getBoundingClientRect().top + container.clientTop;
                                const bottom = top + container.clientHeight;
                                if (targetRect.bottom > bottom) {
                                    container.scrollTop += targetRect.bottom - bottom;
                                } else if (targetRect.top < top) {
                                    container.scrollTop += targetRect.top - top;
                                }
                            }
                            container = container.parentElement;
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    tabIndex={-1}
                    className={cnDropdownMenu('popup-content')}
                >
                    {children || (
                        <Menu
                            ref={menuRef}
                            className={cnDropdownMenu('menu')}
                            size={size}
                            {...menuProps}
                        >
                            {items.map((item, index) => {
                                const separator = isSeparator(item);
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
                                    ...(separator ? {role: 'separator', 'aria-hidden': true} : {}),
                                    onClick: separator ? undefined : activate,
                                    onMouseEnter: separator
                                        ? undefined
                                        : (
                                              event: React.MouseEvent<
                                                  HTMLDivElement & HTMLAnchorElement
                                              >,
                                          ) => {
                                              activate();
                                              const activeElement =
                                                  event.currentTarget.ownerDocument.activeElement;
                                              if (
                                                  !shouldSkipItemNavigation(item) &&
                                                  (popupContainer?.contains(activeElement) ||
                                                      navigationAnchorRef.current?.contains(
                                                          activeElement,
                                                      )) &&
                                                  !event.currentTarget.contains(activeElement)
                                              ) {
                                                  event.currentTarget.focus({preventScroll: true});
                                              }
                                          },
                                    onFocus: (
                                        event: React.FocusEvent<HTMLDivElement & HTMLAnchorElement>,
                                    ) => {
                                        item.extraProps?.onFocus?.(event);
                                        if (
                                            (event.target as HTMLElement).closest(
                                                '[role="menu"]',
                                            ) === menuRef.current
                                        ) {
                                            activate();
                                            if (
                                                !item.path.every(
                                                    (part, position) =>
                                                        activeMenuPath[position] === part,
                                                )
                                            ) {
                                                setActiveMenuPath(path);
                                            }
                                        }
                                    },
                                    onKeyDown: (
                                        event: React.KeyboardEvent<
                                            HTMLDivElement & HTMLAnchorElement
                                        >,
                                    ) => {
                                        item.extraProps?.onKeyDown?.(event);
                                        if (
                                            event.defaultPrevented ||
                                            event.target !== event.currentTarget ||
                                            item.disabled
                                        )
                                            return;
                                        if (
                                            event.key === KeyCode.SPACEBAR ||
                                            (event.key === KeyCode.ENTER && !item.href)
                                        ) {
                                            event.preventDefault();
                                            event.currentTarget.click();
                                        }
                                    },
                                };

                                return (
                                    <DropdownMenuItem
                                        key={index}
                                        itemRef={(element) => {
                                            itemRefs.current[index] = element;
                                        }}
                                        size={size}
                                        className={cnDropdownMenu(
                                            'menu-item',
                                            {
                                                separator,
                                                'active-parent': isActiveParent,
                                                'with-submenu': Boolean(item.items?.length),
                                            },
                                            item.className,
                                        )}
                                        selected={isActive}
                                        popupProps={popupProps && {...popupProps, id: undefined}}
                                        closeMenu={onClose}
                                        {...item}
                                        disabled={separator || item.disabled}
                                        extraProps={extraProps}
                                    />
                                );
                            })}
                        </Menu>
                    )}
                </div>
            </DropdownMenuNavigationContext.Provider>
        </Popup>
    );
};
