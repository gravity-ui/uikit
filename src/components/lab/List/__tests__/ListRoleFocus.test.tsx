import * as React from 'react';

import userEvent from '@testing-library/user-event';
import * as tabbable from 'tabbable';

import {render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import type {ListItemContext, ListItemHelpers, ListProps} from '../types';
import {useListFocusOwner} from '../useListFocusOwner';

// В jsdom нет layout: displayCheck по умолчанию считает все элементы
// скрытыми, и focusable() (им ходит клавиатура ячеек) возвращает пустой
// список. jest.mock не подходит: модуль уже закеширован сетапом тестов
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
 * Строка с двумя интерактивными элементами: ручка в начале и кнопка в конце.
 * `tabIndex={-1}` — контракт grid: список остаётся одним tab-stop'ом,
 * интерактив ячейки достижим ←/→
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

/** Внешний владелец фокуса: инпут снаружи корня списка (мини-комбобокс) */
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
            // aria-selected переезжает на строку, а не на ячейку
            expect(rows[0]).toHaveAttribute('aria-selected', 'true');

            // Дефолтный рендер кладёт контент в ячейку: role="row" обязан
            // владеть хотя бы одним gridcell
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

            // Список выпадает из Tab-порядка целиком: tab-stop — инпут
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

            // Дальше вправо идти некуда — фокус остаётся на последнем
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

            // Клавиатурный dnd вложенной ручки живёт ровно на этих клавишах:
            // активность списка не двигается, фокус остаётся на ручке
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

            // Ни строки, ни интерактив ячеек в Tab-порядке не задерживают:
            // содержимое ячеек достижимо ←/→, а Tab выходит из виджета
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
                            // tabIndex по умолчанию 0 — лишний tab-stop
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

            // Полная клавиатурная достижимость интерактива ячейки
            // гарантируется только в roving (§15, трудный угол)
            expect(input).toHaveFocus();
        });
    });

    describe('activedescendant: the external focus owner', () => {
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
            expect(onItemAction).toHaveBeenCalledWith('Banana', 'Banana');
        });

        test('character keys go to the owner: filtering instead of typeahead', async () => {
            const user = userEvent.setup();
            render(<ComboboxHarness />);

            const input = screen.getByRole('combobox') as HTMLInputElement;
            await user.click(input);
            await user.keyboard('{ArrowDown}');
            const firstOptionId = screen.getAllByRole('option')[0].id;

            await user.keyboard('c er');

            // Ни typeahead (перешёл бы на Cherry), ни выделение по Space:
            // символы напечатались в инпуте
            expect(input).toHaveValue('c er');
            expect(input).toHaveAttribute('aria-activedescendant', firstOptionId);
        });

        test('a closed popup disconnects the owner: no aria-expanded, controls or activedescendant', () => {
            render(<ComboboxHarness open={false} />);

            const input = screen.getByRole('combobox');
            expect(input).toHaveAttribute('aria-expanded', 'false');
            expect(input).not.toHaveAttribute('aria-controls');
            expect(input).not.toHaveAttribute('aria-activedescendant');
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
        });
    });
});

describe('lab List: grid role model under virtualization', () => {
    const VIEWPORT_HEIGHT = 200;
    const ROW_HEIGHT = 36;
    let offsetHeightSpy: jest.SpyInstance;
    let offsetWidthSpy: jest.SpyInstance;

    beforeEach(() => {
        offsetHeightSpy = jest
            .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
            .mockImplementation(function (this: HTMLElement) {
                return this.getAttribute('role') === 'grid' ? VIEWPORT_HEIGHT : ROW_HEIGHT;
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

    test('the ARIA tree is the same with and without virtualization', () => {
        const listProps: ListProps<(typeof GROUPS)[number]> = {
            role: 'grid',
            'aria-label': 'Groups',
            items: GROUPS,
            getItemContent: (item) => item.label,
        };
        // Дерево ролей: контейнер, строки и их ячейки в порядке отображения.
        // Узлы role="presentation" прозрачны для a11y-дерева — под ними
        // ходят и обёртки виртуализатора (спейсер и absolute+top обёртка
        // строки), и заголовки секций (§9), поэтому в сравнении их нет
        const roleTree = (root: HTMLElement) =>
            // Сравниваем именно СТРУКТУРУ дерева ролей — обхода по ролям
            // у Testing Library для этого нет
            // eslint-disable-next-line testing-library/no-node-access
            [root, ...Array.from(root.querySelectorAll('[role]'))]
                .map((node) => node.getAttribute('role'))
                .filter((role) => role !== 'presentation')
                .join('>');

        const view = render(<List {...listProps} />);
        const flatTree = roleTree(screen.getByRole('grid'));
        view.unmount();

        render(
            <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                <List {...listProps} style={{maxHeight: VIEWPORT_HEIGHT}} />
            </ListVirtualizer>,
        );

        expect(roleTree(screen.getByRole('grid'))).toBe(flatTree);
    });
});
