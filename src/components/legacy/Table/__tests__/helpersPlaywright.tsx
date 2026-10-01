import * as React from 'react';

import {composeStories} from '@storybook/react-webpack5';

import type {TableColumnConfig, TableProps} from '../Table';
import {Table} from '../Table';
import * as DefaultTableStories from '../__stories__/Table.stories';
import type {TableSettingsData} from '../hoc';
import {withTableSettings} from '../hoc';

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

    const [settings, setSettings] = React.useState<TableSettingsData>(
        columns.map(({id}) => ({id, isSelected: true})),
    );

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
