import {getNumerationList, getNumberOfPages} from '../utils';
import {PaginationProps, PaginationItem} from '../types';

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
    const showFirstButtonAfter = 2;

    const numberOfPages = getNumberOfPages(pageSize, total);
    const hasTotal = numberOfPages !== 0;

    let items: PaginationItem[];

    if (hasTotal) {
        const numerationList = getNumerationList({page, numberOfPages, mobile});

        items = numerationList.map((item) => {
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
            };
        });
    } else {
        items = [{type: 'page', current: true, page, simple: true}];
    }

    if (page > 1) {
        items.unshift({
            type: 'button',
            action: 'previous',
        });
    }

    if (page > showFirstButtonAfter) {
        items.unshift({
            type: 'button',
            action: 'first',
        });
    }

    if (!hasTotal || page !== numberOfPages) {
        items.push({
            type: 'button',
            action: 'next',
        });
    }

    return {items, numberOfPages};
}
