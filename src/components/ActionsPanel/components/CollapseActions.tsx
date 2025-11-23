'use client';

import * as React from 'react';

import {Ellipsis} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {DropdownMenu} from '../../DropdownMenu';
import {Icon} from '../../Icon';
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
                        <DropdownMenu
                            size="s"
                            items={action.dropdown.item.items}
                            renderSwitcher={({onClick}) => (
                                <Button
                                    view="flat-contrast"
                                    size="m"
                                    {...action.button.props}
                                    onClick={onClick}
                                />
                            )}
                            onSwitcherClick={action.button.props.onClick}
                        />
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
                        <DropdownMenu
                            size="s"
                            items={dropdownItems}
                            renderSwitcher={({onClick}) => (
                                <Button
                                    view="flat-contrast"
                                    size="m"
                                    aria-label={t('label_more')}
                                    onClick={onClick}
                                >
                                    <Icon data={Ellipsis} />
                                </Button>
                            )}
                        />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
