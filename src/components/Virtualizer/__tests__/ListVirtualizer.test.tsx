import userEvent from '@testing-library/user-event';

import {act, render, screen} from '../../../../test-utils/utils';
import {List} from '../../List/List';
import {LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT} from '../../List/VirtualizationContext';
import {mockLayout, preloadListVirtualizer} from '../../List/__tests__/helpers';
import type {ListProps} from '../../List/types';
import {ListVirtualizer} from '../ListVirtualizer';
import type {ListVirtualizerProps} from '../ListVirtualizer';
import * as loader from '../loadVirtualizedListRoot';

const VIEWPORT_HEIGHT = 400;
const ROW_HEIGHT = 36;

mockLayout({viewport: VIEWPORT_HEIGHT, row: ROW_HEIGHT});

const createItems = (count: number) =>
    Array.from({length: count}, (_, index) => `Item ${index + 1}`);

function VirtualizedList({
    minItemsCount,
    ...listProps
}: Partial<ListProps<string>> & {items: string[]; minItemsCount?: number}) {
    return (
        <ListVirtualizer estimateItemSize={ROW_HEIGHT} minItemsCount={minItemsCount}>
            <List aria-label="Logs" style={{maxHeight: VIEWPORT_HEIGHT}} {...listProps} />
        </ListVirtualizer>
    );
}

// The sizer of the window: the first child of the root, as tall as the whole list
const getSizer = () =>
    // eslint-disable-next-line testing-library/no-node-access
    screen.getByRole('listbox').firstElementChild as HTMLElement;

let loadSpy: jest.SpyInstance;

beforeEach(() => {
    loadSpy = jest.spyOn(loader, 'loadVirtualizedListRoot');
});

afterEach(() => {
    loadSpy.mockRestore();
});

/**
 * The chunk is loaded once per module registry — once per test file. These tests come first and
 * see it before it has loaded; the ones after them load it up front
 */
describe('ListVirtualizer: the chunk of the window', () => {
    test('a list below minItemsCount renders plain rows and does not load the chunk', () => {
        render(<VirtualizedList items={createItems(49)} minItemsCount={50} />);

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(49);
        expect(options[0]).not.toHaveAttribute('aria-setsize');
        expect(screen.getByRole('listbox')).not.toHaveStyle({overflow: 'auto'});
        expect(loadSpy).not.toHaveBeenCalled();
        expect(loader.getLoadedVirtualizedListRoot()).toBeUndefined();
    });

    test('until the chunk loads the list shows its first rows, then the window', async () => {
        const items = createItems(200);
        render(<VirtualizedList items={items} />);

        expect(loadSpy).toHaveBeenCalledTimes(1);
        const firstRows = screen.getAllByRole('option');
        expect(firstRows).toHaveLength(LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT);
        expect(firstRows[0]).toHaveAccessibleName('Item 1');
        expect(firstRows[LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT - 1]).toHaveAccessibleName(
            `Item ${LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT}`,
        );
        // Already numbered as the rows of the whole list, and scrolling as the window will
        expect(firstRows[0]).toHaveAttribute('aria-setsize', '200');
        expect(screen.getByRole('listbox')).toHaveStyle({
            overflow: 'auto',
            maxHeight: `${VIEWPORT_HEIGHT}px`,
        });

        await act(async () => {
            await loader.loadVirtualizedListRoot();
        });

        const windowRows = screen.getAllByRole('option');
        expect(windowRows.length).toBeLessThan(LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT);
        expect(windowRows[0]).toHaveAccessibleName('Item 1');
        expect(windowRows[0]).toHaveAttribute('aria-setsize', '200');
        expect(getSizer()).toHaveStyle({height: `${items.length * ROW_HEIGHT}px`});
    });
});

