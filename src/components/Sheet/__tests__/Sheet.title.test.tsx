import {render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {SheetQa} from '../constants';

describe('Sheet title', () => {
    test('renders title when it is passed', () => {
        const title = 'Sheet title';
        render(
            <Sheet visible title={title}>
                Content
            </Sheet>,
        );

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByTestId(SheetQa.TITLE)).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', title);
    });

    test('does not render title block when title is not passed', () => {
        render(<Sheet visible>Content</Sheet>);

        expect(screen.queryByTestId(SheetQa.TITLE)).not.toBeInTheDocument();
    });
});
