import uniq from 'lodash/uniq';

import type {PaginationSize} from './types';

export function getNumerationList({
    page,
    numberOfPages,
    mobile,
}: {
    page: number;
    numberOfPages: number;
    mobile: boolean;
}) {
    return mobile
        ? getMobileNumerationList(page, numberOfPages)
        : getDesktopNumerationList(page, numberOfPages);
}

function getMobileNumerationList(page: number, numberOfPages: number) {
    const list: Array<number | 'pageOf'> = [page, 'pageOf', numberOfPages];
    return list;
}

function getDesktopNumerationList(page: number, numberOfPages: number) {
    const prevPage = Math.max(page - 1, 1);
    let rightPage = Math.min(page + 1, numberOfPages);

    const list: Array<number | 'ellipsis'> = [prevPage, page, rightPage];

    if (page === 1) {
        rightPage = Math.min(rightPage + 1, numberOfPages);
        list.push(rightPage);
    }

    if (numberOfPages - rightPage >= 2) {
        list.push('ellipsis');
    }

    if (numberOfPages - page === 1) {
        list.unshift(Math.max(page - 2, 1));
    }

    if (page === numberOfPages) {
        list.unshift(Math.max(page - 2, 1));
        list.unshift(Math.max(page - 3, 1));
    }

    list.push(numberOfPages);

    return uniq(list);
}

export function getNumberOfPages(pageSize: number, total = 0) {
    return Math.floor((total - 1) / pageSize) + 1;
}

export function getResultTotal(total: number | undefined) {
    return total === undefined || total > 0 ? total : 1;
}

export function getSize({
    propSize,
    mobile,
}: {
    propSize?: PaginationSize;
    mobile: boolean;
}): PaginationSize {
    if (propSize) {
        return propSize;
    }

    return mobile ? 'l' : 'm';
}

export function getResultPage({
    page,
    total,
    pageSize,
}: {
    page: number;
    total: number | undefined;
    pageSize: number;
}) {
    return page > 0 && (total === undefined || page <= getNumberOfPages(pageSize, total))
        ? page
        : 1;
}
