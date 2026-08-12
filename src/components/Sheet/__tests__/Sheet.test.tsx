import {render, screen} from '../../../../test-utils/utils';
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
});
