'use client';

import type * as React from 'react';

import {Gear} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Icon} from '../Icon';
import type {PopupPlacement} from '../Popup';
import type {TableColumnConfig} from '../Table/Table';
import type {TableColumnSetupItem as NewTableColumnSetupItem} from '../Table/hoc/withTableSettings/TableColumnSetup/TableColumnSetup';
import {TableColumnSetup as NewTableColumnSetup} from '../Table/hoc/withTableSettings/TableColumnSetup/TableColumnSetup';
import type {TableSetting} from '../Table/hoc/withTableSettings/withTableSettings';
import {block} from '../utils/cn';

import i18n from './i18n';

import './TableColumnSetup.scss';

const b = block('table-column-setup');

export interface TableColumnSetupItem {
    id: string;
    title: React.ReactNode;
    selected?: boolean;
    required?: boolean;
    sticky?: TableColumnConfig<unknown>['sticky'];
}

type Item = TableColumnSetupItem;

interface SwitcherProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}

export interface TableColumnSetupProps {
    // for Button
    disabled?: boolean;
    /**
     * @deprecated Use renderSwitcher instead
     */
    switcher?: React.ReactElement | undefined;
    renderSwitcher?: (props: SwitcherProps) => React.ReactElement | undefined;

    items: Item[];
    sortable?: boolean;
    hideApplyButton?: boolean;

    onUpdate: (updated: Item[]) => void;
    popupWidth?: number | 'fit' | undefined;
    popupPlacement?: PopupPlacement;
    getItemTitle?: (item: Item) => TableColumnSetupItem['title'];
    showStatus?: boolean;
    className?: string;
}

export const TableColumnSetup = (props: TableColumnSetupProps) => {
    const {
        switcher,
        renderSwitcher: renderSwitcherProps,
        disabled,
        popupWidth,
        popupPlacement,
        className,
        items: propsItems,
        sortable = true,
        showStatus,
        onUpdate: propsOnUpdate,
        hideApplyButton,
    } = props;

    const {t} = i18n.useTranslation();

    const renderStatus = () => {
        if (!showStatus) {
            return null;
        }

        const selected = propsItems.reduce((acc, cur) => (cur.selected ? acc + 1 : acc), 0);
        const all = propsItems.length;
        const status = `${selected}/${all}`;

        return <span className={b('status')}>{status}</span>;
    };

    const renderSwitcher = (switcherProps: SwitcherProps) => {
        return (
            renderSwitcherProps?.(switcherProps) ||
            switcher || (
                <Button disabled={disabled} onClick={switcherProps.onClick}>
                    <Icon data={Gear} />
                    {t('button_switcher')}
                    {renderStatus()}
                </Button>
            )
        );
    };

    const items = propsItems.map<NewTableColumnSetupItem>(
        ({id, title, required, selected, sticky}) => ({
            id,
            title,
            isRequired: required,
            isSelected: selected,
            sticky,
        }),
    );

    const onUpdate = (newSettings: TableSetting[]) => {
        propsOnUpdate(
            newSettings.map(({id, isSelected}) => {
                const prevItem = propsItems.find((item) => item.id === id);

                return {
                    id,
                    selected: isSelected,
                    title: prevItem?.title,
                    required: prevItem?.required,
                };
            }),
        );
    };

    return (
        <NewTableColumnSetup
            hideApplyButton={hideApplyButton}
            items={items}
            onUpdate={onUpdate}
            popupPlacement={popupPlacement}
            popupWidth={popupWidth}
            renderSwitcher={renderSwitcher}
            sortable={sortable}
            className={b(null, className)}
        />
    );
};
