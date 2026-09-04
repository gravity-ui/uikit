import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SHEET_TRANSITION_DURATION_MS, SheetQa} from '../constants';

const HIDE_THRESHOLD = 50;
const SHEET_HEIGHT = 300;
const TOUCH_START_POINT = 100;

function finishTransition() {
    fireEvent.transitionEnd(screen.getByTestId(SheetQa.VEIL));
}

function finishPresenceTransition() {
    act(() => {
        jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS);
    });
}

function swipe(area: Element, {from, to}: {from: number; to: number}) {
    fireEvent.touchStart(area, {touches: [{clientX: 0, clientY: from}]});
    fireEvent.touchMove(area, {touches: [{clientX: 0, clientY: to}]});
    fireEvent.touchEnd(area, {touches: [{clientX: 0, clientY: to}]});
}

function swipePastThreshold(area = screen.getByTestId(SheetQa.SWIPE_AREA)) {
    swipe(area, {from: TOUCH_START_POINT, to: TOUCH_START_POINT + 70});
}

function AcceptingSheet({onRequest, onClose}: {onRequest: jest.Mock; onClose: jest.Mock}) {
    const [visible, setVisible] = React.useState(true);

    return (
        <Sheet
            visible={visible}
            onClose={onClose}
            onOpenChange={(open, event, reason) => {
                onRequest(open, event, reason);
                setVisible(open);
            }}
        >
            Content
        </Sheet>
    );
}

function LegacyReopenSheet() {
    const [visible, setVisible] = React.useState(true);

    return (
        <React.Fragment>
            <button onClick={() => setVisible(false)}>Set visible false</button>
            <button onClick={() => setVisible(true)}>Set visible true</button>
            <Sheet visible={visible}>Content</Sheet>
        </React.Fragment>
    );
}

