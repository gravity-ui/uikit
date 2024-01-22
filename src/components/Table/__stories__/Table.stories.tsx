import React from 'react';

import {Pencil} from '@gravity-ui/icons';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryFn} from '@storybook/react';
import _cloneDeep from 'lodash/cloneDeep';

import type {TableAction, TableSettingsData} from '..';
import {Icon} from '../../Icon';
import {Table} from '../Table';
import type {TableProps} from '../Table';

import {
    TableWithAction,
    TableWithCopy,
    TableWithSelection,
    TableWithSettings,
    TableWithSettingsFactory,
    TableWithSorting,
    columns,
    data,
} from './utils';
import type {DataItem} from './utils';

export default {
    title: 'Components/Data Display/Table',
    component: Table,
    args: {
        columns,
        data,
    },
} as Meta<TableProps<DataItem>>;

const DefaultTemplate: StoryFn<TableProps<DataItem>> = (args) => {
    return <Table {...args} />;
};
export const Default = DefaultTemplate.bind({});

const EmptyDefaultTemplate: StoryFn<TableProps<DataItem>> = (args) => <Table {...args} />;
export const EmptyDefault = EmptyDefaultTemplate.bind({});
EmptyDefault.args = {
    data: [],
};

// ---------------------------------
const EmptyCustomTemplate: StoryFn<TableProps<DataItem>> = (args) => <Table {...args} />;
export const EmptyCustom = EmptyCustomTemplate.bind({});
EmptyCustom.args = {
    data: [],
    emptyMessage: 'No data at all ¯\\_(ツ)_/¯',
};

// ---------------------------------
const OnRowClickTemplate: StoryFn<TableProps<DataItem>> = (args) => <Table {...args} />;
export const OnRowClick = OnRowClickTemplate.bind({});
OnRowClick.args = {
    onRowClick: (item) => alert(JSON.stringify(item)),
    onRowMouseDown: (item, _, event) => {
        const isMiddleButtonClicked = event.button === 1;
        if (isMiddleButtonClicked) {
            alert(JSON.stringify(item));
        }
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

const AdaptiveTemplate: StoryFn<TableProps<DataItem>> = (args) => {
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
const WithTableActionsTemplate: StoryFn<TableProps<DataItem>> = (args) => {
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
    ];
    return <TableWithAction {...args} getRowActions={getRowActions} />;
};
export const HOCWithTableActions = WithTableActionsTemplate.bind({});

// ---------------------------------
const columnsWithCopy = _cloneDeep(columns);
columnsWithCopy[0].meta = {copy: true};
const WithTableCopyTemplate: StoryFn<TableProps<DataItem>> = (args) => <TableWithCopy {...args} />;
export const HOCWithTableCopy = WithTableCopyTemplate.bind({});
HOCWithTableCopy.args = {
    columns: columnsWithCopy,
};

// ---------------------------------
const WithTableSelectionTemplate: StoryFn<TableProps<DataItem>> = (args) => {
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
const WithTableSettingsTemplate: StoryFn<TableProps<DataItem>> = (args, context) => {
    const [settings, setSettings] = React.useState<TableSettingsData>(() =>
        columns.map((x) => ({id: x.id, isSelected: true})),
    );

    const updateSettings = React.useCallback(
        async (updatedSettings: TableSettingsData) => setSettings(updatedSettings),
        [],
    );

    if (context.parameters.isFactory) {
        return (
            <TableWithSettingsFactory
                {...args}
                settings={settings}
                updateSettings={updateSettings}
            />
        );
    } else {
        return <TableWithSettings {...args} settings={settings} updateSettings={updateSettings} />;
    }
};
export const HOCWithTableSettings = WithTableSettingsTemplate.bind({});
export const HOCWithTableSettingsFactory = WithTableSettingsTemplate.bind({});
HOCWithTableSettingsFactory.parameters = {
    isFactory: true,
};

// ---------------------------------
const columnsWithSorting = _cloneDeep(columns);
columnsWithSorting[0].meta = {sort: true};
columnsWithSorting[2].meta = {sort: true};
columnsWithSorting[3].meta = {sort: true};
columnsWithSorting[4].meta = {
    sort: (itemA: DataItem, itemB: DataItem) => Date.parse(itemA.date) - Date.parse(itemB.date),
    defaultSortOrder: 'desc',
};
const WithTableSortingTemplate: StoryFn<TableProps<DataItem>> = (args) => (
    <TableWithSorting {...args} />
);
export const HOCWithTableSorting = WithTableSortingTemplate.bind({});
HOCWithTableSorting.args = {
    columns: columnsWithSorting,
};
