import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import {useListFocusOwner} from '../useListFocusOwner';

// The range gestures of the selection layer — Shift+click, Shift+arrows,
// Shift+Space, Ctrl/Cmd+A. The reference behavior is
// SelectionManager/useSelectableCollection of react-aria; the deliberate
// deviations are called out in the tests themselves

const LETTERS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];

interface Project {
    id: string;
    name: string;
    disabled?: boolean;
}

const PROJECTS: Project[] = [
    {id: 'a', name: 'Alpha'},
    {id: 'b', name: 'Bravo'},
    {id: 'c', name: 'Charlie', disabled: true},
    {id: 'd', name: 'Delta'},
    {id: 'e', name: 'Echo'},
];

const GROUPS = [
    {id: 'recent', label: 'Recent', children: [{id: 'r1', label: 'First'}]},
    {
        id: 'all',
        label: 'All',
        children: [
            {id: 'a1', label: 'Second'},
            {id: 'a2', label: 'Third'},
        ],
    },
];

async function shiftClick(user: ReturnType<typeof userEvent.setup>, element: HTMLElement) {
    await user.keyboard('{Shift>}');
    await user.click(element);
    await user.keyboard('{/Shift}');
}

describe('lab List: range selection (selection layer, phase 7)', () => {
    describe('Shift+click', () => {
        test('selects the range from the anchor to the target in data order', async () => {
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
        });

        test('range above the anchor: the batch is still appended in data order', async () => {
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

            await user.click(options[3]);
            await shiftClick(user, options[1]);

            // The gesture goes upwards while the batch stays top-down in data
            // order
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie', 'Delta']);
        });

        test('a second Shift+click replaces the range part from the same anchor and keeps selection outside of it', async () => {
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

            // Echo is selected by a separate toggle and lies outside the range
            await user.click(options[4]);
            // A plain click re-anchors: the anchor is Bravo
            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Echo', 'Bravo']);

            await shiftClick(user, options[3]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith([
                'Echo',
                'Bravo',
                'Charlie',
                'Delta',
            ]);

            // The range part Bravo..Delta is replaced with Bravo..Charlie;
            // Echo (outside the range) is untouched
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

            // There is no anchor yet — the range degenerates into the target
            // itself (react-aria: anchorKey ?? toKey)
            await shiftClick(user, options[2]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Charlie']);
        });

        test('a deselecting click also re-anchors (deviation from react-aria, spec of the phase)', async () => {
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
            // Toggling off: the selection is empty, but the anchor stays on Bravo
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
            // The header between them stays presentation, with no aria-selected
            expect(screen.getByText('All')).not.toHaveAttribute('aria-selected');
        });

        test('onItemAction fires on Shift+click after the selection update, like on a plain gesture', async () => {
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
            // The activity (and focus) move together with the range boundary
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

            // Back to the anchor
            await user.keyboard('{Shift>}{ArrowUp}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Charlie']);
            expect(options[2]).toHaveFocus();

            // Through the anchor: the range turns upwards
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

            // At the edge Shift+arrow does nothing: neither wrapping the
            // activity around nor changing the selection
            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(options[5]).toHaveFocus();
            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);

            // A plain arrow without Shift keeps wrapping around as before
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

            // Tab-in activates the first row, but there is no anchor yet
            await user.tab();
            expect(options[0]).toHaveFocus();

            // Without an anchor the range degenerates into the target
            // (react-aria: anchorKey ?? toKey) — Alpha is NOT selected
            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo']);

            // The boundary has become the anchor — the next step continues the
            // range
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
            // Charlie is disabled: the activity jumps over it to Delta, and the
            // range b..d selects b and d only
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
            // Arrows without Shift move the activity only — the anchor stays on
            // Alpha
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

            // The buffer is not empty — the space goes into the search even
            // with Shift held down
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

            // Knock one row out and bring everything back with Cmd
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

        test('does not move the anchor: the next Shift gesture continues from the previous anchor', async () => {
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

            // The anchor stayed on Charlie: only the range part
            // Charlie..Charlie is replaced, the rest of the selection is
            // untouched (in react-aria the gesture would collapse the 'all'
            // sentinel into a single row — we have no sentinel, the selection
            // is materialized)
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

            // The key is not intercepted — preventDefault was not called
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
            // Ctrl+ф on a ЙЦУКЕН keyboard: key is Cyrillic, the physical code
            // is KeyA
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

            // Navigation wraps around as it does without Shift; the arrow does
            // not change the selection
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
        test('the range callback gets the full computed batch, DOM follows only the prop', async () => {
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

            // There is no anchor — the target is the anchor; the batch is
            // computed from the value of the prop
            await shiftClick(user, options[3]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Delta']);

            // The parent did not apply the update: the DOM still follows the prop
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'false',
                'true',
                'false',
                'false',
                'false',
                'false',
            ]);

            // The next gesture is computed from the prop again: the anchor is
            // Delta and the range is Charlie..Delta
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

            // The anchor is gone — the gesture re-anchors at the target
            // (react-aria would keep the stale anchor, and the gesture would
            // silently not change the selection); the id of the vanished row
            // stays in the selection latently (the semantics of a controlled set)
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

            // The boundary of the old range is gone from the data — it cannot
            // be computed, so nothing is subtracted (react-aria: getKeyRange
            // for a missing key is empty); the new range is added
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
        function ComboboxHarness({onSelectedUpdate}: {onSelectedUpdate: (ids: string[]) => void}) {
            const focusOwner = useListFocusOwner();
            return (
                <React.Fragment>
                    <input {...focusOwner.getInputProps({'aria-label': 'Filter'})} />
                    <List
                        aria-label="Letters"
                        items={LETTERS}
                        selectionMode="multiple"
                        onSelectedUpdate={onSelectedUpdate}
                        focusOwner={focusOwner}
                    />
                </React.Fragment>
            );
        }

        test('Shift+ArrowDown from the owner input extends the range and moves aria-activedescendant', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(<ComboboxHarness onSelectedUpdate={onSelectedUpdate} />);
            const input = screen.getByRole('combobox');
            const options = screen.getAllByRole('option');

            // The anchor comes from a click on an option (in this mode Space
            // goes to the input)
            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo']);

            await user.click(input);
            await user.keyboard('{Shift>}{ArrowDown}{/Shift}');

            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Bravo', 'Charlie']);
            // DOM focus has not left the input; the active row is led by
            // aria-activedescendant — the range boundary moves along with it
            expect(input).toHaveFocus();
            expect(input).toHaveAttribute('aria-activedescendant', options[2].id);
        });

        test('Ctrl+A belongs to the owner input and is not intercepted', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(<ComboboxHarness onSelectedUpdate={onSelectedUpdate} />);
            const input = screen.getByRole('combobox');

            await user.click(input);
            // Selecting the text in the input is left to the browser:
            // preventDefault was not called and the select-all of the list does
            // not fire
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

        let offsetHeightSpy: jest.SpyInstance;
        let offsetWidthSpy: jest.SpyInstance;

        beforeEach(() => {
            offsetHeightSpy = jest
                .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
                .mockImplementation(function (this: HTMLElement) {
                    if (this.getAttribute('role') === 'listbox') {
                        return VIEWPORT_HEIGHT;
                    }
                    return ROW_HEIGHT;
                });
            offsetWidthSpy = jest
                .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
                .mockReturnValue(300);
        });

        afterEach(() => {
            offsetHeightSpy.mockRestore();
            offsetWidthSpy.mockRestore();
        });

        // jsdom does not implement scrolling: scrollTop is set directly and the
        // event is fired by hand
        function scrollTo(element: HTMLElement, top: number) {
            Object.defineProperty(element, 'scrollTop', {
                configurable: true,
                writable: true,
                value: top,
            });
            fireEvent.scroll(element);
        }

        function renderVirtualized(onSelectedUpdate: jest.Mock) {
            return render(
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
        }

        test('Shift+click selects range rows unloaded from the window', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            renderVirtualized(onSelectedUpdate);
            const listbox = screen.getByRole('listbox');

            await user.click(screen.getByRole('option', {name: 'Item 1'}));
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Item 1']);

            // The window travels far away from the anchor; the anchor itself
            // (the active row) is pinned and stays in the DOM
            scrollTo(listbox, ROW_HEIGHT * 150);
            expect(screen.queryByRole('option', {name: 'Item 75'})).not.toBeInTheDocument();

            await shiftClick(user, screen.getByRole('option', {name: 'Item 151'}));

            // The range is computed over the data: 151 rows, the ones invisible
            // outside the window included
            const expected = Array.from({length: 151}, (_, index) => `Item ${index + 1}`);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(expected);
            expect(screen.getByRole('option', {name: 'Item 151'})).toHaveAttribute(
                'aria-selected',
                'true',
            );
            // The rows in the middle of the range never got mounted
            expect(screen.queryByRole('option', {name: 'Item 75'})).not.toBeInTheDocument();
        });

        test('Ctrl+A materializes all options over data under virtualization', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            renderVirtualized(onSelectedUpdate);

            await user.tab();
            await user.keyboard('{Control>}a{/Control}');

            expect(onSelectedUpdate).toHaveBeenLastCalledWith(ITEMS);
        });
    });
});
