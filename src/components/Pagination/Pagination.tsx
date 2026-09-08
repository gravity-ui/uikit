'use client';

import {useMobile} from '../mobile';
import {useDefaultProps} from '../theme/useDefaultProps';
import {block} from '../utils/cn';

import {
    PaginationButton,
    PaginationEllipsis,
    PaginationInput,
    PaginationPage,
    PaginationPageOf,
    PaginationPageSizer,
} from './components';
import {usePagination} from './hooks/usePagination';
import type {PaginationProps} from './types';
import {getResultPage, getResultTotal, getSize, getViews} from './utils';

import './Pagination.scss';

const b = block('pagination');

export const Pagination = (rawProps: PaginationProps) => {
    const {
        page,
        pageSize,
        total,
        size: propSize,
        onUpdate,
        compact: propCompact = true,
        pageSizeOptions,
        showPages = true,
        showInput = false,
        view: propView = 'outlined',
        className,
        qa,
        pageComponent,
        getPageProps,
    } = useDefaultProps('Pagination', rawProps);
    const mobile = useMobile();

    const size = getSize({propSize, mobile});
    const compact = mobile ? true : propCompact;

    const resultTotal = getResultTotal(total);
    const resultPage = getResultPage({
        page,
        total: resultTotal,
        pageSize,
    });

    const {buttonView, inputView, pageSizerView} = getViews({propView, mobile});

    const {items, numberOfPages} = usePagination({
        page: resultPage,
        pageSize,
        total: resultTotal,
        mobile,
    });

    const pagination = items
        .map((item) => {
            switch (item.type) {
                case 'page':
                    return (
                        showPages && (
                            <PaginationPage
                                key={item.key}
                                size={size}
                                pageSize={pageSize}
                                item={item}
                                onUpdate={onUpdate}
                                className={b('pagination-item')}
                                pageComponent={pageComponent}
                                getPageProps={getPageProps}
                            />
                        )
                    );
                case 'ellipsis':
                    return (
                        showPages && (
                            <PaginationEllipsis
                                key={item.type}
                                size={size}
                                className={b('pagination-item')}
                            />
                        )
                    );
                case 'pageOf':
                    return (
                        showPages && (
                            <PaginationPageOf
                                key={item.type}
                                className={b('pagination-item')}
                                size={size}
                            />
                        )
                    );
                case 'button':
                    return (
                        <PaginationButton
                            key={item.action}
                            size={size}
                            item={item}
                            page={resultPage}
                            pageSize={pageSize}
                            onUpdate={onUpdate}
                            compact={compact}
                            className={b('pagination-item')}
                            view={buttonView}
                            pageComponent={pageComponent}
                            getPageProps={getPageProps}
                        />
                    );
                default:
                    return null;
            }
        })
        .filter(Boolean);

    return (
        <div className={b(null, className)} data-qa={qa}>
            {pagination}
            {showInput && (
                <PaginationInput
                    numberOfPages={numberOfPages}
                    pageSize={pageSize}
                    size={size}
                    onUpdate={onUpdate}
                    className={b('input')}
                    view={inputView}
                />
            )}
            {pageSizeOptions && (
                <PaginationPageSizer
                    onUpdate={onUpdate}
                    page={resultPage}
                    pageSize={pageSize}
                    pageSizeOptions={pageSizeOptions}
                    size={size}
                    total={resultTotal}
                    className={b('page-sizer')}
                    view={pageSizerView}
                />
            )}
        </div>
    );
};
