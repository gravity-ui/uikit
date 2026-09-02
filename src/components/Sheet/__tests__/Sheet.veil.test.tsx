import * as React from 'react';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SHEET_TRANSITION_DURATION_MS, SheetQa} from '../constants';

describe('Sheet veil', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    test('calls onClose after the veil dismissal and completed exit', () => {
        jest.useFakeTimers();
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
                    qa="sheet"
                >
                    Content
                </Sheet>
            );
        }

        render(<AcceptingSheet />);

        const veil = screen.getByTestId(SheetQa.VEIL);

        expect(screen.getByText('Content')).toBeInTheDocument();

        fireEvent.transitionEnd(veil);
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.click(veil);
        expect(onClose).not.toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('sheet')).toHaveAttribute('data-floating-ui-status', 'close');

        fireEvent.transitionEnd(veil);

        expect(onClose).not.toHaveBeenCalled();
        expect(screen.getByText('Content')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(SHEET_TRANSITION_DURATION_MS - 1);
        });

        expect(onClose).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1);
        });

        expect(onClose).toHaveBeenCalledTimes(1);

        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    test('ignores the veil click while the sheet is still animating', () => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        const veil = screen.getByTestId(SheetQa.VEIL);

        fireEvent.click(veil);
        fireEvent.transitionEnd(veil);

        expect(onClose).not.toHaveBeenCalled();
    });
});
