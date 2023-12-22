import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Table, TableColumnConfig} from '../../../Table';
import {TableSettingsData, withTableSettings} from '../withTableSettings';

const item = {name: 'John Doe', occupation: 'Worker'};

const TableWithSettings = withTableSettings<typeof item>(Table);

const columns: TableColumnConfig<typeof item>[] = [
    {
        id: 'name',
    },
    {
        id: 'occupation',
    },
];

const data = [item];

const settings: TableSettingsData = columns.map((column) => ({id: column.id, isSelected: true}));

test('should change table columns', async () => {
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
    await userEvent.click(await screen.findByRole('button', {name: 'occupation'}));
    await userEvent.click(screen.getByRole('button', {name: 'Apply'}));

    expect(updateSettings).toHaveBeenCalledWith([
        {
            id: 'name',
            isSelected: true,
        },
        {
            id: 'occupation',
            isSelected: false,
        },
    ]);
});
