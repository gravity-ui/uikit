'use client';
import * as React from 'react';

import {useFloatingTree, useListItem} from '@floating-ui/react';
import {ChevronLeft, ChevronRight} from '@gravity-ui/icons';

import {mergeRefs, useForkRef} from '../../../hooks';
import {BUTTON_ICON_SIZE_MAP} from '../../Button/constants';
import {Icon} from '../../Icon';
import {useDirection} from '../../theme';
import {block} from '../../utils/cn';
import {getLinkRelWithFallback} from '../../utils/getLinkRelWithFallback';
import {mergeProps} from '../../utils/mergeProps';
import type {PolymorphicOverloadProps} from '../../utils/polymorphic';
import {isPolymorphicComponentProps, isPolymorphicLinkProps} from '../../utils/polymorphic';
import {ListItemView} from '../ListItemView/ListItemView';
import type {ListItemViewProps} from '../ListItemView/ListItemView';

import {MenuContext} from './MenuContext';
import {MenuItemContext} from './MenuItemContext';
import type {
    MenuItemButtonProps,
    MenuItemComponentElementType,
    MenuItemComponentProps,
    MenuItemLinkProps,
    MenuItemProps,
    MenuProps,
} from './types';
import {isComponentType} from './utils';

import './MenuItem.scss';

function isMenuItemComponentProps<T extends MenuItemComponentElementType>(
    p: MenuItemProps<T>,
): p is MenuItemComponentProps<Exclude<T, undefined>> {
    return isPolymorphicComponentProps<
        MenuItemProps<T>,
        MenuItemComponentProps<Exclude<T, undefined>>
    >(p);
}

function isMenuItemLinkProps<T extends MenuItemComponentElementType>(
    p: MenuItemProps<T>,
): p is MenuItemLinkProps {
    return isPolymorphicLinkProps<MenuItemProps<T>, MenuItemLinkProps>(p);
}

const b = block('lab-menu-item');

export const MenuItem = React.forwardRef(
    <T extends MenuItemComponentElementType>(
        props: MenuItemProps<T>,
        ref:
            | React.Ref<HTMLButtonElement>
            | React.Ref<HTMLAnchorElement>
            | React.Ref<T extends string ? React.ComponentRef<T> : T>,
    ) => {
        const {
            theme,
            selected,
            disabled,
            icon,
            arrow,
            children,
            className,
            qa,
            component: _component,
            ...restComponentProps
        } = props;
        const [submenuOpen, setSubmenuOpen] = React.useState(false);
        const [hasFocusInside, setHasFocusInside] = React.useState(false);
        const [isHovered, setIsHovered] = React.useState(false);

        const isRTL = useDirection() === 'rtl';

        const menuContext = React.useContext(MenuContext);
        const menuItemContext = React.useContext(MenuItemContext);

        if (!menuContext) {
            throw new Error('<MenuItem> must be used within <Menu>');
        }

        const item = useListItem();
        const tree = useFloatingTree();
        const isActive = item.index === menuContext.activeIndex;
        const tabIndex = (menuContext.inline && item.index === 0) || isActive ? 0 : -1;

        let submenu: React.ReactElement<MenuProps> | null = null;
        const preparedChildren: React.ReactNode[] = [];

        if (icon) {
            preparedChildren.push(
                <div key="icon" className={b('icon')} aria-hidden>
                    {icon}
                </div>,
            );
        }

        for (const child of React.Children.toArray(children)) {
            if (!menuContext.inline && isComponentType(child, 'Menu')) {
                submenu = child;
            } else {
                preparedChildren.push(child);
            }
        }

        if (arrow || submenu) {
            preparedChildren.push(
                <div key="arrow" className={b('arrow')} aria-hidden>
                    {arrow ? (
                        arrow
                    ) : (
                        <Icon
                            data={isRTL ? ChevronLeft : ChevronRight}
                            size={BUTTON_ICON_SIZE_MAP[menuContext.size]}
                        />
                    )}
                </div>,
            );
        }

        const handleRef = useForkRef(ref as any, item.ref);

        const handleClick = (event: React.MouseEvent) => {
            props.onClick?.(event);

            if (!submenu) {
                tree?.events.emit('click');
            }
        };
        const handleFocus = (event: React.FocusEvent) => {
            props.onFocus?.(event);
            setHasFocusInside(false);
            menuItemContext?.setHasFocusInside(true);
        };
        const handlePointerEnter = (event: React.PointerEvent) => {
            props.onPointerEnter?.(event);
            setIsHovered(true);
        };
        const handlePointerLeave = (event: React.PointerEvent) => {
            props.onPointerLeave?.(event);
            setIsHovered(false);
        };

        let component: React.ElementType;
        let componentProps: React.ComponentPropsWithoutRef<typeof component>;
        const commonComponentProps = menuContext.getItemProps({
            'data-qa': qa,
            ...restComponentProps,
            role: 'menuitem',
            tabIndex,
            className: b(
                {
                    theme,
                    size: menuContext.size,
                },
                className,
            ),
            onClick: handleClick,
            onFocus: handleFocus,
            onPointerEnter: handlePointerEnter,
            onPointerLeave: handlePointerLeave,
        } as React.HTMLProps<HTMLElement>);

        if (isMenuItemComponentProps(props)) {
            component = props.component;
            componentProps = {
                ...commonComponentProps,
                'aria-disabled': disabled ?? undefined,
            };
        } else if (isMenuItemLinkProps(props)) {
            component = 'a';
            componentProps = {
                ...commonComponentProps,
                rel: getLinkRelWithFallback(props),
                'aria-disabled': disabled ?? undefined,
            } satisfies React.ComponentProps<'a'>;
        } else {
            component = 'button';
            componentProps = {
                ...commonComponentProps,
                type: 'button',
                disabled,
                'aria-disabled': disabled ?? undefined,
                'aria-pressed': selected ?? undefined,
            } satisfies React.ComponentProps<'button'>;
        }

        const content = (
            <ListItemView
                isContainer
                component={component}
                componentProps={componentProps}
                ref={handleRef}
                size={menuContext.size}
                disabled={disabled}
                active={isActive && !hasFocusInside && !isHovered}
                hovered={hasFocusInside || (!isActive && submenuOpen) || isHovered}
                selected={selected}
                selectionStyle="highlight"
            >
                {preparedChildren}
            </ListItemView>
        );

        const contextValue = React.useMemo(
            () => ({
                setHasFocusInside,
            }),
            [],
        );

        if (submenu) {
            return (
                <MenuItemContext.Provider value={contextValue}>
                    {React.cloneElement<MenuProps>(submenu, {
                        trigger: (triggerProps, triggerRef) => {
                            return React.cloneElement<
                                ListItemViewProps & {ref?: React.Ref<unknown>}
                            >(content, {
                                ref: mergeRefs(triggerRef, handleRef),
                                componentProps: mergeProps(triggerProps, componentProps),
                            });
                        },
                        onOpenChange: (open, event, reason) => {
                            submenu.props.onOpenChange?.(open, event, reason);
                            setSubmenuOpen(open);

                            if (!open) {
                                setHasFocusInside(false);
                            }
                        },
                    })}
                </MenuItemContext.Provider>
            );
        }

        return content;
    },
) as (<T extends MenuItemComponentElementType, P extends MenuItemProps<T>>(
    props: PolymorphicOverloadProps<
        T,
        P,
        MenuItemComponentProps<Exclude<T, undefined>>,
        MenuItemLinkProps,
        MenuItemButtonProps
    >,
) => React.ReactElement) & {displayName?: string};

MenuItem.displayName = 'Menu.Item';
