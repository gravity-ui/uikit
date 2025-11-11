'use client';

import * as React from 'react';

import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {MenuGroup} from './MenuGroup';
import type {MenuGroupProps} from './MenuGroup';
import {MenuItem} from './MenuItem';
import type {MenuItemProps} from './MenuItem';

import './Menu.scss';

const b = block('menu');

export type MenuSize = 's' | 'm' | 'l' | 'xl';

export interface MenuProps extends AriaLabelingProps, DOMProps, QAProps {
    size?: MenuSize;
    children?: React.ReactNode;
}

export type {MenuItemProps, MenuGroupProps};

interface MenuComponent
    extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLUListElement>> {
    Item: typeof MenuItem;
    Group: typeof MenuGroup;
}

export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(function Menu(
    {size = 'm', children, style, className, qa, ...restProps},
    ref,
) {
    const innerRef = React.useRef<HTMLUListElement>(null);
    const menuRef = (ref as React.RefObject<HTMLUListElement>) || innerRef;

    const getMenuItems = React.useCallback(() => {
        if (!menuRef.current) return [];

        const items = Array.from(
            menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]'),
        );

        return items.filter((item) => {
            const tabIndex = item.getAttribute('tabindex');
            return tabIndex !== '-1';
        });
    }, [menuRef]);

    const focusItem = React.useCallback(
        (index: number) => {
            const items = getMenuItems();
            if (items[index]) {
                items[index].focus();
            }
        },
        [getMenuItems],
    );

    const getCurrentItemIndex = React.useCallback(() => {
        const items = getMenuItems();
        const activeElement = document.activeElement;
        return items.findIndex((item) => item === activeElement);
    }, [getMenuItems]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLUListElement>) => {
            const items = getMenuItems();
            if (items.length === 0) return;

            const currentIndex = getCurrentItemIndex();

            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    if (currentIndex === -1) {
                        focusItem(0);
                    } else {
                        const nextIndex = (currentIndex + 1) % items.length;
                        focusItem(nextIndex);
                    }
                    break;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    if (currentIndex === -1) {
                        focusItem(items.length - 1);
                    } else {
                        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
                        focusItem(prevIndex);
                    }
                    break;
                }
                case 'Home': {
                    event.preventDefault();
                    focusItem(0);
                    break;
                }
                case 'End': {
                    event.preventDefault();
                    focusItem(items.length - 1);
                    break;
                }
            }
        },
        [getMenuItems, getCurrentItemIndex, focusItem],
    );

    return (
        <ul
            {...filterDOMProps(restProps, {labelable: true})}
            ref={menuRef}
            role="menu"
            tabIndex={0}
            style={style}
            className={b({size}, className)}
            data-qa={qa}
            onKeyDown={handleKeyDown}
        >
            {children}
        </ul>
    );
}) as MenuComponent;

Menu.Item = MenuItem;
Menu.Group = MenuGroup;
