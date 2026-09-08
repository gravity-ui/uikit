import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import type {ListProps} from '../types';

import {GROUPS, mockLayout, scrollTo} from './helpers';

const VIEWPORT_HEIGHT = 400;
const ROW_HEIGHT = 36;
const SECTION_HEIGHT = 20;

mockLayout({viewport: VIEWPORT_HEIGHT, row: ROW_HEIGHT, section: SECTION_HEIGHT});

const ITEMS = Array.from({length: 200}, (_, index) => `Item ${index + 1}`);

function renderVirtualized(listProps?: Partial<ListProps<string>>) {
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

        test('the root of the List is the scroll container', () => {
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            expect(listbox).toHaveStyle({overflow: 'auto', maxHeight: `${VIEWPORT_HEIGHT}px`});
            // eslint-disable-next-line testing-library/no-node-access
            const sizer = listbox.firstElementChild as HTMLElement;
            expect(sizer).toHaveStyle({height: `${ITEMS.length * ROW_HEIGHT}px`});
        });

        test('containerProps reach the virtualized root', () => {
            const onScroll = jest.fn();
            renderVirtualized({containerProps: {onScroll, 'data-testid': 'root'}});
            const listbox = screen.getByRole('listbox');
            expect(listbox).toHaveAttribute('data-testid', 'root');

            scrollTo(listbox, ROW_HEIGHT * 150);

            expect(onScroll).toHaveBeenCalledTimes(1);
            expect(screen.getByRole('option', {name: 'Item 151'})).toBeInTheDocument();
        });

        test('total scroll size is corrected by measured rows', () => {
            render(
                <ListVirtualizer estimateItemSize={12}>
                    <List aria-label="Logs" items={ITEMS} style={{maxHeight: VIEWPORT_HEIGHT}} />
                </ListVirtualizer>,
            );

            const listbox = screen.getByRole('listbox');
            // eslint-disable-next-line testing-library/no-node-access
            const sizer = listbox.firstElementChild as HTMLElement;
            expect(sizer).toHaveStyle({height: `${ITEMS.length * ROW_HEIGHT}px`});
        });

        test('changing the estimate drops the correction instead of skewing the tail by the old ratio', () => {
            const {rerender} = render(
                <ListVirtualizer estimateItemSize={12}>
                    <List aria-label="Logs" items={ITEMS} style={{maxHeight: VIEWPORT_HEIGHT}} />
                </ListVirtualizer>,
            );
            const listbox = screen.getByRole('listbox');
            // eslint-disable-next-line testing-library/no-node-access
            const sizer = listbox.firstElementChild as HTMLElement;
            expect(sizer).toHaveStyle({height: `${ITEMS.length * ROW_HEIGHT}px`});

            rerender(
                <ListVirtualizer estimateItemSize={100}>
                    <List aria-label="Logs" items={ITEMS} style={{maxHeight: VIEWPORT_HEIGHT}} />
                </ListVirtualizer>,
            );

            // Measured rows keep their 36px; the unmeasured tail uses the new
            // estimate as is. With the stale correction the tail would be
            // scaled by the old 36/12 ratio to ~300 per row
            const height = Number.parseInt(sizer.style.height, 10);
            expect(height).toBeLessThanOrEqual(ITEMS.length * 100);
            expect(height).toBeGreaterThan(ITEMS.length * ROW_HEIGHT);
        });

        test('rows are positioned with absolute top, not transform', () => {
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
        test('the focused row survives the window moving away', async () => {
            const user = userEvent.setup();
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 2'})).toHaveFocus();

            await user.hover(screen.getByRole('option', {name: 'Item 5'}));
            expect(screen.getByRole('option', {name: 'Item 5'})).toHaveFocus();

            scrollTo(listbox, ROW_HEIGHT * 150);

            const active = screen.getByRole('option', {name: 'Item 5'});
            expect(active).toHaveFocus();
            expect(active).toHaveAttribute('tabindex', '0');
            expect(screen.queryByRole('option', {name: 'Item 2'})).not.toBeInTheDocument();
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 6'})).toHaveFocus();
        });

        test('keyboard navigation scrolls the active row into view, hover does not', async () => {
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

                scrollIntoViewMock.mockClear();
                await user.hover(screen.getByRole('option', {name: 'Item 5'}));

                expect(screen.getByRole('option', {name: 'Item 5'})).toHaveAttribute('data-active');
                expect(screen.getByRole('option', {name: 'Item 5'})).toHaveFocus();
                expect(scrollIntoViewMock).not.toHaveBeenCalled();
            } finally {
                delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
            }
        });

        test('without an active row the tab stop stays mounted', () => {
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            scrollTo(listbox, ROW_HEIGHT * 150);

            const tabStop = screen.getByRole('option', {name: 'Item 1'});
            expect(tabStop).toHaveAttribute('tabindex', '0');
            expect(screen.queryByRole('option', {name: 'Item 2'})).not.toBeInTheDocument();
        });
    });

    describe('ARIA', () => {
        test('aria-setsize reflects the whole list, not the rendered window', () => {
            renderVirtualized();

            const option = screen.getByRole('option', {name: 'Item 1'});
            expect(option).toHaveAttribute('aria-setsize', String(ITEMS.length));
            expect(option).toHaveAttribute('aria-posinset', '1');
        });

        test('section headers stay mounted outside the window', () => {
            const bigGroups = [
                {
                    id: 'logs',
                    label: 'Logs',
                    children: Array.from({length: 200}, (_, index) => ({
                        id: `log-${index + 1}`,
                        label: `Log ${index + 1}`,
                    })),
                },
            ];
            render(
                <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
                    <List
                        aria-label="Logs"
                        items={bigGroups}
                        getItemContent={(item) => item.label}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                    />
                </ListVirtualizer>,
            );
            const listbox = screen.getByRole('listbox');

            scrollTo(listbox, ROW_HEIGHT * 150);

            const header = screen.getByText('Logs');
            const option = screen.getByRole('option', {name: 'Log 151'});
            expect(option).toHaveAttribute('aria-describedby', header.id);
            expect(option).toHaveAccessibleDescription('Logs');
            expect(screen.queryByRole('option', {name: 'Log 2'})).not.toBeInTheDocument();
        });
    });

    describe('measure', () => {
        test('measures variable row heights', () => {
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

            // eslint-disable-next-line testing-library/no-node-access
            const firstOptionWrapper = screen.getByRole('option', {name: 'First'}).parentElement;
            expect(firstOptionWrapper).toHaveStyle({top: `${SECTION_HEIGHT}px`});
            // eslint-disable-next-line testing-library/no-node-access
            const secondHeaderWrapper = screen.getByText('All').parentElement;
            expect(secondHeaderWrapper).toHaveStyle({top: `${SECTION_HEIGHT + ROW_HEIGHT}px`});
        });
    });

    describe('custom renderItem', () => {
        test('tier 3 custom markup works under virtualization', async () => {
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
            expect(option).toHaveStyle({color: 'red'});
            // eslint-disable-next-line testing-library/no-node-access
            expect(option.parentElement).toHaveStyle({position: 'absolute', top: '0px'});

            await user.click(option);
            expect(calls).toEqual(['core', 'override:u1']);
        });
    });

    describe('flat mode without the wrapper', () => {
        test('renders all rows flatly, without virtualization artifacts', () => {
            render(<List aria-label="Logs" items={ITEMS} />);

            const listbox = screen.getByRole('listbox');
            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(ITEMS.length);
            expect(options[0]).not.toHaveAttribute('aria-setsize');
            expect(options[0]).not.toHaveAttribute('aria-posinset');
            expect(options[0].style.position).not.toBe('absolute');
            expect(listbox.style.overflow).toBe('');
        });
    });
});
