import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen, waitFor} from '../../../../test-utils/utils';
import {Button} from '../../Button';
import {Table} from '../Table';
import type {TableColumnConfig, TableProps} from '../Table';
import {enhanceSystemColumn} from '../hoc/withTableActions/withTableActions';
import {selectionColumnId} from '../hoc/withTableSelection/withTableSelection';
import type {TableSetting, TableSettingsData} from '../hoc/withTableSettings/withTableSettings';
import {
    filterColumns,
    getActualItems,
    getColumnStringTitle,
    withTableSettings,
} from '../hoc/withTableSettings/withTableSettings';

interface SomeItem {
    id: string;
    name: string;
    description: string;
}

const columns: TableColumnConfig<SomeItem>[] = [
    {id: 'id'},
    {id: 'name'},
    {id: 'description', meta: {sort: true}},
];

const columnsWithSystem: TableColumnConfig<SomeItem>[] = enhanceSystemColumn(
    [{id: selectionColumnId, name: 'selection'}, ...columns],
    (systemColumn) => {
        systemColumn.template = () => 'template';
        return systemColumn;
    },
);

const data: TableProps<SomeItem>['data'] = [
    {id: 'id1', name: 'Mock data 1', description: 'Mock data 1 description'},
    {id: 'id2', name: 'Mock data 2', description: 'Mock data 2 description'},
];

function ids(items: Array<{id: string}>) {
    return items.map(({id}) => id);
}

