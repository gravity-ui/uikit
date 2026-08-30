import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

describe('Sheet', () => {
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

    test('calls deprecated onClose after the hiding transition when Escape is pressed', async () => {
        const user = userEvent.setup();
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        const veil = screen.getByTestId(SheetQa.VEIL);

        fireEvent.transitionEnd(veil);
        await user.keyboard('{Escape}');

        expect(veil.style.opacity).toBe('0');
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.transitionEnd(veil);

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
