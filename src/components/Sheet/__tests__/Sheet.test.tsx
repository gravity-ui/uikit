import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SHEET_TRANSITION_DURATION_MS, SheetQa} from '../constants';

describe('Sheet', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    test('Renders content when visible', () => {
        const sheetContent = 'Sheet content';
        render(<Sheet visible>{sheetContent}</Sheet>);

        expect(screen.getByText(sheetContent)).toBeInTheDocument();
    });

    test('Do not renders content when invisible', () => {
        const sheetContent = 'Sheet content';
        render(<Sheet visible={false}>{sheetContent}</Sheet>);

        expect(screen.queryByText(sheetContent)).not.toBeInTheDocument();
    });

    test('Do not renders top bar when hideTopBar property is set', () => {
        render(<Sheet visible hideTopBar></Sheet>);

        expect(screen.queryByTestId(SheetQa.TOP)).not.toBeInTheDocument();
    });

    test('Applies className, contentClassName and swipeAreaClassName to the corresponding elements', () => {
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

    test('requests closing when Escape is pressed', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        render(
            <Sheet visible onOpenChange={onOpenChange}>
                Content
            </Sheet>,
        );

        await user.keyboard('{Escape}');

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    test('requests closing only the topmost Sheet when Escape is pressed', async () => {
        const user = userEvent.setup();
        const firstOnOpenChange = jest.fn();
        const secondOnOpenChange = jest.fn();

        render(
            <React.Fragment>
                <Sheet visible onOpenChange={firstOnOpenChange}>
                    First
                </Sheet>
                <Sheet visible onOpenChange={secondOnOpenChange}>
                    Second
                </Sheet>
            </React.Fragment>,
        );

        await user.keyboard('{Escape}');

        expect(firstOnOpenChange).not.toHaveBeenCalled();
        expect(secondOnOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'escape-key');
        expect(secondOnOpenChange).toHaveBeenCalledTimes(1);
    });

    test('calls deprecated onClose after the exit transition when Escape is pressed', () => {
        jest.useFakeTimers();
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        const veil = screen.getByTestId(SheetQa.VEIL);

        fireEvent.transitionEnd(veil);
        fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'});

        expect(veil.style.opacity).toBe('0');
        expect(onClose).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS - 1);
        });

        expect(onClose).not.toHaveBeenCalled();
        expect(screen.getByText('Content')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
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
});
