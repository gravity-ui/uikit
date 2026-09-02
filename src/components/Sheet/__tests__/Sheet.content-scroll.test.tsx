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
});
