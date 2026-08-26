import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import type {ListItemContext, ListItemHelpers, ListProps} from '../types';
import {useListFocusOwner} from '../useListFocusOwner';

import {
    ComboboxHarness,
    GROUPS,
    createTracker,
    mockLayout,
    mockTabbableDisplayCheck,
} from './helpers';

mockTabbableDisplayCheck();

const FRUITS = ['Apple', 'Banana', 'Cherry'];

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

describe('lab List: role model x focus strategy', () => {
    describe('axes matrix: container and row semantics', () => {
        test('listbox + roving (default): no grid semantics', () => {
            render(<List aria-label="Fruits" items={FRUITS} />);

            expect(screen.getByRole('listbox')).toBeInTheDocument();
            expect(screen.queryByRole('grid')).not.toBeInTheDocument();
            expect(screen.queryAllByRole('gridcell')).toHaveLength(0);
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
            expect(rows[0]).toHaveAttribute('aria-selected', 'true');

            const cells = screen.getAllByRole('gridcell');
            expect(cells).toHaveLength(3);
            expect(cells[0]).toHaveTextContent('Apple');
            expect(cells[0]).not.toHaveAttribute('aria-selected');
        });

        test('listbox + activedescendant: options without a tab stop, the input owns the focus', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness items={FRUITS} />);

            const input = screen.getByRole('combobox');
            expect(input).toHaveAttribute('aria-expanded', 'true');
            expect(input).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);

            const options = screen.getAllByRole('option');
            for (const option of options) {
                expect(option).not.toHaveAttribute('tabindex');
            }

            await user.tab();
            expect(input).toHaveFocus();
            await user.tab();
            expect(input).not.toHaveFocus();
            expect(document.body).toHaveFocus();
        });

        test('grid + activedescendant: rows and cells keep grid roles, the input owns the focus', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness items={FRUITS} role="grid" />);

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
        test('hover leaves the focus in the cell content, Tab still leaves the list', async () => {
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

            await user.hover(rows[2]);
            expect(rows[2]).toHaveAttribute('data-active');
            expect(rows[2]).toHaveAttribute('tabindex', '0');
            expect(handle).toHaveFocus();

            // fireEvent: user-event computes Tab's destination from the original target
            expect(fireEvent.keyDown(handle, {key: 'Tab'})).toBe(true);
            expect(rows[2]).toHaveFocus();
        });

        test('ArrowRight enters the cell content, ArrowLeft returns to the row', async () => {
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

            expect(handle).toHaveFocus();
            expect(onKeyDown).toHaveBeenCalled();
            expect(screen.getAllByRole('row')[1]).not.toHaveAttribute('data-active');
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
            render(
                <ComboboxHarness items={FRUITS} role="grid" renderItem={renderRowWithControls} />,
            );

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{ArrowDown}{ArrowRight}');

            expect(input).toHaveFocus();
        });
    });

    describe('activedescendant: the external focus owner', () => {
        test('a click applies the row and leaves DOM focus with the owner', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<ComboboxHarness items={FRUITS} onItemAction={onItemAction} />);

            const input = screen.getByRole('combobox');
            const options = screen.getAllByRole('option');
            await user.click(input);

            await user.click(options[1]);

            expect(input).toHaveFocus();
            expect(onItemAction).toHaveBeenCalledWith(
                'Banana',
                'Banana',
                expect.objectContaining({type: 'click'}),
            );
            expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
        });

        test('Home/End on the active row still scroll it into view', async () => {
            const scrollIntoViewMock = jest.fn();
            HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
            try {
                const user = userEvent.setup();
                render(<ComboboxHarness items={FRUITS} defaultActiveItemId="Cherry" />);
                await user.click(screen.getByRole('combobox'));
                scrollIntoViewMock.mockClear();

                await user.keyboard('{End}');

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
            render(<ComboboxHarness items={FRUITS} />);

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
            render(<ComboboxHarness items={FRUITS} onItemAction={onItemAction} />);

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
            render(<ComboboxHarness items={FRUITS} />);

            const input = screen.getByRole('combobox') as HTMLInputElement;
            await user.click(input);
            await user.keyboard('{ArrowDown}');
            const firstOptionId = screen.getAllByRole('option')[0].id;

            await user.keyboard('c er');

            expect(input).toHaveValue('c er');
            expect(input).toHaveAttribute('aria-activedescendant', firstOptionId);
        });

        test('the cursor follows the keys of the owner', async () => {
            const user = userEvent.setup();
            const {view, renderItem} = createTracker();
            render(<ComboboxHarness items={FRUITS} renderItem={renderItem} />);

            await user.click(screen.getByRole('combobox'));
            await user.keyboard('{ArrowDown}');
            expect(view.get('Apple')).toMatchObject({active: true});

            await user.hover(screen.getAllByRole('option')[1]);
            expect(view.get('Banana')).toMatchObject({active: false});

            await user.keyboard('{ArrowDown}');
            expect(view.get('Cherry')).toMatchObject({active: true});
        });

        test('a closed popup disconnects the owner', async () => {
            const user = userEvent.setup();
            const {rerender} = render(<ComboboxHarness items={FRUITS} />);
            const input = screen.getByRole('combobox');

            await user.click(input);
            await user.keyboard('{ArrowDown}');
            expect(input).toHaveAttribute('aria-expanded', 'true');
            expect(input).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);
            expect(input).toHaveAttribute(
                'aria-activedescendant',
                screen.getAllByRole('option')[0].id,
            );

            rerender(<ComboboxHarness items={FRUITS} open={false} />);

            expect(input).toHaveAttribute('aria-expanded', 'false');
            expect(input).not.toHaveAttribute('aria-controls');
            expect(input).not.toHaveAttribute('aria-activedescendant');
        });

        test('the owner may be a button (a select-only combobox)', async () => {
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
        test('listbox: the getter is empty', () => {
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
        test('dnd props and the drop indicator land on the row', () => {
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
    mockLayout({viewport: VIEWPORT_HEIGHT, row: ROW_HEIGHT});

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

    test.each([
        ['listbox', 'option', 'aria-posinset', 'aria-setsize', 'option'],
        ['grid', 'row', 'aria-rowindex', 'aria-rowcount', 'grid'],
    ] as const)(
        '%s: rows are numbered by data rows only, section headers are skipped',
        (role, rowRole, indexAttr, countAttr, countRole) => {
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List
                        role={role}
                        aria-label="Groups"
                        items={GROUPS}
                        getItemContent={(item) => item.label}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                    />
                </ListVirtualizer>,
            );

            expect(
                screen.getAllByRole(rowRole).map((node) => node.getAttribute(indexAttr)),
            ).toEqual(['1', '2', '3']);
            for (const node of screen.getAllByRole(countRole)) {
                expect(node).toHaveAttribute(countAttr, '3');
            }

            const header = screen.getByText('Recent');
            expect(header).toHaveAttribute('aria-hidden', 'true');
            expect(header).not.toHaveAttribute(indexAttr);
            expect(header).not.toHaveAttribute(countAttr);
        },
    );

    test.each(['listbox', 'grid'] as const)(
        'the ARIA tree of a %s is the same with and without virtualization',
        (role) => {
            const listProps: ListProps<(typeof GROUPS)[number]> = {
                role,
                'aria-label': 'Groups',
                items: GROUPS,
                getItemContent: (item) => item.label,
            };
            const roleTree = (root: HTMLElement) =>
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
