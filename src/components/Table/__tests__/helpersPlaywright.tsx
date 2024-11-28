import React from 'react';

import {Pencil} from '@gravity-ui/icons';
import {action} from '@storybook/addon-actions';
import {composeStories} from '@storybook/react';

import {Icon} from '../../Icon';
import type {TableColumnConfig, TableProps} from '../Table';
import {Table} from '../Table';
import * as DefaultTableStories from '../__stories__/Table.stories';
import {DEFAULT_SETTINGS} from '../__stories__/Table.stories';
import type {TableAction, TableSettingsData} from '../hoc';
import {
    withTableActions,
    withTableCopy,
    withTableSelection,
    withTableSettings,
    withTableSorting,
} from '../hoc';

import type {DataItem} from './utils';
import {columns, data} from './utils';

export const TableStories = composeStories(DefaultTableStories);

export type TestTableProps = Partial<TableProps<DataItem>>;

export const TestTableWithCustomColumnConfig = (props: {
    columnConfig: Partial<TableColumnConfig<DataItem>>;
}) => {
    const {columnConfig} = props;

    const customColumnConfig = columns.map((item) => {
        return {
            ...item,
            ...columnConfig,
        };
    });

    return <Table data={data} columns={customColumnConfig} />;
};

export const TestTable = (props: Partial<TableProps<DataItem>>) => {
    return <Table data={data} columns={columns} {...props} />;
};

export const TestEmptyTable = (props: Partial<TableProps<DataItem>>) => {
    return <Table data={[]} columns={columns} {...props} />;
};

const TableWithCopy = withTableCopy<DataItem>(Table);

export const TestTableWithCopy = (props: Partial<TableProps<DataItem>>) => {
    const customColumnConfig = columns.map((item) => {
        return {
            ...item,
            meta: {copy: true},
        };
    });

    return <TableWithCopy data={data} columns={customColumnConfig} {...props} />;
};

const TableWithActions = withTableActions<DataItem>(Table);

export const TestTableWithActions = (props: Partial<TableProps<DataItem>>) => {
    const customColumnConfig = columns.map((item) => {
        return {
            ...item,
            meta: {copy: true},
        };
    });

    const getRowActions = (item: DataItem, index: number): TableAction<DataItem>[] => [
        {
            text: 'default',
            handler: (...handlerArgs) => {
                alert(JSON.stringify(item));
                action('default')(handlerArgs);
            },
        },
        {
            text: 'with icon',
            icon: <Icon data={Pencil} size={14} />,
            handler: () => {},
        },
        {
            text: 'disabled',
            disabled: true,
            handler: () => {},
        },
        {
            text: 'danger theme',
            theme: 'danger',
            handler: (...handlerArgs) => {
                alert(index);
                action('danger')(handlerArgs);
            },
        },
        {
            text: 'with href',
            theme: 'normal',
            href: 'https://cloud.yandex.com',
            target: '_blank',
            rel: 'noopener noreferrer',
            handler: () => {},
        },
    ];

    return (
        <TableWithActions
            data={data}
            columns={customColumnConfig}
            getRowActions={getRowActions}
            {...props}
        />
    );
};

const TableWithSelection = withTableSelection<DataItem>(Table);

export const TestTableWithSelection = (props: Partial<TableProps<DataItem>>) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    return (
        <TableWithSelection
            data={data}
            columns={columns}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            {...props}
        />
    );
};

const TableWithSorting = withTableSorting<DataItem>(Table);

export const TestTableWithSorting = (props: Partial<TableProps<DataItem>>) => {
    const customColumnConfig = columns.map((item) => {
        return {
            ...item,
            meta: {sort: true},
        };
    });

    return <TableWithSorting data={data} columns={customColumnConfig} {...props} />;
};

const TableWithSettings = withTableSettings<DataItem>({
    width: 200,
    sortable: false,
    filterable: false,
})(Table);

export const TestTableWithSettings = (props: Partial<TableProps<DataItem>>) => {
    const customColumnConfig = columns.map((item) => {
        return {
            ...item,
            meta: {sort: true},
        };
    });

    const [settings, setSettings] = React.useState<TableSettingsData>(DEFAULT_SETTINGS);

    return (
        <TableWithSettings
            data={data}
            columns={customColumnConfig}
            settings={settings}
            updateSettings={setSettings}
            {...props}
        />
    );
};

const TableWithSortableSettings = withTableSettings<DataItem>({
    width: 200,
    sortable: true,
    filterable: false,
})(Table);

export const TestTableWithSortableSettings = (props: Partial<TableProps<DataItem>>) => {
    const customColumnConfig = columns.map((item) => {
        return {
            ...item,
            meta: {sort: true},
        };
    });

    const [settings, setSettings] = React.useState<TableSettingsData>(DEFAULT_SETTINGS);

    return (
        <TableWithSortableSettings
            data={data}
            columns={customColumnConfig}
            settings={settings}
            updateSettings={setSettings}
            {...props}
        />
    );
};

const TableWithFilterableSettings = withTableSettings<DataItem>({
    width: 200,
    sortable: false,
    filterable: true,
})(Table);

export const TestTableWithFilterableSettings = (props: Partial<TableProps<DataItem>>) => {
    const customColumnConfig = columns.map((item) => {
        return {
            ...item,
            meta: {sort: true},
        };
    });

    const [settings, setSettings] = React.useState<TableSettingsData>(DEFAULT_SETTINGS);

    return (
        <TableWithFilterableSettings
            data={data}
            columns={customColumnConfig}
            settings={settings}
            updateSettings={setSettings}
            settingsFilterPlaceholder="Filter list"
            settingsFilterEmptyMessage="No results"
            {...props}
        />
    );
};
