import * as React from 'react';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SHEET_TRANSITION_DURATION_MS, SheetQa} from '../constants';

describe('Sheet content scroll', () => {
    const SHEET_HEIGHT = 300;
    const TOUCH_START_POINT = 100;
    const TOUCH_END_POINT = TOUCH_START_POINT + SHEET_HEIGHT;

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

    function swipeDownOnContent(content: Element, {from, to}: {from: number; to: number}) {
        fireEvent.touchStart(content, {touches: [{clientX: 0, clientY: from}]});
        fireEvent.touchMove(content, {touches: [{clientX: 0, clientY: to}]});
        fireEvent.touchEnd(content, {touches: [{clientX: 0, clientY: to}]});
    }

    test('closes the sheet on a swipe down when the content is scrolled to the top', () => {
        const onClose = jest.fn();
        const onOpenChange = jest.fn();

        function AcceptingSheet() {
            const [visible, setVisible] = React.useState(true);

            return (
                <Sheet
                    visible={visible}
                    onClose={onClose}
                    onOpenChange={(open, event, reason) => {
                        onOpenChange(open, event, reason);
                        setVisible(open);
                    }}
                >
                    Content
                </Sheet>
            );
        }

        render(<AcceptingSheet />);

        const scrollContainer = screen.getByTestId(SheetQa.CONTENT_AREA);

        swipeDownOnContent(scrollContainer, {from: TOUCH_START_POINT, to: TOUCH_END_POINT});
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'swipe');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onClose).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS);
        });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('does not close the sheet on a swipe down when allowHideOnContentScroll set to false', () => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose} allowHideOnContentScroll={false}>
                Content
            </Sheet>,
        );

        const scrollContainer = screen.getByTestId(SheetQa.CONTENT_AREA);

        swipeDownOnContent(scrollContainer, {from: TOUCH_START_POINT, to: TOUCH_END_POINT});
        expect(onClose).not.toHaveBeenCalled();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('does not close the sheet on a swipe down when the content is scrolled', () => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        const scrollContainer = screen.getByTestId(SheetQa.CONTENT_AREA);

        Object.defineProperty(scrollContainer, 'scrollTop', {value: 100, configurable: true});
        swipeDownOnContent(scrollContainer, {from: TOUCH_START_POINT, to: TOUCH_END_POINT});
        expect(onClose).not.toHaveBeenCalled();
    });

    test('completes external close started during content pull-down', () => {
        const {rerender} = render(
            <Sheet visible qa="sheet">
                Content
            </Sheet>,
        );

        const sheet = screen.getByRole('dialog');
        const veil = screen.getByTestId(SheetQa.VEIL);
        const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);

        fireEvent.touchStart(contentArea, {touches: [{clientX: 0, clientY: 100}]});
        fireEvent.touchMove(contentArea, {touches: [{clientX: 0, clientY: 170}]});

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

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS);
        });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(document.body.style.overflow).toBe('');
    });

    test('restores content scrolling after content touchcancel', () => {
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

        fireEvent.touchStart(contentArea, {touches: [{clientX: 0, clientY: 100}]});
        fireEvent.touchMove(contentArea, {touches: [{clientX: 0, clientY: 170}]});

        expect(contentArea).toHaveClass('g-sheet-content-area_without-scroll');
        expect(sheet.style.transform).toBe('translate3d(0, -230px, 0)');

        fireEvent.touchCancel(contentArea);

        expect(contentArea).not.toHaveClass('g-sheet-content-area_without-scroll');
        expect(sheet.style.transform).toBe(`translate3d(0, -${SHEET_HEIGHT}px, 0)`);
        expect(veil).toHaveStyle({opacity: '1'});
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    test('starts a clean second gesture after cancellation', () => {
        const onOpenChange = jest.fn();

        render(
            <Sheet visible onOpenChange={onOpenChange}>
                Content
            </Sheet>,
        );

        const contentArea = screen.getByTestId(SheetQa.CONTENT_AREA);
        const sheet = screen.getByRole('dialog');

        fireEvent.touchStart(contentArea, {touches: [{clientX: 0, clientY: 100}]});
        fireEvent.touchMove(contentArea, {touches: [{clientX: 0, clientY: 170}]});
        fireEvent.touchCancel(contentArea);

        fireEvent.touchStart(contentArea, {touches: [{clientX: 0, clientY: 0}]});
        fireEvent.touchMove(contentArea, {touches: [{clientX: 0, clientY: 30}]});

        expect(sheet.style.transform).toBe('translate3d(0, -270px, 0)');

        fireEvent.touchEnd(contentArea, {touches: [{clientX: 0, clientY: 30}]});

        expect(sheet.style.transform).toBe(`translate3d(0, -${SHEET_HEIGHT}px, 0)`);
        expect(onOpenChange).not.toHaveBeenCalled();
    });
});
