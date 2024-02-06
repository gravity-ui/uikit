import type {TableColumnConfig} from '../Table';
import {enhanceSystemColumn} from '../hoc/withTableActions/withTableActions';
import {selectionColumnId} from '../hoc/withTableSelection/withTableSelection';
import type {TableSettingsData} from '../hoc/withTableSettings/withTableSettings';
import {
    filterColumns,
    getActualItems,
    getColumnStringTitle,
} from '../hoc/withTableSettings/withTableSettings';

const columns: TableColumnConfig<unknown>[] = [
    {
        id: 'id',
    },
    {
        id: 'name',
    },
    {
        id: 'description',
        meta: {
            sort: true,
        },
    },
];

const columnsWithSystem: TableColumnConfig<unknown>[] = enhanceSystemColumn(
    [
        {
            id: selectionColumnId,
            name: 'selection',
        },
        ...columns,
    ],
    (systemColumn) => {
        systemColumn.template = () => 'template';
        return systemColumn;
    },
);

function ids(items: Array<{id: string}>) {
    return items.map(({id}) => id);
}

describe('withTableSettings getColumnStringTitle', () => {
    it('should use id if name is not defined', () => {
        expect(getColumnStringTitle({id: 'name'})).toEqual('name');
    });

    it('should use name if it is string', () => {
        expect(getColumnStringTitle({id: 'name', name: 'First Name'})).toEqual('First Name');
    });

    it('should use meta._originalName if it is a string', () => {
        expect(
            getColumnStringTitle({
                id: 'name',
                meta: {
                    _originalName: 'Result',
                },
            }),
        ).toEqual('Result');
    });
});

describe('withTableSettings getActualItems', () => {
    it('should filter system columns', () => {
        expect(getActualItems(columnsWithSystem, []).map((column) => column.id)).toEqual(
            columns.map((column) => column.id),
        );
    });

    it('should return recently added columns', () => {
        const settings: TableSettingsData = [
            {
                id: 'id',
                isSelected: true,
            },
            {
                id: 'name',
                isSelected: false,
            },
            {
                id: 'description',
                isSelected: true,
            },
        ];
        const updatedColumns = [...columns, {id: 'os'}];
        const actualSettings = getActualItems(updatedColumns, settings).map((column) => column.id);
        expect(actualSettings).toEqual(updatedColumns.map((column) => column.id));
    });

    it('should respect selectedByDefault in recently added columns', () => {
        const settings: TableSettingsData = [
            {
                id: 'id',
                isSelected: true,
            },
            {
                id: 'name',
                isSelected: false,
            },
            {
                id: 'description',
                isSelected: true,
            },
        ];
        const updatedColumns = [
            ...columns,
            {
                id: 'os',
                meta: {
                    selectedByDefault: true,
                },
            },
            {
                id: 'osx',
                meta: {
                    selectedByDefault: false,
                },
            },
        ];
        const osSettings = getActualItems(updatedColumns, settings).find(({id}) => id === 'os');
        const osxSettings = getActualItems(updatedColumns, settings).find(({id}) => id === 'osx');
        expect(osSettings).toBeDefined();
        expect(osxSettings).toBeDefined();
        // @ts-ignore
        expect(osSettings.isSelected).toBe(true);
        // @ts-ignore
        expect(osxSettings.isSelected).toBe(false);
    });

    it('should return columns when no settings provided', () => {
        expect(ids(getActualItems(columns, []))).toEqual(ids(columns));
    });

    it('should ignore settings which is not exists in columns', () => {
        const settings: TableSettingsData = [
            {
                id: 'description',
                isSelected: true,
            },
            {
                id: 'name',
                isSelected: true,
            },
            {
                id: 'id',
                isSelected: true,
            },
            {
                id: 'removed',
                isSelected: true,
            },
        ];
        expect(ids(getActualItems(columns, settings))).toEqual(
            ids([settings[0], settings[1], settings[2]]),
        );
    });
});

describe('withTableSettings filterColumns', () => {
    it('should return only selected columns from settings', () => {
        const settings: TableSettingsData = [
            {
                id: 'id',
                isSelected: true,
            },
            {
                id: 'name',
                isSelected: false,
            },
            {
                id: 'description',
                isSelected: true,
            },
        ];
        expect(filterColumns(columns, settings)).toEqual([columns[0], columns[2]]);
    });

    it('should use columns order from settings', () => {
        const settings: TableSettingsData = [
            {
                id: 'description',
                isSelected: true,
            },
            {
                id: 'name',
                isSelected: true,
            },
            {
                id: 'id',
                isSelected: true,
            },
        ];
        expect(filterColumns(columns, settings)).toEqual([columns[2], columns[1], columns[0]]);
    });

    it('should ignore system column for selection', () => {
        const enhancedColumns = [
            {
                id: '_selection',
                name: 'for selection',
            },
            ...columns,
        ];
        const settings: TableSettingsData = [
            {
                id: 'description',
                isSelected: true,
            },
            {
                id: 'name',
                isSelected: true,
            },
            {
                id: 'id',
                isSelected: true,
            },
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
                {
                    id: 'id',
                    isSelected: true,
                },
                {
                    id: 'name',
                    isSelected: false,
                },
                {
                    id: 'description',
                    isSelected: false,
                },
            ]),
        ).toEqual([columnsWithSystem[0], columnsWithSystem[1], columnsWithSystem[4]]);
    });
});
