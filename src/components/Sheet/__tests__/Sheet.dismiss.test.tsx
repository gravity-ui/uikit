import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {getLayersCount} from '../../utils/layer-manager';
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

function AcceptingSheet({
    onRequest,
    onTransitionOutComplete,
}: {
    onRequest: jest.Mock;
    onTransitionOutComplete: jest.Mock;
}) {
    const [open, setOpen] = React.useState(true);

    return (
        <Sheet
            open={open}
            onTransitionOutComplete={onTransitionOutComplete}
            onOpenChange={(nextOpen, event, reason) => {
                onRequest(nextOpen, event, reason);
                setOpen(nextOpen);
            }}
        >
            Content
        </Sheet>
    );
}

function ControlledReopenSheet() {
    const [open, setOpen] = React.useState(true);

    return (
        <React.Fragment>
            <button onClick={() => setOpen(true)}>Set open true</button>
            <Sheet open={open} onOpenChange={setOpen}>
                Content
            </Sheet>
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
        test('ignores veil clicks until the opening animation finishes', () => {
            const onRequest = jest.fn();
            const onTransitionOutComplete = jest.fn();
            render(
                <AcceptingSheet
                    onRequest={onRequest}
                    onTransitionOutComplete={onTransitionOutComplete}
                />,
            );

            const veil = screen.getByTestId(SheetQa.VEIL);
            fireEvent.click(veil);
            finishPresenceTransition();

            expect(onRequest).not.toHaveBeenCalled();
            expect(onTransitionOutComplete).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(veil).toHaveStyle({opacity: '1'});

            finishTransition();
            fireEvent.click(veil);

            expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(onTransitionOutComplete).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test.each([
            {source: 'veil', reason: 'outside-press'},
            {source: 'swipe', reason: 'swipe'},
            {source: 'Escape', reason: 'escape-key'},
        ])(
            'keeps the sheet open when controlled $source dismissal is not accepted',
            async ({source, reason}) => {
                const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
                const onOpenChange = jest.fn();
                const onTransitionOutComplete = jest.fn();
                render(
                    <Sheet
                        open
                        onTransitionOutComplete={onTransitionOutComplete}
                        onOpenChange={onOpenChange}
                    >
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
                expect(onTransitionOutComplete).not.toHaveBeenCalled();

                if (source === 'Escape') {
                    await user.keyboard('{Escape}');

                    expect(onOpenChange).toHaveBeenCalledTimes(2);
                }
            },
        );
    });

    describe.each([
        {
            prop: 'disableOutsideClick',
            options: {disableOutsideClick: true},
            reason: 'outside-press',
            dismiss: () => fireEvent.click(screen.getByTestId(SheetQa.VEIL)),
            otherDismiss: () => fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'}),
        },
        {
            prop: 'disableEscapeKeyDown',
            options: {disableEscapeKeyDown: true},
            reason: 'escape-key',
            dismiss: () => fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'}),
            otherDismiss: () => fireEvent.click(screen.getByTestId(SheetQa.VEIL)),
        },
    ])('$prop', ({prop, options, reason, dismiss, otherDismiss}) => {
        test.each(['uncontrolled', 'controlled'])(
            'blocks %s dismissal until the option is disabled',
            (mode) => {
                const onOpenChange = jest.fn();
                const onTransitionOutComplete = jest.fn();
                const openProps = mode === 'controlled' ? {open: true} : {defaultOpen: true};
                const {rerender} = render(
                    <Sheet
                        {...options}
                        {...openProps}
                        onOpenChange={onOpenChange}
                        onTransitionOutComplete={onTransitionOutComplete}
                    >
                        Content
                    </Sheet>,
                );

                finishTransition();
                dismiss();
                finishPresenceTransition();

                expect(onOpenChange).not.toHaveBeenCalled();
                expect(onTransitionOutComplete).not.toHaveBeenCalled();
                expect(screen.getByRole('dialog')).toBeInTheDocument();
                expect(document.body.style.overflow).toBe('hidden');

                rerender(
                    <Sheet
                        {...{...options, [prop]: false}}
                        {...openProps}
                        onOpenChange={onOpenChange}
                        onTransitionOutComplete={onTransitionOutComplete}
                    >
                        Content
                    </Sheet>,
                );
                dismiss();
                finishPresenceTransition();

                expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), reason);
                expect(onOpenChange).toHaveBeenCalledTimes(1);

                if (mode === 'controlled') {
                    expect(onTransitionOutComplete).not.toHaveBeenCalled();
                    expect(screen.getByRole('dialog')).toBeInTheDocument();
                    expect(document.body.style.overflow).toBe('hidden');
                } else {
                    expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
                    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
                    expect(document.body.style.overflow).toBe('');
                }
            },
        );

        test('keeps the other dismissal source enabled', () => {
            const onTransitionOutComplete = jest.fn();
            render(
                <Sheet {...options} defaultOpen onTransitionOutComplete={onTransitionOutComplete}>
                    Content
                </Sheet>,
            );

            finishTransition();
            otherDismiss();
            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    test.each(['swipe', 'external open change'])(
        'allows %s dismissal when Escape and outside clicks are disabled',
        (source) => {
            const options = {disableEscapeKeyDown: true, disableOutsideClick: true};
            const onTransitionOutComplete = jest.fn();
            const openProps = source === 'swipe' ? {defaultOpen: true} : {open: true};
            const {rerender} = render(
                <Sheet
                    {...options}
                    {...openProps}
                    onTransitionOutComplete={onTransitionOutComplete}
                >
                    Content
                </Sheet>,
            );

            finishTransition();
            if (source === 'swipe') {
                swipePastThreshold();
            } else {
                rerender(
                    <Sheet
                        {...options}
                        open={false}
                        onTransitionOutComplete={onTransitionOutComplete}
                    >
                        Content
                    </Sheet>,
                );
            }
            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(document.body.style.overflow).toBe('');
        },
    );

    describe('exit lifecycle', () => {
        test('calls onTransitionOutComplete once after an uncontrolled veil dismissal finishes', () => {
            const onTransitionOutComplete = jest.fn();
            render(
                <Sheet defaultOpen onTransitionOutComplete={onTransitionOutComplete}>
                    Content
                </Sheet>,
            );

            finishTransition();
            fireEvent.click(screen.getByTestId(SheetQa.VEIL));

            act(() => {
                jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS - 1);
            });

            expect(onTransitionOutComplete).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(1);
            });

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
        });

        test.each([
            {getArea: () => screen.getByTestId(SheetQa.SWIPE_AREA), surface: 'handle'},
            {getArea: () => screen.getByTestId(SheetQa.CONTENT_AREA), surface: 'content'},
        ])('finishes an uncontrolled full-height $surface swipe immediately', ({getArea}) => {
            const onOpenChange = jest.fn();
            const onTransitionOutComplete = jest.fn();
            render(
                <Sheet
                    defaultOpen
                    onOpenChange={onOpenChange}
                    onTransitionOutComplete={onTransitionOutComplete}
                >
                    Content
                </Sheet>,
            );

            finishTransition();
            expect(document.body.style.overflow).toBe('hidden');
            expect(getLayersCount()).toBe(1);

            swipe(getArea(), {
                from: TOUCH_START_POINT,
                to: TOUCH_START_POINT + SHEET_HEIGHT,
            });

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(document.body.style.overflow).toBe('');
            expect(getLayersCount()).toBe(0);

            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
        });

        test('finishes an accepted full-height swipe immediately', () => {
            const onRequest = jest.fn();
            const onTransitionOutComplete = jest.fn();
            render(
                <AcceptingSheet
                    onRequest={onRequest}
                    onTransitionOutComplete={onTransitionOutComplete}
                />,
            );

            finishTransition();
            swipe(screen.getByTestId(SheetQa.SWIPE_AREA), {
                from: TOUCH_START_POINT,
                to: TOUCH_START_POINT + SHEET_HEIGHT,
            });

            expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(document.body.style.overflow).toBe('');
        });

        test('runs the shared exit after the parent accepts a veil dismissal', () => {
            const onRequest = jest.fn();
            const onTransitionOutComplete = jest.fn();
            render(
                <AcceptingSheet
                    onRequest={onRequest}
                    onTransitionOutComplete={onTransitionOutComplete}
                />,
            );

            finishTransition();
            const veil = screen.getByTestId(SheetQa.VEIL);
            fireEvent.click(veil);
            fireEvent.click(veil);

            expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(veil).toHaveStyle({opacity: '0'});
            expect(onTransitionOutComplete).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test.each([
            {gesture: 'swipe area', getArea: () => screen.getByTestId(SheetQa.SWIPE_AREA)},
            {gesture: 'content scroll', getArea: () => screen.getByTestId(SheetQa.CONTENT_AREA)},
        ])('keeps an accepted exit terminal during a $gesture swipe', ({getArea}) => {
            const onRequest = jest.fn();
            const onTransitionOutComplete = jest.fn();
            render(
                <AcceptingSheet
                    onRequest={onRequest}
                    onTransitionOutComplete={onTransitionOutComplete}
                />,
            );

            finishTransition();
            const veil = screen.getByTestId(SheetQa.VEIL);
            fireEvent.click(veil);

            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(veil).toHaveStyle({opacity: '0'});

            swipePastThreshold(getArea());

            expect(onRequest).toHaveBeenCalledTimes(1);
            expect(veil).toHaveStyle({opacity: '0'});
            expect(onTransitionOutComplete).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test('uncontrolled sheet with onOpenChange dismisses itself from Escape', async () => {
            const onOpenChange = jest.fn();
            const onTransitionOutComplete = jest.fn();
            render(
                <Sheet
                    defaultOpen
                    onOpenChange={onOpenChange}
                    onTransitionOutComplete={onTransitionOutComplete}
                >
                    Content
                </Sheet>,
            );

            finishTransition();
            await userEvent.setup({advanceTimers: jest.advanceTimersByTime}).keyboard('{Escape}');

            const veil = screen.getByTestId(SheetQa.VEIL);
            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(veil).toHaveStyle({opacity: '0'});
            expect(onTransitionOutComplete).not.toHaveBeenCalled();

            finishPresenceTransition();

            expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test('reopens a controlled sheet after open changes from false to true', () => {
            render(<ControlledReopenSheet />);

            finishTransition();
            fireEvent.click(screen.getByTestId(SheetQa.VEIL));
            finishPresenceTransition();

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            fireEvent.click(screen.getByRole('button', {name: 'Set open true'}));

            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
    });

    describe('gestures', () => {
        describe('swipe area', () => {
            test('restores a short swipe and dismisses a swipe above the threshold', () => {
                const onTransitionOutComplete = jest.fn();
                const onRequest = jest.fn();
                render(
                    <AcceptingSheet
                        onRequest={onRequest}
                        onTransitionOutComplete={onTransitionOutComplete}
                    />,
                );

                const swipeArea = screen.getByTestId(SheetQa.SWIPE_AREA);
                const sheet = screen.getByRole('dialog');
                const veil = screen.getByTestId(SheetQa.VEIL);

                swipe(swipeArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + (HIDE_THRESHOLD - 20),
                });

                expect(onTransitionOutComplete).not.toHaveBeenCalled();
                expect(onRequest).not.toHaveBeenCalled();
                expect(veil.style.opacity).toBe('1');
                expect(sheet.style.transform).toBe(`translate3d(0, -${SHEET_HEIGHT}px, 0)`);

                swipe(swipeArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + (HIDE_THRESHOLD + 20),
                });

                expect(sheet.style.transform).toBe('translate3d(0, 0, 0)');
                expect(veil.style.opacity).toBe('0');
                expect(onTransitionOutComplete).not.toHaveBeenCalled();
                expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
                expect(onRequest).toHaveBeenCalledTimes(1);

                finishPresenceTransition();

                expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            });

            test('requests dismissal for a fast flick below the distance threshold', () => {
                const onOpenChange = jest.fn();
                render(
                    <Sheet open onOpenChange={onOpenChange}>
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
            test('dismisses immediately when swiping down the full height from the top', () => {
                const onTransitionOutComplete = jest.fn();
                const onRequest = jest.fn();
                render(
                    <AcceptingSheet
                        onRequest={onRequest}
                        onTransitionOutComplete={onTransitionOutComplete}
                    />,
                );

                const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
                swipe(contentArea, {
                    from: TOUCH_START_POINT,
                    to: TOUCH_START_POINT + SHEET_HEIGHT,
                });

                expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
                expect(onRequest).toHaveBeenCalledTimes(1);
                expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
                expect(document.body.style.overflow).toBe('');

                finishPresenceTransition();

                expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
            });

            test('does not dismiss when allowHideOnContentScroll is false', () => {
                const onOpenChange = jest.fn();
                render(
                    <Sheet open allowHideOnContentScroll={false} onOpenChange={onOpenChange}>
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
                    <Sheet open onOpenChange={onOpenChange}>
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
        ])(
            'dismisses through the veil after $surface touchcancel without movement',
            ({getArea}) => {
                const onRequest = jest.fn();
                const onTransitionOutComplete = jest.fn();
                render(
                    <AcceptingSheet
                        onRequest={onRequest}
                        onTransitionOutComplete={onTransitionOutComplete}
                    />,
                );

                finishTransition();
                const touchArea = getArea();
                const veil = screen.getByTestId(SheetQa.VEIL);

                fireEvent.touchStart(touchArea, {
                    touches: [{clientX: 0, clientY: TOUCH_START_POINT}],
                });
                fireEvent.touchCancel(touchArea);

                expect(onRequest).not.toHaveBeenCalled();
                expect(screen.getByRole('dialog')).toBeInTheDocument();
                expect(screen.getByTestId(SheetQa.CONTENT_AREA)).not.toHaveClass(
                    'g-sheet-content-area_without-scroll',
                );

                // No styles changed, so there is no restoration transition to finish.
                fireEvent.click(veil);

                expect(onRequest).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
                expect(onRequest).toHaveBeenCalledTimes(1);
                expect(veil).toHaveStyle({opacity: '0'});
                expect(onTransitionOutComplete).not.toHaveBeenCalled();

                finishPresenceTransition();

                expect(onTransitionOutComplete).toHaveBeenCalledTimes(1);
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            },
        );

        test.each([
            {getArea: () => screen.getByTestId(SheetQa.SWIPE_AREA), surface: 'handle'},
            {getArea: () => screen.getByTestId(SheetQa.CONTENT_AREA), surface: 'content'},
        ])('restores open state after $surface touchcancel', ({getArea}) => {
            const onTransitionOutComplete = jest.fn();
            const onOpenChange = jest.fn();

            render(
                <Sheet
                    open
                    onTransitionOutComplete={onTransitionOutComplete}
                    onOpenChange={onOpenChange}
                >
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
            expect(onTransitionOutComplete).not.toHaveBeenCalled();
        });
    });
    describe('drag handles in content', () => {
        const TOUCH_END_POINT = TOUCH_START_POINT + SHEET_HEIGHT;

        function swipeDownOnContent(content: Element, {from, to}: {from: number; to: number}) {
            fireEvent.touchStart(content, {touches: [{clientX: 0, clientY: from}]});
            fireEvent.touchMove(content, {touches: [{clientX: 0, clientY: to}]});
            fireEvent.touchEnd(content, {touches: [{clientX: 0, clientY: to}]});
        }

        test.each([
            ['a native drag source', {draggable: true}],
            ['a handle of @hello-pangea/dnd', {'data-rfd-drag-handle-draggable-id': 'a'}],
        ])('does not move the sheet on a touch that starts on %s', (_name, attributes) => {
            const onOpenChange = jest.fn();
            render(
                <Sheet defaultOpen onOpenChange={onOpenChange}>
                    <span {...attributes} data-qa="handle">
                        Handle
                    </span>
                    Content
                </Sheet>,
            );

            const handle = screen.getByTestId('handle');
            const sheet = screen.getByRole('dialog');
            const restingTransform = sheet.style.transform;
            fireEvent.touchStart(handle, {touches: [{clientX: 0, clientY: TOUCH_START_POINT}]});
            fireEvent.touchMove(handle, {touches: [{clientX: 0, clientY: TOUCH_END_POINT}]});
            // The sheet does not follow the finger
            expect(sheet.style.transform).toBe(restingTransform);
            fireEvent.touchEnd(handle, {touches: [{clientX: 0, clientY: TOUCH_END_POINT}]});
            expect(onOpenChange).not.toHaveBeenCalled();

            // The next swipe on the content works again
            swipeDownOnContent(screen.getByTestId(SheetQa.CONTENT_AREA), {
                from: TOUCH_START_POINT,
                to: TOUCH_END_POINT,
            });
            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
        });

        test('a drag whose end never reaches the content leaves the next swipe working', () => {
            const onOpenChange = jest.fn();
            render(
                <Sheet defaultOpen onOpenChange={onOpenChange}>
                    <span data-rfd-drag-handle-draggable-id="a" data-qa="handle">
                        Handle
                    </span>
                    Content
                </Sheet>,
            );

            // The handle is unmounted mid-drag: neither touchend nor touchcancel bubbles up
            fireEvent.touchStart(screen.getByTestId('handle'), {
                touches: [{clientX: 0, clientY: TOUCH_START_POINT}],
            });
            swipeDownOnContent(screen.getByTestId(SheetQa.CONTENT_AREA), {
                from: TOUCH_START_POINT,
                to: TOUCH_END_POINT,
            });
            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
        });

        test('a touch on an element that only opts out of the native drag swipes the sheet', () => {
            const onOpenChange = jest.fn();
            render(
                <Sheet defaultOpen onOpenChange={onOpenChange}>
                    <span draggable={false} data-qa="image">
                        Image
                    </span>
                </Sheet>,
            );

            swipeDownOnContent(screen.getByTestId('image'), {
                from: TOUCH_START_POINT,
                to: TOUCH_END_POINT,
            });
            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
        });
    });
});
