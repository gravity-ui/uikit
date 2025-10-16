'use client';

import * as React from 'react';

import {Gear} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import type {PopupPlacement} from '../../../Popup';
import type {TreeSelectProps} from '../../../TreeSelect';
import {block} from '../../../utils/cn';
import {getComponentName} from '../../../utils/getComponentName';
import type {TableColumnConfig, TableDataItem, TableProps} from '../../Table';
import {actionsColumnId, enhanceSystemColumn} from '../withTableActions/withTableActions';
import {selectionColumnId} from '../withTableSelection/withTableSelection';

import {TableColumnSetup} from './TableColumnSetup/TableColumnSetup';
import type {RenderControls, TableColumnSetupItem} from './TableColumnSetup/TableColumnSetup';
import i18n from './i18n';

import './withTableSettings.scss';

export type TableSetting = {id: string; isSelected?: boolean};

export type TableSettingsData = TableSetting[];

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
    const lastColumn = columns.at(-1);
    if (lastColumn && lastColumn.id === actionsColumnId) {
        filteredColumns.push(lastColumn);
    }

    return filteredColumns as TableColumnConfig<I>[];
}

export function getColumnStringTitle<Data>(column: TableColumnConfig<Data>) {
    const displayName = column.meta?.displayName;
    if (typeof displayName === 'string') {
        return displayName;
    }
    if (typeof column.name === 'string') {
        return column.name;
    }
    const originalName = column.meta?._originalName;
    if (typeof originalName === 'string') {
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
        sticky: column?.sticky,
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
    filterable?: boolean;
}

interface WithTableSettingsBaseProps {
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

interface WithDefaultSettings {
    /** Settings to which you can reset the current settings. */
    defaultSettings: TableSettingsData;
    /**
     * Display a reset button that resets the current settings changes.
     *
     * If the `defaultSettings` prop is set then the settings reset to the `defaultSettings`.
     */
    showResetButton: boolean;
}

interface WithoutDefaultSettings {
    defaultSettings?: never;
    showResetButton?: boolean;
}

interface WithFilter {
    settingsFilterPlaceholder?: string;
    settingsFilterEmptyMessage?: string;
    filterSettings?: (value: string, item: TableColumnSetupItem) => boolean;
}

export type WithTableSettingsProps = WithTableSettingsBaseProps &
    (WithDefaultSettings | WithoutDefaultSettings) &
    WithFilter;

const b = block('table');

const POPUP_PLACEMENT: PopupPlacement = ['bottom-end', 'bottom', 'top-end', 'top'];

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
        {width, sortable, filterable}: WithTableSettingsOptions = {},
    ) {
        const componentName = getComponentName(TableComponent);

        function TableWithSettings({
            updateSettings,
            settings,
            columns,
            settingsPopupWidth,
            renderControls,
            defaultSettings,
            showResetButton,
            settingsFilterPlaceholder,
            settingsFilterEmptyMessage,
            filterSettings,
            ...restTableProps
        }: TableProps<I> & WithTableSettingsProps & E) {
            const defaultActualItems = React.useMemo(() => {
                if (!defaultSettings) {
                    return undefined;
                }

                return getActualItems(columns, defaultSettings);
            }, [columns, defaultSettings]);

            const {t} = i18n.useTranslation();

            const enhancedColumns = React.useMemo(() => {
                const actualItems = getActualItems(columns, settings || []);
                return enhanceSystemColumn(filterColumns(columns, actualItems), (systemColumn) => {
                    systemColumn.name = () => (
                        <div className={b('settings')}>
                            <TableColumnSetup
                                popupWidth={settingsPopupWidth || width}
                                popupPlacement={POPUP_PLACEMENT}
                                sortable={sortable}
                                filterable={filterable}
                                filterPlaceholder={settingsFilterPlaceholder}
                                filterEmptyMessage={settingsFilterEmptyMessage}
                                filterSettings={filterSettings}
                                onUpdate={updateSettings}
                                items={actualItems}
                                renderSwitcher={({onClick}) => (
                                    <Button
                                        view="flat"
                                        className={b('settings-button')}
                                        aria-label={t('label_settings')}
                                        onClick={onClick}
                                    >
                                        <Icon data={Gear} />
                                    </Button>
                                )}
                                renderControls={renderControls}
                                defaultItems={defaultActualItems}
                                showResetButton={showResetButton}
                            />
                        </div>
                    );
                });
            }, [
                columns,
                settings,
                settingsPopupWidth,
                settingsFilterPlaceholder,
                settingsFilterEmptyMessage,
                filterSettings,
                updateSettings,
                renderControls,
                defaultActualItems,
                showResetButton,
                t,
            ]);

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
