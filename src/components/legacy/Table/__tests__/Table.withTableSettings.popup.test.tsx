import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen, waitFor} from '../../../../../test-utils/utils';
import {TableColumnSetup} from '../../TableColumnSetup';
import {Table} from '../Table';
import type {TableColumnConfig} from '../Table';
import type {TableSettingsData} from '../hoc/withTableSettings/withTableSettings';
import {withTableSettings} from '../hoc/withTableSettings/withTableSettings';

interface Item {
    id: string;
}

// A sticky required column first, a sticky column last, three sortable ones in between
const columns: TableColumnConfig<Item>[] = [
    {id: 'first', sticky: 'start', meta: {selectedAlways: true}},
    {id: 'id'},
    {id: 'name'},
    {id: 'description'},
    {id: 'last', sticky: 'end'},
];

const settings: TableSettingsData = columns.map(({id}) => ({id, isSelected: true}));

const TableWithSettings = withTableSettings<Item>({sortable: true, filterable: true})(Table);

function renderTable({settingsFilterEmptyMessage}: {settingsFilterEmptyMessage?: string} = {}) {
    const updateSettings = jest.fn();

    render(
        <TableWithSettings
            columns={columns}
            data={[{id: 'a'}]}
            settings={settings}
            updateSettings={updateSettings}
            settingsFilterEmptyMessage={settingsFilterEmptyMessage}
        />,
    );

    return {updateSettings};
}

const openSettings = () => userEvent.click(screen.getByRole('button', {name: 'Table settings'}));

// A row is an option, or a button once the drag handle props of a sortable row override its role
const getRow = (name: string) =>
    screen.queryByRole('option', {name}) ?? screen.getByRole('button', {name});

const isSelected = (name: string) => getRow(name).getAttribute('aria-selected') === 'true';

// The keyboard of the rows is handled by the list container
const focusList = () => act(() => screen.getByRole('listbox').focus());

const apply = () => userEvent.click(screen.getByRole('button', {name: 'Apply'}));

describe('withTableSettings popup', () => {
    test('arrows move the active row around the list, Enter and Space toggle it', async () => {
        const {updateSettings} = renderTable();
        await openSettings();
        focusList();

        // Up from no active row lands on the last one
        await userEvent.keyboard('{ArrowUp}{Enter}');
        expect(isSelected('last')).toBe(false);

        // Down from the last one wraps to the first
        await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
        expect(isSelected('id')).toBe(false);

        await userEvent.keyboard('{ArrowDown}{ }');
        expect(isSelected('name')).toBe(false);

        await userEvent.keyboard('{ }');
        expect(isSelected('name')).toBe(true);

        await apply();
        expect(updateSettings).toHaveBeenCalledWith([
            {id: 'first', isSelected: true},
            {id: 'id', isSelected: false},
            {id: 'name', isSelected: true},
            {id: 'description', isSelected: true},
            {id: 'last', isSelected: false},
        ]);
    });

    test('the active row is reset when the popup closes', async () => {
        const {updateSettings} = renderTable();
        await openSettings();
        focusList();

        await userEvent.keyboard('{ArrowDown}{ArrowDown}{Escape}');
        await openSettings();
        focusList();
        // No active row: Enter changes nothing, the next Down starts from the first row
        await userEvent.keyboard('{Enter}{ArrowDown}{ArrowDown}{Enter}');

        await apply();
        expect(updateSettings).toHaveBeenCalledWith(
            settings.map(({id}) => ({id, isSelected: id !== 'id'})),
        );
    });

    test('a required column stays selected', async () => {
        const {updateSettings} = renderTable();
        await openSettings();

        await userEvent.click(getRow('first'));
        await apply();

        expect(updateSettings).toHaveBeenCalledWith(settings);
    });

    test('only the rows between the sticky ones are draggable', async () => {
        renderTable();
        await openSettings();

        const draggable = (name: string) =>
            getRow(name).hasAttribute('data-rfd-drag-handle-draggable-id');

        expect(['first', 'id', 'name', 'description', 'last'].map(draggable)).toEqual([
            false,
            true,
            true,
            true,
            false,
        ]);
    });

    test('a filter without matches shows the empty message, clearing it brings the rows back', async () => {
        renderTable({settingsFilterEmptyMessage: 'Nothing found'});
        await openSettings();

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'zzz'}});
        expect(await screen.findByText('Nothing found')).toBeVisible();
        expect(screen.queryAllByRole('option')).toHaveLength(0);

        fireEvent.change(input, {target: {value: ''}});
        await waitFor(() => expect(getRow('description')).toBeVisible());
    });

    test('reset brings back the default settings', async () => {
        const updateSettings = jest.fn();
        render(
            <TableWithSettings
                columns={columns}
                data={[{id: 'a'}]}
                settings={settings}
                updateSettings={updateSettings}
                showResetButton
                defaultSettings={settings.map(({id}) => ({id, isSelected: id !== 'name'}))}
            />,
        );
        await openSettings();

        await userEvent.click(getRow('id'));
        await userEvent.click(screen.getByRole('button', {name: 'Reset'}));
        await apply();

        expect(updateSettings).toHaveBeenCalledWith(
            settings.map(({id}) => ({id, isSelected: id !== 'name'})),
        );
    });
});

describe('TableColumnSetup', () => {
    test('applies the toggled items keeping the required ones', async () => {
        const onUpdate = jest.fn();
        render(
            <TableColumnSetup
                items={[
                    {id: 'a', title: 'A', selected: true, required: true},
                    {id: 'b', title: 'B', selected: false},
                    {id: 'c', title: 'C', selected: true, sticky: 'end'},
                ]}
                onUpdate={onUpdate}
            />,
        );

        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(getRow('B'));
        await userEvent.click(getRow('C'));
        await apply();

        expect(onUpdate).toHaveBeenCalledWith([
            expect.objectContaining({id: 'a', selected: true, required: true}),
            expect.objectContaining({id: 'b', selected: true}),
            expect.objectContaining({id: 'c', selected: false}),
        ]);
    });
});
