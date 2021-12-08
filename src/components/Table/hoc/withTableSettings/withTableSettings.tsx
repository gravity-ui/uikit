import React from 'react';
import _last from 'lodash/last';
import _isString from 'lodash/isString';
import _get from 'lodash/get';

import {block} from '../../../utils/cn';
import {TableColumnSetup} from './TableColumnSetup/TableColumnSetup';
import {Icon} from '../../../Icon';
import {GearIcon} from '../../../icons/GearIcon';
import {Button} from '../../../Button';
import {TableColumnConfig, TableDataItem, TableProps} from '../../Table';
import {enhanceSystemColumn, actionsColumnId} from '../withTableActions/withTableActions';
import {selectionColumnId} from '../withTableSelection/withTableSelection';

import './withTableSettings.scss';

interface SortableItem {
    id: string;
    title: React.ReactNode;
    isSelected?: boolean;
    isProtected?: boolean;
}
interface TableColumnSetupItem {
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

export function getColumnStringTitle(column: TableColumnConfig<any>) {
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
            const column = columns.find((column) => column.id === id);
            const isProtected = Boolean(column?.meta?.selectedAlways);
            return {
                id,
                isSelected: isProtected ? true : isSelected,
                isProtected,
                title: column ? getColumnStringTitle(column) : id,
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
    updateSettings: (data: TableSettingsData) => Promise<void>;
}

const b = block('table');

export function withTableSettings<I extends TableDataItem, E extends {} = {}>(
    TableComponent: React.ComponentType<TableProps<I> & E>,
): React.ComponentType<TableProps<I> & WithTableSettingsProps & E> {
    const componentName = TableComponent.displayName || TableComponent.name || 'Component';

    const TableWithSettings: React.FC<TableProps<I> & WithTableSettingsProps & E> = ({
        updateSettings,
        settings,
        columns,
        settingsPopupWidth,
        ...restTableProps
    }) => {
        const actualItems = getActualItems(columns, settings || []);

        const onUpdateColumns = React.useCallback(
            (newItems) => {
                updateSettings(prepareUpdateSettings(newItems));
            },
            [updateSettings],
        );

        return (
            <React.Fragment>
                <TableComponent
                    {...(restTableProps as Omit<TableProps<I>, 'columns'> & E)}
                    columns={enhanceSystemColumn(
                        filterColumns(columns, actualItems),
                        (systemColumn) => {
                            // eslint-disable-next-line react/display-name
                            systemColumn.name = () => (
                                <div className={b('settings')}>
                                    <TableColumnSetup
                                        popupWidth={settingsPopupWidth}
                                        popupPlacement={['bottom-end', 'bottom', 'top-end', 'top']}
                                        onUpdate={onUpdateColumns}
                                        items={prepareColumnSetupItems(actualItems)}
                                        switcher={
                                            <Button view="flat" className={b('settings-button')}>
                                                <Icon data={GearIcon} size={20} />
                                            </Button>
                                        }
                                    />
                                </div>
                            );
                        },
                    )}
                />
            </React.Fragment>
        );
    };
    TableWithSettings.displayName = `withTableSettings(${componentName})`;

    return TableWithSettings;
}
