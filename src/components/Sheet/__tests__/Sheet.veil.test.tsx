import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

describe('Sheet veil', () => {
    test('calls onClose after the veil click and the hiding transition end', () => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        const veil = screen.getByTestId(SheetQa.VEIL);

        // finish the initial "showing" animation so the sheet is no longer animating
        fireEvent.transitionEnd(veil);
        expect(onClose).not.toHaveBeenCalled();

        // click starts the "hiding" animation, onClose fires only after it finishes
        fireEvent.click(veil);
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.transitionEnd(veil);
        expect(onClose).toHaveBeenCalledTimes(1);
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

    test('calls onClose exactly once per closing cycle', () => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        const veil = screen.getByTestId(SheetQa.VEIL);

        fireEvent.transitionEnd(veil);
        fireEvent.click(veil);
        fireEvent.transitionEnd(veil);

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
});
