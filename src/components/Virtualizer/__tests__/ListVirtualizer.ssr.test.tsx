/*
 * @jest-environment node
 */
import {renderToString} from 'react-dom/server';

import {List} from '../../List/List';
import {LIST_VIRTUALIZATION_FALLBACK_ROWS} from '../../List/VirtualizationContext';
import {Provider} from '../../theme/Provider';
import {ListVirtualizer} from '../ListVirtualizer';
import {loadVirtualizedListRoot} from '../loadVirtualizedListRoot';

// The results here are the markup of the server, not the utilities of Testing Library
/* eslint-disable testing-library/render-result-naming-convention */

const ITEMS = Array.from({length: 200}, (_, index) => `Item ${index + 1}`);

const getServerMarkup = () =>
    renderToString(
        <Provider theme="light">
            <ListVirtualizer>
                <List aria-label="Logs" style={{maxHeight: 400}} items={ITEMS} />
            </ListVirtualizer>
        </Provider>,
    );

const countOptions = (html: string) => html.match(/role="option"/g)?.length ?? 0;

/**
 * The server has no viewport for the window to be measured against: the HTML gets the first rows
 * of the list, whether the chunk of the window is still loading or has loaded by an earlier request
 */
describe('ListVirtualizer: server rendering', () => {
    test('runs where there is no DOM', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof document).toBe('undefined');
    });

    test('while the chunk loads, the first rows are rendered', () => {
        const html = getServerMarkup();

        expect(countOptions(html)).toBe(LIST_VIRTUALIZATION_FALLBACK_ROWS);
        expect(html).toContain('>Item 1<');
        expect(html).toContain(`>Item ${LIST_VIRTUALIZATION_FALLBACK_ROWS}<`);
        expect(html).not.toContain(`>Item ${LIST_VIRTUALIZATION_FALLBACK_ROWS + 1}<`);
        expect(html).toContain('aria-setsize="200"');
    });

    test('once the chunk has loaded, the root renders the same first rows', async () => {
        await loadVirtualizedListRoot();

        const html = getServerMarkup();

        expect(countOptions(html)).toBe(LIST_VIRTUALIZATION_FALLBACK_ROWS);
        expect(html).toContain('>Item 1<');
        expect(html).not.toContain(`>Item ${LIST_VIRTUALIZATION_FALLBACK_ROWS + 1}<`);
        // Rendered by the root itself rather than the fallback of the boundary
        expect(html).not.toContain('<!--$!-->');
    });
});
