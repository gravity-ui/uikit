import * as React from 'react';

import {act, cleanup, fireEvent, render, screen} from '../../../../test-utils/utils';
import {getLayersCount} from '../../utils/layer-manager';
import {Sheet} from '../Sheet';
import {SHEET_TRANSITION_DURATION_MS, SheetQa} from '../constants';

function finishPresenceTransition() {
    act(() => {
        jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS);
    });
}

function pressEscape() {
    fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'});
}

describe('Sheet', () => {
    describe('rendering and accessibility', () => {
        test('renders content when visible', () => {
            const sheetContent = 'Sheet content';
            render(<Sheet visible>{sheetContent}</Sheet>);

            expect(screen.getByText(sheetContent)).toBeInTheDocument();
        });

        test('does not render content when hidden', () => {
            const sheetContent = 'Sheet content';
            render(<Sheet visible={false}>{sheetContent}</Sheet>);

            expect(screen.queryByText(sheetContent)).not.toBeInTheDocument();
        });

        test('does not render the top bar when hideTopBar is set', () => {
            render(<Sheet visible hideTopBar />);

            expect(screen.queryByTestId(SheetQa.TOP)).not.toBeInTheDocument();
        });

        test('applies custom class names to their corresponding elements', () => {
            const qaId = 'custom-sheet-qa';
            render(
                <Sheet
                    visible
                    className="custom-sheet"
                    contentClassName="custom-content"
                    swipeAreaClassName="custom-swipe-area"
                    qa={qaId}
                >
                    Content
                </Sheet>,
            );

            expect(screen.getByTestId(qaId)).toHaveClass('custom-sheet');
            expect(screen.getByTestId(SheetQa.CONTENT)).toHaveClass('custom-content');
            expect(screen.getByTestId(SheetQa.SWIPE_AREA)).toHaveClass('custom-swipe-area');
        });

        test('renders the title block and accessible name only when title is passed', () => {
            const title = 'Sheet title';
            const {rerender} = render(<Sheet visible>Content</Sheet>);

            expect(screen.queryByTestId(SheetQa.TITLE)).not.toBeInTheDocument();

            rerender(
                <Sheet visible title={title}>
                    Content
                </Sheet>,
            );

            expect(screen.getByText(title)).toBeInTheDocument();
            expect(screen.getByTestId(SheetQa.TITLE)).toBeInTheDocument();
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', title);
        });
    });

    describe('layout', () => {
        let resizeCallback: ResizeObserverCallback | undefined;
        let originalResizeObserver: typeof ResizeObserver;
        let getBoundingClientRectSpy: jest.SpyInstance;

        let marginBoxEl: Element | null = null;
        let contentHeight = 0;

        beforeEach(() => {
            originalResizeObserver = global.ResizeObserver;

            global.ResizeObserver = class implements ResizeObserver {
                constructor(callback: ResizeObserverCallback) {
                    resizeCallback = callback;
                }
                disconnect() {}
                observe() {}
                unobserve() {}
            };

            getBoundingClientRectSpy = jest
                .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
                .mockImplementation(function (this: HTMLElement) {
                    const height = this === marginBoxEl ? contentHeight : 0;

                    return {height, width: 0, top: 0, left: 0} as DOMRect;
                });
        });

        afterEach(() => {
            global.ResizeObserver = originalResizeObserver;
            getBoundingClientRectSpy.mockRestore();
            resizeCallback = undefined;
            marginBoxEl = null;
            contentHeight = 0;
        });

        test('updates the sheet height when its content is resized', () => {
            render(<Sheet visible>Content</Sheet>);

            const scrollContainer = screen.getByTestId(SheetQa.CONTENT_AREA);
            const sheet = screen.getByRole('dialog');

            marginBoxEl = scrollContainer.firstElementChild;

            expect(resizeCallback).toBeDefined();

            contentHeight = 200;
            act(() => {
                resizeCallback?.([], {} as ResizeObserver);
            });

            expect(scrollContainer.style.height).toBe('200px');
            expect(sheet.style.transform).toBe('translate3d(0, -200px, 0)');
        });
    });

    describe('lifecycle', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            cleanup();
            jest.clearAllTimers();
            jest.useRealTimers();

            expect(getLayersCount()).toBe(0);
            expect(document.body.style.overflow).toBe('');
        });

        test('does not echo an external visible change through onOpenChange', () => {
            const onOpenChange = jest.fn();
            const {rerender} = render(
                <Sheet visible onOpenChange={onOpenChange}>
                    Content
                </Sheet>,
            );

            rerender(
                <Sheet visible={false} onOpenChange={onOpenChange}>
                    Content
                </Sheet>,
            );

            expect(onOpenChange).not.toHaveBeenCalled();
        });

        test('keeps the exiting top sheet above lower layers until unmount', () => {
            const lowerOnOpenChange = jest.fn();
            const upperOnOpenChange = jest.fn();

            function LayeredSheets() {
                const [upperVisible, setUpperVisible] = React.useState(true);

                return (
                    <React.Fragment>
                        <Sheet visible onOpenChange={lowerOnOpenChange} qa="lower-sheet">
                            Lower sheet
                        </Sheet>
                        <Sheet
                            visible={upperVisible}
                            onOpenChange={(open, event, reason) => {
                                upperOnOpenChange(open, event, reason);
                                setUpperVisible(open);
                            }}
                            qa="upper-sheet"
                        >
                            Upper sheet
                        </Sheet>
                    </React.Fragment>
                );
            }

            render(<LayeredSheets />);

            pressEscape();

            expect(upperOnOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
            expect(upperOnOpenChange).toHaveBeenCalledTimes(1);
            expect(screen.getByText('Upper sheet')).toBeInTheDocument();

            pressEscape();

            expect(lowerOnOpenChange).not.toHaveBeenCalled();
            expect(screen.getByTestId('upper-sheet')).toHaveAttribute(
                'data-floating-ui-status',
                'close',
            );

            finishPresenceTransition();

            expect(screen.queryByText('Upper sheet')).not.toBeInTheDocument();

            pressEscape();

            expect(lowerOnOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
            expect(lowerOnOpenChange).toHaveBeenCalledTimes(1);
        });

        test('releases the layer only after a legacy dismissal finishes its exit', () => {
            const onClose = jest.fn();

            render(
                <Sheet visible onClose={onClose} qa="legacy-sheet">
                    Content
                </Sheet>,
            );

            expect(getLayersCount()).toBe(1);
            expect(document.body.style.overflow).toBe('hidden');

            pressEscape();

            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(getLayersCount()).toBe(1);
            expect(document.body.style.overflow).toBe('hidden');
            expect(onClose).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(getLayersCount()).toBe(0);
            expect(document.body.style.overflow).toBe('');
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        test('reopens when visible becomes true during an unfinished exit', () => {
            const onClose = jest.fn();
            const onOpenChange = jest.fn();
            const {rerender} = render(
                <Sheet visible onClose={onClose} onOpenChange={onOpenChange} qa="sheet">
                    Content
                </Sheet>,
            );

            rerender(
                <Sheet visible={false} onClose={onClose} onOpenChange={onOpenChange} qa="sheet">
                    Content
                </Sheet>,
            );

            expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'close');
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(onClose).not.toHaveBeenCalled();

            act(() => {
                jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS / 2);
            });

            rerender(
                <Sheet visible onClose={onClose} onOpenChange={onOpenChange} qa="sheet">
                    Content
                </Sheet>,
            );

            finishPresenceTransition();

            expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'open');
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByTestId('sheet-veil')).toHaveStyle({opacity: '1'});
            expect(onClose).not.toHaveBeenCalled();
        });

        test.each([
            {getArea: () => screen.getByTestId(SheetQa.SWIPE_AREA), surface: 'handle'},
            {getArea: () => screen.getByTestId(SheetQa.CONTENT_AREA), surface: 'content'},
        ])('completes external close started during $surface drag', ({getArea}) => {
            const {rerender} = render(
                <Sheet visible qa="sheet">
                    Content
                </Sheet>,
            );

            const sheet = screen.getByRole('dialog');
            const veil = screen.getByTestId(SheetQa.VEIL);
            const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
            const dragArea = getArea();

            fireEvent.touchStart(dragArea, {touches: [{clientX: 0, clientY: 100}]});
            fireEvent.touchMove(dragArea, {touches: [{clientX: 0, clientY: 170}]});

            expect(sheet).not.toHaveClass('g-sheet__sheet_with-transition');
            expect(veil).not.toHaveClass('g-sheet-veil_with-transition');
            expect(contentArea).toHaveClass('g-sheet-content-area_without-scroll');

            rerender(
                <Sheet visible={false} qa="sheet">
                    Content
                </Sheet>,
            );

            expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'close');
            expect(sheet).toHaveClass('g-sheet__sheet_with-transition');
            expect(veil).toHaveClass('g-sheet-veil_with-transition');
            expect(contentArea).not.toHaveClass('g-sheet-content-area_without-scroll');

            finishPresenceTransition();

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(getLayersCount()).toBe(0);
            expect(document.body.style.overflow).toBe('');
        });

        test('calls deprecated onClose once after completed exit', () => {
            const onClose = jest.fn();
            const {rerender} = render(
                <Sheet visible onClose={onClose}>
                    Content
                </Sheet>,
            );

            rerender(
                <Sheet visible={false} onClose={onClose}>
                    Content
                </Sheet>,
            );

            act(() => {
                jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS - 1);
            });

            expect(onClose).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(1);
            });

            expect(onClose).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            finishPresenceTransition();

            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });
});
