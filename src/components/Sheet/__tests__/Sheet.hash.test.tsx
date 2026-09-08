import * as React from 'react';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import type {History, Location} from '../../mobile';
import {MobileProvider, Platform} from '../../mobile';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

const SHEET_HEIGHT = 300;
const TOUCH_START_POINT = 100;
const SHORT_SWIPE_DISTANCE = 30;

function normalizeHash(hash: string) {
    if (!hash) {
        return '';
    }

    return hash.startsWith('#') ? hash : `#${hash}`;
}

interface HashedSheetsProps {
    onHashChange: (hash: string) => void;
}

function HashedSheets({onHashChange}: HashedSheetsProps) {
    const [location, setLocation] = React.useState<Location>({
        pathname: '/',
        search: '',
        hash: '',
    });
    const actionRef = React.useRef<History['action']>('');

    const [sheetAVisible, setSheetAVisible] = React.useState(false);
    const [sheetBVisible, setSheetBVisible] = React.useState(false);

    onHashChange(location.hash);

    const history = React.useMemo<History>(
        () => ({
            get action() {
                return actionRef.current;
            },
            replace(nextLocation) {
                actionRef.current = 'REPLACE';
                setLocation((prev) => ({
                    ...prev,
                    ...nextLocation,
                    hash: normalizeHash(nextLocation.hash ?? ''),
                }));
            },
            push(nextLocation) {
                actionRef.current = 'PUSH';
                setLocation((prev) => ({
                    ...prev,
                    ...nextLocation,
                    hash: normalizeHash(nextLocation.hash ?? ''),
                }));
            },
            goBack() {
                actionRef.current = 'POP';
            },
        }),
        [],
    );

    return (
        <MobileProvider
            mobile
            platform={Platform.IOS}
            useHistory={() => history}
            useLocation={() => location}
        >
            <button onClick={() => setSheetAVisible(true)}>Open A</button>
            <button onClick={() => setSheetBVisible(true)}>Open B</button>
            <button onClick={() => setSheetAVisible(false)}>Close A</button>
            <button onClick={() => setSheetBVisible(false)}>Close B</button>
            <Sheet id="sheetA" visible={sheetAVisible} onClose={() => setSheetAVisible(false)}>
                Content A
            </Sheet>
            <Sheet id="sheetB" visible={sheetBVisible} onClose={() => setSheetBVisible(false)}>
                Content B
            </Sheet>
        </MobileProvider>
    );
}

function shortSwipe(area: Element) {
    fireEvent.touchStart(area, {touches: [{clientX: 0, clientY: TOUCH_START_POINT}]});
    fireEvent.touchMove(area, {
        touches: [{clientX: 0, clientY: TOUCH_START_POINT + SHORT_SWIPE_DISTANCE}],
    });
    fireEvent.touchEnd(area, {
        touches: [{clientX: 0, clientY: TOUCH_START_POINT + SHORT_SWIPE_DISTANCE}],
    });
}

describe('Sheet hash', () => {
    let getBoundingClientRectSpy: jest.SpyInstance;

    beforeEach(() => {
        getBoundingClientRectSpy = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockReturnValue({height: SHEET_HEIGHT, width: 0, top: 0, left: 0} as DOMRect);
    });

    afterEach(() => {
        getBoundingClientRectSpy.mockRestore();
    });

    test('restores hashes correctly when multiple sheets are closed', () => {
        let currentHash = '';
        const onHashChange = (hash: string) => {
            currentHash = hash;
        };

        render(<HashedSheets onHashChange={onHashChange} />);

        // Open Sheet A — its hash is set.
        fireEvent.click(screen.getByText('Open A'));
        expect(currentHash).toBe('#sheetA');

        // Open Sheet B on top of Sheet A — the previous hash (Sheet A) is remembered on the stack.
        fireEvent.click(screen.getByText('Open B'));
        expect(currentHash).toBe('#sheetB');

        // A short swipe keeps Sheet B open and re-runs show().
        const swipeArea = screen.getAllByTestId(SheetQa.SWIPE_AREA).at(-1) as Element;
        shortSwipe(swipeArea);
        expect(currentHash).toBe('#sheetB');

        // Close Sheet B — the previous hash (Sheet A) is restored exactly once.
        fireEvent.click(screen.getByText('Close B'));
        expect(currentHash).toBe('#sheetA');

        // Close Sheet A — the hash is cleared, proving the stack held a single '#sheetA' entry.
        fireEvent.click(screen.getByText('Close A'));
        expect(currentHash).toBe('');
    });
});