describe('ListVirtualizer: minItemsCount', () => {
    preloadListVirtualizer();

    test('without minItemsCount every list is virtualized, as before', () => {
        render(<VirtualizedList items={createItems(3)} />);

        expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-setsize', '3');
        expect(getSizer()).toHaveStyle({height: `${3 * ROW_HEIGHT}px`});
    });

    test('a list of minItemsCount rows and more is virtualized', () => {
        const {rerender} = render(<VirtualizedList items={createItems(50)} minItemsCount={50} />);

        const options = screen.getAllByRole('option');
        expect(options.length).toBeLessThan(50);
        expect(options[0]).toHaveAttribute('aria-setsize', '50');
        expect(getSizer()).toHaveStyle({height: `${50 * ROW_HEIGHT}px`});

        rerender(<VirtualizedList items={createItems(5000)} minItemsCount={50} />);

        expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-setsize', '5000');
        expect(screen.queryByRole('option', {name: 'Item 100'})).not.toBeInTheDocument();
    });

    test('section headers count towards minItemsCount', () => {
        interface Row {
            id: string;
            label: string;
            options?: Row[];
        }
        const groups: Row[] = [
            {id: 'a', label: 'A', options: createItems(24).map((label) => ({id: label, label}))},
            {id: 'b', label: 'B', options: [{id: 'last', label: 'Last'}]},
        ];
        // 25 options and 2 headers: 27 rows
        const renderGroups = (minItemsCount: number) => (
            <ListVirtualizer estimateItemSize={ROW_HEIGHT} minItemsCount={minItemsCount}>
                <List<Row>
                    aria-label="Groups"
                    style={{maxHeight: VIEWPORT_HEIGHT}}
                    items={groups}
                    getItemChildren={(row) => row.options}
                    getItemContent={(row) => row.label}
                />
            </ListVirtualizer>
        );

        const {rerender} = render(renderGroups(27));

        // Virtualized; `aria-setsize` numbers the options only
        expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-setsize', '25');

        rerender(renderGroups(28));

        expect(screen.getAllByRole('option')).toHaveLength(25);
        expect(screen.getAllByRole('option')[0]).not.toHaveAttribute('aria-setsize');
    });

    test('crossing the threshold keeps the active row and the selection', async () => {
        const {rerender} = render(
            <VirtualizedList items={createItems(10)} minItemsCount={20} selectionMode="single" />,
        );
        const user = userEvent.setup();
        await user.click(screen.getByRole('option', {name: 'Item 3'}));

        const before = screen.getByRole('option', {name: 'Item 3'});
        expect(before).not.toHaveAttribute('aria-setsize');
        expect(before).toHaveAttribute('aria-selected', 'true');
        expect(before).toHaveAttribute('data-active');

        rerender(
            <VirtualizedList items={createItems(30)} minItemsCount={20} selectionMode="single" />,
        );

        const after = screen.getByRole('option', {name: 'Item 3'});
        expect(after).toHaveAttribute('aria-setsize', '30');
        expect(after).toHaveAttribute('aria-selected', 'true');
        expect(after).toHaveAttribute('data-active');

        rerender(
            <VirtualizedList items={createItems(10)} minItemsCount={20} selectionMode="single" />,
        );

        const back = screen.getByRole('option', {name: 'Item 3'});
        expect(back).not.toHaveAttribute('aria-setsize');
        expect(back).toHaveAttribute('aria-selected', 'true');
        expect(back).toHaveAttribute('data-active');
    });
});

describe('ListVirtualizer: a wrapper inside another one', () => {
    preloadListVirtualizer();

    // The outer wrapper sets everything a nested one could take from it
    function NestedList({
        items,
        ...nestedProps
    }: Omit<ListVirtualizerProps, 'children'> & {items: string[]}) {
        return (
            <ListVirtualizer estimateItemSize={ROW_HEIGHT * 2} measure={false} minItemsCount={50}>
                <ListVirtualizer {...nestedProps}>
                    <List aria-label="Logs" style={{maxHeight: VIEWPORT_HEIGHT}} items={items} />
                </ListVirtualizer>
            </ListVirtualizer>
        );
    }

    test('takes what it is not given from the wrapper above', () => {
        const {rerender} = render(<NestedList items={createItems(49)} overscan={1} />);

        // The threshold of the outer wrapper
        expect(screen.getAllByRole('option')).toHaveLength(49);
        expect(screen.getAllByRole('option')[0]).not.toHaveAttribute('aria-setsize');

        rerender(<NestedList items={createItems(60)} overscan={1} />);

        // Its estimate, and its measure={false}: the measured 36px would correct the sizer
        expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-setsize', '60');
        expect(getSizer()).toHaveStyle({height: `${60 * ROW_HEIGHT * 2}px`});
    });

    test('its own props win over the ones above', () => {
        const {rerender} = render(<NestedList items={createItems(10)} minItemsCount={0} />);

        expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-setsize', '10');

        rerender(<NestedList items={createItems(60)} minItemsCount={Infinity} />);

        expect(screen.getAllByRole('option')).toHaveLength(60);
        expect(screen.getAllByRole('option')[0]).not.toHaveAttribute('aria-setsize');
    });
});
