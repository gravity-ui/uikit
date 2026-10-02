import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen, within} from '../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {Virtualizer} from '../../Virtualizer/Virtualizer';
import type {VirtualizerApi} from '../../Virtualizer/Virtualizer';
import {List} from '../List';
import type {ListProps} from '../types';

import {GROUPS, getSectionHeader, mockLayout, scrollTo} from './helpers';

const VIEWPORT_HEIGHT = 400;
const ROW_HEIGHT = 36;
const SECTION_HEIGHT = 20;

mockLayout({viewport: VIEWPORT_HEIGHT, row: ROW_HEIGHT, section: SECTION_HEIGHT});

const ITEMS = Array.from({length: 200}, (_, index) => `Item ${index + 1}`);

function VirtualizedList(listProps: Partial<ListProps<string>>) {
    return (
        <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
            <List
                aria-label="Logs"
                items={ITEMS}
                style={{maxHeight: VIEWPORT_HEIGHT}}
                {...listProps}
            />
        </ListVirtualizer>
    );
}

function renderVirtualized(listProps?: Partial<ListProps<string>>) {
    return render(<VirtualizedList {...listProps} />);
}

describe('List: virtualization layer', () => {
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

    describe('renders of the engine', () => {
        test('a render the engine is still waiting for does not turn the next one into a loop', () => {
            jest.useFakeTimers();
            // The render asked for from a timer is not wrapped in act — that is the point of it
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            try {
                renderVirtualized();
                const listbox = screen.getByRole('listbox');

                scrollTo(listbox, ROW_HEIGHT * 10);
                // The scroll has ended: the engine asks for a render from a timer, at a priority
                // lower than the one of an event...
                jest.advanceTimersByTime(200);
                // ...and before React gets to it, the next scroll renders at once. The low-priority
                // render is still pending then, and a state the engine sets on every commit would
                // keep the pair going for ever
                scrollTo(listbox, ROW_HEIGHT * 150);

                expect(screen.getByRole('option', {name: 'Item 151'})).toBeInTheDocument();
            } finally {
                consoleErrorSpy.mockRestore();
                jest.useRealTimers();
            }
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

        test('without an active row the tab stop stays mounted', () => {
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            scrollTo(listbox, ROW_HEIGHT * 150);

            const tabStop = screen.getByRole('option', {name: 'Item 1'});
            expect(tabStop).toHaveAttribute('tabindex', '0');
            expect(screen.queryByRole('option', {name: 'Item 2'})).not.toBeInTheDocument();
        });
    });

    describe('scrollToIndex of the engine', () => {
        // The watch of scrollToIndex repeats the scroll over the next frames: the frames are run
        // by hand
        let handle = 0;
        const frames = new Map<number, FrameRequestCallback>();
        let rafSpy: jest.SpyInstance;
        let cafSpy: jest.SpyInstance;

        beforeEach(() => {
            frames.clear();
            rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
                handle += 1;
                frames.set(handle, callback);
                return handle;
            });
            cafSpy = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
                frames.delete(id);
            });
        });

        afterEach(() => {
            rafSpy.mockRestore();
            cafSpy.mockRestore();
        });

        const runFrames = (count: number) => {
            for (let frame = 0; frame < count; frame += 1) {
                const callbacks = Array.from(frames.values());
                frames.clear();
                callbacks.forEach((callback) => callback(0));
            }
        };

        function renderEngine() {
            const apiRef = React.createRef<VirtualizerApi>();
            const getEngine = (rows: string[]) => (
                <Virtualizer
                    apiRef={apiRef}
                    // mockLayout tells the viewport from a row by the role
                    role="listbox"
                    aria-label="Rows"
                    style={{maxHeight: VIEWPORT_HEIGHT}}
                    count={rows.length}
                    getItemSize={() => ROW_HEIGHT}
                    getItemKey={(index) => rows[index]}
                    renderRow={({index}) => <div>{rows[index]}</div>}
                />
            );
            const {rerender, unmount} = render(getEngine(ITEMS));
            frames.clear();
            return {
                apiRef,
                listbox: screen.getByRole('listbox'),
                setRows: (rows: string[]) => rerender(getEngine(rows)),
                unmount,
            };
        }

        test('brings a row into view: by the nearest edge or where `align` says', () => {
            const {apiRef, listbox, unmount} = renderEngine();

            apiRef.current?.scrollToIndex(149);
            expect(listbox.scrollTop).toBe(150 * ROW_HEIGHT - VIEWPORT_HEIGHT);

            apiRef.current?.scrollToIndex(9, 'start');
            expect(listbox.scrollTop).toBe(9 * ROW_HEIGHT);

            unmount();
            expect(apiRef.current).toBeNull();
        });

        test('a new call ends the watch of the previous one, and the watch ends by itself', () => {
            const {apiRef, listbox} = renderEngine();

            apiRef.current?.scrollToIndex(149);
            apiRef.current?.scrollToIndex(9, 'start');
            runFrames(5);

            expect(listbox.scrollTop).toBe(9 * ROW_HEIGHT);
            expect(frames.size).toBe(0);
        });

        test('a reader who scrolls ends the watch', () => {
            // While the watch lasts it brings the row back wherever the list goes: a wheel turned
            // right after the list has scrolled must not be undone
            const {apiRef, listbox} = renderEngine();

            apiRef.current?.scrollToIndex(149);
            expect(frames.size).toBe(1);

            fireEvent.wheel(listbox);

            expect(frames.size).toBe(0);
        });

        test('rows that change end the watch: the index is another row by then', () => {
            const {apiRef, listbox, setRows} = renderEngine();

            apiRef.current?.scrollToIndex(149);
            setRows(['Earlier 1', 'Earlier 2', ...ITEMS]);
            // Whoever scrolls next — the list for its active row, the reader — is not undone
            listbox.scrollTop = 0;
            runFrames(5);

            expect(listbox.scrollTop).toBe(0);
            expect(frames.size).toBe(0);
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

            const header = getSectionHeader('Logs');
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
            const secondHeaderWrapper = getSectionHeader('All').parentElement;
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
            const secondHeaderWrapper = getSectionHeader('All').parentElement;
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

    describe('the wrapper covers one list only', () => {
        test('a list inside a row does not inherit the virtualization of the outer one', () => {
            const INNER = ['Inner 1', 'Inner 2', 'Inner 3'];

            render(
                <ListVirtualizer>
                    <List
                        aria-label="Logs"
                        items={ITEMS}
                        style={{maxHeight: VIEWPORT_HEIGHT}}
                        renderItem={(ctx, {getItemProps}) => (
                            <div {...getItemProps()}>
                                {ctx.id === ITEMS[0] ? (
                                    <List aria-label="Inner" items={INNER} />
                                ) : (
                                    ctx.content
                                )}
                            </div>
                        )}
                    />
                </ListVirtualizer>,
            );

            // The outer list is virtualized — its rows are positioned and numbered
            const outer = screen.getByRole('listbox', {name: 'Logs'});
            expect(outer.style.overflow).toBe('auto');

            // The inner one renders as it would without a wrapper at all: every row, in flow
            const inner = screen.getByRole('listbox', {name: 'Inner'});
            const innerOptions = within(inner).getAllByRole('option');
            expect(innerOptions).toHaveLength(INNER.length);
            expect(innerOptions[0]).not.toHaveAttribute('aria-setsize');
            expect(innerOptions[0].style.position).not.toBe('absolute');
            expect(inner.style.overflow).toBe('');
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
