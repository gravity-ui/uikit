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

// TODO: keyboard navigation, Up/Down arrows and Enter
export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(function Menu(
    {size = 'm', children, style, className, qa, ...restProps},
    ref,
) {
    return (
        <ul
            {...filterDOMProps(restProps, {labelable: true})}
            ref={ref}
            role="menu"
            // tabIndex={0}
            style={style}
            className={b({size}, className)}
            data-qa={qa}
        >
            {children}
        </ul>
    );
}) as MenuComponent;

Menu.Item = MenuItem;
Menu.Group = MenuGroup;
