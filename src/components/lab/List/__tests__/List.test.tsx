import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen} from '../../../../../test-utils/utils';
import {Label} from '../../../Label';
import {List} from '../List';
import type {ListItemViewStateProps} from '../types';

import {FRUITS, GROUPS, PROJECTS, createTracker, mockTabbableDisplayCheck} from './helpers';

mockTabbableDisplayCheck();

describe('lab List', () => {
    describe('rendering and ARIA', () => {
        test('renders a listbox with options from an array of strings', () => {
            render(<List aria-label="Fruits" items={FRUITS} />);

            expect(screen.getByRole('listbox')).toHaveAccessibleName('Fruits');
            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(4);
            expect(options.map((option) => option.textContent)).toEqual(FRUITS);
        });

        test('options reference their section header via aria-describedby', () => {
            render(
                <List aria-label="Groups" items={GROUPS} getItemContent={(item) => item.label} />,
            );

            const option = screen.getByRole('option', {name: 'First'});
            expect(option).toHaveAttribute('aria-describedby', screen.getByText('Recent').id);
            expect(option).toHaveAccessibleDescription('Recent');
        });

        test('options outside of sections carry no aria-describedby', () => {
            render(<List aria-label="Fruits" items={FRUITS} />);

            for (const option of screen.getAllByRole('option')) {
                expect(option).not.toHaveAttribute('aria-describedby');
            }
        });

        test('does not create selection semantics without the selection layer', () => {
            render(<List aria-label="Fruits" items={FRUITS} defaultActiveItemId="Apple" />);

            expect(screen.getByRole('listbox')).not.toHaveAttribute('aria-multiselectable');
            for (const option of screen.getAllByRole('option')) {
                expect(option).not.toHaveAttribute('aria-selected');
            }
        });

        test('renders a flat ARIA structure: rows are direct children of the listbox in data order', () => {
            render(
                <List
                    id="flat-list"
                    aria-label="Groups"
                    items={[{id: 'g', label: 'Group', children: [{id: 'g-1', label: 'Option'}]}]}
                    getItemContent={(item) => item.label}
                />,
            );

            const listbox = screen.getByRole('listbox');
            // eslint-disable-next-line testing-library/no-node-access
            const rows = Array.from(listbox.children);
            expect(rows).toHaveLength(2);

            const [header, option] = rows;
            expect(header).toHaveAttribute('role', 'presentation');
            expect(header).toHaveAttribute('aria-hidden', 'true');
            expect(header).not.toHaveAttribute('tabindex');
            expect(header).toHaveAttribute('id', 'flat-list-item-g');

            expect(option).toHaveAttribute('role', 'option');
            expect(option).toHaveAttribute('id', 'flat-list-item-g-1');
            expect(option).toHaveAttribute('tabindex', '0');
        });

        test('item DOM ids are injective: "a b" and "a_b" do not collide', () => {
            render(<List id="enc-list" aria-label="Items" items={['a b', 'a_b']} />);

            const ids = screen.getAllByRole('option').map((option) => option.id);
            expect(new Set(ids).size).toBe(2);
            expect(ids).toEqual(['enc-list-item-a%20b', 'enc-list-item-a_b']);
        });

        test('empty items render a container without a tab stop', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Empty" items={[]} />);

            expect(screen.getByRole('listbox')).toBeInTheDocument();
            expect(screen.queryAllByRole('option')).toHaveLength(0);

            await user.tab();
            expect(document.body).toHaveFocus();
        });

        test('forwards ref to the root element', () => {
            const ref = React.createRef<HTMLDivElement>();
            render(<List ref={ref} aria-label="Fruits" items={FRUITS} />);

            expect(ref.current).toBe(screen.getByRole('listbox'));
        });

        test('containerProps reach the root and are composed with the dedicated props', async () => {
            const user = userEvent.setup();
            const onScroll = jest.fn();
            const onFocus = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    className="own"
                    style={{width: 200}}
                    containerProps={{
                        'data-testid': 'root',
                        className: 'extra',
                        style: {maxHeight: 100},
                        onScroll,
                        onFocus,
                    }}
                />,
            );
            const root = screen.getByRole('listbox');

            expect(root).toHaveAttribute('data-testid', 'root');
            expect(root).toHaveClass('own', 'extra');
            expect(root).toHaveStyle({width: '200px', maxHeight: '100px'});

            fireEvent.scroll(root);
            expect(onScroll).toHaveBeenCalledTimes(1);

            await user.tab();
            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(screen.getAllByRole('option')[0]).toHaveFocus();
            expect(screen.getAllByRole('option')[0]).toHaveAttribute('data-active');
        });
    });

    describe('keyboard: roving focus', () => {
        test('a command whose target is active already still brings focus to it', async () => {
            const user = userEvent.setup();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                />,
            );
            const alpha = screen.getByRole('option', {name: 'Alpha'});
            const beta = screen.getByRole('option', {name: 'Beta'});

            await user.tab();
            expect(alpha).toHaveFocus();

            act(() => beta.focus());
            expect(beta).toHaveFocus();
            expect(alpha).toHaveAttribute('data-active');

            await user.keyboard('{Home}');
            expect(alpha).toHaveFocus();
        });

        test('list is a single tab stop, first navigable option receives focus', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} />);
            const options = screen.getAllByRole('option');

            await user.tab();

            expect(options[0]).toHaveFocus();
            expect(options[0]).toHaveAttribute('tabindex', '0');
            expect(options[1]).toHaveAttribute('tabindex', '-1');
        });

        test('ArrowDown/ArrowUp move focus and active state with cycling', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(options[1]).toHaveFocus();
            expect(options[1]).toHaveAttribute('data-active');
            expect(options[0]).not.toHaveAttribute('data-active');

            await user.keyboard('{ArrowUp}{ArrowUp}');
            expect(options[3]).toHaveFocus();

            await user.keyboard('{ArrowDown}');
            expect(options[0]).toHaveFocus();
        });

        test('Home and End jump to the first and last options', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('{End}');
            expect(options[3]).toHaveFocus();

            await user.keyboard('{Home}');
            expect(options[0]).toHaveFocus();
        });

        test('navigation skips section headers and disabled options', async () => {
            const user = userEvent.setup();
            render(
                <List
                    aria-label="Projects"
                    items={[
                        {
                            id: 'group',
                            label: 'Group',
                            children: [
                                {id: 'p1', label: 'Alpha'},
                                {id: 'p2', label: 'Beta', disabled: true},
                                {id: 'p3', label: 'Gamma'},
                            ],
                        },
                    ]}
                    getItemContent={(item) => item.label}
                />,
            );
            const options = screen.getAllByRole('option');
            expect(options[1]).toHaveAttribute('aria-disabled', 'true');
            expect(options[1]).toHaveAttribute('data-disabled');

            await user.tab();
            expect(options[0]).toHaveFocus();

            await user.keyboard('{ArrowDown}');
            expect(options[2]).toHaveFocus();
            expect(options[1]).not.toHaveAttribute('data-active');

            await user.keyboard('{ArrowUp}');
            expect(options[0]).toHaveFocus();
        });

        test('typeahead skips disabled options', async () => {
            const user = userEvent.setup();
            render(
                <List
                    aria-label="Projects"
                    items={[
                        {id: 'p1', name: 'Alpha'},
                        {id: 'p2', name: 'Beta', disabled: true},
                        {id: 'p3', name: 'Bravo'},
                    ]}
                    getItemContent={(project) => project.name}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('b');

            expect(options[2]).toHaveFocus();
            expect(options[1]).not.toHaveAttribute('data-active');
        });

        test('tab stop skips a disabled first option', async () => {
            const user = userEvent.setup();
            render(
                <List
                    aria-label="Projects"
                    items={[
                        {id: 'p1', name: 'Alpha', disabled: true},
                        {id: 'p2', name: 'Beta'},
                    ]}
                    getItemContent={(project) => project.name}
                />,
            );
            const options = screen.getAllByRole('option');
            expect(options[0]).toHaveAttribute('tabindex', '-1');
            expect(options[1]).toHaveAttribute('tabindex', '0');

            await user.tab();
            expect(options[1]).toHaveFocus();
        });

        test('keyboard from nested interactive elements is not intercepted', async () => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();
            render(
                <List
                    aria-label="Users"
                    items={[{id: 'u1', name: 'User'}]}
                    getItemTextValue={(item) => item.name}
                    onActiveItemUpdate={onActiveItemUpdate}
                    renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                        <List.ItemView
                            {...getItemProps()}
                            {...getItemViewProps()}
                            endContent={<button type="button">Inner</button>}
                        >
                            {ctx.item.name}
                        </List.ItemView>
                    )}
                />,
            );

            act(() => screen.getByRole('button', {name: 'Inner'}).focus());
            onActiveItemUpdate.mockClear();
            await user.keyboard('{ArrowDown}x');

            expect(screen.getByRole('button', {name: 'Inner'})).toHaveFocus();
            expect(onActiveItemUpdate).not.toHaveBeenCalled();
        });
    });

    describe('onItemAction', () => {
        test('Enter applies the active item', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<List aria-label="Fruits" items={FRUITS} onItemAction={onItemAction} />);

            await user.tab();
            await user.keyboard('{ArrowDown}{Enter}');

            expect(onItemAction).toHaveBeenCalledTimes(1);
            expect(onItemAction).toHaveBeenCalledWith(
                'Banana',
                'Banana',
                expect.objectContaining({type: 'keydown', key: 'Enter'}),
            );
        });

        test('click applies the item and makes it active', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<List aria-label="Fruits" items={FRUITS} onItemAction={onItemAction} />);
            const options = screen.getAllByRole('option');

            await user.click(options[2]);

            expect(onItemAction).toHaveBeenCalledWith(
                'Cherry',
                'Cherry',
                expect.objectContaining({type: 'click'}),
            );
            expect(options[2]).toHaveAttribute('data-active');
        });

        test('the event of the gesture carries its modifiers: a link row tells a modified click from Enter', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<List aria-label="Fruits" items={FRUITS} onItemAction={onItemAction} />);

            await user.keyboard('{Control>}');
            await user.click(screen.getAllByRole('option')[1]);
            await user.keyboard('{/Control}');

            expect(onItemAction).toHaveBeenLastCalledWith(
                'Banana',
                'Banana',
                expect.objectContaining({type: 'click', ctrlKey: true, defaultPrevented: false}),
            );

            await user.keyboard('{Enter}');

            expect(onItemAction).toHaveBeenLastCalledWith(
                'Banana',
                'Banana',
                expect.objectContaining({type: 'keydown', key: 'Enter', ctrlKey: false}),
            );
        });

        test('click on a focusable descendant does not apply the item', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            const onInnerClick = jest.fn();
            render(
                <List
                    aria-label="Users"
                    items={[{id: 'u1', name: 'User'}]}
                    getItemTextValue={(item) => item.name}
                    onItemAction={onItemAction}
                    renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                        <List.ItemView
                            {...getItemProps()}
                            {...getItemViewProps()}
                            endContent={
                                <button type="button" onClick={onInnerClick}>
                                    Inner
                                </button>
                            }
                        >
                            {ctx.item.name}
                        </List.ItemView>
                    )}
                />,
            );

            await user.click(screen.getByRole('button', {name: 'Inner'}));

            expect(onInnerClick).toHaveBeenCalledTimes(1);
            expect(onItemAction).not.toHaveBeenCalled();
        });
    });

    describe('hover activation', () => {
        test('hover while focus is outside moves the activity and the tab stop, not the focus', async () => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();
            render(
                <React.Fragment>
                    <button type="button">Before</button>
                    <List
                        aria-label="Fruits"
                        items={FRUITS}
                        onActiveItemUpdate={onActiveItemUpdate}
                    />
                </React.Fragment>,
            );
            const options = screen.getAllByRole('option');
            const button = screen.getByRole('button', {name: 'Before'});

            await user.tab();
            expect(button).toHaveFocus();

            await user.hover(options[2]);

            expect(onActiveItemUpdate).toHaveBeenLastCalledWith('Cherry');
            expect(options[2]).toHaveAttribute('data-active');
            expect(options[2]).toHaveAttribute('tabindex', '0');
            expect(options[0]).toHaveAttribute('tabindex', '-1');
            expect(button).toHaveFocus();
            await user.tab();
            expect(options[2]).toHaveFocus();
        });

        test('hover while a row holds focus moves focus along', async () => {
            const user = userEvent.setup();
            const {states, view, renderItem} = createTracker();
            render(<List aria-label="Fruits" items={FRUITS} renderItem={renderItem} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            expect(options[0]).toHaveFocus();

            await user.hover(options[2]);

            expect(options[2]).toHaveAttribute('data-active');
            expect(options[2]).toHaveAttribute('tabindex', '0');
            expect(options[2]).toHaveFocus();
            expect(view.get('Cherry')).toMatchObject({active: false});
            expect(view.get('Cherry')).not.toHaveProperty('hovered');
            expect(states.get('Cherry')?.cursorVisible).toBe(false);
        });

        test('the keyboard continues from the hovered row', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.hover(options[2]);
            await user.keyboard('{ArrowDown}');

            expect(options[3]).toHaveFocus();
            expect(options[3]).toHaveAttribute('data-active');
        });

        test('hover does not activate disabled options', async () => {
            const user = userEvent.setup();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                />,
            );

            await user.hover(screen.getByText('Beta'));

            expect(screen.getByText('Beta')).not.toHaveAttribute('data-active');
        });

        test('activateOnHover={false} disables hover activation', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} activateOnHover={false} />);
            const options = screen.getAllByRole('option');

            await user.hover(options[1]);

            expect(options[1]).not.toHaveAttribute('data-active');
        });
    });

    describe('the keyboard cursor: getItemViewProps wiring', () => {
        test('tab-in and arrows: the dark cursor of the keyboard', async () => {
            const user = userEvent.setup();
            const {states, view, renderItem} = createTracker();
            render(<List aria-label="Fruits" items={FRUITS} renderItem={renderItem} />);

            await user.tab();
            expect(view.get('Apple')).toMatchObject({active: true});
            expect(view.get('Apple')).not.toHaveProperty('hovered');
            expect(states.get('Apple')?.cursorVisible).toBe(true);

            await user.keyboard('{ArrowDown}');
            expect(view.get('Banana')).toMatchObject({active: true});
            expect(view.get('Apple')).toMatchObject({active: false});
            expect(states.get('Banana')?.cursorVisible).toBe(true);
            expect(states.get('Apple')?.cursorVisible).toBeUndefined();
        });

        test('the mouse puts the cursor out even with activateOnHover={false}, the next key brings it back', async () => {
            const user = userEvent.setup();
            const {view, renderItem} = createTracker();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activateOnHover={false}
                    renderItem={renderItem}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(view.get('Banana')).toMatchObject({active: true});

            await user.hover(options[2]);
            expect(options[2]).not.toHaveAttribute('data-active');
            expect(options[1]).toHaveAttribute('data-active');
            expect(view.get('Banana')).toMatchObject({active: false});

            await user.unhover(options[2]);
            expect(view.get('Banana')).toMatchObject({active: false});
            expect(options[1]).toHaveAttribute('data-active');

            await user.keyboard('x');
            expect(view.get('Banana')).toMatchObject({active: true});
        });

        test('click activates without the cursor', async () => {
            const user = userEvent.setup();
            const {states, view, renderItem} = createTracker();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activateOnHover={false}
                    renderItem={renderItem}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[1]);
            expect(view.get('Banana')).toMatchObject({active: false});
            expect(states.get('Banana')?.cursorVisible).toBe(false);

            await user.unhover(options[1]);
            expect(options[1]).toHaveFocus();
            expect(view.get('Banana')).toMatchObject({active: false});

            fireEvent.keyDown(document.body, {key: 'a'});
            expect(view.get('Banana')).toMatchObject({active: true});
        });

        test('programmatic activation renders dark: the cursor starts out visible', () => {
            const {states, view, renderItem} = createTracker();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    defaultActiveItemId="Banana"
                    renderItem={renderItem}
                />,
            );

            expect(view.get('Banana')).toMatchObject({active: true});
            expect(view.get('Banana')).not.toHaveProperty('hovered');
            expect(states.get('Banana')?.cursorVisible).toBe(true);
        });

        test('the cursor goes out when the focus leaves the list and comes back with it', async () => {
            const user = userEvent.setup();
            const {view, renderItem} = createTracker();
            render(
                <React.Fragment>
                    <List aria-label="Fruits" items={FRUITS} renderItem={renderItem} />
                    <button type="button">Outside</button>
                </React.Fragment>,
            );

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(view.get('Banana')).toMatchObject({active: true});

            await user.click(screen.getByRole('button', {name: 'Outside'}));
            expect(view.get('Banana')).toMatchObject({active: false});
            expect(screen.getAllByRole('option')[1]).toHaveAttribute('data-active');

            fireEvent.keyDown(document.body, {key: 'a'});
            expect(view.get('Banana')).toMatchObject({active: false});

            await user.tab({shift: true});
            expect(screen.getAllByRole('option')[1]).toHaveFocus();
            expect(view.get('Banana')).toMatchObject({active: true});
        });

        test('two lists: a key brings the cursor back only in the focused one', async () => {
            const user = userEvent.setup();
            const berries = ['Currant', 'Raspberry'];
            const first = createTracker();
            const second = createTracker();
            render(
                <React.Fragment>
                    <List aria-label="Fruits" items={FRUITS} renderItem={first.renderItem} />
                    <List aria-label="Berries" items={berries} renderItem={second.renderItem} />
                </React.Fragment>,
            );

            await user.tab();
            expect(first.view.get('Apple')).toMatchObject({active: true});

            await user.tab();
            expect(first.view.get('Apple')).toMatchObject({active: false});
            expect(screen.getAllByRole('option')[0]).toHaveAttribute('data-active');
            expect(second.view.get('Currant')).toMatchObject({active: true});

            await user.keyboard('{ArrowDown}');
            expect(second.view.get('Raspberry')).toMatchObject({active: true});
            expect(first.view.get('Apple')).toMatchObject({active: false});
        });

        test('an activity that came from the outside shows the cursor after the mouse', async () => {
            const user = userEvent.setup();
            const {states, view, renderItem} = createTracker();
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId="Apple"
                    renderItem={renderItem}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.hover(options[1]);
            expect(view.get('Apple')).toMatchObject({active: false});

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId="Cherry"
                    renderItem={renderItem}
                />,
            );
            expect(view.get('Cherry')).toMatchObject({active: true});
            expect(states.get('Cherry')?.cursorVisible).toBe(true);
        });

        test('a controlled parent echoing a hover does not bring the cursor back', async () => {
            const user = userEvent.setup();
            const {view, renderItem} = createTracker();
            function EchoHarness() {
                const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
                return (
                    <List
                        aria-label="Fruits"
                        items={FRUITS}
                        activeItemId={activeItemId}
                        onActiveItemUpdate={setActiveItemId}
                        renderItem={renderItem}
                    />
                );
            }
            render(<EchoHarness />);
            const options = screen.getAllByRole('option');

            await user.hover(options[1]);
            expect(options[1]).toHaveAttribute('data-active');
            expect(view.get('Banana')).toMatchObject({active: false});
        });

        test('drag: the keyboard cursor keeps a static dark style', async () => {
            const user = userEvent.setup();
            const {view, renderItem} = createTracker();
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    dnd={{draggingId: null}}
                    renderItem={renderItem}
                />,
            );

            await user.tab();
            await user.keyboard('{ArrowDown}{ArrowDown}');
            expect(view.get('Cherry')).toMatchObject({active: true});

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    dnd={{draggingId: 'Apple'}}
                    renderItem={renderItem}
                />,
            );
            expect(view.get('Cherry')).toMatchObject({active: true, hovered: false});
            expect(view.get('Apple')).toMatchObject({hovered: false});
        });
    });

    describe('text selection suppression on press', () => {
        test.each(['pointerUp', 'pointerCancel'] as const)(
            'press puts user-select: none on the row and %s restores it',
            (release) => {
                render(<List aria-label="Fruits" items={FRUITS} />);
                const options = screen.getAllByRole('option');

                fireEvent.pointerDown(options[1]);
                expect(options[1].style.userSelect).toBe('none');
                expect(options[0].style.userSelect).toBe('');

                fireEvent[release](document);
                expect(options[1].style.userSelect).toBe('');
            },
        );
    });

    describe('typeahead', () => {
        test('single character moves to the next match from the active option', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('b');

            expect(options[1]).toHaveFocus();
        });

        test('accumulated prefix keeps the active option while it matches', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Items" items={['Bar', 'Banana', 'Baobab']} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('b');
            expect(options[1]).toHaveFocus();

            await user.keyboard('a');
            expect(options[1]).toHaveFocus();

            await user.keyboard('n');
            expect(options[1]).toHaveFocus();
        });

        test('search wraps around', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} defaultActiveItemId="Melon" />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('a');

            expect(options[0]).toHaveFocus();
        });

        test('Space is part of the search while the buffer is not empty: it neither applies nor selects', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Colors"
                    items={['Blue whale', 'Blueberry']}
                    onItemAction={onItemAction}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('blue');
            expect(options[1]).toHaveFocus();

            await user.keyboard(' ');
            expect(options[0]).toHaveFocus();
            expect(onItemAction).not.toHaveBeenCalled();
            expect(onSelectedUpdate).not.toHaveBeenCalled();
        });

        test('repeating the same character cycles through the matches', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={['Apple', 'Apricot', 'Avocado']} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('a');
            expect(options[1]).toHaveFocus();

            await user.keyboard('a');
            expect(options[2]).toHaveFocus();

            await user.keyboard('a');
            expect(options[0]).toHaveFocus();
        });

        test('Space with an empty buffer does not apply the item', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<List aria-label="Fruits" items={FRUITS} onItemAction={onItemAction} />);

            await user.tab();
            await user.keyboard(' ');

            expect(onItemAction).not.toHaveBeenCalled();
        });

        test('buffer is reset after the timeout', async () => {
            jest.useFakeTimers();
            try {
                const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
                render(<List aria-label="Fruits" items={FRUITS} />);
                const options = screen.getAllByRole('option');

                await user.tab();
                await user.keyboard('b');
                expect(options[1]).toHaveFocus();

                jest.advanceTimersByTime(600);
                await user.keyboard('a');

                expect(options[0]).toHaveFocus();
            } finally {
                jest.useRealTimers();
            }
        });

        test('uses getItemTextValue for search', async () => {
            const user = userEvent.setup();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => <b>{project.name}</b>}
                    getItemTextValue={(project) => project.name}
                />,
            );

            await user.tab();
            await user.keyboard('g');

            expect(screen.getByRole('option', {name: 'Gamma'})).toHaveFocus();
        });
    });

    describe('controlled and uncontrolled activity', () => {
        test('a controlled change moves focus along only while a row holds it', async () => {
            const user = userEvent.setup();
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId="Apple"
                    onActiveItemUpdate={() => {}}
                />,
            );
            const options = screen.getAllByRole('option');

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId="Cherry"
                    onActiveItemUpdate={() => {}}
                />,
            );
            expect(options[2]).toHaveAttribute('data-active');
            expect(options[2]).toHaveAttribute('tabindex', '0');
            expect(document.body).toHaveFocus();

            await user.tab();
            expect(options[2]).toHaveFocus();
            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId="Melon"
                    onActiveItemUpdate={() => {}}
                />,
            );
            expect(options[3]).toHaveAttribute('data-active');
            expect(options[3]).toHaveFocus();
        });

        test('defaultActiveItemId sets the initial active option', () => {
            render(<List aria-label="Fruits" items={FRUITS} defaultActiveItemId="Cherry" />);
            const options = screen.getAllByRole('option');

            expect(options[2]).toHaveAttribute('data-active');
            expect(options[2]).toHaveAttribute('tabindex', '0');
            expect(options[0]).toHaveAttribute('tabindex', '-1');
        });

        test('controlled activeItemId does not move without an update', async () => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId="Banana"
                    onActiveItemUpdate={onActiveItemUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            expect(options[1]).toHaveFocus();

            await user.keyboard('{ArrowDown}');

            expect(onActiveItemUpdate).toHaveBeenCalledTimes(1);
            expect(onActiveItemUpdate).toHaveBeenLastCalledWith('Cherry');
            expect(options[1]).toHaveAttribute('data-active');
            expect(options[2]).not.toHaveAttribute('data-active');
            expect(options[1]).toHaveFocus();
        });

        test('controlled parent applying updates', async () => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();

            function ControlledList() {
                const [active, setActive] = React.useState<string | null>('Apple');
                return (
                    <List
                        aria-label="Fruits"
                        items={FRUITS}
                        activeItemId={active}
                        onActiveItemUpdate={(id) => {
                            onActiveItemUpdate(id);
                            setActive(id);
                        }}
                    />
                );
            }

            render(<ControlledList />);
            const options = screen.getAllByRole('option');

            await user.tab();
            onActiveItemUpdate.mockClear();
            await user.keyboard('{ArrowDown}');

            expect(onActiveItemUpdate).toHaveBeenCalledTimes(1);
            expect(onActiveItemUpdate).toHaveBeenCalledWith('Banana');
            expect(options[1]).toHaveAttribute('data-active');
            expect(options[1]).toHaveFocus();
        });

        test.each<[string, string | null]>([
            ['missing from items', 'missing'],
            ['null', null],
        ])('controlled activeItemId %s', async (_name, activeItemId) => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId={activeItemId}
                    onActiveItemUpdate={onActiveItemUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            for (const option of options) {
                expect(option).not.toHaveAttribute('data-active');
            }
            expect(options[0]).toHaveAttribute('tabindex', '0');

            act(() => options[0].focus());
            onActiveItemUpdate.mockClear();
            await user.keyboard('{ArrowDown}');

            expect(onActiveItemUpdate).toHaveBeenLastCalledWith('Apple');
            for (const option of options) {
                expect(option).not.toHaveAttribute('data-active');
            }
        });
    });

    describe('content tiers', () => {
        test('tier 2: renderItem with List.ItemView keeps slots and state binding', () => {
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemTextValue={(project) => project.name}
                    defaultActiveItemId="p1"
                    renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                        <List.ItemView
                            {...getItemProps()}
                            {...getItemViewProps()}
                            description={`id: ${ctx.id}`}
                            endContent={<Label>{ctx.index}</Label>}
                        >
                            {ctx.item.name}
                        </List.ItemView>
                    )}
                />,
            );

            const options = screen.getAllByRole('option');
            expect(options[0]).toHaveAttribute('data-active');
            expect(options[0]).toHaveClass('g-lab-list-item-view');
            expect(options[1]).toHaveClass('g-lab-list-item-view_disabled');
            expect(screen.getByText('id: p1')).toBeInTheDocument();
        });

        test('tier 3: custom markup, override onClick runs after the core handler', async () => {
            const user = userEvent.setup();
            const calls: string[] = [];
            render(
                <List
                    aria-label="Users"
                    items={[{id: 'u1', name: 'User One'}]}
                    getItemTextValue={(user_) => user_.name}
                    onItemAction={() => calls.push('core')}
                    renderItem={(ctx, {getItemProps}) => (
                        <div
                            {...getItemProps({
                                onClick: () => calls.push(`override:${ctx.id}`),
                                'data-testid': `card-${ctx.id}`,
                            })}
                            className="custom-card"
                        >
                            {ctx.item.name}
                        </div>
                    )}
                />,
            );

            const option = screen.getByRole('option');
            expect(option).toHaveClass('custom-card');
            expect(option).toHaveAttribute('tabindex', '0');
            expect(option).toHaveAttribute('data-testid', 'card-u1');

            await user.click(option);

            expect(calls).toEqual(['core', 'override:u1']);
        });

        test('getItemViewProps of a section header carries the size only and spreads on List.SectionHeader', () => {
            const view = new Map<string, ListItemViewStateProps>();
            render(
                <List
                    aria-label="Groups"
                    items={GROUPS}
                    size="l"
                    getItemContent={(item) => item.label}
                    renderItem={(ctx, {getItemProps, getItemViewProps}) => {
                        view.set(ctx.id, getItemViewProps());
                        return ctx.kind === 'section' ? (
                            <List.SectionHeader {...getItemProps()} {...getItemViewProps()}>
                                {ctx.content}
                            </List.SectionHeader>
                        ) : (
                            <List.ItemView {...getItemProps()} {...getItemViewProps()}>
                                {ctx.content}
                            </List.ItemView>
                        );
                    }}
                />,
            );

            expect(view.get('recent')).toEqual({size: 'l'});
            expect(view.get('r1')).toEqual({size: 'l', active: false, disabled: false});
            const header = screen.getByText('Recent');
            expect(header).toHaveClass('g-lab-list-section-header_size_l');
            expect(header).not.toHaveAttribute('active');
            expect(header).not.toHaveAttribute('disabled');
        });
    });

    describe('selection layer: ARIA', () => {
        test('selectionMode="single" adds aria-selected to every option, without aria-multiselectable', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    defaultSelectedIds={['Banana']}
                />,
            );

            expect(screen.getByRole('listbox')).not.toHaveAttribute('aria-multiselectable');
            const options = screen.getAllByRole('option');
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'false',
                'true',
                'false',
                'false',
            ]);
            expect(options[1]).toHaveAttribute('data-selected');
            expect(options[0]).not.toHaveAttribute('data-selected');
        });

        test('selectionMode="multiple" adds aria-multiselectable to the container', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="multiple"
                    defaultSelectedIds={['Apple', 'Cherry']}
                />,
            );

            expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
            expect(
                screen.getAllByRole('option').map((option) => option.getAttribute('aria-selected')),
            ).toEqual(['true', 'false', 'true', 'false']);
        });

        test('disabled options are selectable semantically but not by gesture', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            const onItemAction = jest.fn();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                    onItemAction={onItemAction}
                    defaultActiveItemId="p2"
                />,
            );

            const disabledOption = screen.getAllByRole('option')[1];
            expect(disabledOption).toHaveAttribute('aria-selected', 'false');

            await user.tab();
            expect(disabledOption).toHaveFocus();

            await user.click(disabledOption);
            expect(onSelectedUpdate).not.toHaveBeenCalled();
            expect(onItemAction).not.toHaveBeenCalled();

            await user.keyboard(' ');
            expect(onSelectedUpdate).not.toHaveBeenCalled();
            expect(onItemAction).not.toHaveBeenCalled();

            await user.keyboard('{Enter}');
            expect(onSelectedUpdate).not.toHaveBeenCalled();
            expect(onItemAction).not.toHaveBeenCalled();
        });
    });

    describe('selection layer: gestures', () => {
        test('single: click, Enter and Space replace the selection', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Apple']);
            expect(options[0]).toHaveAttribute('aria-selected', 'true');

            await user.keyboard('{ArrowDown}{Enter}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Banana']);
            expect(options[0]).toHaveAttribute('aria-selected', 'false');
            expect(options[1]).toHaveAttribute('aria-selected', 'true');

            await user.keyboard('{ArrowDown} ');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Cherry']);
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'false',
                'false',
                'true',
                'false',
            ]);
        });

        test('single: a repeated gesture does not deselect but still applies', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            const onItemAction = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    defaultSelectedIds={['Apple']}
                    onSelectedUpdate={onSelectedUpdate}
                    onItemAction={onItemAction}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            await user.keyboard('{Enter} ');

            expect(options[0]).toHaveAttribute('aria-selected', 'true');
            expect(onSelectedUpdate).not.toHaveBeenCalled();
            expect(onItemAction).toHaveBeenCalledTimes(3);
            expect(onItemAction).toHaveBeenLastCalledWith('Apple', 'Apple', expect.anything());
        });

        test('multiple: click, Enter and Space toggle the selection', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Apple']);

            await user.keyboard('{ArrowDown}{Enter}');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Apple', 'Banana']);

            await user.keyboard('{ArrowDown} ');
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Apple', 'Banana', 'Cherry']);
            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'true',
                'true',
                'true',
                'false',
            ]);

            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Apple', 'Cherry']);
            expect(options[1]).toHaveAttribute('aria-selected', 'false');
        });

        test('onItemAction fires on the same gesture, after the selection update', async () => {
            const user = userEvent.setup();
            const calls: string[] = [];
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="multiple"
                    onSelectedUpdate={(ids) => calls.push(`selected:${ids.join(',')}`)}
                    onItemAction={(id) => calls.push(`action:${id}`)}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            await user.keyboard('{ArrowDown}{Enter}');
            await user.keyboard('{ArrowDown} ');

            expect(calls).toEqual([
                'selected:Apple',
                'action:Apple',
                'selected:Apple,Banana',
                'action:Banana',
                'selected:Apple,Banana,Cherry',
                'action:Cherry',
            ]);
        });
    });

    describe('selection layer: controlled and uncontrolled', () => {
        test('controlled selectedIds does not move without an update', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    selectedIds={['Banana']}
                    onSelectedUpdate={onSelectedUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.click(options[0]);

            expect(onSelectedUpdate).toHaveBeenCalledTimes(1);
            expect(onSelectedUpdate).toHaveBeenCalledWith(['Apple']);
            expect(options[1]).toHaveAttribute('aria-selected', 'true');
            expect(options[0]).toHaveAttribute('aria-selected', 'false');
        });
    });

    describe('selection layer: rendering', () => {
        test('getItemViewProps selectionStyle is highlight for single and check for multiple', () => {
            const {view, renderItem} = createTracker();
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    defaultSelectedIds={['Banana']}
                    renderItem={renderItem}
                />,
            );

            expect(view.get('Banana')).toMatchObject({selected: true, selectionStyle: 'highlight'});

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="multiple"
                    defaultSelectedIds={['Banana']}
                    renderItem={renderItem}
                />,
            );

            expect(view.get('Banana')).toMatchObject({selected: true, selectionStyle: 'check'});
        });

        test('ctx.state.selected and getItemViewProps carry the selection', () => {
            const seen: Array<boolean | undefined> = [];
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemTextValue={(project) => project.name}
                    selectionMode="multiple"
                    defaultSelectedIds={['p3']}
                    renderItem={(ctx, {getItemProps, getItemViewProps}) => {
                        seen.push(ctx.state.selected);
                        const viewProps = getItemViewProps();
                        return (
                            <List.ItemView
                                {...getItemProps()}
                                {...viewProps}
                                data-selection-style={viewProps.selectionStyle}
                            >
                                {ctx.item.name}
                            </List.ItemView>
                        );
                    }}
                />,
            );

            expect(seen).toEqual([false, false, true]);
            expect(screen.getAllByRole('option')[0]).toHaveAttribute(
                'data-selection-style',
                'check',
            );
        });

        test('without the layer ctx.state and getItemViewProps have no selection props', () => {
            const contexts: object[] = [];
            const viewProps: object[] = [];
            render(
                <List
                    aria-label="Fruits"
                    items={['Apple']}
                    renderItem={(ctx, helpers) => {
                        contexts.push(ctx.state);
                        viewProps.push(helpers.getItemViewProps());
                        return (
                            <List.ItemView {...helpers.getItemProps()}>{ctx.content}</List.ItemView>
                        );
                    }}
                />,
            );

            expect(contexts[0]).not.toHaveProperty('selected');
            expect(viewProps[0]).not.toHaveProperty('selected');
            expect(viewProps[0]).not.toHaveProperty('selectionStyle');
        });
    });

    describe('dev warnings', () => {
        let consoleErrorSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleErrorSpy.mockRestore();
        });

        test('warns when the list has no accessible name', () => {
            render(<List items={FRUITS} />);

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('accessible name'),
            );
        });

        test('warns on duplicate item ids', () => {
            render(<List aria-label="Dup" items={['dup-item', 'dup-item']} />);

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('Duplicate item id "dup-item"'),
            );
        });

        test('warns on an object item without id when getItemId is not provided', () => {
            render(
                <List
                    aria-label="No id"
                    items={[{name: 'item-without-id'}]}
                    getItemContent={(item) => item.name}
                />,
            );

            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('has no id'));
        });

        test('warns on non-string content without getItemTextValue', () => {
            render(
                <List
                    aria-label="Rich"
                    items={[{id: 'rich-content-item'}]}
                    getItemContent={() => <b>Rich</b>}
                />,
            );

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('"rich-content-item" has non-string content'),
            );
        });

        test('warns on selection props without selectionMode', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectedIds={['Apple']}
                    onSelectedUpdate={jest.fn()}
                />,
            );

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('have no effect without `selectionMode`'),
            );
        });

        test('warns on selectionMode="single" with several selected ids', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    selectedIds={['Apple', 'Banana']}
                    onSelectedUpdate={jest.fn()}
                />,
            );

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('expects at most one selected id'),
            );
        });
    });
});
