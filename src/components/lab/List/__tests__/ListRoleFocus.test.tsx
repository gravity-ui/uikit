import * as React from 'react';

import userEvent from '@testing-library/user-event';
import * as tabbable from 'tabbable';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import type {ListItemContext, ListItemHelpers, ListItemViewStateProps, ListProps} from '../types';
import {useListFocusOwner} from '../useListFocusOwner';

// jsdom has no layout: by default displayCheck considers every element hidden,
// and focusable() (the keyboard of the cells walks through it) returns an empty
// list. jest.mock does not fit here: the module is already cached by the test
// setup
const realFocusable = tabbable.focusable;
let focusableSpy: jest.SpyInstance;

const realTabbable = tabbable.tabbable;
let tabbableSpy: jest.SpyInstance;

beforeAll(() => {
    focusableSpy = jest
        .spyOn(tabbable, 'focusable')
        .mockImplementation((container, options) =>
            realFocusable(container, {...options, displayCheck: 'none'}),
        );
    tabbableSpy = jest
        .spyOn(tabbable, 'tabbable')
        .mockImplementation((container, options) =>
            realTabbable(container, {...options, displayCheck: 'none'}),
        );
});

afterAll(() => {
    focusableSpy.mockRestore();
    tabbableSpy.mockRestore();
});

const FRUITS = ['Apple', 'Banana', 'Cherry'];

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

/**
 * A row with two interactive elements: a handle at the start and a button at
 * the end. `tabIndex={-1}` is the grid contract: the list stays a single tab
 * stop, and the interactive content of a cell is reached with ←/→
 */
function renderRowWithControls(ctx: ListItemContext<string>, helpers: ListItemHelpers) {
    return (
        <List.ItemView
            {...helpers.getItemProps()}
            {...helpers.getItemViewProps()}
            startContent={
                <span {...helpers.getCellProps()}>
                    <button type="button" tabIndex={-1} aria-label={`Drag ${ctx.item}`} />
                </span>
            }
            endContent={
                <span {...helpers.getCellProps()}>
                    <button type="button" tabIndex={-1} aria-label={`Delete ${ctx.item}`} />
                </span>
            }
        >
            <span {...helpers.getCellProps()}>{ctx.content}</span>
        </List.ItemView>
    );
}

/** An external focus owner: an input outside the list root (a mini combobox) */
function ComboboxHarness({
    open = true,
    ...listProps
}: {open?: boolean} & Partial<ListProps<string>>) {
    const focusOwner = useListFocusOwner();
    return (
        <React.Fragment>
            <input {...focusOwner.getInputProps({'aria-label': 'Filter'})} />
            {open ? (
                <List aria-label="Options" items={FRUITS} {...listProps} focusOwner={focusOwner} />
            ) : null}
        </React.Fragment>
    );
}

