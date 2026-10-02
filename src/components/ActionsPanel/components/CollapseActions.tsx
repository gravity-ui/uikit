'use client';

import * as React from 'react';

import {Ellipsis} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Menu, MenuDivider, MenuItem} from '../../Menu';
import type {MenuItemButtonProps, MenuItemLinkProps} from '../../Menu';
import {block} from '../../utils/cn';
import i18n from '../i18n';
import type {ActionsPanelItem} from '../types';

import {OBSERVER_TARGET_ATTR, useCollapseActions} from './hooks';

import './CollapseActions.scss';

const b = block('actions-panel-collapse');

type Props = {
    actions: ActionsPanelItem[];
    maxRowActions?: number;
};

type DropdownItem = ActionsPanelItem['dropdown']['item'];

function renderMenuItems(items: (DropdownItem | DropdownItem[])[]): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    let previousWasGroup = false;

    items.forEach((entry, index) => {
        const isGroup = Array.isArray(entry);
        const group = (isGroup ? entry : [entry]).filter((item) => !item.hidden);
        if (group.length === 0) return;

        if (nodes.length && (isGroup || previousWasGroup)) {
            nodes.push(<MenuDivider key={`divider-${index}`} />);
        }

        group.forEach((item, itemIndex) => {
            const {
                action,
                contentClassName,
                extraProps,
                iconEnd,
                iconStart,
                items: submenuItems,
                text,
                ...props
            } = item;
            const label = text || ('children' in item ? (item.children as React.ReactNode) : null);
            const content = contentClassName ? (
                <span className={contentClassName}>{label}</span>
            ) : (
                label
            );
            const menuItemProps = {
                ...extraProps,
                className: props.className,
                disabled: props.disabled,
                icon: iconStart ? <React.Fragment>{iconStart}</React.Fragment> : undefined,
                arrow: iconEnd ? <React.Fragment>{iconEnd}</React.Fragment> : undefined,
                qa: props.qa,
                selected: props.selected,
                style: props.style,
                theme: props.theme,
                title: props.title,
                onClick: (event: React.MouseEvent<HTMLElement>) => {
                    extraProps?.onClick?.(
                        event as React.MouseEvent<HTMLDivElement & HTMLAnchorElement>,
                    );
                    action?.(event);
                },
            };
            const submenu = submenuItems && <Menu size="s">{renderMenuItems(submenuItems)}</Menu>;
            const key = `${index}-${itemIndex}`;
            nodes.push(
                typeof props.href === 'string' ? (
                    <MenuItem
                        key={key}
                        {...(menuItemProps as MenuItemLinkProps)}
                        href={props.href}
                        target={props.target}
                        rel={props.rel}
                    >
                        {content}
                        {submenu}
                    </MenuItem>
                ) : (
                    <MenuItem key={key} {...(menuItemProps as MenuItemButtonProps)}>
                        {content}
                        {submenu}
                    </MenuItem>
                ),
            );
        });
        previousWasGroup = isGroup;
    });

    return nodes;
}

export const CollapseActions = ({actions, maxRowActions}: Props) => {
    const {buttonActions, dropdownItems, parentRef, offset, visibilityMap, showDropdown} =
        useCollapseActions(actions, maxRowActions);

    const {t} = i18n.useTranslation();

    return (
        <div className={b()}>
            <div className={b('container')} ref={parentRef}>
                {buttonActions.map((action) => {
                    const {id} = action;
                    const attr = {[OBSERVER_TARGET_ATTR]: id};
                    const invisible = visibilityMap[id] === false;

                    const node = Array.isArray(action.dropdown.item.items) ? (
                        <Menu
                            size="s"
                            trigger={
                                <Button view="flat-contrast" size="m" {...action.button.props} />
                            }
                        >
                            {renderMenuItems(action.dropdown.item.items)}
                        </Menu>
                    ) : (
                        <Button view="flat-contrast" size="m" {...action.button.props} />
                    );
                    return (
                        <div className={b('button-action-wrapper', {invisible})} {...attr} key={id}>
                            {node}
                        </div>
                    );
                })}
            </div>
            {showDropdown && (
                <React.Fragment>
                    <div className={b('menu-placeholder')} />
                    <div className={b('menu-wrapper')} style={{insetInlineStart: offset}}>
                        <Menu
                            size="s"
                            trigger={
                                <Button view="flat-contrast" size="m" aria-label={t('label_more')}>
                                    <Icon data={Ellipsis} />
                                </Button>
                            }
                        >
                            {renderMenuItems(dropdownItems)}
                        </Menu>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
