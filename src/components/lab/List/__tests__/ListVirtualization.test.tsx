import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

// В jsdom нет layout — размеры мокаются по образцу других тестов репо.
// tanstack читает размеры вьюпорта и строк через offsetWidth/offsetHeight
// (в jsdom всегда 0). Virtualizer меряет строку через свою обёртку
// (div c data-index) — её высота отвечает вложенной строке
const VIEWPORT_HEIGHT = 400;
const ROW_HEIGHT = 36;
const SECTION_HEIGHT = 20;

let offsetHeightSpy: jest.SpyInstance;
let offsetWidthSpy: jest.SpyInstance;

beforeEach(() => {
    offsetHeightSpy = jest
        .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
        .mockImplementation(function (this: HTMLElement) {
            if (this.getAttribute('role') === 'listbox') {
                return VIEWPORT_HEIGHT;
            }
            if (this.hasAttribute('data-index')) {
                // Обёртка строки: заголовок секции ниже опции — покрывает
                // measure строк переменной высоты. Это мок layout'а, а не
                // поиск ноды в ассерте — прямой доступ здесь неизбежен
                // eslint-disable-next-line testing-library/no-node-access
                const inner = this.firstElementChild;
                const isSection = inner?.getAttribute('role') === 'presentation';
                return isSection ? SECTION_HEIGHT : ROW_HEIGHT;
            }
            return ROW_HEIGHT;
        });
    offsetWidthSpy = jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(300);
});

afterEach(() => {
    offsetHeightSpy.mockRestore();
    offsetWidthSpy.mockRestore();
});

// jsdom не реализует скролл: scrollTop задаётся напрямую, событие — вручную
function scrollTo(element: HTMLElement, top: number) {
    Object.defineProperty(element, 'scrollTop', {configurable: true, writable: true, value: top});
    fireEvent.scroll(element);
}

const ITEMS = Array.from({length: 200}, (_, index) => `Item ${index + 1}`);

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

function renderVirtualized(listProps?: Partial<React.ComponentProps<typeof List<string>>>) {
    return render(
        <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
            <List
                aria-label="Logs"
                items={ITEMS}
                style={{maxHeight: VIEWPORT_HEIGHT}}
                {...listProps}
            />
        </ListVirtualizer>,
    );
}