describe('lab List: role model x focus strategy', () => {
    describe('axes matrix: container and row semantics', () => {
        test('listbox + roving (default): listbox/option, roving tab stop, aria-selected on the option', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    defaultSelectedIds={['Apple']}
                    defaultActiveItemId="Apple"
                />,
            );

            expect(screen.getByRole('listbox')).toBeInTheDocument();
            expect(screen.queryByRole('grid')).not.toBeInTheDocument();
            expect(screen.queryAllByRole('gridcell')).toHaveLength(0);

            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(3);
            expect(options[0]).toHaveAttribute('tabindex', '0');
            expect(options[1]).toHaveAttribute('tabindex', '-1');
            expect(options[0]).toHaveAttribute('aria-selected', 'true');
        });

        test('grid + roving: grid/row/gridcell, roving tab stop, aria-selected on the row', () => {
            render(
                <List
                    role="grid"
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    defaultSelectedIds={['Apple']}
                    defaultActiveItemId="Apple"
                />,
            );

            expect(screen.getByRole('grid')).toBeInTheDocument();
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            expect(screen.queryAllByRole('option')).toHaveLength(0);

            const rows = screen.getAllByRole('row');
            expect(rows).toHaveLength(3);
            expect(rows[0]).toHaveAttribute('tabindex', '0');
            expect(rows[1]).toHaveAttribute('tabindex', '-1');
            // aria-selected moves to the row rather than to the cell
            expect(rows[0]).toHaveAttribute('aria-selected', 'true');

            // The default render puts the content into a cell: role="row" must
            // own at least one gridcell
            const cells = screen.getAllByRole('gridcell');
            expect(cells).toHaveLength(3);
            expect(cells[0]).toHaveTextContent('Apple');
            expect(cells[0]).not.toHaveAttribute('aria-selected');
        });

        test('listbox + activedescendant: options without a tab stop, the input owns the focus', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness />);

            const input = screen.getByRole('combobox');
            expect(input).toHaveAttribute('aria-expanded', 'true');
            expect(input).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);

            const options = screen.getAllByRole('option');
            for (const option of options) {
                expect(option).not.toHaveAttribute('tabindex');
            }

            // The list drops out of the Tab order entirely: the tab stop is the
            // input
            await user.tab();
            expect(input).toHaveFocus();
            await user.tab();
            expect(input).not.toHaveFocus();
            expect(document.body).toHaveFocus();
        });

        test('grid + activedescendant: rows and cells keep grid roles, the input owns the focus', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness role="grid" />);

            expect(screen.getByRole('grid')).toBeInTheDocument();
            const rows = screen.getAllByRole('row');
            expect(rows).toHaveLength(3);
            expect(screen.getAllByRole('gridcell')).toHaveLength(3);
            for (const row of rows) {
                expect(row).not.toHaveAttribute('tabindex');
            }

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{ArrowDown}');

            expect(input).toHaveFocus();
            expect(input).toHaveAttribute('aria-activedescendant', rows[0].id);
        });
    });

    describe('grid keyboard: entering the interactive content of a cell and back', () => {
        test('hover does not take the focus from the interactive content of a cell, and Tab still leaves the list', async () => {
            const user = userEvent.setup();
            render(
                <List
                    role="grid"
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderRowWithControls}
                />,
            );
            const rows = screen.getAllByRole('row');
            const handle = screen.getByRole('button', {name: 'Drag Apple'});

            await user.tab();
            await user.keyboard('{ArrowRight}');
            expect(handle).toHaveFocus();

            // The mouse over another row moves the activity and the tab stop,
            // but the widget the user is working in keeps the focus
            await user.hover(rows[2]);
            expect(rows[2]).toHaveAttribute('data-active');
            expect(rows[2]).toHaveAttribute('tabindex', '0');
            expect(handle).toHaveFocus();

            // Tab: the list puts focus on its tab stop and lets the default
            // action go on from there — so sequential navigation leaves the
            // list instead of landing on the tab stop below. user-event
            // computes the destination of Tab from the original target, hence
            // the raw event; fireEvent returns false when the default was
            // prevented
            expect(fireEvent.keyDown(handle, {key: 'Tab'})).toBe(true);
            expect(rows[2]).toHaveFocus();
        });

        test('ArrowRight enters the cell content, ArrowLeft walks back and returns to the row', async () => {
            const user = userEvent.setup();
            render(
                <List
                    role="grid"
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={renderRowWithControls}
                />,
            );

            const row = screen.getAllByRole('row')[0];
            await user.tab();
            expect(row).toHaveFocus();

            await user.keyboard('{ArrowRight}');
            expect(screen.getByRole('button', {name: 'Drag Apple'})).toHaveFocus();

            await user.keyboard('{ArrowRight}');
            expect(screen.getByRole('button', {name: 'Delete Apple'})).toHaveFocus();

            // There is nowhere further to the right — focus stays on the last one
            await user.keyboard('{ArrowRight}');
            expect(screen.getByRole('button', {name: 'Delete Apple'})).toHaveFocus();

            await user.keyboard('{ArrowLeft}');
            expect(screen.getByRole('button', {name: 'Drag Apple'})).toHaveFocus();

            await user.keyboard('{ArrowLeft}');
            expect(row).toHaveFocus();
        });

        test('ArrowUp/ArrowDown from inside a cell belong to the nested widget, not to the list', async () => {
            const user = userEvent.setup();
            const onKeyDown = jest.fn();
            render(
                <List
                    role="grid"
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={(ctx, helpers) => (
                        <List.ItemView
                            {...helpers.getItemProps()}
                            {...helpers.getItemViewProps()}
                            startContent={
                                <span {...helpers.getCellProps()}>
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        aria-label={`Drag ${ctx.item}`}
                                        onKeyDown={onKeyDown}
                                    />
                                </span>
                            }
                        >
                            <span {...helpers.getCellProps()}>{ctx.content}</span>
                        </List.ItemView>
                    )}
                />,
            );

            const handle = screen.getByRole('button', {name: 'Drag Apple'});
            await user.tab();
            await user.keyboard('{ArrowRight}');
            expect(handle).toHaveFocus();

            await user.keyboard('{ArrowDown}');

            // The keyboard dnd of a nested handle lives on exactly these keys:
            // the activity of the list does not move and focus stays on the
            // handle
            expect(handle).toHaveFocus();
            expect(onKeyDown).toHaveBeenCalled();
            expect(screen.getAllByRole('row')[1]).not.toHaveAttribute('data-active');
        });

        test('the grid stays a single tab stop: Tab leaves the list past the cell content', async () => {
            const user = userEvent.setup();
            render(
                <React.Fragment>
                    <List
                        role="grid"
                        aria-label="Fruits"
                        items={FRUITS}
                        renderItem={renderRowWithControls}
                    />
                    <button type="button">After</button>
                </React.Fragment>,
            );

            await user.tab();
            expect(screen.getAllByRole('row')[0]).toHaveFocus();

            // Neither the rows nor the interactive content of the cells hold
            // the Tab order: the cell content is reached with ←/→, while Tab
            // leaves the widget
            await user.tab();
            expect(screen.getByRole('button', {name: 'After'})).toHaveFocus();
        });

        test('warns in dev when a row keeps a tabbable descendant', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            render(
                <List
                    role="grid"
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={(ctx, helpers) => (
                        <List.ItemView
                            {...helpers.getItemProps()}
                            {...helpers.getItemViewProps()}
                            // A button defaults to tabIndex 0 — an extra tab stop
                            startContent={
                                <span {...helpers.getCellProps()}>
                                    <button type="button" aria-label={`Drag ${ctx.item}`} />
                                </span>
                            }
                        >
                            <span {...helpers.getCellProps()}>{ctx.content}</span>
                        </List.ItemView>
                    )}
                />,
            );

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('single tab stop'),
            );
            consoleErrorSpy.mockRestore();
        });

        test('listbox: ArrowRight does not move the focus into the row content', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Fruits" items={FRUITS} renderItem={renderRowWithControls} />);

            const option = screen.getAllByRole('option')[0];
            await user.tab();
            await user.keyboard('{ArrowRight}');

            expect(option).toHaveFocus();
        });

        test('grid + activedescendant: arrows are left to the caret of the input', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness role="grid" renderItem={renderRowWithControls} />);

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{ArrowDown}{ArrowRight}');

            // Full keyboard reachability of the interactive content of a cell
            // is guaranteed in the roving strategy only
            expect(input).toHaveFocus();
        });
    });

    describe('activedescendant: the external focus owner', () => {
        test('a click on a row applies it and leaves DOM focus with the owner', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<ComboboxHarness onItemAction={onItemAction} />);

            const input = screen.getByRole('combobox');
            const options = screen.getAllByRole('option');
            await user.click(input);

            await user.click(options[1]);

            // The rows are not focusable: without preventing the default of
            // mousedown, focus would have gone to the body and the input
            // would have blurred (a popup closing on blur never sees the click)
            expect(input).toHaveFocus();
            expect(onItemAction).toHaveBeenCalledWith(
                'Banana',
                'Banana',
                expect.objectContaining({type: 'click'}),
            );
            expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
        });

        test('Home/End on a row that is active already still scroll it into view', async () => {
            const scrollIntoViewMock = jest.fn();
            HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
            try {
                const user = userEvent.setup();
                render(<ComboboxHarness defaultActiveItemId="Cherry" />);
                await user.click(screen.getByRole('combobox'));
                scrollIntoViewMock.mockClear();

                await user.keyboard('{End}');

                // No state change follows — the sync happens in the gesture
                expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
                expect(scrollIntoViewMock.mock.instances[0]).toBe(
                    screen.getByRole('option', {name: 'Cherry'}),
                );
            } finally {
                delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
            }
        });

        test('navigation moves aria-activedescendant without taking the focus out of the input', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness />);

            const input = screen.getByRole('combobox');
            const options = screen.getAllByRole('option');
            await user.click(input);

            expect(input).not.toHaveAttribute('aria-activedescendant');

            await user.keyboard('{ArrowDown}');
            expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
            expect(options[0]).toHaveAttribute('data-active');
            expect(input).toHaveFocus();

            await user.keyboard('{ArrowDown}');
            expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
            expect(options[1]).toHaveAttribute('data-active');
            expect(options[0]).not.toHaveAttribute('data-active');
            expect(input).toHaveFocus();

            await user.keyboard('{End}');
            expect(input).toHaveAttribute('aria-activedescendant', options[2].id);
            expect(input).toHaveFocus();
        });

        test('Enter applies the active item', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<ComboboxHarness onItemAction={onItemAction} />);

            await user.click(screen.getByRole('combobox'));
            await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

            expect(onItemAction).toHaveBeenCalledTimes(1);
            expect(onItemAction).toHaveBeenCalledWith(
                'Banana',
                'Banana',
                expect.objectContaining({type: 'keydown', key: 'Enter'}),
            );
        });

        test('character keys go to the owner: filtering instead of typeahead', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness />);

            const input = screen.getByRole('combobox') as HTMLInputElement;
            await user.click(input);
            await user.keyboard('{ArrowDown}');
            const firstOptionId = screen.getAllByRole('option')[0].id;

            await user.keyboard('c er');

            // Neither typeahead (it would have moved to Cherry) nor selection
            // by Space: the characters were typed into the input
            expect(input).toHaveValue('c er');
            expect(input).toHaveAttribute('aria-activedescendant', firstOptionId);
        });

        test('the cursor follows the keys of the owner: the list root never holds the focus', async () => {
            const user = userEvent.setup();
            const view = new Map<string, ListItemViewStateProps>();
            const renderItem: ListProps<string>['renderItem'] = (ctx, helpers) => {
                view.set(ctx.id, helpers.getItemViewProps());
                return (
                    <List.ItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
                        {ctx.content}
                    </List.ItemView>
                );
            };
            render(<ComboboxHarness renderItem={renderItem} />);

            await user.click(screen.getByRole('combobox'));
            await user.keyboard('{ArrowDown}');
            expect(view.get('Apple')).toMatchObject({active: true});

            // The mouse over a row puts the cursor out here as well
            await user.hover(screen.getAllByRole('option')[1]);
            expect(view.get('Banana')).toMatchObject({active: false});

            // DOM focus lives with the input outside the list root, so the
            // focus gate of the document listener never opens: what brings the
            // cursor back is the key routed through the channel of the owner
            await user.keyboard('{ArrowDown}');
            expect(view.get('Cherry')).toMatchObject({active: true});
        });

        test('a closed popup disconnects the owner: no aria-expanded, controls or activedescendant', () => {
            render(<ComboboxHarness open={false} />);

            const input = screen.getByRole('combobox');
            expect(input).toHaveAttribute('aria-expanded', 'false');
            expect(input).not.toHaveAttribute('aria-controls');
            expect(input).not.toHaveAttribute('aria-activedescendant');
        });

        test('the owner may be a button (a select-only combobox): the same props spread on it and drive the list', async () => {
            const user = userEvent.setup();
            function TriggerHarness() {
                const focusOwner = useListFocusOwner();
                return (
                    <React.Fragment>
                        <button
                            type="button"
                            {...focusOwner.getInputProps({'aria-label': 'Fruit'})}
                        >
                            Choose
                        </button>
                        <List aria-label="Options" items={FRUITS} focusOwner={focusOwner} />
                    </React.Fragment>
                );
            }
            render(<TriggerHarness />);

            const trigger = screen.getByRole('combobox', {name: 'Fruit'});
            expect(trigger.tagName).toBe('BUTTON');
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
            expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);

            await user.click(trigger);
            await user.keyboard('{ArrowDown}');

            expect(trigger).toHaveFocus();
            expect(trigger).toHaveAttribute(
                'aria-activedescendant',
                screen.getAllByRole('option')[0].id,
            );
        });
    });

    describe('getCellProps', () => {
        test('listbox: the getter is empty, so the same renderItem works in both role models', () => {
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={(ctx, {getItemProps, getCellProps}) => (
                        <div {...getItemProps()}>
                            <span {...getCellProps()} data-qa="cell">
                                {ctx.content}
                            </span>
                        </div>
                    )}
                />,
            );

            expect(screen.queryAllByRole('gridcell')).toHaveLength(0);
            expect(screen.getAllByTestId('cell')[0]).not.toHaveAttribute('role');
        });

        test('grid: overrides compose the same way as in getItemProps', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <List
                    role="grid"
                    aria-label="Fruits"
                    items={FRUITS}
                    renderItem={(ctx, {getItemProps, getCellProps}) => (
                        <div {...getItemProps()}>
                            <span {...getCellProps({className: 'my-cell', onClick})}>
                                {ctx.content}
                            </span>
                        </div>
                    )}
                />,
            );

            const cell = screen.getAllByRole('gridcell')[0];
            expect(cell).toHaveClass('my-cell');

            await user.click(cell);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('layers stay orthogonal to the axes', () => {
        test('dnd adapter props and the drop indicator land on the row, the contract is unchanged', () => {
            render(
                <List
                    role="grid"
                    aria-label="Fruits"
                    items={FRUITS}
                    dnd={{
                        getItemDndProps: (id) => ({'data-dnd-id': id}),
                        draggingId: 'Apple',
                        dropTarget: {id: 'Banana', position: 'after'},
                    }}
                />,
            );

            const rows = screen.getAllByRole('row');
            expect(rows[0]).toHaveAttribute('data-dnd-id', 'Apple');
            expect(rows[0]).toHaveAttribute('data-dragging');
            expect(rows[1]).toHaveAttribute('data-drop-target', 'after');
        });

        test('section headers stay presentational in the grid role model', () => {
            render(
                <List
                    role="grid"
                    aria-label="Groups"
                    items={GROUPS}
                    getItemContent={(item) => item.label}
                />,
            );

            expect(screen.getAllByRole('row')).toHaveLength(3);
            const header = screen.getByText('Recent');
            expect(header).toHaveAttribute('role', 'presentation');
            expect(header).toHaveAttribute('aria-hidden', 'true');
            expect(header).not.toHaveAttribute('tabindex');
            // The group context travels through aria-describedby in the grid
            // model as well
            expect(screen.getByRole('row', {name: 'First'})).toHaveAttribute(
                'aria-describedby',
                header.id,
            );
        });
    });
});

