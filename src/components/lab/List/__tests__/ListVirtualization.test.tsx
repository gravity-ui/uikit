import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

// jsdom has no layout — the sizes are mocked the way other tests of the repo
// do it. tanstack reads the sizes of the viewport and of the rows through
// offsetWidth/offsetHeight (always 0 in jsdom). The Virtualizer measures a row
// through its own wrapper (a div with data-index), so the height of the wrapper
// answers for the row nested in it
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
                // The wrapper of a row: a section header is shorter than an
                // option, which covers measure for rows of variable height.
                // This is a layout mock rather than a node lookup in an
                // assertion — direct access is unavoidable here
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

// jsdom does not implement scrolling: scrollTop is set directly and the event
// is fired by hand
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
            // The full scroll height is set by the inner container
            // eslint-disable-next-line testing-library/no-node-access
            const sizer = listbox.firstElementChild as HTMLElement;
            expect(sizer).toHaveStyle({height: `${ITEMS.length * ROW_HEIGHT}px`});
        });

        test('containerProps reach the virtualized root: onScroll fires alongside the windowing', () => {
            const onScroll = jest.fn();
            renderVirtualized({containerProps: {onScroll, 'data-testid': 'root'}});
            const listbox = screen.getByRole('listbox');
            expect(listbox).toHaveAttribute('data-testid', 'root');

            scrollTo(listbox, ROW_HEIGHT * 150);

            expect(onScroll).toHaveBeenCalledTimes(1);
            expect(screen.getByRole('option', {name: 'Item 151'})).toBeInTheDocument();
        });

        test('total scroll size is corrected by measured rows: an inaccurate estimate does not distort the scrollbar', () => {
            render(
                <ListVirtualizer estimateItemSize={12}>
                    <List aria-label="Logs" items={ITEMS} style={{maxHeight: VIEWPORT_HEIGHT}} />
                </ListVirtualizer>,
            );

            // The estimate is three times too small (12 against 36) — measuring
            // the first window scales the estimate of the tail, and the total
            // scroll height matches the actual rows right away instead of
            // "growing" as the user scrolls
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
        test('the focused row is the pinned one after hover moved the activity', async () => {
            const user = userEvent.setup();
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 2'})).toHaveFocus();

            // A row holds the focus, so hover moves it along with the activity
            await user.hover(screen.getByRole('option', {name: 'Item 5'}));
            expect(screen.getByRole('option', {name: 'Item 5'})).toHaveFocus();

            scrollTo(listbox, ROW_HEIGHT * 150);

            // The pinned row is the focused one: focus did not drop to the
            // body, and the keyboard is alive
            expect(screen.getByRole('option', {name: 'Item 5'})).toHaveFocus();
            expect(screen.queryByRole('option', {name: 'Item 2'})).not.toBeInTheDocument();
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 6'})).toHaveFocus();
        });

        test('focus survives unloading of the active row from the window', async () => {
            const user = userEvent.setup();
            renderVirtualized();
            const listbox = screen.getByRole('listbox');

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 2'})).toHaveFocus();

            // The window travels far away from the active row
            scrollTo(listbox, ROW_HEIGHT * 150);

            // The active row is pinned and has not lost DOM focus...
            const active = screen.getByRole('option', {name: 'Item 2'});
            expect(active).toHaveFocus();
            expect(active).toHaveAttribute('tabindex', '0');
            // ...while its neighbours are unmounted — virtualization works
            expect(screen.queryByRole('option', {name: 'Item 3'})).not.toBeInTheDocument();

            // The keyboard is alive: the next transition moves both the
            // activity and focus
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('option', {name: 'Item 3'})).toHaveFocus();
        });

        test('keyboard navigation scrolls the active row into view minimally, hover does not scroll', async () => {
            // jsdom does not implement scrollIntoView — the mock is defined to
            // pin down the call arguments as well (block: nearest scrolls by
            // exactly the missing height instead of the centering of Chromium)
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

                // Hover activates the row and, since a row holds the focus,
                // moves focus along — but never the scroll
                scrollIntoViewMock.mockClear();
                await user.hover(screen.getByRole('option', {name: 'Item 5'}));

                expect(screen.getByRole('option', {name: 'Item 5'})).toHaveAttribute('data-active');
                expect(screen.getByRole('option', {name: 'Item 5'})).toHaveFocus();
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

        test('section headers stay mounted outside the window: aria-describedby of visible options resolves', () => {
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

            // The window travels deep into the section — its header is outside
            scrollTo(listbox, ROW_HEIGHT * 150);

            // The header is pinned: the aria-describedby reference of the
            // visible options does not dangle, and a screen reader keeps
            // announcing the context of the section
            const header = screen.getByText('Logs');
            const option = screen.getByRole('option', {name: 'Log 151'});
            expect(option).toHaveAttribute('aria-describedby', header.id);
            expect(option).toHaveAccessibleDescription('Logs');
            // Virtualization still works: the start of the section is unmounted
            expect(screen.queryByRole('option', {name: 'Log 2'})).not.toBeInTheDocument();
        });

        // The flatness of the a11y tree under virtualization (the wrappers are
        // transparent, no roles between the container and its rows) is pinned
        // by the role-tree comparison in ListRoleFocus.test.tsx for both role
        // models
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

            // The rows: header(20) + option(36) + header(20) + option(36) + option(36)
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

            // The actual height of the header (20) is ignored — the positions
            // come from the estimate
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

            // measure is off — the positions come entirely from the consumer's
            // estimate, which has access to the row context (kind, item)
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
            // The consumer's overrides are composed as they are without
            // virtualization
            expect(option).toHaveStyle({color: 'red'});
            // The row is positioned by the wrapper of the virtualizer
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
            // The rows are direct children of the listbox: no spacer, no wrappers
            // eslint-disable-next-line testing-library/no-node-access
            expect(listbox.children).toHaveLength(ITEMS.length);
            expect(options[0]).not.toHaveAttribute('aria-setsize');
            expect(options[0]).not.toHaveAttribute('aria-posinset');
            expect(options[0].style.position).not.toBe('absolute');
            expect(listbox.style.overflow).toBe('');
        });
    });
});
