import React from 'react';

import {useMobile} from '../mobile';
import {blockNew} from '../utils/cn';

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

import './Pagination.scss';

const b = blockNew('pagination');

export const Pagination = ({
    page,
    pageSize,
    total,
    onUpdate,
    compact: propCompact = true,
    pageSizeOptions,
    showPages = true,
    showInput = false,
    className,
    qa,
}: PaginationProps) => {
    const [mobile] = useMobile();

    const size = mobile ? 'l' : 'm';
    const compact = mobile ? true : propCompact;

    const {items, numberOfPages} = usePagination({page, pageSize, total, mobile});

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
                            page={page}
                            pageSize={pageSize}
                            onUpdate={onUpdate}
                            compact={compact}
                            className={b('pagination-item')}
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
                />
            )}
            {pageSizeOptions && (
                <PaginationPageSizer
                    onUpdate={onUpdate}
                    page={page}
                    pageSize={pageSize}
                    pageSizeOptions={pageSizeOptions}
                    size={size}
                    total={total}
                    className={b('page-sizer')}
                />
            )}
        </div>
    );
};