describe('withTableSettings', () => {
    const TableWithSettings = withTableSettings<SomeItem>(Table);

    describe('getColumnStringTitle', () => {
        it('should use meta.displayName if it is defined', () => {
            expect(
                getColumnStringTitle({
                    id: 'name',
                    name: 'First Name',
                    meta: {displayName: 'Display', _originalName: 'Original'},
                }),
            ).toEqual('Display');
        });

        it('should use id if name is not defined', () => {
            expect(getColumnStringTitle({id: 'name'})).toEqual('name');
        });

        it('should use name if it is string', () => {
            expect(getColumnStringTitle({id: 'name', name: 'First Name'})).toEqual('First Name');
        });

        it('should use meta._originalName if it is a string', () => {
            expect(getColumnStringTitle({id: 'name', meta: {_originalName: 'Result'}})).toEqual(
                'Result',
            );
        });
    });

    describe('getActualItems', () => {
        it('should filter system columns', () => {
            expect(getActualItems(columnsWithSystem, []).map((column) => column.id)).toEqual(
                columns.map((column) => column.id),
            );
        });

        it('should return recently added columns', () => {
            const settings: TableSettingsData = [
                {id: 'id', isSelected: true},
                {id: 'name', isSelected: false},
                {id: 'description', isSelected: true},
            ];
            const updatedColumns = [...columns, {id: 'os'}];
            const actualSettings = getActualItems(updatedColumns, settings).map(
                (column) => column.id,
            );
            expect(actualSettings).toEqual(updatedColumns.map((column) => column.id));
        });

        it('should respect selectedByDefault in recently added columns', () => {
            const settings: TableSettingsData = [
                {id: 'id', isSelected: true},
                {id: 'name', isSelected: false},
                {id: 'description', isSelected: true},
            ];
            const updatedColumns = [
                ...columns,
                {id: 'os', meta: {selectedByDefault: true}},
                {id: 'osx', meta: {selectedByDefault: false}},
            ];
            const osSettings = getActualItems(updatedColumns, settings).find(({id}) => id === 'os');
            const osxSettings = getActualItems(updatedColumns, settings).find(
                ({id}) => id === 'osx',
            );
            expect(osSettings).toBeDefined();
            expect(osxSettings).toBeDefined();
            expect(osSettings?.isSelected).toBe(true);
            expect(osxSettings?.isSelected).toBe(false);
        });

        it('should return columns when no settings provided', () => {
            expect(ids(getActualItems(columns, []))).toEqual(ids(columns));
        });

        it('should ignore settings which is not exists in columns', () => {
            const settings: TableSettingsData = [
                {id: 'description', isSelected: true},
                {id: 'name', isSelected: true},
                {id: 'id', isSelected: true},
                {id: 'removed', isSelected: true},
            ];
            expect(ids(getActualItems(columns, settings))).toEqual(
                ids([settings[0], settings[1], settings[2]]),
            );
        });
    });

    describe('filterColumns', () => {
        it('should return only selected columns from settings', () => {
            const settings: TableSettingsData = [
                {id: 'id', isSelected: true},
                {id: 'name', isSelected: false},
                {id: 'description', isSelected: true},
            ];
            expect(filterColumns(columns, settings)).toEqual([columns[0], columns[2]]);
        });

        it('should use columns order from settings', () => {
            const settings: TableSettingsData = [
                {id: 'description', isSelected: true},
                {id: 'name', isSelected: true},
                {id: 'id', isSelected: true},
            ];
            expect(filterColumns(columns, settings)).toEqual([columns[2], columns[1], columns[0]]);
        });

        it('should ignore system column for selection', () => {
            const enhancedColumns = [{id: '_selection', name: 'for selection'}, ...columns];
            const settings: TableSettingsData = [
                {id: 'description', isSelected: true},
                {id: 'name', isSelected: true},
                {id: 'id', isSelected: true},
            ];
            expect(filterColumns(enhancedColumns, settings)).toEqual([
                enhancedColumns[0],
                enhancedColumns[3],
                enhancedColumns[2],
                enhancedColumns[1],
            ]);
        });

        it('should not filter system columns when settings provided', () => {
            expect(
                filterColumns(columnsWithSystem, [
                    {id: 'id', isSelected: true},
                    {id: 'name', isSelected: false},
                    {id: 'description', isSelected: false},
                ]),
            ).toEqual([columnsWithSystem[0], columnsWithSystem[1], columnsWithSystem[4]]);
        });
    });

    describe('updateSettings', () => {
        const settings = columns.map<TableSetting>((column) => ({id: column.id, isSelected: true}));

        it('should change table columns visibility', async () => {
            const updateSettings = jest.fn();

            render(
                <TableWithSettings
                    columns={columns}
                    data={data}
                    settings={settings}
                    updateSettings={updateSettings}
                />,
            );

            await userEvent.click(screen.getByRole('button', {name: 'Table settings'}));
            await userEvent.click(await screen.findByRole('button', {name: 'description'}));
            await userEvent.click(screen.getByRole('button', {name: 'Apply'}));

            expect(updateSettings).toHaveBeenCalledWith([
                {id: 'id', isSelected: true},
                {id: 'name', isSelected: true},
                {id: 'description', isSelected: false},
            ] as TableSetting[]);
        });
    });

    describe('renderControls', () => {
        const settings = columns.map<TableSetting>((column) => ({id: column.id, isSelected: true}));

        it('should have custom controls', async () => {
            const updateSettings = jest.fn();

            const customControlText = 'Custom controls';

            render(
                <TableWithSettings
                    columns={columns}
                    data={data}
                    settings={settings}
                    updateSettings={updateSettings}
                    renderControls={() => {
                        return <Button>{customControlText}</Button>;
                    }}
                />,
            );

            await userEvent.click(screen.getByRole('button', {name: 'Table settings'}));
            const customControl = screen.getByText(customControlText);

            expect(customControl).toBeVisible();
        });
    });

    describe('filterableSettings', () => {
        const TableWithSettings = withTableSettings<SomeItem>({sortable: true, filterable: true})(
            Table,
        );
        const settings = columns.map<TableSetting>((column) => ({id: column.id, isSelected: true}));
        const updateSettings = jest.fn();
        const placeholder = 'Filter list';

        it('should filter columns', async () => {
            render(
                <TableWithSettings
                    columns={columns}
                    data={data}
                    settings={settings}
                    settingsFilterPlaceholder={placeholder}
                    updateSettings={updateSettings}
                />,
            );

            await userEvent.click(screen.getByRole('button', {name: 'Table settings'}));
            const textInput = screen.getByRole('textbox') as HTMLInputElement;
            expect(textInput).toBeVisible();
            expect(textInput.placeholder).toBe(placeholder);

            const column = screen.getByRole('button', {name: 'description'});
            expect(column.hasAttribute('draggable')).toBeTruthy();

            fireEvent.change(textInput, {target: {value: 'na'}});
            const filteredOption = screen.getByRole('option', {name: 'name'});
            expect(filteredOption).toBeInTheDocument();
            expect(filteredOption.hasAttribute('draggable')).toBeFalsy();
            await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));

            fireEvent.change(textInput, {target: {value: ''}});
            expect(screen.getByRole('button', {name: 'id'}).hasAttribute('draggable')).toBeTruthy();
            expect(
                screen.getByRole('button', {name: 'name'}).hasAttribute('draggable'),
            ).toBeTruthy();
            expect(
                screen.getByRole('button', {name: 'description'}).hasAttribute('draggable'),
            ).toBeTruthy();
        });
    });
});
