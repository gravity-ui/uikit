import * as React from 'react';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import type {History, Location} from '../../mobile';
import {MobileProvider, Platform} from '../../mobile';
import {Sheet} from '../Sheet';
import type {SheetProps} from '../Sheet';
import {SHEET_TRANSITION_DURATION_MS, SheetQa} from '../constants';

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
    onOpenChange?: SheetProps['onOpenChange'];
    onSheetBClose?: () => void;
    acceptDismissal?: boolean;
    platform?: Platform;
}

function HashedSheets({
    onHashChange,
    onOpenChange,
    onSheetBClose,
    acceptDismissal = true,
    platform = Platform.IOS,
}: HashedSheetsProps) {
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
                setLocation((prev) => ({...prev, hash: ''}));
            },
        }),
        [],
    );

    return (
        <MobileProvider
            mobile
            platform={platform}
            useHistory={() => history}
            useLocation={() => location}
        >
            <button onClick={() => setSheetAVisible(true)}>Open A</button>
            <button onClick={() => setSheetBVisible(true)}>Open B</button>
            <button onClick={() => setSheetAVisible(false)}>Close A</button>
            <button onClick={() => setSheetBVisible(false)}>Close B</button>
            <button
                onClick={() => {
                    actionRef.current = 'POP';
                    setLocation((prev) => ({...prev, hash: ''}));
                }}
            >
                Navigate back
            </button>
            <Sheet
                id="sheetA"
                visible={sheetAVisible}
                onClose={() => setSheetAVisible(false)}
                onOpenChange={(open, event, reason) => {
                    onOpenChange?.(open, event, reason);
                    if (acceptDismissal) {
                        setSheetAVisible(open);
                    }
                }}
            >
                Content A
            </Sheet>
            <Sheet
                id="sheetB"
                visible={sheetBVisible}
                onClose={() => {
                    onSheetBClose?.();
                    setSheetBVisible(false);
                }}
            >
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
        jest.useRealTimers();
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

    test('completes navigation close started during drag', () => {
        jest.useFakeTimers();
        const onOpenChange = jest.fn();

        render(<HashedSheets onHashChange={() => {}} onOpenChange={onOpenChange} />);

        fireEvent.click(screen.getByText('Open A'));

        const sheet = screen.getByRole('dialog');
        const veil = screen.getByTestId(SheetQa.VEIL);
        const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
        const swipeArea = screen.getByTestId(SheetQa.SWIPE_AREA);

        fireEvent.touchStart(swipeArea, {touches: [{clientX: 0, clientY: 100}]});
        fireEvent.touchMove(swipeArea, {touches: [{clientX: 0, clientY: 170}]});

        expect(sheet).not.toHaveClass('g-sheet__sheet_with-transition');
        expect(veil).not.toHaveClass('g-sheet-veil_with-transition');
        expect(contentArea).toHaveClass('g-sheet-content-area_without-scroll');

        fireEvent.click(screen.getByText('Navigate back'));

        expect(onOpenChange).toHaveBeenCalledWith(false, undefined, 'navigation');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(sheet).toHaveClass('g-sheet__sheet_with-transition');
        expect(veil).toHaveClass('g-sheet-veil_with-transition');
        expect(contentArea).not.toHaveClass('g-sheet-content-area_without-scroll');

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS);
        });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(document.body.style.overflow).toBe('');
    });

    test('keeps a controlled sheet open when navigation dismissal is not accepted', () => {
        let currentHash = '';
        const onOpenChange = jest.fn();

        render(
            <HashedSheets
                acceptDismissal={false}
                onHashChange={(hash) => {
                    currentHash = hash;
                }}
                onOpenChange={onOpenChange}
            />,
        );

        fireEvent.click(screen.getByText('Open A'));
        const veil = screen.getByTestId(SheetQa.VEIL);
        fireEvent.transitionEnd(veil);

        fireEvent.click(screen.getByText('Navigate back'));

        expect(onOpenChange).toHaveBeenCalledWith(false, undefined, 'navigation');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(currentHash).toBe('');
        expect(veil).toHaveStyle({opacity: '1'});
        expect(screen.getByText('Content A')).toBeInTheDocument();

        fireEvent.transitionEnd(veil);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('closes a legacy sheet when navigation moves away from its hash', () => {
        jest.useFakeTimers();
        const onSheetBClose = jest.fn();

        render(<HashedSheets onHashChange={() => {}} onSheetBClose={onSheetBClose} />);

        fireEvent.click(screen.getByText('Open B'));
        const veil = screen.getByTestId(SheetQa.VEIL);
        fireEvent.transitionEnd(veil);

        fireEvent.click(screen.getByText('Navigate back'));

        expect(veil).toHaveStyle({opacity: '0'});
        expect(screen.getByText('Content B')).toBeInTheDocument();
        expect(onSheetBClose).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS);
        });

        expect(onSheetBClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByText('Content B')).not.toBeInTheDocument();
    });

    test('does not report Android hash cleanup as a second navigation close', () => {
        const onOpenChange = jest.fn();

        render(
            <HashedSheets
                platform={Platform.ANDROID}
                onHashChange={() => {}}
                onOpenChange={onOpenChange}
            />,
        );

        fireEvent.click(screen.getByText('Open A'));

        const veil = screen.getByTestId(SheetQa.VEIL);
        fireEvent.transitionEnd(veil);
        fireEvent.click(veil);

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
});
