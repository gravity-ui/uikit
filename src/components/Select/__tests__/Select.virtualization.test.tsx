import userEvent from '@testing-library/user-event';

import {act, render, screen} from '../../../../test-utils/utils';
import {LIST_VIRTUALIZATION_FALLBACK_ROWS} from '../../List/VirtualizationContext';
import {mockLayout} from '../../List/__tests__/helpers';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
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
    let offsetTopSpy: jest.SpyInstance;

    beforeEach(() => {
        // jsdom has no layout: a row of the first rows is as far from the top as its position
        // says, a row of the window — as far as the inline `top` of its wrapper
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

    test('a selected option past the first rows is scrolled to once the window loads', async () => {
        renderWithRootWrapper({
            options: generateOptions(300),
            value: ['val200'],
            defaultOpen: true,
        });

        const list = screen.getByTestId(SelectQa.LIST);
        expect(screen.getAllByRole('option')).toHaveLength(LIST_VIRTUALIZATION_FALLBACK_ROWS);
        expect(screen.queryByRole('option', {name: 'Value 200'})).not.toBeInTheDocument();

        await act(async () => {
            await loader.loadVirtualizedListRoot();
        });

        expect(screen.getAllByRole('option').length).toBeLessThan(
            LIST_VIRTUALIZATION_FALLBACK_ROWS,
        );
        expect(screen.getByRole('option', {name: 'Value 200'})).toBeInTheDocument();
        expect(screen.getByTestId(SelectQa.LIST)).not.toBe(list);
        expect(screen.getByTestId(SelectQa.LIST).scrollTop).toBe(200 * ROW_HEIGHT - VIEWPORT);
    });
});

describe('Select under ListVirtualizer: minItemsCount', () => {
    beforeAll(() => loader.loadVirtualizedListRoot());

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
