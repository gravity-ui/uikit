import {render, screen} from '../../../../test-utils/utils';
import {MobileProvider} from '../../mobile';
import {Pagination} from '../Pagination';
import {PaginationQa, getPaginationPageQa} from '../constants';
import type {PaginationSize} from '../types';
import {getSize} from '../utils';

const noop = () => {};

describe('Pagination component', () => {
    test('Single page', () => {
        render(<Pagination pageSize={20} total={20} onUpdate={noop} page={0} />);

        const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
        expect(firstButton).toBeDisabled();

        const prevButton = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
        expect(prevButton).toBeDisabled();

        const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);
        expect(nextButton).toBeDisabled();
    });

    describe('Two pages', () => {
        const PAGE_SIZE = 20;
        const TOTAL = PAGE_SIZE + 1;

        const FIRST_PAGE = 1;
        const SECOND_PAGE = 2;

        test('First page is current', () => {
            render(
                <Pagination pageSize={PAGE_SIZE} total={TOTAL} onUpdate={noop} page={FIRST_PAGE} />,
            );

            const firstPageButton = screen.getByTestId(getPaginationPageQa(FIRST_PAGE));
            expect(firstPageButton).toHaveAttribute('aria-pressed', 'true');

            const secondPageButton = screen.getByTestId(getPaginationPageQa(SECOND_PAGE));
            expect(secondPageButton).toHaveAttribute('aria-pressed', 'false');

            const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(firstButton).toBeDisabled();

            const prevButton = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
            expect(prevButton).toBeDisabled();

            const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);
            expect(nextButton).not.toBeDisabled();
        });

        test('Second page is current', () => {
            render(
                <Pagination
                    pageSize={PAGE_SIZE}
                    total={TOTAL}
                    onUpdate={noop}
                    page={SECOND_PAGE}
                />,
            );

            const firstPageButton = screen.getByTestId(getPaginationPageQa(FIRST_PAGE));
            expect(firstPageButton).toHaveAttribute('aria-pressed', 'false');

            const secondPageButton = screen.getByTestId(getPaginationPageQa(SECOND_PAGE));
            expect(secondPageButton).toHaveAttribute('aria-pressed', 'true');

            const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(firstButton).not.toBeDisabled();

            const prevButton = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
            expect(prevButton).not.toBeDisabled();

            const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);
            expect(nextButton).toBeDisabled();
        });
    });

    test('Total property undefined', () => {
        render(<Pagination pageSize={20} onUpdate={noop} page={0} total={undefined} />);

        const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);

        expect(nextButton).not.toBeDisabled();
    });

    test.each(new Array<PaginationSize | undefined>('m', 'l', undefined))(
        '[desktop]: render with given "%s" size',
        (size) => {
            render(<Pagination pageSize={20} onUpdate={noop} page={0} total={20} size={size} />);

            const expectedSize = getSize({mobile: false, propSize: size});
            const expectedClass = `g-button_size_${expectedSize}`;

            const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(firstButton).toHaveClass(expectedClass);

            const prevButton = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
            expect(prevButton).toHaveClass(expectedClass);

            const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);
            expect(nextButton).toHaveClass(expectedClass);
        },
    );

    test.each(new Array<PaginationSize | undefined>('m', 'l', undefined))(
        '[mobile]: render with given "%s" size',
        (size) => {
            render(
                <MobileProvider mobile>
                    <Pagination pageSize={20} onUpdate={noop} page={0} total={20} size={size} />,
                </MobileProvider>,
            );

            const expectedSize = getSize({mobile: true, propSize: size});
            const expectedClass = `g-button_size_${expectedSize}`;

            const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(firstButton).toHaveClass(expectedClass);

            const prevButton = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
            expect(prevButton).toHaveClass(expectedClass);

            const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);
            expect(nextButton).toHaveClass(expectedClass);
        },
    );
});
