import React from 'react';

import {noop} from 'lodash';

import {render, screen} from '../../../../test-utils/utils';
import {Pagination} from '../Pagination';
import {PaginationQa, getPaginationPageQa} from '../constants';

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

    test('Total property disable Next', () => {
        render(<Pagination pageSize={20} onUpdate={noop} page={0} total={undefined} />);

        const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);

        expect(nextButton).toBeDisabled();
    });
});
