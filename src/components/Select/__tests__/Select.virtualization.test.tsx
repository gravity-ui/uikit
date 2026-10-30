import userEvent from '@testing-library/user-event';

import {act, render, screen, within} from '../../../../test-utils/utils';
import {LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT} from '../../List/VirtualizationContext';
import {mockLayout, preloadListVirtualizer} from '../../List/__tests__/helpers';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import type {ListVirtualizerProps} from '../../Virtualizer/ListVirtualizer';
import * as loader from '../../Virtualizer/loadVirtualizedListRoot';
import {MobileProvider} from '../../mobile';
import {SelectQa} from '../constants';
import type {SelectProps} from '../types';

import {
    ControlledSelect,
    SELECT_LIST_VIRTUALIZED_CLASS,
    TEST_QA,
    generateOptions,
    generateOptionsGroups,
} from './utils';

const ROW_HEIGHT = 28;
const VIEWPORT = 100;
const MIN_ITEMS_COUNT = 50;

mockLayout({viewport: VIEWPORT, row: ROW_HEIGHT});

let offsetTopSpy: jest.SpyInstance;

beforeEach(() => {
    // jsdom has no layout: a row of a plain list is as far from the top as its position says, a
    // row of the window — as far as the inline `top` of its wrapper
    offsetTopSpy = jest
        .spyOn(HTMLElement.prototype, 'offsetTop', 'get')
        .mockImplementation(function (this: HTMLElement) {
            if (this.style.top) {
                return Number.parseInt(this.style.top, 10);
            }
            // eslint-disable-next-line testing-library/no-node-access
            const parent = this.parentElement;
            if (!parent) {
                return 0;
            }
            // eslint-disable-next-line testing-library/no-node-access
            return Array.prototype.indexOf.call(parent.children, this) * ROW_HEIGHT;
        });
});

afterEach(() => {
    offsetTopSpy.mockRestore();
});

// The scroll that shows the option of the given number at the bottom of the viewport
const scrollTopFor = (option: number) => option * ROW_HEIGHT - VIEWPORT;

// The list of the Select with the given id: two of them are open in a test below
const getListOf = (id: string) => {
    const list = screen
        .getAllByTestId(SelectQa.LIST)
        .find(({id: listId}) => listId === `select-popup-${id}`);
    if (!list) {
        throw new Error(`No list of the Select "${id}"`);
    }
    return list;
};

// One wrapper above the whole app, the way v7 virtualized a Select of 50 options and more
function renderWithRootWrapper(props: Partial<SelectProps>) {
    return render(
        <MobileProvider mobile={false}>
            <ListVirtualizer minItemsCount={MIN_ITEMS_COUNT}>
                <ControlledSelect {...props} />
            </ListVirtualizer>
        </MobileProvider>,
    );
}

async function openWithRootWrapper(props: Partial<SelectProps>) {
    const utils = renderWithRootWrapper(props);
    const user = userEvent.setup();
    await user.click(screen.getByTestId(TEST_QA));
    return {...utils, user};
}

let loadSpy: jest.SpyInstance;

beforeEach(() => {
    loadSpy = jest.spyOn(loader, 'loadVirtualizedListRoot');
});

afterEach(() => {
    loadSpy.mockRestore();
});

/**
 * The chunk is loaded once per module registry — once per test file: this test comes first and
 * opens the popup before the chunk has loaded; the ones after it load the chunk up front
 */
