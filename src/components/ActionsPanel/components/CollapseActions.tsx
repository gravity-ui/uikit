'use client';

import * as React from 'react';

import {Ellipsis} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Menu, MenuDivider, MenuItem} from '../../Menu';
import {isComponentType} from '../../Menu/utils';
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

type DropdownItem = ActionsPanelItem['menu']['item'];

function renderMenuItems(items: (DropdownItem | DropdownItem[])[]): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    let previousWasGroup = false;

    items.forEach((entry, index) => {
        const isGroup = Array.isArray(entry);
        const group = isGroup ? entry : [entry];

        if (nodes.length && (isGroup || previousWasGroup)) {
            nodes.push(<MenuDivider key={`divider-${index}`} />);
        }

        group.forEach((item, itemIndex) => {
            nodes.push(<MenuItem key={`${index}-${itemIndex}`} {...item} />);
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

                    const submenu = React.Children.toArray(action.menu.item.children).find(
                        (child) => isComponentType(child, 'Menu'),
                    );
                    const node = submenu ? (
                        <Menu
                            size="s"
                            trigger={
                                <Button view="flat-contrast" size="m" {...action.button.props} />
                            }
                        >
                            {submenu.props.children}
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
