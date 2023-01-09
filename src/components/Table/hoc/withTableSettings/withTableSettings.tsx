import React from 'react';

import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _last from 'lodash/last';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {GearIcon} from '../../../icons/GearIcon';
import {block} from '../../../utils/cn';
import {getComponentName} from '../../../utils/getComponentName';
import type {TableColumnConfig, TableDataItem, TableProps} from '../../Table';
import {actionsColumnId, enhanceSystemColumn} from '../withTableActions/withTableActions';
import {selectionColumnId} from '../withTableSelection/withTableSelection';

import {TableColumnSetup} from './TableColumnSetup/TableColumnSetup';

import './withTableSettings.scss';

interface SortableItem {
    id: string;
    title: React.ReactNode;
    isSelected?: boolean;
    isProtected?: boolean;
}
export interface TableColumnSetupItem {
    id: string;
    title: React.ReactNode;
    selected?: boolean;
    required?: boolean;
}
export type TableSettingsData = Array<{
    id: string;
    isSelected?: boolean;
}>;

export function filterColumns<I>(
    columns: TableColumnConfig<I>[],
    settings: TableSettingsData,
): TableColumnConfig<I>[] {
    const filteredColumns = settings
        .map(({id, isSelected}) => ({
            isSelected,
            columnSettings: columns.find((column) => id === column.id),
        }))
        .filter(({isSelected, columnSettings}) => isSelected && columnSettings)
        .map(({columnSettings}) => columnSettings);

    if (columns[0] && columns[0].id === selectionColumnId) {
        filteredColumns.unshift(columns[0]);
    }
    const lastColumn = _last(columns);
    if (lastColumn && lastColumn.id === actionsColumnId) {
        filteredColumns.push(lastColumn);
    }

    return filteredColumns as TableColumnConfig<I>[];
}

export function getColumnStringTitle<Data>(column: TableColumnConfig<Data>) {
    if (_isString(column.name)) {
        return column.name;
    }
    const originalName = _get(column, ['meta', '_originalName']);
    if (_isString(originalName)) {
        return originalName;
    }
    return column.id;
}

export function getActualItems<I>(
    columns: TableColumnConfig<I>[],
    settings: TableSettingsData,
): SortableItem[] {
    const newColumnSettings = columns
        .filter(
            ({id}) =>
                id !== actionsColumnId &&
                id !== selectionColumnId &&
                settings.every((setting) => setting.id !== id),
        )
        .map((column) => ({
            id: column.id,
            isSelected: column.meta?.selectedByDefault !== false,
        }));
    return settings
        .filter(({id}) => columns.some((column) => id === column.id))
        .concat(newColumnSettings)
        .map(({id, isSelected}) => {
            const foundColumn = columns.find((column) => column.id === id);
            const isProtected = Boolean(foundColumn?.meta?.selectedAlways);
            return {
                id,
                isSelected: isProtected ? true : isSelected,
                isProtected,
                title: foundColumn ? getColumnStringTitle(foundColumn) : id,
            };
        });
}

function prepareColumnSetupItems(items: SortableItem[]): TableColumnSetupItem[] {
    return items.map(({id, title, isSelected, isProtected}) => ({
        id,
        title,
        selected: isSelected,
        required: isProtected,
    }));
}

function prepareUpdateSettings(items: TableColumnSetupItem[]): TableSettingsData {
    return items.map(({id, selected}) => ({
        id,
        isSelected: selected,
    }));
}

export interface WithTableSettingsProps {
    settingsPopupWidth?: string;
    settings: TableSettingsData;
    updateSettings: (data: TableSettingsData) => void;
}

const b = block('table');

export function withTableSettings<I extends TableDataItem, E extends {} = {}>(
    TableComponent: React.ComponentType<TableProps<I> & E>,
): React.ComponentType<TableProps<I> & WithTableSettingsProps & E> {
    const componentName = getComponentName(TableComponent);

    const TableWithSettings = ({
        updateSettings,
        settings,
        columns,
        settingsPopupWidth,
        ...restTableProps
    }: TableProps<I> & WithTableSettingsProps & E) => {
        const actualItems = React.useMemo(
            () => getActualItems(columns, settings || []),
            [columns, settings],
        );

        const onUpdateColumns = React.useCallback(
            (newItems: TableColumnSetupItem[]) => {
                updateSettings(prepareUpdateSettings(newItems));
            },
            [updateSettings],
        );

        const columnSetupItems = React.useMemo(
            () => prepareColumnSetupItems(actualItems),
            [actualItems],
        );

        const enhancedColumns = React.useMemo(
            () =>
                enhanceSystemColumn(filterColumns(columns, actualItems), (systemColumn) => {
                    // eslint-disable-next-line react/display-name
                    systemColumn.name = () => (
                        <div className={b('settings')}>
                            <TableColumnSetup
                                popupWidth={settingsPopupWidth}
                                popupPlacement={['bottom-end', 'bottom', 'top-end', 'top']}
                                onUpdate={onUpdateColumns}
                                items={columnSetupItems}
                                switcher={
                                    <Button view="flat" className={b('settings-button')}>
                                        <Icon data={GearIcon} size={20} />
                                    </Button>
                                }
                            />
                        </div>
                    );
                }),
            [actualItems, columnSetupItems, columns, onUpdateColumns, settingsPopupWidth],
        );

        return (
            <React.Fragment>
                <TableComponent
                    {...(restTableProps as Omit<TableProps<I>, 'columns'> & E)}
                    columns={enhancedColumns}
                />
            </React.Fragment>
        );
    };
    TableWithSettings.displayName = `withTableSettings(${componentName})`;

    return TableWithSettings;
}