describe('Select under ListVirtualizer: the chunk of the window', () => {
    test('the selected option is in view once the window replaces the first rows', async () => {
        // One selected option lies past the first rows, the other one among them
        render(
            <MobileProvider mobile={false}>
                <ListVirtualizer minItemsCount={MIN_ITEMS_COUNT}>
                    <ControlledSelect
                        id="past"
                        options={generateOptions(300)}
                        value={['val200']}
                        defaultOpen
                    />
                    <ControlledSelect
                        id="among"
                        options={generateOptions(300)}
                        value={['val30']}
                        defaultOpen
                    />
                </ListVirtualizer>
            </MobileProvider>,
        );

        const firstRows = getListOf('past');
        expect(within(firstRows).getAllByRole('option')).toHaveLength(
            LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT,
        );
        expect(
            within(firstRows).queryByRole('option', {name: 'Value 200'}),
        ).not.toBeInTheDocument();
        expect(getListOf('among').scrollTop).toBe(scrollTopFor(30));

        await act(async () => {
            await loader.loadVirtualizedListRoot();
        });

        // A new root: the window, scrolled to each selected option rather than to the top
        expect(getListOf('past')).not.toBe(firstRows);
        expect(within(getListOf('past')).getAllByRole('option').length).toBeLessThan(
            LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT,
        );
        expect(getListOf('past').scrollTop).toBe(scrollTopFor(200));
        expect(getListOf('among').scrollTop).toBe(scrollTopFor(30));
    });
});

describe('Select under ListVirtualizer: minItemsCount', () => {
    preloadListVirtualizer();

    test('a Select of fewer options renders a plain list', async () => {
        await openWithRootWrapper({options: generateOptions(MIN_ITEMS_COUNT - 1)});

        expect(screen.getByTestId(SelectQa.LIST)).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(MIN_ITEMS_COUNT - 1);
        expect(options[0]).not.toHaveAttribute('aria-setsize');
    });

    test('a Select of minItemsCount options and more is virtualized', async () => {
        await openWithRootWrapper({options: generateOptions(MIN_ITEMS_COUNT)});

        expect(screen.getByTestId(SelectQa.LIST)).toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        const options = screen.getAllByRole('option');
        expect(options.length).toBeLessThan(MIN_ITEMS_COUNT);
        expect(options[0]).toHaveAttribute('aria-setsize', String(MIN_ITEMS_COUNT));
    });

    test('the headers of the groups are not counted', async () => {
        // 50 options in two groups: 52 rows, but 50 options
        const {unmount} = render(
            <MobileProvider mobile={false}>
                <ListVirtualizer minItemsCount={MIN_ITEMS_COUNT + 1}>
                    <ControlledSelect options={generateOptionsGroups(2, MIN_ITEMS_COUNT / 2)} />
                </ListVirtualizer>
            </MobileProvider>,
        );
        await userEvent.setup().click(screen.getByTestId(TEST_QA));

        expect(screen.getByTestId(SelectQa.LIST)).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        unmount();

        await openWithRootWrapper({options: generateOptionsGroups(2, MIN_ITEMS_COUNT / 2)});

        expect(screen.getByTestId(SelectQa.LIST)).toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
    });

    test('a filter that leaves fewer options keeps the list virtualized', async () => {
        const {user} = await openWithRootWrapper({
            options: generateOptions(MIN_ITEMS_COUNT + 10),
            filterable: true,
        });

        // Value 1, Value 10–19: eleven options, still a window of them
        await user.keyboard('Value 1');

        const options = screen.getAllByRole('option');
        expect(screen.getByTestId(SelectQa.LIST)).toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        expect(options[0]).toHaveAttribute('aria-setsize', '11');
        expect(options.length).toBeLessThan(11);
    });

    test('a filter does not virtualize a Select of fewer options either', async () => {
        const {user} = await openWithRootWrapper({
            options: generateOptions(MIN_ITEMS_COUNT - 1),
            filterable: true,
        });

        await user.keyboard('Value 1');

        expect(screen.getByTestId(SelectQa.LIST)).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        expect(screen.getAllByRole('option')[0]).not.toHaveAttribute('aria-setsize');
    });

    test('a list that crosses the threshold keeps the selected option in view', () => {
        const renderSelect = (count: number) => (
            <MobileProvider mobile={false}>
                <ListVirtualizer minItemsCount={MIN_ITEMS_COUNT}>
                    <ControlledSelect
                        options={generateOptions(count)}
                        value={['val30']}
                        defaultOpen
                    />
                </ListVirtualizer>
            </MobileProvider>
        );
        const {rerender} = render(renderSelect(MIN_ITEMS_COUNT - 10));

        expect(screen.getByTestId(SelectQa.LIST)).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        expect(screen.getByTestId(SelectQa.LIST).scrollTop).toBe(scrollTopFor(30));

        // More options arrive, as from `onLoadMore`: the plain list gives way to the window
        rerender(renderSelect(MIN_ITEMS_COUNT + 10));

        expect(screen.getByTestId(SelectQa.LIST)).toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        expect(screen.getByTestId(SelectQa.LIST).scrollTop).toBe(scrollTopFor(30));
    });

    test('a virtualized Select loads the chunk on mount, before it opens', () => {
        renderWithRootWrapper({options: generateOptions(MIN_ITEMS_COUNT)});

        expect(screen.queryByTestId(SelectQa.LIST)).not.toBeInTheDocument();
        expect(loadSpy).toHaveBeenCalled();
    });

    test('a plain Select does not load the chunk', async () => {
        await openWithRootWrapper({options: generateOptions(MIN_ITEMS_COUNT - 1)});

        expect(loadSpy).not.toHaveBeenCalled();
    });
});

