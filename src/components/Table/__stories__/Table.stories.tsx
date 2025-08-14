import * as React from 'react';

import {CircleChevronDownFill, Pencil} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import {action} from 'storybook/actions';

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
        qa: 'test-table',
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
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

export const RowInteractive = DefaultTemplate.bind({});
RowInteractive.args = {
    getRowDescriptor() {
        return {interactive: true};
    },
};

// ---------------------------------
const oneColumn = cloneDeep(columns);
oneColumn[1].width = '100%';

const twoColumns = cloneDeep(columns);
twoColumns[1].width = '50%';
twoColumns[2].width = '50%';

const threeColumns = cloneDeep(columns);
threeColumns[0].width = '33%';
threeColumns[1].width = '33%';
threeColumns[2].width = '33%';

const CustomIconTestSVG = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17 17"
        width="16"
        height="16"
        fill="currentColor"
    >
        <path d="M4 7h9v3H4z" />
    </svg>
);

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
            qa: 'default-action',
        },
        {
            text: 'with icon',
            icon: <Icon data={Pencil} size={14} />,
            handler: () => {},
            qa: 'with-icon-action',
        },
        {
            text: 'disabled',
            disabled: true,
            handler: () => {},
            qa: 'disabled',
        },
        {
            text: 'danger theme',
            theme: 'danger',
            handler: (...handlerArgs) => {
                alert(index);
                action('danger')(handlerArgs);
            },
            qa: 'danger-theme-action',
        },
        {
            text: 'with href',
            theme: 'normal',
            href: 'https://gravity-ui.com',
            target: '_blank',
            rel: 'noopener noreferrer',
            handler: () => {},
            qa: 'with-href-action',
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
                            mapItemDataToContentProps={(title) => ({title})}
                            title="Actions select example"
                        />
                    );
                }}
            />
            <br />
            <h3>{'with rowActionsIcon property as an SVG'}</h3>
            <TableWithAction
                {...args}
                getRowActions={getRowActions}
                rowActionsIcon={CustomIconTestSVG}
            />
            <br />
            <h3>{'with rowActionsIcon property as a string'}</h3>
            <TableWithAction {...args} getRowActions={getRowActions} rowActionsIcon="⭐" />
            <br />
            <h3>{'with rowActionsIcon property as a react component'}</h3>
            <TableWithAction
                {...args}
                getRowActions={getRowActions}
                rowActionsIcon={<Icon data={CircleChevronDownFill} size={12} />}
            />
        </React.Fragment>
    );
};
export const HOCWithTableActions = WithTableActionsTemplate.bind({});
HOCWithTableActions.args = {
    onRowClick: () => action('default')('click'),
};

// ---------------------------------
const columnsWithCopy = cloneDeep(columns);
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
const columnsWithSettings = cloneDeep(columns);
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

export const HOCWithTableSettingsFactory = WithTableSettingsTemplate.bind({});
HOCWithTableSettingsFactory.parameters = {
    isFactory: true,
};

const WithTableSettingsWithResetTemplate: StoryFn<TableProps<DataItem>> = (args) => {
    const [settings, setSettings] = React.useState<TableSettingsData>(DEFAULT_SETTINGS);

    return (
        <TableWithSettings
            {...args}
            settings={settings}
            updateSettings={setSettings}
            defaultSettings={DEFAULT_SETTINGS}
            showResetButton={!isEqual(DEFAULT_SETTINGS, settings)}
        />
    );
};

export const HOCWithTableSettingsWithReset = WithTableSettingsWithResetTemplate.bind({});

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

// ---------------------------------
const columnsWithSorting = cloneDeep(columns);
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
