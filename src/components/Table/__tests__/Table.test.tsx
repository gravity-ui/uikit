import React from 'react';

import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Table} from '../Table';

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
                expect(row).toHaveClass(`yc-table__row_vertical-align_${align}`);
            });
        },
    );

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
            expect(cell).toHaveClass(`yc-table__cell_edge-padding`);
        });
    });

    test('render table without edge padding', () => {
        render(<Table data={data} columns={columns} edgePadding={false} />);
        const table = screen.getByRole('table');
        const thead = within(table).getAllByRole('rowgroup');
        const cells = within(thead[0]).getAllByRole('columnheader');

        cells.forEach((cell) => {
            expect(cell).not.toHaveClass(`yc-table__cell_edge-padding`);
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

        const row = rows.filter((r) => r.className.includes('yc-table__row_disabled'));
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

        expect(table).toHaveClass('yc-table_with-sticky-scroll');
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
});
