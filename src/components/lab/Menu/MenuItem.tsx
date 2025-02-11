import * as React from 'react';

import {useFloatingTree, useListItem} from '@floating-ui/react';
import {ChevronLeft, ChevronRight} from '@gravity-ui/icons';

import {useForkRef} from '../../../hooks';
import {BUTTON_ICON_SIZE_MAP} from '../../Button/constants';
import {Icon} from '../../Icon';
import {useDirection} from '../../theme';
import {block} from '../../utils/cn';

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
    return p.component !== undefined;
}

const b = block('menu2-item');

export const MenuItem = React.forwardRef(
    <T extends MenuItemComponentElementType>(
        props: MenuItemProps<T>,
        ref:
            | React.Ref<HTMLButtonElement>
            | React.Ref<HTMLAnchorElement>
            | React.Ref<T extends string ? React.ComponentRef<T> : T>,
    ) => {
        const {
            selected = false,
            disabled = false,
            icon,
            arrow,
            children,
            className,
            qa,
            ...rest
        } = props;
        const [hasFocusInside, setHasFocusInside] = React.useState(false);

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

        let content: React.ReactElement<MenuItemProps>;
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

        const commonProps = {
            role: 'menuitem',
            tabIndex,
            className: b(
                {
                    size: menuContext.size,
                    active: isActive,
                    selected,
                    disabled,
                    'has-focus-inside': hasFocusInside,
                },
                className,
            ),
            'data-qa': qa,
            ...menuContext.getItemProps({
                ...rest,
                onClick: handleClick,
                onFocus: handleFocus,
            }),
        };

        if (isMenuItemComponentProps(props)) {
            content = React.createElement(
                props.component,
                {
                    ...rest,
                    ...commonProps,
                    ref: handleRef,
                    'aria-disabled': disabled ?? undefined,
                },
                preparedChildren,
            );
        } else if (typeof props.href !== 'undefined') {
            content = (
                <a
                    {...(rest as Pick<typeof props, keyof typeof rest>)}
                    {...commonProps}
                    ref={handleRef as React.Ref<HTMLAnchorElement>}
                    rel={props.target === '_blank' && !rest.rel ? 'noopener noreferrer' : rest.rel}
                    aria-disabled={disabled ?? undefined}
                >
                    {preparedChildren}
                </a>
            );
        } else {
            content = (
                <button
                    {...(rest as Pick<typeof props, keyof typeof rest>)}
                    {...commonProps}
                    ref={handleRef as React.Ref<HTMLButtonElement>}
                    type="button"
                    disabled={disabled}
                    aria-pressed={selected}
                >
                    {preparedChildren}
                </button>
            );
        }

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
                        trigger: content,
                        onOpenChange: (open, event, reason) => {
                            submenu.props.onOpenChange?.(open, event, reason);

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
    props: P extends {component: Exclude<T, undefined>}
        ? MenuItemComponentProps<Exclude<T, undefined>> & {
              ref?: React.Ref<T extends string ? React.ComponentRef<T> : T>;
          }
        : P extends {href: string}
          ? MenuItemLinkProps & {ref?: React.Ref<HTMLAnchorElement>}
          : MenuItemButtonProps & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement) & {displayName?: string};

MenuItem.displayName = 'Menu.Item';