describe('lab List: role models under virtualization', () => {
    const VIEWPORT_HEIGHT = 200;
    const ROW_HEIGHT = 36;
    let offsetHeightSpy: jest.SpyInstance;
    let offsetWidthSpy: jest.SpyInstance;

    beforeEach(() => {
        offsetHeightSpy = jest
            .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
            .mockImplementation(function (this: HTMLElement) {
                const role = this.getAttribute('role');
                return role === 'grid' || role === 'listbox' ? VIEWPORT_HEIGHT : ROW_HEIGHT;
            });
        offsetWidthSpy = jest
            .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
            .mockReturnValue(300);
    });

    afterEach(() => {
        offsetHeightSpy.mockRestore();
        offsetWidthSpy.mockRestore();
    });

    const ITEMS = Array.from({length: 100}, (_, index) => `Item ${index + 1}`);

    test('aria-rowcount on the grid and aria-rowindex on the rows replace setsize/posinset', () => {
        render(
            <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                <List
                    role="grid"
                    aria-label="Logs"
                    items={ITEMS}
                    style={{maxHeight: VIEWPORT_HEIGHT}}
                />
            </ListVirtualizer>,
        );

        const grid = screen.getByRole('grid');
        expect(grid).toHaveAttribute('aria-rowcount', String(ITEMS.length));

        const rows = screen.getAllByRole('row');
        expect(rows.length).toBeLessThan(ITEMS.length);
        expect(rows[0]).toHaveAttribute('aria-rowindex', '1');
        expect(rows[1]).toHaveAttribute('aria-rowindex', '2');
        expect(rows[0]).not.toHaveAttribute('aria-posinset');
        expect(rows[0]).not.toHaveAttribute('aria-setsize');
    });

    test('aria-rowindex counts data rows only: section headers are skipped', () => {
        render(
            <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                <List
                    role="grid"
                    aria-label="Groups"
                    items={GROUPS}
                    getItemContent={(item) => item.label}
                    style={{maxHeight: VIEWPORT_HEIGHT}}
                />
            </ListVirtualizer>,
        );

        expect(screen.getByRole('grid')).toHaveAttribute('aria-rowcount', '3');
        expect(screen.getAllByRole('row').map((row) => row.getAttribute('aria-rowindex'))).toEqual([
            '1',
            '2',
            '3',
        ]);
    });

    test.each(['listbox', 'grid'] as const)(
        'the ARIA tree of a %s is the same with and without virtualization',
        (role) => {
            const listProps: ListProps<(typeof GROUPS)[number]> = {
                role,
                'aria-label': 'Groups',
                items: GROUPS,
                getItemContent: (item) => item.label,
            };
            // The role tree: the container, the rows and their cells in display
            // order. role="presentation" nodes are transparent for the a11y
            // tree — both the wrappers of the virtualizer (the spacer and the
            // absolute+top wrapper of a row) and the section headers hide under
            // that role, which is why they are left out of the comparison
            const roleTree = (root: HTMLElement) =>
                // What is compared here is exactly the STRUCTURE of the role
                // tree — Testing Library has no traversal by role for that
                // eslint-disable-next-line testing-library/no-node-access
                [root, ...Array.from(root.querySelectorAll('[role]'))]
                    .map((node) => node.getAttribute('role'))
                    .filter((nodeRole) => nodeRole !== 'presentation')
                    .join('>');

            const view = render(<List {...listProps} />);
            const flatTree = roleTree(screen.getByRole(role));
            view.unmount();

            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List {...listProps} style={{maxHeight: VIEWPORT_HEIGHT}} />
                </ListVirtualizer>,
            );

            expect(roleTree(screen.getByRole(role))).toBe(flatTree);
        },
    );
});
