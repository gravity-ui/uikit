import * as React from 'react';

import {act, cleanup, fireEvent, render, screen} from '../../../../test-utils/utils';
import {eventBroker} from '../../utils/event-broker';
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

        test('calls transition callbacks at the start and completion of each transition', () => {
            const callbacks = {
                onTransitionIn: jest.fn(),
                onTransitionInComplete: jest.fn(),
                onTransitionOut: jest.fn(),
                onTransitionOutComplete: jest.fn(),
                onClose: jest.fn(),
            };
            const {rerender} = render(<Sheet visible={false} {...callbacks} />);

            expect(callbacks.onTransitionIn).not.toHaveBeenCalled();
            expect(callbacks.onTransitionOutComplete).not.toHaveBeenCalled();

            rerender(<Sheet visible {...callbacks} />);
            act(() => jest.advanceTimersToNextTimer());

            expect(callbacks.onTransitionIn).toHaveBeenCalledTimes(1);
            expect(callbacks.onTransitionInComplete).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(callbacks.onTransitionInComplete).toHaveBeenCalledTimes(1);
            expect(callbacks.onTransitionOut).not.toHaveBeenCalled();

            rerender(<Sheet visible={false} {...callbacks} />);

            expect(callbacks.onTransitionOut).toHaveBeenCalledTimes(1);
            expect(callbacks.onTransitionOutComplete).not.toHaveBeenCalled();
            expect(callbacks.onClose).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeInTheDocument();

            finishPresenceTransition();

            expect(callbacks.onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(callbacks.onClose).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            finishPresenceTransition();

            expect(callbacks.onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(callbacks.onClose).toHaveBeenCalledTimes(1);
        });

        test('does not complete an opening transition interrupted by closing', () => {
            const callbacks = {
                onTransitionIn: jest.fn(),
                onTransitionInComplete: jest.fn(),
                onTransitionOutComplete: jest.fn(),
            };
            const {rerender} = render(<Sheet visible {...callbacks} />);
            act(() => jest.advanceTimersToNextTimer());

            expect(callbacks.onTransitionIn).toHaveBeenCalledTimes(1);

            rerender(<Sheet visible={false} {...callbacks} />);
            finishPresenceTransition();

            expect(callbacks.onTransitionInComplete).not.toHaveBeenCalled();
            expect(callbacks.onTransitionOutComplete).toHaveBeenCalledTimes(1);
        });

        test('does not start an exit until the parent accepts dismissal', () => {
            const callbacks = {
                onOpenChange: jest.fn(),
                onTransitionOut: jest.fn(),
                onTransitionOutComplete: jest.fn(),
            };
            const {rerender} = render(<Sheet visible {...callbacks} />);
            finishPresenceTransition();

            pressEscape();
            finishPresenceTransition();

            expect(callbacks.onOpenChange).toHaveBeenCalledTimes(1);
            expect(callbacks.onTransitionOut).not.toHaveBeenCalled();
            expect(callbacks.onTransitionOutComplete).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(getLayersCount()).toBe(1);

            rerender(<Sheet visible={false} {...callbacks} />);
            expect(getLayersCount()).toBe(0);
            finishPresenceTransition();

            expect(callbacks.onTransitionOut).toHaveBeenCalledTimes(1);
            expect(callbacks.onTransitionOutComplete).toHaveBeenCalledTimes(1);
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

        test('routes the next Escape to the lower sheet while the top sheet is exiting', () => {
            const lowerOnOpenChange = jest.fn();
            const upperOnOpenChange = jest.fn();

            function LayeredSheets() {
                const [lowerVisible, setLowerVisible] = React.useState(true);
                const [upperVisible, setUpperVisible] = React.useState(true);

                return (
                    <React.Fragment>
                        <Sheet
                            visible={lowerVisible}
                            onOpenChange={(open, event, reason) => {
                                lowerOnOpenChange(open, event, reason);
                                setLowerVisible(open);
                            }}
                            qa="lower-sheet"
                        >
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
            expect(lowerOnOpenChange).not.toHaveBeenCalled();
            expect(screen.getByText('Upper sheet')).toBeInTheDocument();
            expect(getLayersCount()).toBe(1);

            pressEscape();

            expect(lowerOnOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
            expect(lowerOnOpenChange).toHaveBeenCalledTimes(1);
            expect(upperOnOpenChange).toHaveBeenCalledTimes(1);
            expect(getLayersCount()).toBe(0);
            expect(document.body.style.overflow).toBe('hidden');
            expect(screen.getByTestId('upper-sheet')).toHaveAttribute(
                'data-floating-ui-status',
                'close',
            );
            expect(screen.getByTestId('lower-sheet')).toHaveAttribute(
                'data-floating-ui-status',
                'close',
            );

            finishPresenceTransition();

            expect(screen.queryByText('Upper sheet')).not.toBeInTheDocument();
            expect(screen.queryByText('Lower sheet')).not.toBeInTheDocument();
            expect(document.body.style.overflow).toBe('');
        });

        test('blocks Escape for lower sheets when the top sheet disables it', () => {
            const options = {disableEscapeKeyDown: true};
            const lowerOnOpenChange = jest.fn();
            const upperOnOpenChange = jest.fn();
            render(
                <React.Fragment>
                    <Sheet visible onOpenChange={lowerOnOpenChange} title="Lower sheet">
                        Lower content
                    </Sheet>
                    <Sheet
                        {...options}
                        visible
                        onOpenChange={upperOnOpenChange}
                        title="Upper sheet"
                    >
                        Upper content
                    </Sheet>
                </React.Fragment>,
            );

            pressEscape();
            finishPresenceTransition();

            expect(upperOnOpenChange).not.toHaveBeenCalled();
            expect(lowerOnOpenChange).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog', {name: 'Upper sheet'})).toBeInTheDocument();
            expect(screen.getByRole('dialog', {name: 'Lower sheet'})).toBeInTheDocument();
            expect(getLayersCount()).toBe(2);
        });

        test('releases the layer when a legacy dismissal starts and unlocks scrolling after exit', () => {
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
            expect(getLayersCount()).toBe(0);
            expect(document.body.style.overflow).toBe('hidden');
            expect(onClose).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(getLayersCount()).toBe(0);
            expect(document.body.style.overflow).toBe('');
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        test('publishes layerschange at the start of an external close, not at unmount', () => {
            const onLayersChange = jest.fn();
            const {rerender} = render(<Sheet visible />);
            eventBroker.subscribe(onLayersChange);

            try {
                rerender(<Sheet visible={false} />);

                expect(onLayersChange).toHaveBeenCalledTimes(1);
                expect(onLayersChange).toHaveBeenCalledWith(
                    expect.objectContaining({
                        eventId: 'layerschange',
                        meta: {layersCount: 0, layers: []},
                    }),
                );
                expect(screen.getByRole('dialog')).toBeInTheDocument();

                finishPresenceTransition();

                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
                expect(onLayersChange).toHaveBeenCalledTimes(1);
            } finally {
                eventBroker.unsubscribe(onLayersChange);
            }
        });

        test('reopens when visible becomes true during an unfinished exit', () => {
            const onClose = jest.fn();
            const onOpenChange = jest.fn();
            const callbacks = {onTransitionOutComplete: jest.fn()};
            const {rerender} = render(
                <Sheet
                    {...callbacks}
                    visible
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    qa="sheet"
                >
                    Content
                </Sheet>,
            );

            rerender(
                <Sheet
                    {...callbacks}
                    visible={false}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    qa="sheet"
                >
                    Content
                </Sheet>,
            );

            expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'close');
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(onClose).not.toHaveBeenCalled();
            expect(getLayersCount()).toBe(0);

            act(() => {
                jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS / 2);
            });

            rerender(
                <Sheet
                    {...callbacks}
                    visible
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    qa="sheet"
                >
                    Content
                </Sheet>,
            );

            expect(getLayersCount()).toBe(1);
            finishPresenceTransition();

            expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'open');
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByTestId('sheet-veil')).toHaveStyle({opacity: '1'});
            expect(onClose).not.toHaveBeenCalled();
            expect(callbacks.onTransitionOutComplete).not.toHaveBeenCalled();

            pressEscape();

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(getLayersCount()).toBe(1);

            rerender(<Sheet {...callbacks} visible={false} onClose={onClose} />);
            finishPresenceTransition();

            expect(callbacks.onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(onClose).toHaveBeenCalledTimes(1);
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
