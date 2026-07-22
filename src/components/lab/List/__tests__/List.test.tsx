import * as React from 'react';

import userEvent from '@testing-library/user-event';
import * as tabbable from 'tabbable';

import {render, screen} from '../../../../../test-utils/utils';
import {Label} from '../../../Label';
import {List} from '../List';

// В jsdom нет layout: displayCheck по умолчанию считает все элементы
// скрытыми, и focusable() внутри List.ItemView возвращает пустой список.
// jest.mock не подходит: модуль уже закеширован сетапом тестов
const realFocusable = tabbable.focusable;
let focusableSpy: jest.SpyInstance;

beforeAll(() => {
    focusableSpy = jest
        .spyOn(tabbable, 'focusable')
        .mockImplementation((container, options) =>
            realFocusable(container, {...options, displayCheck: 'none'}),
        );
});

afterAll(() => {
    focusableSpy.mockRestore();
});

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Melon'];

interface Project {
    id: string;
    name: string;
    disabled?: boolean;
}

const PROJECTS: Project[] = [
    {id: 'p1', name: 'Alpha'},
    {id: 'p2', name: 'Beta', disabled: true},
    {id: 'p3', name: 'Gamma'},
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

describe('lab List', () => {
    describe('rendering and ARIA', () => {
        test('renders a listbox with options from an array of strings', () => {
            render(<List aria-label="Fruits" items={FRUITS} />);

            expect(screen.getByRole('listbox')).toHaveAccessibleName('Fruits');
            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(4);
            expect(options.map((option) => option.textContent)).toEqual(FRUITS);
        });

        test('renders section headers outside of the a11y tree', () => {
            render(
                <List aria-label="Groups" items={GROUPS} getItemContent={(item) => item.label} />,
            );

            // Заголовки секций — не опции: role="presentation" + aria-hidden
            expect(screen.getAllByRole('option')).toHaveLength(3);
            const header = screen.getByText('Recent');
            expect(header).toHaveAttribute('aria-hidden', 'true');
            expect(header).not.toHaveAttribute('tabindex');
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
            // Проверяем именно плоскость дерева (строки — прямые дети listbox,
            // без обёрток): у Testing Library нет API для такого ассерта
            // eslint-disable-next-line testing-library/no-node-access
            const rows = Array.from(listbox.children);
            expect(rows).toHaveLength(2);

            const [header, option] = rows;
            expect(header).toHaveAttribute('role', 'presentation');
            expect(header).toHaveAttribute('aria-hidden', 'true');
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
    });

    describe('keyboard: roving focus', () => {
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

        test('navigation skips section headers but includes disabled options', async () => {
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

            await user.tab();
            expect(options[0]).toHaveFocus();

            await user.keyboard('{ArrowDown}');
            expect(options[1]).toHaveFocus();

            await user.keyboard('{ArrowDown}');
            expect(options[2]).toHaveFocus();
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

            screen.getByRole('button', {name: 'Inner'}).focus();
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
            expect(onItemAction).toHaveBeenCalledWith('Banana', 'Banana');
        });

        test('Enter does nothing on a disabled option', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                    onItemAction={onItemAction}
                    defaultActiveItemId="p2"
                />,
            );

            await user.tab();
            await user.keyboard('{Enter}');

            expect(onItemAction).not.toHaveBeenCalled();
        });

        test('click applies the item and makes it active', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(<List aria-label="Fruits" items={FRUITS} onItemAction={onItemAction} />);
            const options = screen.getAllByRole('option');

            await user.click(options[2]);

            expect(onItemAction).toHaveBeenCalledWith('Cherry', 'Cherry');
            expect(options[2]).toHaveAttribute('data-active');
        });

        test('click on a disabled option does nothing', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                    onItemAction={onItemAction}
                />,
            );

            await user.click(screen.getByText('Beta'));

            expect(onItemAction).not.toHaveBeenCalled();
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
        test('hover changes active state and roving tabindex without moving focus', async () => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();
            render(
                <List aria-label="Fruits" items={FRUITS} onActiveItemUpdate={onActiveItemUpdate} />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            expect(options[0]).toHaveFocus();

            await user.hover(options[2]);

            expect(onActiveItemUpdate).toHaveBeenLastCalledWith('Cherry');
            expect(options[2]).toHaveAttribute('data-active');
            expect(options[2]).toHaveAttribute('tabindex', '0');
            expect(options[0]).toHaveAttribute('tabindex', '-1');
            expect(options[0]).toHaveFocus();
        });

        test('focus catches up with activity on the first keyboard interaction', async () => {
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

    describe('typeahead', () => {
        test('single character moves to the next match from the active option', async () => {
            jest.useFakeTimers();
            try {
                const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
                render(<List aria-label="Fruits" items={FRUITS} />);
                const options = screen.getAllByRole('option');

                await user.tab();
                await user.keyboard('b');
                expect(options[1]).toHaveFocus();

                jest.advanceTimersByTime(600);
                await user.keyboard('m');
                expect(options[3]).toHaveFocus();
            } finally {
                jest.useRealTimers();
            }
        });

        test('accumulated prefix keeps the active option while it matches', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Items" items={['Bar', 'Banana', 'Baobab']} />);
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('ban');

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

        test('Space is part of the search while the buffer is not empty', async () => {
            const user = userEvent.setup();
            const onItemAction = jest.fn();
            render(
                <List
                    aria-label="Colors"
                    items={['Blue whale', 'Blueberry']}
                    onItemAction={onItemAction}
                />,
            );
            const options = screen.getAllByRole('option');

            await user.tab();
            await user.keyboard('blue');
            // без пробела запросу «blue» соответствует Blueberry…
            expect(options[1]).toHaveFocus();

            await user.keyboard(' ');
            // …а «blue » (с пробелом в буфере) — только Blue whale
            expect(options[0]).toHaveFocus();
            expect(onItemAction).not.toHaveBeenCalled();
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

                // Новый буфер «a», а не «ba»: поиск от активного по кругу
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
                    getItemContent={(project) => project.name}
                    getItemTextValue={(project) => project.name}
                />,
            );

            await user.tab();
            await user.keyboard('g');

            expect(screen.getAllByRole('option')[2]).toHaveFocus();
        });
    });

    describe('controlled and uncontrolled activity', () => {
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
            // родитель не применил обновление — фокус остаётся на фактически активной строке
            expect(options[1]).toHaveFocus();
        });

        test('controlled parent applying updates: focus follows, callback fires once per move', async () => {
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

        test('controlled activeItemId missing from items: no active option, navigation starts from the first navigable one', async () => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId="missing"
                    onActiveItemUpdate={onActiveItemUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            for (const option of options) {
                expect(option).not.toHaveAttribute('data-active');
            }
            expect(options[0]).toHaveAttribute('tabindex', '0');

            options[0].focus();
            onActiveItemUpdate.mockClear();
            await user.keyboard('{ArrowDown}');

            expect(onActiveItemUpdate).toHaveBeenLastCalledWith('Apple');
        });

        test('controlled activeItemId={null}: no active option, stays controlled', async () => {
            const user = userEvent.setup();
            const onActiveItemUpdate = jest.fn();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    activeItemId={null}
                    onActiveItemUpdate={onActiveItemUpdate}
                />,
            );
            const options = screen.getAllByRole('option');

            for (const option of options) {
                expect(option).not.toHaveAttribute('data-active');
            }
            expect(options[0]).toHaveAttribute('tabindex', '0');

            options[0].focus();
            onActiveItemUpdate.mockClear();
            await user.keyboard('{ArrowDown}');

            // null — controlled-«нет активного»: навигация стартует с первой
            // навигабельной строки, а не переходит в uncontrolled
            expect(onActiveItemUpdate).toHaveBeenLastCalledWith('Apple');
            for (const option of options) {
                expect(option).not.toHaveAttribute('data-active');
            }
        });
    });

    describe('content tiers', () => {
        test('tier 1: objects with getItemContent', () => {
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                />,
            );

            expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
                'Alpha',
                'Beta',
                'Gamma',
            ]);
        });

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
            // getItemViewProps перевязывает состояние без ручных биндингов
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
            // «не выбран» ≠ «не выбирается»: атрибут есть на каждой опции
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

        test('section headers do not get aria-selected', () => {
            render(
                <List
                    aria-label="Groups"
                    items={GROUPS}
                    getItemContent={(item) => item.label}
                    selectionMode="multiple"
                />,
            );

            expect(screen.getByText('Recent')).not.toHaveAttribute('aria-selected');
        });

        test('disabled options are selectable semantically but not by gesture', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            render(
                <List
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                    selectionMode="multiple"
                    onSelectedUpdate={onSelectedUpdate}
                    defaultActiveItemId="p2"
                />,
            );

            const disabledOption = screen.getAllByRole('option')[1];
            expect(disabledOption).toHaveAttribute('aria-selected', 'false');

            await user.click(disabledOption);
            expect(onSelectedUpdate).not.toHaveBeenCalled();

            disabledOption.focus();
            await user.keyboard(' ');
            expect(onSelectedUpdate).not.toHaveBeenCalled();

            await user.keyboard('{Enter}');
            expect(onSelectedUpdate).not.toHaveBeenCalled();
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

        test('single: repeating the gesture on the selected option does not deselect it but still fires onItemAction', async () => {
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
            // «применение» не гейтуется изменением выделения: жест по уже
            // выбранной строке всё равно применяет её (Select: клик по
            // выбранному закрывает попап)
            expect(onItemAction).toHaveBeenCalledTimes(3);
            expect(onItemAction).toHaveBeenLastCalledWith('Apple', 'Apple');
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

            // повторный жест по выбранной строке снимает выделение
            await user.click(options[1]);
            expect(onSelectedUpdate).toHaveBeenLastCalledWith(['Apple', 'Cherry']);
            expect(options[1]).toHaveAttribute('aria-selected', 'false');
        });

        test('Space selects only with the layer on, and typeahead keeps priority over it', async () => {
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

            // буфер непуст — пробел уходит в поиск, а не в выделение
            await user.keyboard(' ');
            expect(options[0]).toHaveFocus();
            expect(onSelectedUpdate).not.toHaveBeenCalled();
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
        test('defaultSelectedIds sets the initial selection, updates are internal', async () => {
            const user = userEvent.setup();
            render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    defaultSelectedIds={['Cherry']}
                />,
            );
            const options = screen.getAllByRole('option');
            expect(options[2]).toHaveAttribute('aria-selected', 'true');

            await user.click(options[0]);

            expect(options[0]).toHaveAttribute('aria-selected', 'true');
            expect(options[2]).toHaveAttribute('aria-selected', 'false');
        });

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

        test('controlled parent applying updates: selection follows the gesture', async () => {
            const user = userEvent.setup();

            function ControlledList() {
                const [selected, setSelected] = React.useState<string[]>([]);
                return (
                    <List
                        aria-label="Fruits"
                        items={FRUITS}
                        selectionMode="multiple"
                        selectedIds={selected}
                        onSelectedUpdate={setSelected}
                    />
                );
            }

            render(<ControlledList />);
            const options = screen.getAllByRole('option');

            await user.click(options[0]);
            await user.click(options[2]);

            expect(options.map((option) => option.getAttribute('aria-selected'))).toEqual([
                'true',
                'false',
                'true',
                'false',
            ]);

            await user.click(options[0]);
            expect(options[0]).toHaveAttribute('aria-selected', 'false');
        });
    });

    describe('selection layer: rendering', () => {
        test('default renderItem shows the selection: check for multiple, highlight for single', () => {
            const {rerender} = render(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="single"
                    defaultSelectedIds={['Banana']}
                />,
            );

            expect(screen.getAllByRole('option')[1]).toHaveClass('g-lab-list-item-view_selected');

            rerender(
                <List
                    aria-label="Fruits"
                    items={FRUITS}
                    selectionMode="multiple"
                    defaultSelectedIds={['Banana']}
                />,
            );

            const options = screen.getAllByRole('option');
            // multiple — галочка вместо подсветки: выделение не конкурирует
            // с индикацией активной строки
            expect(options[1]).not.toHaveClass('g-lab-list-item-view_selected');
            // Слот галочки — деталь вьюхи: у Testing Library нет API для такого ассерта
            // eslint-disable-next-line testing-library/no-node-access
            const checkSlot = options[1].querySelector('.g-lab-list-item-view__slot_name_checked');
            expect(checkSlot).toBeTruthy();
        });

        test('ctx.state.selected and getItemViewProps carry the selection into a custom renderItem', () => {
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

        test('without the layer ctx.state.selected is absent and getItemViewProps has no selection props', () => {
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

    describe('getItemProps pass-through into List.ItemView', () => {
        test('DOM/a11y props reach the DOM node of the view', async () => {
            const user = userEvent.setup();
            render(
                <List
                    id="spread-list"
                    aria-label="Projects"
                    items={PROJECTS}
                    getItemContent={(project) => project.name}
                />,
            );

            const options = screen.getAllByRole('option');
            // role уже доехал (getAllByRole), корень опции — сама вьюха
            expect(options[0]).toHaveClass('g-lab-list-item-view');
            expect(options[0]).toHaveAttribute('id', 'spread-list-item-p1');
            expect(options[0]).toHaveAttribute('tabindex', '0');
            expect(options[1]).toHaveAttribute('aria-disabled', 'true');
            expect(options[1]).toHaveAttribute('data-disabled');

            // pointer-обработчики тоже доезжают
            await user.hover(options[2]);
            expect(options[2]).toHaveAttribute('data-active');
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
