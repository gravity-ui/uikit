import React from 'react';

import {Pencil} from '@gravity-ui/icons';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryFn} from '@storybook/react';
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import type {TableAction, TableSettingsData} from '..';
import {Icon} from '../../Icon';
import {TreeSelect} from '../../TreeSelect/TreeSelect';
import {Table} from '../Table';
import type {TableProps} from '../Table';

import {WithTableSettingsCustomActionsShowcase} from './WithTableSettingsCustomActions';
import {
    TableWithAction,
    TableWithCopy,
    TableWithFilterableSettings,
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
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'empty-table-header',
                        enabled: false,
                        selector: '.g-table__head > .g-table__row > .g-table__cell_sticky_end',
                    },
                ],
            },
        },
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
        {
            text: 'with href',
            theme: 'normal',
            href: 'https://gravity-ui.com',
            target: '_blank',
            rel: 'noopener noreferrer',
            handler: () => {},
        },
    ];
    return (
        <React.Fragment>
            <h3>{'with getRowActions property'}</h3>
            <TableWithAction {...args} getRowActions={getRowActions} />
            <br />
            <h3>{'with renderRowActions property'}</h3>
            <TableWithAction
                {...args}
                renderRowActions={({index}) => {
                    if (index % 2) {
                        return null;
                    }

                    const items = ['action 1', 'action 2', 'action 3'];

                    return (
                        <TreeSelect
                            items={items}
                            size="s"
                            mapItemDataToProps={(title) => ({title})}
                            title="Actions select example"
                        />
                    );
                }}
            />
        </React.Fragment>
    );
};
export const HOCWithTableActions = WithTableActionsTemplate.bind({});
HOCWithTableActions.args = {
    onRowClick: () => action('default')('click'),
};

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

const DEFAULT_SETTINGS = columns.map((x) => ({id: x.id, isSelected: true}));
// ---------------------------------
const WithTableSettingsTemplate: StoryFn<TableProps<DataItem>> = (args, context) => {
    const [settings, setSettings] = React.useState<TableSettingsData>(DEFAULT_SETTINGS);

    if (context.parameters.isFactory) {
        return (
            <TableWithSettingsFactory {...args} settings={settings} updateSettings={setSettings} />
        );
    } else {
        return <TableWithSettings {...args} settings={settings} updateSettings={setSettings} />;
    }
};
export const HOCWithTableSettings = WithTableSettingsTemplate.bind({});
HOCWithTableSettings.parameters = {
    // Strict mode ruins sortable list due to this react-beautiful-dnd issue
    // https://github.com/atlassian/react-beautiful-dnd/issues/2350
    disableStrictMode: true,
};
const columnsWithSettings = _cloneDeep(columns);
const markColumnAsSelectedAlways = (idx: number) => {
    const column = columnsWithSettings[idx];
    column.meta = column.meta || {};
    column.meta.selectedAlways = true;
};

markColumnAsSelectedAlways(2);
markColumnAsSelectedAlways(3);

HOCWithTableSettings.args = {
    columns: columnsWithSettings,
};

const WithFilterableSettingsTemplate: StoryFn<TableProps<DataItem>> = (args) => {
    const [settings, setSettings] = React.useState<TableSettingsData>(DEFAULT_SETTINGS);
    return (
        <TableWithFilterableSettings
            {...args}
            settings={settings}
            updateSettings={setSettings}
            settingsFilterPlaceholder="Filter list"
            settingsFilterEmptyMessage="No results"
        />
    );
};

export const HOCWithFilterableTableSettings = WithFilterableSettingsTemplate.bind({});
HOCWithFilterableTableSettings.parameters = {
    disableStrictMode: true,
};

export const HOCWithTableSettingsFactory = WithTableSettingsTemplate.bind({});
HOCWithTableSettingsFactory.parameters = {
    isFactory: true,

    // Strict mode ruins sortable list due to this react-beautiful-dnd issue
    // https://github.com/atlassian/react-beautiful-dnd/issues/2350
    disableStrictMode: true,
};

const WithTableSettingsWithResetTemplate: StoryFn<TableProps<DataItem>> = (args) => {
    const [settings, setSettings] = React.useState<TableSettingsData>(DEFAULT_SETTINGS);

    return (
        <TableWithSettings
            {...args}
            settings={settings}
            updateSettings={setSettings}
            defaultSettings={DEFAULT_SETTINGS}
            showResetButton={!_isEqual(DEFAULT_SETTINGS, settings)}
        />
    );
};

export const HOCWithTableSettingsWithReset = WithTableSettingsWithResetTemplate.bind({});
HOCWithTableSettingsWithReset.parameters = {
    // Strict mode ruins sortable list due to this react-beautiful-dnd issue
    // https://github.com/atlassian/react-beautiful-dnd/issues/2350
    disableStrictMode: true,
};

const WithTableSettingsCustomActionsTemplate: StoryFn<TableProps<DataItem>> = (args) => {
    const settings = React.useMemo(() => {
        const newSettings: TableSettingsData = columns.map((x) => ({
            id: x.id,
            isSelected: true,
        }));
        newSettings[0].isSelected = false;
        newSettings[2].isSelected = false;

        return newSettings;
    }, []);

    return <WithTableSettingsCustomActionsShowcase {...args} defaultSettings={settings} />;
};
export const HOCWithTableSettingsCustomActions = WithTableSettingsCustomActionsTemplate.bind({});
HOCWithTableSettingsCustomActions.parameters = {
    // Strict mode ruins sortable list due to this react-beautiful-dnd issue
    // https://github.com/atlassian/react-beautiful-dnd/issues/2350
    disableStrictMode: true,
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