describe('Select under ListVirtualizer: a wrapper around one Select', () => {
    preloadListVirtualizer();

    function renderUnderNestedWrapper(
        nestedProps: Omit<ListVirtualizerProps, 'children'>,
        props: Partial<SelectProps>,
    ) {
        return render(
            <MobileProvider mobile={false}>
                <ListVirtualizer minItemsCount={MIN_ITEMS_COUNT}>
                    <ListVirtualizer {...nestedProps}>
                        <ControlledSelect {...props} />
                    </ListVirtualizer>
                </ListVirtualizer>
            </MobileProvider>,
        );
    }

    async function openUnderNestedWrapper(
        nestedProps: Omit<ListVirtualizerProps, 'children'>,
        props: Partial<SelectProps>,
    ) {
        const utils = renderUnderNestedWrapper(nestedProps, props);
        await userEvent.setup().click(screen.getByTestId(TEST_QA));
        return utils;
    }

    test('changes only what it is given and keeps the threshold of the root', async () => {
        const root = await openWithRootWrapper({options: generateOptions(500)});
        const rootRows = screen.getAllByRole('option').length;
        root.unmount();

        const nested = await openUnderNestedWrapper(
            {overscan: 20},
            {options: generateOptions(500)},
        );
        // The window starts at the top: 15 more rows below it, an overscan of 20 instead of 5
        expect(screen.getAllByRole('option').length - rootRows).toBe(15);
        nested.unmount();

        await openUnderNestedWrapper({overscan: 20}, {options: generateOptions(10)});
        expect(screen.getByTestId(SelectQa.LIST)).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
    });

    test('minItemsCount={0} virtualizes a Select of any size', async () => {
        await openUnderNestedWrapper({minItemsCount: 0}, {options: generateOptions(10)});

        expect(screen.getByTestId(SelectQa.LIST)).toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-setsize', '10');
    });

    test('minItemsCount={Infinity} keeps a Select plain and does not load the chunk', async () => {
        renderUnderNestedWrapper({minItemsCount: Infinity}, {options: generateOptions(500)});

        expect(loadSpy).not.toHaveBeenCalled();

        await userEvent.setup().click(screen.getByTestId(TEST_QA));

        expect(screen.getByTestId(SelectQa.LIST)).not.toHaveClass(SELECT_LIST_VIRTUALIZED_CLASS);
        expect(screen.getAllByRole('option')).toHaveLength(500);
        expect(loadSpy).not.toHaveBeenCalled();
    });
});
