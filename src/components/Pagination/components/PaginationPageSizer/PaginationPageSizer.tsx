'use client';

import {Select} from '../../../Select';
import type {SelectOption} from '../../../Select';
import {PaginationQa, getPaginationPageSizeOptionQa} from '../../constants';
import i18n from '../../i18n';
import type {PaginationProps, PaginationSize} from '../../types';
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
    const options = pageSizeOptions.map(
        (pageSizeOption): SelectOption => ({
            value: String(pageSizeOption),
            content: pageSizeOption,
            qa: getPaginationPageSizeOptionQa(pageSizeOption),
        }),
    );

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

    const {t} = i18n.useTranslation();

    return (
        <Select
            qa={PaginationQa.PaginationPageSizer}
            className={className}
            size={size}
            onUpdate={handleUpdate}
            options={options}
            value={[String(pageSize)]}
            title={t('label_select_size')}
        />
    );
};
