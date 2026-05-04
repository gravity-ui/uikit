import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {MobileProvider} from '../../mobile';
import {Pagination} from '../Pagination';
import {PaginationQa, getPaginationPageQa} from '../constants';
import type {PaginationProps, PaginationSize, PaginationView} from '../types';
import {getSize, getViews} from '../utils';

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

    test.each(new Array<PaginationView>('clear', 'outlined'))(
        '[desktop]: render with given "%s" view',
        (view) => {
            render(
                <Pagination
                    pageSize={20}
                    pageSizeOptions={[20, 100, 500]}
                    onUpdate={noop}
                    page={0}
                    total={20}
                    view={view}
                    showInput
                    showPages
                />,
            );

            const expectedViews = getViews({mobile: false, propView: view});
            const expectedButtonClass = `g-button_view_${expectedViews.buttonView}`;
            const expectedInputClass = `g-text-input_view_${expectedViews.inputView}`;
            const expectedPageSizerClass = `g-select-control__button_view_${expectedViews.pageSizerView}`;

            const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(firstButton).toHaveClass(expectedButtonClass);

            const prevButton = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
            expect(prevButton).toHaveClass(expectedButtonClass);

            const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);
            expect(nextButton).toHaveClass(expectedButtonClass);

            const paginationInput = screen.getByTestId(PaginationQa.PaginationInput);
            expect(paginationInput).toHaveClass(expectedInputClass);

            const pageSizer = screen.getByTestId(PaginationQa.PaginationPageSizer);
            expect(pageSizer).toHaveClass(expectedPageSizerClass);
        },
    );

    test.each(new Array<PaginationView>('clear', 'outlined'))(
        '[mobile]: render with given "%s" view',
        (view) => {
            render(
                <MobileProvider mobile>
                    <Pagination
                        pageSize={20}
                        pageSizeOptions={[20, 100, 500]}
                        onUpdate={noop}
                        page={0}
                        total={20}
                        view={view}
                        showInput
                        showPages
                    />
                </MobileProvider>,
            );

            const expectedViews = getViews({mobile: true, propView: view});
            const expectedButtonClass = `g-button_view_${expectedViews.buttonView}`;
            const expectedInputClass = `g-text-input_view_${expectedViews.inputView}`;
            const expectedPageSizerClass = `g-select-control__button_view_${expectedViews.pageSizerView}`;

            const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(firstButton).toHaveClass(expectedButtonClass);

            const prevButton = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
            expect(prevButton).toHaveClass(expectedButtonClass);

            const nextButton = screen.getByTestId(PaginationQa.PaginationButtonNext);
            expect(nextButton).toHaveClass(expectedButtonClass);

            const paginationInput = screen.getByTestId(PaginationQa.PaginationInput);
            expect(paginationInput).toHaveClass(expectedInputClass);

            const pageSizer = screen.getByTestId(PaginationQa.PaginationPageSizer);
            expect(pageSizer).toHaveClass(expectedPageSizerClass);
        },
    );

    describe('component prop', () => {
        const CustomLink = React.forwardRef<
            HTMLAnchorElement,
            React.AnchorHTMLAttributes<HTMLAnchorElement>
        >(({children, ...props}, ref) => (
            <a {...props} ref={ref} data-custom-link="true">
                {children}
            </a>
        ));
        CustomLink.displayName = 'CustomLink';

        test('without component, navigation buttons render as <button>', () => {
            render(<Pagination pageSize={20} total={100} onUpdate={noop} page={2} />);

            expect(screen.getByTestId(PaginationQa.PaginationButtonFirst).tagName).toBe('BUTTON');
            expect(screen.getByTestId(PaginationQa.PaginationButtonPrevious).tagName).toBe(
                'BUTTON',
            );
            expect(screen.getByTestId(PaginationQa.PaginationButtonNext).tagName).toBe('BUTTON');
        });

        test('with component, navigation buttons render as the custom element', () => {
            render(
                <Pagination
                    pageSize={20}
                    total={100}
                    onUpdate={noop}
                    page={2}
                    component={CustomLink}
                />,
            );

            const first = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(first.tagName).toBe('A');
            expect(first).toHaveAttribute('data-custom-link', 'true');

            const prev = screen.getByTestId(PaginationQa.PaginationButtonPrevious);
            expect(prev.tagName).toBe('A');

            const next = screen.getByTestId(PaginationQa.PaginationButtonNext);
            expect(next.tagName).toBe('A');
        });

        test('with component, page buttons render as the custom element', () => {
            render(
                <Pagination
                    pageSize={20}
                    total={100}
                    onUpdate={noop}
                    page={2}
                    component={CustomLink}
                />,
            );

            const page2 = screen.getByTestId(getPaginationPageQa(2));
            expect(page2.tagName).toBe('A');
            expect(page2).toHaveAttribute('data-custom-link', 'true');
        });

        test('current page has aria-current="page" when rendered with component', () => {
            render(
                <Pagination
                    pageSize={20}
                    total={100}
                    onUpdate={noop}
                    page={2}
                    component={CustomLink}
                />,
            );

            const currentPage = screen.getByTestId(getPaginationPageQa(2));
            expect(currentPage).toHaveAttribute('aria-current', 'page');

            const otherPage = screen.getByTestId(getPaginationPageQa(1));
            expect(otherPage).not.toHaveAttribute('aria-current');
        });

        test('without component, page buttons keep aria-pressed and have no aria-current', () => {
            render(<Pagination pageSize={20} total={100} onUpdate={noop} page={2} />);

            const currentPage = screen.getByTestId(getPaginationPageQa(2));
            expect(currentPage).toHaveAttribute('aria-pressed', 'true');
            expect(currentPage).not.toHaveAttribute('aria-current');
        });

        test('simple page item remains a <div> even with component', () => {
            render(
                <MobileProvider mobile>
                    <Pagination
                        pageSize={20}
                        total={100}
                        onUpdate={noop}
                        page={2}
                        component={CustomLink}
                    />
                </MobileProvider>,
            );

            const currentPage = screen.getByTestId(getPaginationPageQa(2));
            expect(currentPage.tagName).toBe('DIV');
        });

        test('getItemProps provides extra props per clickable item', () => {
            const getItemProps: PaginationProps['getItemProps'] = (item) => {
                if (item.type === 'page') {
                    return {'data-target': `page-${item.page}`};
                }
                return {'data-target': `action-${item.action}`};
            };

            render(
                <Pagination
                    pageSize={20}
                    total={100}
                    onUpdate={noop}
                    page={2}
                    component={CustomLink}
                    getItemProps={getItemProps}
                />,
            );

            expect(screen.getByTestId(PaginationQa.PaginationButtonFirst)).toHaveAttribute(
                'data-target',
                'action-first',
            );
            expect(screen.getByTestId(PaginationQa.PaginationButtonPrevious)).toHaveAttribute(
                'data-target',
                'action-previous',
            );
            expect(screen.getByTestId(PaginationQa.PaginationButtonNext)).toHaveAttribute(
                'data-target',
                'action-next',
            );
            expect(screen.getByTestId(getPaginationPageQa(2))).toHaveAttribute(
                'data-target',
                'page-2',
            );
        });

        test('getItemProps without component is ignored', () => {
            const getItemProps = jest.fn(() => ({'data-ignored': 'true'}));

            render(
                <Pagination
                    pageSize={20}
                    total={100}
                    onUpdate={noop}
                    page={2}
                    getItemProps={getItemProps}
                />,
            );

            expect(screen.getByTestId(PaginationQa.PaginationButtonFirst).tagName).toBe('BUTTON');
            expect(screen.getByTestId(PaginationQa.PaginationButtonFirst)).not.toHaveAttribute(
                'data-ignored',
            );
            expect(getItemProps).not.toHaveBeenCalled();
        });

        test('Pagination-managed props win over getItemProps on conflict', async () => {
            const user = userEvent.setup();
            const onUpdate = jest.fn();
            const hijack = jest.fn();
            const getItemProps: PaginationProps['getItemProps'] = () => ({
                onClick: hijack,
                qa: 'hijacked',
                className: 'evil',
            });

            render(
                <Pagination
                    pageSize={20}
                    total={100}
                    onUpdate={onUpdate}
                    page={2}
                    component={CustomLink}
                    getItemProps={getItemProps}
                />,
            );

            expect(screen.queryByTestId('hijacked')).toBeNull();

            const firstButton = screen.getByTestId(PaginationQa.PaginationButtonFirst);
            expect(firstButton).not.toHaveClass('evil');

            await user.click(firstButton);
            expect(onUpdate).toHaveBeenCalledWith(1, 20);
            expect(hijack).not.toHaveBeenCalled();
        });

        test('clicking custom-rendered element triggers onUpdate', async () => {
            const user = userEvent.setup();
            const onUpdate = jest.fn();

            render(
                <Pagination
                    pageSize={20}
                    total={100}
                    onUpdate={onUpdate}
                    page={2}
                    component={CustomLink}
                />,
            );

            await user.click(screen.getByTestId(PaginationQa.PaginationButtonFirst));
            expect(onUpdate).toHaveBeenLastCalledWith(1, 20);

            await user.click(screen.getByTestId(getPaginationPageQa(3)));
            expect(onUpdate).toHaveBeenLastCalledWith(3, 20);
        });
    });
});