describe('Sheet dismissal', () => {
    let getBoundingClientRectSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.useFakeTimers();
        getBoundingClientRectSpy = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockReturnValue({height: SHEET_HEIGHT, width: 0, top: 0, left: 0} as DOMRect);
    });

    afterEach(() => {
        getBoundingClientRectSpy.mockRestore();
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    describe('dismissal requests', () => {
        test.each([
            {source: 'veil', reason: 'outside-press'},
            {source: 'swipe', reason: 'swipe'},
            {source: 'Escape', reason: 'escape-key'},
        ])(
            'keeps the sheet open when controlled $source dismissal is not accepted',
            async ({source, reason}) => {
                const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
                const onOpenChange = jest.fn();
                const onClose = jest.fn();
                render(
                    <Sheet visible onClose={onClose} onOpenChange={onOpenChange}>
                        Content
                    </Sheet>,
                );

                finishTransition();
                if (source === 'veil') {
                    fireEvent.click(screen.getByTestId(SheetQa.VEIL));
                } else if (source === 'swipe') {
                    swipePastThreshold();
                } else {
                    await user.keyboard('{Escape}');
                }

                expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), reason);
                expect(onOpenChange).toHaveBeenCalledTimes(1);
                expect(screen.getByRole('dialog')).toBeInTheDocument();
                expect(screen.getByTestId(SheetQa.VEIL)).toHaveStyle({opacity: '1'});
                expect(onClose).not.toHaveBeenCalled();

                if (source === 'Escape') {
                    await user.keyboard('{Escape}');

                    expect(onOpenChange).toHaveBeenCalledTimes(2);
                }
            },
        );
    });

    describe('exit lifecycle', () => {
        test('runs the shared exit after the parent accepts a veil dismissal', () => {
            const onRequest = jest.fn();
            const onClose = jest.fn();
            render(<AcceptingSheet onRequest={onRequest} onClose={onClose} />);

            finishTransition();
            const veil = screen.getByTestId(SheetQa.VEIL);
            fireEvent.click(veil);
            fireEvent.click(veil);

            expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(veil).toHaveStyle({opacity: '0'});
            expect(onClose).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(onClose).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test.each([
            {gesture: 'swipe area', getArea: () => screen.getByTestId(SheetQa.SWIPE_AREA)},
            {gesture: 'content scroll', getArea: () => screen.getByTestId(SheetQa.CONTENT_AREA)},
        ])('keeps an accepted exit terminal during a $gesture swipe', ({getArea}) => {
            const onRequest = jest.fn();
            const onClose = jest.fn();
            render(<AcceptingSheet onRequest={onRequest} onClose={onClose} />);

            finishTransition();
            const veil = screen.getByTestId(SheetQa.VEIL);
            fireEvent.click(veil);

            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(veil).toHaveStyle({opacity: '0'});

            swipePastThreshold(getArea());

            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(veil).toHaveStyle({opacity: '0'});
            expect(onClose).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(onClose).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test('legacy onClose-only sheet dismisses from Escape', async () => {
            const onClose = jest.fn();
            render(
                <Sheet visible onClose={onClose}>
                    Content
                </Sheet>,
            );

            finishTransition();
            await userEvent.setup({advanceTimers: jest.advanceTimersByTime}).keyboard('{Escape}');

            const veil = screen.getByTestId(SheetQa.VEIL);
            expect(veil).toHaveStyle({opacity: '0'});
            expect(onClose).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(onClose).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test('reopens a legacy sheet after visible changes from false to true', () => {
            render(<LegacyReopenSheet />);

            finishTransition();
            fireEvent.click(screen.getByTestId(SheetQa.VEIL));
            finishPresenceTransition();

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            fireEvent.click(screen.getByRole('button', {name: 'Set visible false'}));
            fireEvent.click(screen.getByRole('button', {name: 'Set visible true'}));

            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
    });

    describe('gestures', () => {
        describe('swipe area', () => {
            test('restores a short swipe and dismisses a swipe above the threshold', () => {
                const onClose = jest.fn();
                const onRequest = jest.fn();
                render(<AcceptingSheet onRequest={onRequest} onClose={onClose} />);

                const swipeArea = screen.getByTestId(SheetQa.SWIPE_AREA);
                const sheet = screen.getByRole('dialog');
                const veil = screen.getByTestId(SheetQa.VEIL);

                swipe(swipeArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + (HIDE_THRESHOLD - 20),
                });

                expect(onClose).not.toHaveBeenCalled();
                expect(onRequest).not.toHaveBeenCalled();
                expect(veil.style.opacity).toBe('1');
                expect(sheet.style.transform).toBe(`translate3d(0, -${SHEET_HEIGHT}px, 0)`);

                swipe(swipeArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + (HIDE_THRESHOLD + 20),
                });

                expect(sheet.style.transform).toBe('translate3d(0, 0, 0)');
                expect(veil.style.opacity).toBe('0');
                expect(onClose).not.toHaveBeenCalled();
                expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
                expect(onRequest).toHaveBeenCalledTimes(1);

                finishPresenceTransition();

                expect(onClose).toHaveBeenCalledTimes(1);
            });

            test('requests dismissal for a fast flick below the distance threshold', () => {
                const onOpenChange = jest.fn();
                render(
                    <Sheet visible onOpenChange={onOpenChange}>
                        Content
                    </Sheet>,
                );

                const swipeArea = screen.getByTestId(SheetQa.SWIPE_AREA);
                const nowSpy = jest
                    .spyOn(Date, 'now')
                    .mockReturnValueOnce(1000)
                    .mockReturnValueOnce(1001);

                fireEvent.touchStart(swipeArea, {
                    touches: [{clientX: 0, clientY: TOUCH_START_POINT}],
                });
                fireEvent.touchMove(swipeArea, {
                    touches: [{clientX: 0, clientY: TOUCH_START_POINT + 1}],
                });
                fireEvent.touchMove(swipeArea, {
                    touches: [{clientX: 0, clientY: TOUCH_START_POINT + 2}],
                });
                fireEvent.touchEnd(swipeArea, {
                    touches: [{clientX: 0, clientY: TOUCH_START_POINT + 2}],
                });
                nowSpy.mockRestore();

                expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
                expect(onOpenChange).toHaveBeenCalledTimes(1);
            });
        });

        describe('content scroll', () => {
            test('dismisses when swiping down from the top', () => {
                const onClose = jest.fn();
                const onRequest = jest.fn();
                render(<AcceptingSheet onRequest={onRequest} onClose={onClose} />);

                const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
                swipe(contentArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + SHEET_HEIGHT,
                });

                expect(screen.getByTestId(SheetQa.VEIL)).toHaveStyle({opacity: '0'});
                expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
                expect(onRequest).toHaveBeenCalledTimes(1);
                expect(onClose).not.toHaveBeenCalled();

                finishPresenceTransition();

                expect(onClose).toHaveBeenCalledTimes(1);
            });

            test('does not dismiss when allowHideOnContentScroll is false', () => {
                const onOpenChange = jest.fn();
                render(
                    <Sheet visible allowHideOnContentScroll={false} onOpenChange={onOpenChange}>
                        Content
                    </Sheet>,
                );

                const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
                swipe(contentArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + SHEET_HEIGHT,
                });

                expect(onOpenChange).not.toHaveBeenCalled();
                expect(screen.getByRole('dialog')).toBeInTheDocument();
                expect(screen.getByTestId(SheetQa.VEIL)).toHaveStyle({opacity: '1'});
            });

            test('does not dismiss when the content is scrolled', () => {
                const onOpenChange = jest.fn();
                render(
                    <Sheet visible onOpenChange={onOpenChange}>
                        Content
                    </Sheet>,
                );

                const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
                Object.defineProperty(contentArea, 'scrollTop', {
                    value: 100,
                    configurable: true,
                });
                swipe(contentArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + SHEET_HEIGHT,
                });

                expect(onOpenChange).not.toHaveBeenCalled();
                expect(screen.getByRole('dialog')).toBeInTheDocument();
                expect(screen.getByTestId(SheetQa.VEIL)).toHaveStyle({opacity: '1'});
            });
        });

        test.each([
            {getArea: () => screen.getByTestId(SheetQa.SWIPE_AREA), surface: 'handle'},
            {getArea: () => screen.getByTestId(SheetQa.CONTENT_AREA), surface: 'content'},
        ])('restores open state after $surface touchcancel', ({getArea}) => {
            const onClose = jest.fn();
            const onOpenChange = jest.fn();

            render(
                <Sheet visible onClose={onClose} onOpenChange={onOpenChange}>
                    Content
                </Sheet>,
            );

            const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
            const sheet = screen.getByRole('dialog');
            const veil = screen.getByTestId(SheetQa.VEIL);
            const touchArea = getArea();

            fireEvent.touchStart(touchArea, {touches: [{clientX: 0, clientY: 100}]});
            fireEvent.touchMove(touchArea, {touches: [{clientX: 0, clientY: 170}]});

            expect(sheet.style.transform).toBe('translate3d(0, -230px, 0)');
            expect(contentArea).toHaveClass('g-sheet-content-area_without-scroll');

            fireEvent.touchCancel(touchArea);

            expect(sheet.style.transform).toBe(`translate3d(0, -${SHEET_HEIGHT}px, 0)`);
            expect(veil).toHaveStyle({opacity: '1'});
            expect(sheet).toHaveClass('g-sheet__sheet_with-transition');
            expect(veil).toHaveClass('g-sheet-veil_with-transition');
            expect(contentArea).not.toHaveClass('g-sheet-content-area_without-scroll');
            expect(onOpenChange).not.toHaveBeenCalled();
            expect(onClose).not.toHaveBeenCalled();
        });
    });
});
