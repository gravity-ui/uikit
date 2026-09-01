import * as React from 'react';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

describe('Sheet veil', () => {
    test('calls onClose after the veil click and the hiding transition end', () => {
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

        const veil = screen.getByTestId(SheetQa.VEIL);

        expect(screen.getByText('Content')).toBeInTheDocument();

        fireEvent.transitionEnd(veil);
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.click(veil);
        expect(onClose).not.toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
        expect(onOpenChange).toHaveBeenCalledTimes(1);

        fireEvent.transitionEnd(veil);
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
