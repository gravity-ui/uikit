import React from 'react';

import {Gear} from '@gravity-ui/icons';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _last from 'lodash/last';

import type {PopperPlacement} from '../../../../hooks/private';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import type {TreeSelectProps} from '../../../TreeSelect';
import {block} from '../../../utils/cn';
import {getComponentName} from '../../../utils/getComponentName';
import type {TableColumnConfig, TableDataItem, TableProps} from '../../Table';
import {actionsColumnId, enhanceSystemColumn} from '../withTableActions/withTableActions';
import {selectionColumnId} from '../withTableSelection/withTableSelection';

import {TableColumnSetup} from './TableColumnSetup/TableColumnSetup';
import type {RenderControls} from './TableColumnSetup/TableColumnSetup';
import i18n from './i18n';

import './withTableSettings.scss';

export type TableSetting = {
    id: string;
    isSelected?: boolean;
};

export type TableSettingsData = TableSetting[];

export type TableColumnSetupItem = TableSetting & {
    title: React.ReactNode;
    isRequired?: boolean;
};

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

const getTableColumnSetupItem = <I extends unknown>(
    id: string,
    isSelected: boolean | undefined,
    column: TableColumnConfig<I> | undefined,
): TableColumnSetupItem => {
    const isProtected = Boolean(column?.meta?.selectedAlways);

    return {
        id,
        isSelected: isProtected ? true : isSelected,
        isRequired: isProtected,
        title: column ? getColumnStringTitle(column) : id,
    };
};

export function getActualItems<I>(
    columns: TableColumnConfig<I>[],
    settings: TableSettingsData,
): TableColumnSetupItem[] {
    const sortableItems: TableColumnSetupItem[] = [];

    settings.forEach(({id, isSelected}) => {
        const column = columns.find((column) => id === column.id);

        if (column) {
            sortableItems.push(getTableColumnSetupItem(id, isSelected, column));
        }
    });

    columns.forEach((column) => {
        if (
            column.id !== actionsColumnId &&
            column.id !== selectionColumnId &&
            settings.every((setting) => setting.id !== column.id)
        ) {
            const isSelected = column.meta?.selectedByDefault !== false;
            sortableItems.push(getTableColumnSetupItem(column.id, isSelected, column));
        }
    });

    return sortableItems;
}

export interface WithTableSettingsOptions {
    width?: TreeSelectProps<any>['popupWidth'];
    sortable?: boolean;
}

export interface WithTableSettingsProps {
    /**
     * @deprecated Use factory notation: "withTableSettings({width: <value>})(Table)"
     */
    settingsPopupWidth?: TreeSelectProps<any>['popupWidth'];

    settings: TableSettingsData;
    updateSettings: (data: TableSettingsData) => void;

    /**
     * @deprecated
     */
    renderControls?: RenderControls;
}

const b = block('table');

const POPUP_PLACEMENT: PopperPlacement = ['bottom-end', 'bottom', 'top-end', 'top', 'auto'];

export function withTableSettings<I extends TableDataItem, E extends {} = {}>(
    Component: React.ComponentType<TableProps<I> & E>,
): React.ComponentType<TableProps<I> & WithTableSettingsProps & E>;
export function withTableSettings<I extends TableDataItem, E extends {} = {}>(
    options?: WithTableSettingsOptions,
): (
    Component: React.ComponentType<TableProps<I> & E>,
) => React.ComponentType<TableProps<I> & WithTableSettingsProps & E>;
export function withTableSettings<I extends TableDataItem, E extends {} = {}>(
    ComponentOrOptions?: WithTableSettingsOptions | React.ComponentType<TableProps<I> & E>,
):
    | React.ComponentType<TableProps<I> & WithTableSettingsProps & E>
    | ((
          Component: React.ComponentType<TableProps<I> & E>,
      ) => React.ComponentType<TableProps<I> & WithTableSettingsProps & E>) {
    function tableWithSettingsFactory(
        TableComponent: React.ComponentType<TableProps<I> & E>,
        {width, sortable}: WithTableSettingsOptions = {},
    ) {
        const componentName = getComponentName(TableComponent);

        function TableWithSettings({
            updateSettings,
            settings,
            columns,
            settingsPopupWidth,
            renderControls,
            ...restTableProps
        }: TableProps<I> & WithTableSettingsProps & E) {
            const enhancedColumns = React.useMemo(() => {
                const actualItems = getActualItems(columns, settings || []);

                return enhanceSystemColumn(filterColumns(columns, actualItems), (systemColumn) => {
                    systemColumn.name = () => (
                        <div className={b('settings')}>
                            <TableColumnSetup
                                popupWidth={settingsPopupWidth || width}
                                popupPlacement={POPUP_PLACEMENT}
                                sortable={sortable}
                                onUpdate={updateSettings}
                                items={actualItems}
                                renderSwitcher={({onClick}) => (
                                    <Button
                                        view="flat"
                                        className={b('settings-button')}
                                        extraProps={{'aria-label': i18n('label_settings')}}
                                        onClick={onClick}
                                    >
                                        <Icon data={Gear} />
                                    </Button>
                                )}
                                renderControls={renderControls}
                            />
                        </div>
                    );
                });
            }, [columns, settings, updateSettings, settingsPopupWidth, renderControls]);

            return (
                <React.Fragment>
                    <TableComponent
                        {...(restTableProps as Omit<TableProps<I>, 'columns'> & E)}
                        columns={enhancedColumns}
                    />
                </React.Fragment>
            );
        }
        TableWithSettings.displayName = `withTableSettings(${componentName})`;

        return TableWithSettings;
    }

    if (typeof ComponentOrOptions === 'function') {
        return tableWithSettingsFactory(ComponentOrOptions);
    } else {
        return (TableComponent: React.ComponentType<TableProps<I> & E>) =>
            tableWithSettingsFactory(TableComponent, ComponentOrOptions);
    }
}
