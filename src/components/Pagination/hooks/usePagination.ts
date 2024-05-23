import type {PaginationItem, PaginationProps} from '../types';
import {getNumberOfPages, getNumerationList} from '../utils';

type UsePaginationArgs = Pick<PaginationProps, 'page' | 'pageSize' | 'total'> & {
    mobile: boolean;
};

type UsePaginationReturn = {
    items: PaginationItem[];
    numberOfPages: number;
};

export function usePagination({
    page,
    pageSize,
    total,
    mobile,
}: UsePaginationArgs): UsePaginationReturn {
    const numberOfPages = getNumberOfPages(pageSize, total);
    const hasTotal = numberOfPages !== 0;
    const isNextDisabled = (hasTotal && page === numberOfPages) || total === 0;

    let items: PaginationItem[];

    if (hasTotal) {
        const numerationList = getNumerationList({page, numberOfPages, mobile});

        items = numerationList.map((item, index) => {
            if (item === 'ellipsis') {
                return {type: 'ellipsis'};
            }
            if (item === 'pageOf') {
                return {type: 'pageOf'};
            }
            const current = item === page;
            return {
                type: 'page',
                current,
                page: item,
                simple: mobile ? current : false,
                key: mobile ? item + index : item,
            };
        });
    } else {
        items = [{type: 'page', current: true, page, simple: true, key: page}];
    }

    items.unshift({
        type: 'button',
        action: 'previous',
        disabled: page <= 1,
    });

    items.unshift({
        type: 'button',
        action: 'first',
        disabled: page <= 1,
    });

    items.push({
        type: 'button',
        action: 'next',
        disabled: isNextDisabled,
    });

    return {items, numberOfPages};
}