describe('lab List: virtualization layer', () => {
    describe('windowing', () => {
        test('renders a window of rows instead of the whole list', () => {
            renderVirtualized();

            const options = screen.getAllByRole('option');
            expect(options.length).toBeGreaterThan(0);
            expect(options.length).toBeLessThan(ITEMS.length / 2);
            expect(screen.getByRole('option', {name: 'Item 1'})).toBeInTheDocument();
            expect(screen.queryByRole('option', {name: 'Item 100'})).not.toBeInTheDocument();
        });

        test('scrolling moves the window', () => {
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            scrollTo(listbox, ROW_HEIGHT * 150);

            expect(screen.getByRole('option', {name: 'Item 151'})).toBeInTheDocument();
            expect(screen.queryByRole('option', {name: 'Item 100'})).not.toBeInTheDocument();
        });

        test('the root of the List is the scroll container and gets overflow, consumer style is kept', () => {
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            expect(listbox).toHaveStyle({overflow: 'auto', maxHeight: `${VIEWPORT_HEIGHT}px`});
            // полная высота скролла задаётся внутренним контейнером
            // eslint-disable-next-line testing-library/no-node-access
            const sizer = listbox.firstElementChild as HTMLElement;
            expect(sizer).toHaveStyle({height: `${ITEMS.length * ROW_HEIGHT}px`});
        });

        test('total scroll size is corrected by measured rows: an inaccurate estimate does not distort the scrollbar', () => {
            render(
                <ListVirtualizer estimateItemSize={12}>
                    <List aria-label="Logs" items={ITEMS} style={{maxHeight: VIEWPORT_HEIGHT}} />
                </ListVirtualizer>,
            );

            // оценка занижена втрое (12 против 36) — замер первого окна
            // масштабирует оценку хвоста, и суммарная высота скролла сразу
            // отвечает фактическим строкам, а не «растёт» по мере скролла
            const listbox = screen.getByRole('listbox');
            // eslint-disable-next-line testing-library/no-node-access
            const sizer = listbox.firstElementChild as HTMLElement;
            expect(sizer).toHaveStyle({height: `${ITEMS.length * ROW_HEIGHT}px`});
        });

        test('rows are positioned with absolute top on the virtualizer wrapper, not transform', () => {
            renderVirtualized();

            const option = screen.getByRole('option', {name: 'Item 2'});
            // eslint-disable-next-line testing-library/no-node-access
            const wrapper = option.parentElement as HTMLElement;
            expect(wrapper).toHaveAttribute('data-index', '1');
            expect(wrapper).toHaveStyle({position: 'absolute', top: `${ROW_HEIGHT}px`});
            expect(wrapper.style.transform).toBe('');
        });
    });

    describe('roving focus survives virtualization', () => {
        test('focus survives unloading of the active row from the window', async () => {
            const user = userEvent.setup();
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 2'})).toHaveFocus();

            // окно уезжает далеко от активной строки
            scrollTo(listbox, ROW_HEIGHT * 150);

            // активная строка запиннена и не потеряла DOM-фокус...
            const active = screen.getByRole('option', {name: 'Item 2'});
            expect(active).toHaveFocus();
            expect(active).toHaveAttribute('tabindex', '0');
            // ...при этом её соседи выгружены — виртуализация работает
            expect(screen.queryByRole('option', {name: 'Item 3'})).not.toBeInTheDocument();

            // клавиатура жива: следующий переход двигает активность и фокус
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 3'})).toHaveFocus();
        });

        test('keyboard navigation scrolls the active row into view minimally, hover does not scroll', async () => {
            // jsdom не реализует scrollIntoView — определяем мок, чтобы
            // зафиксировать и параметры вызова (block: nearest — доскролл
            // ровно недостающей высоты, а не центрирование Chromium)
            const scrollIntoViewMock = jest.fn();
            HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
            try {
                const user = userEvent.setup();
                renderVirtualized();

                await user.tab();
                scrollIntoViewMock.mockClear();
                await user.keyboard('{ArrowDown}');

                expect(screen.getByRole('option', {name: 'Item 2'})).toHaveFocus();
                expect(scrollIntoViewMock).toHaveBeenCalledWith({block: 'nearest'});

                // hover активирует строку, но не двигает ни фокус, ни скролл
                scrollIntoViewMock.mockClear();
                await user.hover(screen.getByRole('option', {name: 'Item 5'}));

                expect(screen.getByRole('option', {name: 'Item 5'})).toHaveAttribute('data-active');
                expect(scrollIntoViewMock).not.toHaveBeenCalled();
            } finally {
                delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
            }
        });

        test('without an active row the first navigable option (tab stop) stays mounted', () => {
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            scrollTo(listbox, ROW_HEIGHT * 150);

            const tabStop = screen.getByRole('option', {name: 'Item 1'});
            expect(tabStop).toHaveAttribute('tabindex', '0');
            expect(screen.queryByRole('option', {name: 'Item 2'})).not.toBeInTheDocument();
        });
    });

    describe('ARIA', () => {
        test('options get aria-setsize/aria-posinset numbered by options, sections are not counted', () => {
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List
                        aria-label="Groups"
                        items={GROUPS}
                        getItemContent={(item) => item.label}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                    />
                </ListVirtualizer>,
            );

            const options = screen.getAllByRole('option');
            expect(options.map((option) => option.getAttribute('aria-posinset'))).toEqual([
                '1',
                '2',
                '3',
            ]);
            for (const option of options) {
                expect(option).toHaveAttribute('aria-setsize', '3');
            }

            const header = screen.getByText('Recent');
            expect(header).toHaveAttribute('aria-hidden', 'true');
            expect(header).not.toHaveAttribute('aria-setsize');
            expect(header).not.toHaveAttribute('aria-posinset');
        });

        test('aria-setsize reflects the whole list, not the rendered window', () => {
            renderVirtualized();

            const option = screen.getByRole('option', {name: 'Item 1'});
            expect(option).toHaveAttribute('aria-setsize', String(ITEMS.length));
            expect(option).toHaveAttribute('aria-posinset', '1');
        });

        test('section headers stay presentational inside the virtualized window', () => {
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List
                        aria-label="Groups"
                        items={GROUPS}
                        getItemContent={(item) => item.label}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                    />
                </ListVirtualizer>,
            );

            // a11y-дерево остаётся плоским: обёртки виртуализатора прозрачны
            // (role="presentation"), между listbox и опциями нет других ролей
            expect(screen.getAllByRole('option')).toHaveLength(3);
            const header = screen.getByText('Recent');
            expect(header).toHaveAttribute('role', 'presentation');
            expect(header).not.toHaveAttribute('tabindex');
        });
    });

    describe('measure', () => {
        test('measures variable row heights: section headers are lower than options', () => {
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List
                        aria-label="Groups"
                        items={GROUPS}
                        getItemContent={(item) => item.label}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                    />
                </ListVirtualizer>,
            );

            // строки: header(20) + option(36) + header(20) + option(36) + option(36)
            // eslint-disable-next-line testing-library/no-node-access
            const firstOptionWrapper = screen.getByRole('option', {name: 'First'}).parentElement;
            expect(firstOptionWrapper).toHaveStyle({top: `${SECTION_HEIGHT}px`});
            // eslint-disable-next-line testing-library/no-node-access
            const secondHeaderWrapper = screen.getByText('All').parentElement;
            expect(secondHeaderWrapper).toHaveStyle({top: `${SECTION_HEIGHT + ROW_HEIGHT}px`});
        });

        test('measure={false} keeps the estimated positions', () => {
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT} measure={false}>
                    <List
                        aria-label="Groups"
                        items={GROUPS}
                        getItemContent={(item) => item.label}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                    />
                </ListVirtualizer>,
            );

            // фактическая высота заголовка (20) игнорируется — позиции по оценке
            // eslint-disable-next-line testing-library/no-node-access
            const firstOptionWrapper = screen.getByRole('option', {name: 'First'}).parentElement;
            expect(firstOptionWrapper).toHaveStyle({top: `${ROW_HEIGHT}px`});
        });

        test('estimateItemSize accepts a function of the row context', () => {
            render(
                <ListVirtualizer
                    estimateItemSize={(ctx) =>
                        ctx.kind === 'section' ? SECTION_HEIGHT : ROW_HEIGHT
                    }
                    measure={false}
                >
                    <List
                        aria-label="Groups"
                        items={GROUPS}
                        getItemContent={(item) => item.label}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                    />
                </ListVirtualizer>,
            );

            // measure выключен — позиции целиком из оценки потребителя,
            // которой доступен контекст строки (kind, item)
            // eslint-disable-next-line testing-library/no-node-access
            const firstOptionWrapper = screen.getByRole('option', {name: 'First'}).parentElement;
            expect(firstOptionWrapper).toHaveStyle({top: `${SECTION_HEIGHT}px`});
            // eslint-disable-next-line testing-library/no-node-access
            const secondHeaderWrapper = screen.getByText('All').parentElement;
            expect(secondHeaderWrapper).toHaveStyle({top: `${SECTION_HEIGHT + ROW_HEIGHT}px`});
        });
    });

    describe('custom renderItem', () => {
        test('tier 3 custom markup works under virtualization without changes', async () => {
            const user = userEvent.setup();
            const calls: string[] = [];
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List
                        aria-label="Users"
                        items={[
                            {id: 'u1', name: 'User One'},
                            {id: 'u2', name: 'User Two'},
                        ]}
                        getItemTextValue={(item) => item.name}
                        onItemAction={() => calls.push('core')}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                        renderItem={(ctx, {getItemProps}) => (
                            <div
                                {...getItemProps({
                                    onClick: () => calls.push(`override:${ctx.id}`),
                                    style: {color: 'red'},
                                })}
                                className="custom-card"
                            >
                                {ctx.item.name}
                            </div>
                        )}
                    />
                </ListVirtualizer>,
            );

            const option = screen.getByRole('option', {name: 'User One'});
            expect(option).toHaveClass('custom-card');
            expect(option).toHaveAttribute('tabindex', '0');
            expect(option).toHaveAttribute('aria-setsize', '2');
            expect(option).toHaveAttribute('aria-posinset', '1');
            // переопределения потребителя компонуются как без виртуализации
            expect(option).toHaveStyle({color: 'red'});
            // позиционирует строку обёртка виртуализатора
            // eslint-disable-next-line testing-library/no-node-access
            expect(option.parentElement).toHaveStyle({position: 'absolute', top: '0px'});

            await user.click(option);
            expect(calls).toEqual(['core', 'override:u1']);
        });

        test('selection layer works under virtualization (layers are independent)', async () => {
            const user = userEvent.setup();
            const onSelectedUpdate = jest.fn();
            renderVirtualized({
                selectionMode: 'single',
                onSelectedUpdate,
            } as Partial<React.ComponentProps<typeof List<string>>>);

            const option = screen.getByRole('option', {name: 'Item 3'});
            await user.click(option);

            expect(onSelectedUpdate).toHaveBeenCalledWith(['Item 3']);
            expect(option).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('flat mode without the wrapper', () => {
        test('renders all rows flatly, without virtualization artifacts', () => {
            render(<List aria-label="Logs" items={ITEMS} />);

            const listbox = screen.getByRole('listbox');
            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(ITEMS.length);
            // строки — прямые дети listbox: ни спейсера, ни обёрток
            // eslint-disable-next-line testing-library/no-node-access
            expect(listbox.children).toHaveLength(ITEMS.length);
            expect(options[0]).not.toHaveAttribute('aria-setsize');
            expect(options[0]).not.toHaveAttribute('aria-posinset');
            expect(options[0].style.position).not.toBe('absolute');
            expect(listbox.style.overflow).toBe('');
        });
    });
});
