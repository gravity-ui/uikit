import {render, screen} from '../../../../test-utils/utils';
import {block} from '../../utils/cn';
import {Sheet} from '../Sheet';

const contentAreaBlock = block('sheet-content-area');

describe('Sheet title', () => {
    test('renders title when it is passed', () => {
        const title = 'Sheet title';
        render(
            <Sheet visible title={title}>
                Content
            </Sheet>,
        );

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(document.querySelector(`.${contentAreaBlock('content-title')}`)).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', title);
    });

    test('does not render title block when title is not passed', () => {
        render(<Sheet visible>Content</Sheet>);

        expect(
            document.querySelector(`.${contentAreaBlock('content-title')}`),
        ).not.toBeInTheDocument();
    });
});
