import type * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import type {TableColumnConfig, TableProps, TableWidth} from '../Table';
import {Table} from '../Table';

import type {DataItem} from './utils';
import {columns, data} from './utils';

const qaId = 'table-component';

describe('Table', () => {
    test('render table by default', () => {
        render(<Table data={data} columns={columns} />);
        const table = screen.getByRole('table');
        const rows = within(table).getAllByRole('row');

        expect(table).toBeVisible();
        expect(rows.length).toBe(data.length + 1);
    });

    test.each(new Array<'top' | 'middle'>('top', 'middle'))(
        'render with given "%s" vertical align',
        (align) => {
            render(<Table data={data} columns={columns} verticalAlign={align} />);
            const table = screen.getByRole('table');
            const tbody = within(table).getAllByRole('rowgroup');
            const rows = within(tbody[1]).getAllByRole('row');

            rows.forEach((row) => {
                expect(row).toHaveClass(`g-table__row_vertical-align_${align}`);
            });
        },
    );
    test.each(new Array<TableWidth>('max', 'auto'))('render with given "%s" width', (width) => {
        render(<Table data={data} columns={columns} width={width} />);
        const table = screen.getByRole('table');

        expect(table).toHaveClass(`g-table__table_width_${width}`);
    });

    test('render table with no data (default)', () => {
        const emptyText = 'No data';
        render(<Table data={[]} columns={columns} />);
        const emptyCell = screen.getByText(emptyText);

        expect(emptyCell).not.toBeNull();
    });

    test('render table with no data (custom)', () => {
        const emptyText = 'Custom no data message';
        render(<Table data={[]} columns={columns} emptyMessage={emptyText} />);
        const emptyCell = screen.getByText(emptyText);

        expect(emptyCell).not.toBeNull();
    });

    test('render table with edge padding', () => {
        render(<Table data={data} columns={columns} edgePadding={true} />);
        const table = screen.getByRole('table');
        const thead = within(table).getAllByRole('rowgroup');
        const cells = within(thead[0]).getAllByRole('columnheader');

        cells.forEach((cell) => {
            expect(cell).toHaveClass(`g-table__cell_edge-padding`);
        });
    });

    test('render table without edge padding', () => {
        render(<Table data={data} columns={columns} edgePadding={false} />);
        const table = screen.getByRole('table');
        const thead = within(table).getAllByRole('rowgroup');
        const cells = within(thead[0]).getAllByRole('columnheader');

        cells.forEach((cell) => {
            expect(cell).not.toHaveClass(`g-table__cell_edge-padding`);
        });
    });

    test('render table with disabled row', () => {
        render(
            <Table
                data={data}
                columns={columns}
                isRowDisabled={(item) => Boolean(item.disabled)}
            />,
        );
        const table = screen.getByRole('table');
        const tbody = within(table).getAllByRole('rowgroup');
        const rows = within(tbody[1]).getAllByRole('row');

        const row = rows.filter((r) => r.className.includes('g-table__row_disabled'));
        expect(row.length).toBe(1);
    });

    test('render table with custrom row className', () => {
        render(
            <Table
                data={data}
                columns={columns}
                getRowClassNames={(_, index) => [`my-class-${index}`]}
            />,
        );
        const table = screen.getByRole('table');
        const tbody = within(table).getAllByRole('rowgroup');
        const rows = within(tbody[1]).getAllByRole('row');

        rows.forEach((row, index) =>
            expect(row.className.includes(`my-class-${index}`)).toBe(true),
        );
    });

    test('add className', () => {
        const className = 'my-class';

        render(<Table data={data} columns={columns} className={className} qa={qaId} />);
        const table = screen.getByTestId(qaId);

        expect(table).toHaveClass(className);
    });

    test('render table with horizontal sticky scroll', () => {
        render(<Table data={data} columns={columns} stickyHorizontalScroll={true} qa={qaId} />);
        const table = screen.getByTestId(qaId);

        expect(table).toHaveClass('g-table_with-sticky-scroll');
    });

    test('call onRowClick', async () => {
        const user = userEvent.setup();
        const handleOnClick = jest.fn();
        render(<Table data={data} columns={columns} onRowClick={handleOnClick} />);

        const table = screen.getByRole('table');
        const tbody = within(table).getAllByRole('rowgroup');
        const rows = within(tbody[1]).getAllByRole('row');
        const promises = rows.map(async (row) => {
            await user.click(row);
        });
        await Promise.all(promises);

        expect(handleOnClick).toHaveBeenCalledTimes(data.length);
    });

    test('render table with horizontal sticky scroll and custom breakpoint', () => {
        const stickyHorizontalScrollBreakpointQa = 'sticky-horizontal-scroll-breakpoint-qa';
        const stickyHorizontalScrollBreakpoint = 777;
        const style = {bottom: `${stickyHorizontalScrollBreakpoint}px`};
        render(
            <Table
                data={data}
                columns={columns}
                stickyHorizontalScroll={true}
                stickyHorizontalScrollBreakpoint={stickyHorizontalScrollBreakpoint}
            />,
        );
        const table = screen.getByTestId(stickyHorizontalScrollBreakpointQa);

        expect(table).toHaveStyle(style);
    });

    test('getRowDescriptor property case', () => {
        const EXPTECTED_CLASS_NAME = 'EXPTECTED_CLASS_NAME';
        const EXPECTED_ID = 'EXPECTED_ID';

        const ROW_ID = 1;

        const getRowDescriptor: TableProps<unknown>['getRowDescriptor'] = (_, index) => {
            if (index === ROW_ID) {
                return {classNames: [EXPTECTED_CLASS_NAME], disabled: true, id: EXPECTED_ID};
            }

            return undefined;
        };

        render(
            <Table data={data} columns={columns} getRowDescriptor={getRowDescriptor} qa={qaId} />,
        );

        const table = screen.getByTestId(qaId);
        const tbody = within(table).getAllByRole('rowgroup');
        const rows = within(tbody[1]).getAllByRole('row');

        expect(rows.length).toBe(data.length);
        expect(rows.length > 1).toBe(true);

        rows.forEach((row, i) => {
            const expectedFlag = ROW_ID === i;

            expect(row.className.includes(EXPTECTED_CLASS_NAME)).toBe(expectedFlag);
            expect(row.className.includes('g-table__row_disabled')).toBe(expectedFlag);
        });
    });

    describe('getRowId static method', () => {
        test('should return index by default', () => {
            const props: TableProps<DataItem> = {data, columns: []};

            expect(Table.getRowId(props, data[0])).toBe('0');
            expect(Table.getRowId(props, data[1])).toBe('1');
            expect(Table.getRowId(props, data[2])).toBe('2');
        });

        test('should use prop as function', () => {
            const getRowIdMock = jest.fn((item: DataItem) => '__id__' + item.name);
            const props: TableProps<DataItem> = {data, columns: [], getRowId: getRowIdMock};
            const id = Table.getRowId(props, data[0]);

            expect(getRowIdMock).toBeCalled();
            expect(id).toBe('__id__' + data[0].name);
        });

        test('should call function with correct arguments', () => {
            const getRowIdMock = jest.fn();
            const props: TableProps<DataItem> = {data, columns: [], getRowId: getRowIdMock};

            Table.getRowId(props, data[0]);
            Table.getRowId(props, data[1]);
            Table.getRowId(props, data[2]);

            expect(getRowIdMock.mock.calls.length).toBe(3);
            expect(getRowIdMock.mock.calls[0]).toEqual([data[0], 0]);
            expect(getRowIdMock.mock.calls[1]).toEqual([data[1], 1]);
            expect(getRowIdMock.mock.calls[2]).toEqual([data[2], 2]);
        });

        test('should use prop as object key', () => {
            const props: TableProps<DataItem> = {data, columns: [], getRowId: 'name'};

            expect(Table.getRowId(props, data[0])).toBe('Nomlanga Compton');
            expect(Table.getRowId(props, data[1])).toBe('Paul Hatfield');
            expect(Table.getRowId(props, data[2])).toBe('Phelan Daniel');
        });

        test('should fallback to index on prop as object key', () => {
            const props: TableProps<DataItem> = {data, columns: [], getRowId: 'ts'};

            expect(Table.getRowId(props, data[0])).toBe('0');
            expect(Table.getRowId(props, data[1])).toBe('1');
            expect(Table.getRowId(props, data[2])).toBe('2');
        });
    });

    describe('getHeadCellContent static method', () => {
        test('should return id prop value by default', () => {
            const column: TableColumnConfig<DataItem> = {id: 'name'};
            const {container} = render(Table.getHeadCellContent(column) as React.ReactElement);

            expect(container).toHaveTextContent('name');
        });

        test('should use name prop as function', () => {
            const nameMock = jest.fn(() => '__name__');
            const column: TableColumnConfig<DataItem> = {id: 'name', name: nameMock};
            const {container} = render(Table.getHeadCellContent(column) as React.ReactElement);

            expect(nameMock).toBeCalled();
            expect(container).toHaveTextContent('__name__');
        });

        test('should call function with correct arguments', () => {
            const nameMock = jest.fn(() => '__name__');
            const column: TableColumnConfig<DataItem> = {id: 'name', name: nameMock};
            Table.getHeadCellContent(column);

            expect(nameMock.mock.calls.length).toBe(1);
            expect(nameMock.mock.calls[0]).toEqual([]);
        });

        test('should use name prop as string', () => {
            const column: TableColumnConfig<DataItem> = {id: 'name', name: '__name__'};
            const {container} = render(Table.getHeadCellContent(column) as React.ReactElement);

            expect(container).toHaveTextContent('__name__');
        });
    });

    describe('getBodyCellContent static method', () => {
        test('should return dash by default', () => {
            const column: TableColumnConfig<DataItem> = {id: '__unknown__'};
            const content = Table.getBodyCellContent(column, data[0], 0);

            expect(content).toBe('\u2014');
        });

        test('should return placeholder on empty value', () => {
            const column: TableColumnConfig<any> = {id: 'name', placeholder: '-'};
            const items = [{id: 'asdf'}, {name: null}, {name: undefined}, {name: ''}];

            expect(Table.getBodyCellContent(column, items[0], 0)).toBe('-');
            expect(Table.getBodyCellContent(column, items[0], 1)).toBe('-');
            expect(Table.getBodyCellContent(column, items[0], 2)).toBe('-');
            expect(Table.getBodyCellContent(column, items[0], 3)).toBe('-');
        });

        test('should use template prop as function', () => {
            const templateMock = jest.fn(() => '__content__');
            const column: TableColumnConfig<DataItem> = {id: 'name', template: templateMock};
            const content = Table.getBodyCellContent(column, data[0], 0);

            expect(templateMock).toBeCalled();
            expect(content).toBe('__content__');
        });

        test('should call function with correct arguments', () => {
            const templateMock = jest.fn();
            const column: TableColumnConfig<DataItem> = {id: 'name', template: templateMock};
            Table.getBodyCellContent(column, data[0], 0);
            Table.getBodyCellContent(column, data[1], 1);
            Table.getBodyCellContent(column, data[2], 2);

            expect(templateMock.mock.calls.length).toBe(3);
            expect(templateMock.mock.calls[0]).toEqual([data[0], 0]);
            expect(templateMock.mock.calls[1]).toEqual([data[1], 1]);
            expect(templateMock.mock.calls[2]).toEqual([data[2], 2]);
        });

        test('should use template prop as object key', () => {
            const column1: TableColumnConfig<DataItem> = {id: 'name', template: 'count'};
            const column2: TableColumnConfig<DataItem> = {id: 'name', template: 'city'};

            expect(Table.getBodyCellContent(column1, data[0], 0)).toBe(82);
            expect(Table.getBodyCellContent(column1, data[1], 1)).toBe(51);
            expect(Table.getBodyCellContent(column1, data[2], 2)).toBe(10);
            expect(Table.getBodyCellContent(column2, data[0], 0)).toBe('Erli');
            expect(Table.getBodyCellContent(column2, data[1], 1)).toBe('Campitello di Fassa');
            expect(Table.getBodyCellContent(column2, data[2], 2)).toBe('Meugliano');
        });

        test('should use id prop as object key', () => {
            const column: TableColumnConfig<DataItem> = {id: 'name'};

            expect(Table.getBodyCellContent(column, data[0], 0)).toBe('Nomlanga Compton');
            expect(Table.getBodyCellContent(column, data[1], 1)).toBe('Paul Hatfield');
            expect(Table.getBodyCellContent(column, data[2], 2)).toBe('Phelan Daniel');
        });
    });
});
