import React from 'react';
import {Select} from '../../../Select';
import {PaginationSize, PaginationProps} from '../../types';
import {getNumberOfPages} from '../../utils';

type Props = {
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    page: NonNullable<PaginationProps['page']>;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    pageSizeOptions: NonNullable<PaginationProps['pageSizeOptions']>;
    total: PaginationProps['total'];
    size: PaginationSize;
    className?: string;
};

export const PaginationPageSizer = ({
    onUpdate,
    pageSize,
    size,
    page,
    pageSizeOptions,
    total,
    className,
}: Props) => {
    const options = pageSizeOptions.map((pageSizeOption) => ({
        value: String(pageSizeOption),
        content: pageSizeOption,
    }));

    const handleUpdate = ([newPageSizeOnUpdate]: string[]) => {
        const newPageSize = Number(newPageSizeOnUpdate);
        const numberOfPages = getNumberOfPages(newPageSize, total);

        const hasUpperLimit = numberOfPages > 0;

        if (!hasUpperLimit) {
            onUpdate(1, newPageSize);
            return;
        }

        const newPage = page > numberOfPages ? numberOfPages : page;

        onUpdate(newPage, newPageSize);
    };

    return (
        <Select
            className={className}
            size={size}
            onUpdate={handleUpdate}
            options={options}
            value={[String(pageSize)]}
        />
    );
};
