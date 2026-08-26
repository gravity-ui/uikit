import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

import {ComboboxHarness, GROUPS, mockLayout, scrollTo} from './helpers';
import type {Project} from './helpers';

const LETTERS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];

const PROJECTS: Project[] = [
    {id: 'a', name: 'Alpha'},
    {id: 'b', name: 'Bravo'},
    {id: 'c', name: 'Charlie', disabled: true},
    {id: 'd', name: 'Delta'},
    {id: 'e', name: 'Echo'},
];

async function shiftClick(user: ReturnType<typeof userEvent.setup>, element: HTMLElement) {
    await user.keyboard('{Shift>}');
    await user.click(element);
    await user.keyboard('{/Shift}');
}

describe('lab List: range selection (selection layer, phase 7)', () => {
    describe('Shift+click', () => {
        test('selects the range from the anchor to the target in data order, in both directions', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo']);

            await shiftClick(user, options[3]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie', 'Delta']);
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'false',
                'true',
                'true',
                'true',
                'false',
                'false',
            ]);

            await user.click(options[3]);
            await shiftClick(user, options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie', 'Delta']);
        });

        test('a second Shift+click replaces the range part from the same anchor', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[4]);
            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Echo', 'Bravo']);

            await shiftClick(user, options[3]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith([
                'Echo',
                'Bravo',
                'Charlie',
                'Delta',
            ]);

            await shiftClick(user, options[2]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Echo', 'Bravo', 'Charlie']);
            expect(options[3]).toHaveAttribute('aria-selected', 'false');
        });

        test('Shift+click without a prior selection gesture anchors at the target', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await shiftClick(user, options[2]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Charlie']);
        });

        test('a deselecting click also re-anchors', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[1]);
            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith([]);

            await shiftClick(user, options[3]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie', 'Delta']);
        });

        test('disabled options inside the range are not selected', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[1]);
            await shiftClick(user, options[4]);

            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['b', 'd', 'e']);
            expect(options[2]).toHaveAttribute('aria-selected', 'false');
        });

        test('range through a section: options on both sides are selected, headers are not in the range', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Groups"
                    items={GROUPS}
                    getItemContent={(item) => item.label}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            await shiftClick(user, options[2]);

            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['r1', 'a1', 'a2']);
            expect(screen.getByText('All')).not.toHaveAttribute('aria-selected');
        });

        test('onItemAction fires on Shift+click after the selection update', async () => {
            const user = userEvent.setup();
            const calls: string[] = [];
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={(ids) => calls.push(`selected:${ids.join(',')}`)}
                    onItemAction={(id) => calls.push(`action:${id}`)}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            await shiftClick(user, options[2]);

            expect(calls).toEqual([
                'selected:Alpha',
                'action:Alpha',
                'selected:Alpha,Bravo,Charlie',
                'action:Charlie',
            ]);
        });
    });

    describe('Shift+arrows', () => {
        test('Shift+ArrowDown extends the range and moves activity with the boundary', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[1]);

            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie']);
            expect(options[2]).toHaveFocus();

            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie', 'Delta']);
            expect(options[3]).toHaveFocus();
        });

        test('Shift+ArrowUp back shrinks the range and passes through the anchor', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[2]);
            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Charlie', 'Delta']);

            await user.keyboard('{Shift>}{ArrowUp}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Charlie']);
            expect(options[2]).toHaveFocus();

            await user.keyboard('{Shift>}{ArrowUp}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie']);
            expect(options[1]).toHaveFocus();
        });

        test('Shift+arrow does not wrap at the edges, plain arrows keep wrapping', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[5]);
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);

            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(options[5]).toHaveFocus();
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);

            await user.keyboard('{ArrowDown}');
            expect(options[0]).toHaveFocus();
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);
        });

        test('Shift+ArrowDown without a prior selection gesture selects only the boundary row', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            expect(options[0]).toHaveFocus();

            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo']);

            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie']);
        });

        test('Shift+arrows skip disabled options together with navigation', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[1]);
            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');

            expect(options[3]).toHaveFocus();
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['b', 'd']);
            expect(options[2]).toHaveAttribute('aria-selected', 'false');
        });
    });

    describe('Shift+Space', () => {
        test('selects the range from the anchor to the active row and applies it', async () => {
            const user = userEvent.setup();
            const calls: string[] = [];
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={(ids) => calls.push(`selected:${ids.join(',')}`)}
                    onItemAction={(id) => calls.push(`action:${id}`)}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            await user.keyboard('{ArrowDown}{ArrowDown}');
            expect(options[2]).toHaveFocus();

            await user.keyboard('{Shift>} {/Shift}');

            expect(calls).toEqual([
                'selected:Alpha',
                'action:Alpha',
                'selected:Alpha,Bravo,Charlie',
                'action:Charlie',
            ]);
        });

        test('with a non-empty typeahead buffer Shift+Space stays part of the search', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Colors"
                    items={['Blue whale', 'Blueberry']}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('blue');
            expect(options[1]).toHaveFocus();

            await user.keyboard('{Shift>} {/Shift}');
            expect(options[0]).toHaveFocus();
            expect(onSelectedUpdate).not.toHaveBeenCalled();
        });
    });

    describe('Ctrl/Cmd+A', () => {
        test('selects all non-disabled options in data order, Cmd works like Ctrl', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('{Control>}a{/Control}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['a', 'b', 'd', 'e']);
            expect(options[2]).toHaveAttribute('aria-selected', 'false');

            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['a', 'd', 'e']);

            await user.keyboard('{Meta>}a{/Meta}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['a', 'b', 'd', 'e']);
        });

        test('repeated Ctrl+A does not fire the callback: the selection did not change', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );

            await user.tab();
            await user.keyboard('{Control>}a{/Control}');
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);

            await user.keyboard('{Control>}a{/Control}');
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);
        });

        test('does not move the anchor', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[2]);
            await user.keyboard('{Control>}a{/Control}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(LETTERS);

            await shiftClick(user, options[4]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith([
                'Alpha',
                'Bravo',
                'Delta',
                'Echo',
                'Foxtrot',
                'Charlie',
            ]);
        });

        test('is ignored in single mode and left to the browser', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="single"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('{Control>}a{/Control}');
            expect(onSelectedUpdate).not.toHaveBeenCalled();

            const notPrevented = fireEvent.keyDown(options[0], {
                key: 'a',
                code: 'KeyA',
                ctrlKey: true,
            });
            expect(notPrevented).toBe(true);
        });

        test('matches the physical KeyA on non-latin layouts', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            const prevented = !fireEvent.keyDown(options[0], {
                key: 'ф',
                code: 'KeyA',
                ctrlKey: true,
            });
            expect(prevented).toBe(true);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(LETTERS);
        });
    });

    describe('single ignores Shift', () => {
        test('Shift+click and Shift+Space behave like plain gestures (radio semantics)', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="single"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo']);

            await shiftClick(user, options[3]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Delta']);
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'false',
                'false',
                'false',
                'true',
                'false',
                'false',
            ]);

            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Shift>} {/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Echo']);
        });

        test('Shift+arrow is plain navigation: no selection change and wrapping is kept', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="single"
                    defaultSelectedIds={['Bravo']}
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[5]);
            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');

            expect(options[0]).toHaveFocus();
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Foxtrot']);
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);
        });
    });

    describe('without the selection layer', () => {
        test('Shift gestures stay plain: no selection semantics, arrows keep wrapping', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<List aria-label="Letters" items={LETTERS} onItemAction={onItemAction} />);
            const options = screen.getAllByRole('option');

            await shiftClick(user, options[5]);
            expect(onItemAction).toHaveBeenLastCalledWith(
                'Foxtrot',
                'Foxtrot',
                expect.objectContaining({type: 'click', shiftKey: true}),
            );
            expect(options[5]).not.toHaveAttribute('aria-selected');

            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(options[0]).toHaveFocus();
        });
    });

    describe('controlled selection', () => {
        test('the callback gets the full batch, the DOM follows the prop', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    selectedIds={['Bravo']}
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await shiftClick(user, options[3]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Delta']);

            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'false',
                'true',
                'false',
                'false',
                'false',
                'false',
            ]);

            await shiftClick(user, options[2]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie', 'Delta']);
        });

        test('controlled parent applying updates: range gestures accumulate', async () => {
            const user = userEvent.setup();

            function ControlledList() {
                const [selected, setSelected] = React.useState<string[]>([]);
                return (
                    <List
                        aria-label="Letters"
                        items={LETTERS}
                        selectionMode="multiple"
                        selectedIds={selected}
                        onSelectedUpdate={setSelected}
                    />
                );
            }

            render(<ControlledList />);
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            await shiftClick(user, options[2]);
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'true',
                'true',
                'true',
                'false',
                'false',
                'false',
            ]);

            await shiftClick(user, options[1]);
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'true',
                'true',
                'false',
                'false',
                'false',
                'false',
            ]);
        });
    });

    describe('anchor lifecycle on items change', () => {
        test('anchor row removal: the next Shift gesture anchors at its target', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            const {rerender} = render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );

            await user.click(screen.getByRole('option', {name: 'Bravo'}));
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo']);

            rerender(
                <List
                    aria-label="Letters"
                    items={LETTERS.filter((letter) => letter !== 'Bravo')}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );

            await shiftClick(user, screen.getByRole('option', {name: 'Delta'}));
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Delta']);
        });

        test('the previous range end disappearing: the old range part is not subtracted', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            const {rerender} = render(
                <List
                    aria-label="Letters"
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );

            await user.click(screen.getByRole('option', {name: 'Bravo'}));
            await shiftClick(user, screen.getByRole('option', {name: 'Delta'}));
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie', 'Delta']);

            rerender(
                <List
                    aria-label="Letters"
                    items={LETTERS.filter((letter) => letter !== 'Delta')}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );

            await shiftClick(user, screen.getByRole('option', {name: 'Echo'}));
            expect(onSelectedUpdate).toHaveBeenLastCalledWith([
                'Bravo',
                'Charlie',
                'Delta',
                'Echo',
            ]);
        });
    });

    describe('activedescendant mode (focus owner)', () => {
        test('Shift+ArrowDown from the owner input extends the range', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <ComboboxHarness
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const input = screen.getByRole('combobox');
            const options = screen.getAllByRole('option');

            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo']);

            await user.click(input);
            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');

            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie']);
            expect(input).toHaveFocus();
            expect(input).toHaveAttribute('aria-activedescendant', options[2].id);
        });

        test('Ctrl+A belongs to the owner input and is not intercepted', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <ComboboxHarness
                    items={LETTERS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const input = screen.getByRole('combobox');

            await user.click(input);
            const notPrevented = fireEvent.keyDown(input, {
                key: 'a',
                code: 'KeyA',
                ctrlKey: true,
            });
            expect(notPrevented).toBe(true);
            expect(onSelectedUpdate).not.toHaveBeenCalled();
        });
    });

    describe('virtualization: the range is computed over data, not over the DOM', () => {
        const VIEWPORT_HEIGHT = 400;
        const ROW_HEIGHT = 36;
        const ITEMS = Array.from({length: 200}, (_, index) => `Item ${index + 1}`);
        mockLayout({viewport: VIEWPORT_HEIGHT, row: ROW_HEIGHT});

        test('Shift+click selects range rows unloaded from the window', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List
                        aria-label="Logs"
                        items={ITEMS}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                        selectionMode="multiple"
                        onSelectedUpdate={onSelectedUpdate}
                    />
                </ListVirtualizer>,
            );
            const listbox = screen.getByRole('listbox');

            await user.click(screen.getByRole('option', {name: 'Item 1'}));
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Item 1']);

            scrollTo(listbox, ROW_HEIGHT * 150);
            expect(screen.queryByRole('option', {name: 'Item 75'})).not.toBeInTheDocument();

            await shiftClick(user, screen.getByRole('option', {name: 'Item 151'}));

            const expected = Array.from({length: 151}, (_, index) => `Item ${index + 1}`);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(expected);
            expect(screen.getByRole('option', {name: 'Item 151'})).toHaveAttribute(
                'aria-selected',
                'true',
            );
            expect(screen.queryByRole('option', {name: 'Item 75'})).not.toBeInTheDocument();
        });
    });
});
