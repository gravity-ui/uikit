import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Table, TableProps} from '../Table';
import _cloneDeep from 'lodash/cloneDeep';
import {
    data,
    columns,
    rowsRefs,
    TableWithSelection,
    TableWithAction,
    TableWithCopy,
    TableWithSettings,
    TableWithSorting,
    DataItem,
} from './utils';
import {TableAction, TableSettingsData} from '..';

export default {
    title: 'Components/Table',
    component: Table,
    args: {
        columns,
        data,
    },
} as Meta<TableProps<DataItem>>;

const DefaultTemplate: Story<TableProps<DataItem>> = (args) => <Table {...args} />;
export const Default = DefaultTemplate.bind({});

const EmptyDefaultTemplate: Story<TableProps<DataItem>> = (args) => <Table {...args} />;
export const EmptyDefault = EmptyDefaultTemplate.bind({});
EmptyDefault.args = {
    data: [],
};

// ---------------------------------
const EmptyCustomTemplate: Story<TableProps<DataItem>> = (args) => <Table {...args} />;
export const EmptyCustom = EmptyCustomTemplate.bind({});
EmptyCustom.args = {
    data: [],
    emptyMessage: 'No data at all ¯\\_(ツ)_/¯',
};

// ---------------------------------
const OnRowClickTemplate: Story<TableProps<DataItem>> = (args) => <Table {...args} />;
export const OnRowClick = OnRowClickTemplate.bind({});
OnRowClick.args = {
    onRowClick: (item) => alert(JSON.stringify(item)),
};

// ---------------------------------
const OnRowMouseEnterAndLeaveTemplate: Story<TableProps<DataItem>> = (args) => (
    <Table rowsRefs={rowsRefs} {...args} />
);
export const OnRowMouseEnterAndLeave = OnRowMouseEnterAndLeaveTemplate.bind({});
OnRowMouseEnterAndLeave.args = {
    onRowMouseEnter(_, index) {
        rowsRefs.forEach((ref) => {
            ref.current!.style.opacity = '0.3';
        });
        rowsRefs[index].current!.style.opacity = '';
    },
    onRowMouseLeave() {
        rowsRefs.forEach((ref) => {
            ref.current!.style.opacity = '';
        });
    },
};

// ---------------------------------
const oneColumn = _cloneDeep(columns);
oneColumn[1].width = '100%';

const twoColumns = _cloneDeep(columns);
twoColumns[1].width = '50%';
twoColumns[2].width = '50%';

const threeColumns = _cloneDeep(columns);
threeColumns[0].width = '33%';
threeColumns[1].width = '33%';
threeColumns[2].width = '33%';

const AdaptiveTemplate: Story<TableProps<DataItem>> = (args) => {
    return (
        <div>
            <Table {...args} columns={oneColumn} />
            <Table {...args} columns={twoColumns} />
            <Table {...args} columns={threeColumns} />
        </div>
    );
};
export const Adaptive = AdaptiveTemplate.bind({});
Adaptive.args = {
    data: data.slice(0, 2),
};

// ---------------------------------
const WithTableActionsTemplate: Story<TableProps<DataItem>> = (args) => {
    const getRowActions = (item: DataItem, index: number): TableAction<DataItem>[] => [
        {
            text: 'default',
            handler: () => alert(JSON.stringify(item)),
        },
        {
            text: 'disabled',
            disabled: true,
            handler: () => {},
        },
        {
            text: 'danger theme',
            theme: 'danger',
            handler: () => alert(index),
        },
    ];
    return <TableWithAction {...args} getRowActions={getRowActions} />;
};
export const HOCWithTableActions = WithTableActionsTemplate.bind({});

// ---------------------------------
const columnsWithCopy = _cloneDeep(columns);
columnsWithCopy[0].meta = {copy: true};
const WithTableCopyTemplate: Story<TableProps<DataItem>> = (args) => <TableWithCopy {...args} />;
export const HOCWithTableCopy = WithTableCopyTemplate.bind({});
HOCWithTableCopy.args = {
    columns: columnsWithCopy,
};

// ---------------------------------
const WithTableSelectionTemplate: Story<TableProps<DataItem>> = (args) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    return (
        <TableWithSelection
            {...args}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
        />
    );
};
export const HOCWithTableSelection = WithTableSelectionTemplate.bind({});

// ---------------------------------
const WithTableSettingsTemplate: Story<TableProps<DataItem>> = (args) => {
    const [settings, setSettings] = React.useState<TableSettingsData>(() =>
        columns.map((x) => ({id: x.id, isSelected: true})),
    );

    const updateSettings = React.useCallback(
        async (updatedSettings: TableSettingsData) => setSettings(updatedSettings),
        [],
    );

    return <TableWithSettings {...args} settings={settings} updateSettings={updateSettings} />;
};
export const HOCWithTableSettings = WithTableSettingsTemplate.bind({});

// ---------------------------------
const columnsWithSorting = _cloneDeep(columns);
columnsWithSorting[0].meta = {sort: true};
columnsWithSorting[3].meta = {sort: true};
columnsWithSorting[4].meta = {
    sort: (itemA: DataItem, itemB: DataItem) => Date.parse(itemA.date) - Date.parse(itemB.date),
    defaultSortOrder: 'desc',
};
const WithTableSortingTemplate: Story<TableProps<DataItem>> = (args) => (
    <TableWithSorting {...args} />
);
export const HOCWithTableSorting = WithTableSortingTemplate.bind({});
HOCWithTableSorting.args = {
    columns: columnsWithSorting,
};
