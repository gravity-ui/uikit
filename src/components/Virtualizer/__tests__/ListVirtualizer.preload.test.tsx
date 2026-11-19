import {render, screen} from '../../../../test-utils/utils';
import {List} from '../../List/List';
import {LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT} from '../../List/VirtualizationContext';
import {mockLayout} from '../../List/__tests__/helpers';
import {ListVirtualizer} from '../ListVirtualizer';
import {loadVirtualizedListRoot} from '../loadVirtualizedListRoot';

const VIEWPORT_HEIGHT = 400;
const ROW_HEIGHT = 36;

mockLayout({viewport: VIEWPORT_HEIGHT, row: ROW_HEIGHT});

const ITEMS = Array.from({length: 200}, (_, index) => `Item ${index + 1}`);

// A file of its own: the chunk is loaded, but no list has rendered the lazy root yet — the moment a
// Select opens its popup after the preload
beforeAll(() => loadVirtualizedListRoot());

test('a root loaded in advance mounts the window without the first rows', () => {
    render(
        <ListVirtualizer estimateItemSize={ROW_HEIGHT}>
            <List aria-label="Logs" style={{maxHeight: VIEWPORT_HEIGHT}} items={ITEMS} />
        </ListVirtualizer>,
    );

    // Right after the render, without awaiting anything: the window, not the fallback
    expect(screen.getAllByRole('option').length).toBeLessThan(
        LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT,
    );
    const sizer = screen.getByRole('listbox').firstElementChild;
    expect(sizer).toHaveStyle({height: `${ITEMS.length * ROW_HEIGHT}px`});
});
