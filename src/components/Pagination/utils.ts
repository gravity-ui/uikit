import type * as React from 'react';

import uniq from 'lodash/uniq';

import type {ButtonView} from '../Button';
import type {InputControlView} from '../controls';
import {warnOnce} from '../utils/warn';

import type {
    ButtonItem,
    GetPaginationItemProps,
    PageItem,
    PaginationComponent,
    PaginationSize,
    PaginationView,
} from './types';

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

export function getViews({propView, mobile}: {propView: PaginationView; mobile: boolean}): {
    buttonView: ButtonView;
    inputView: InputControlView;
    pageSizerView: InputControlView;
} {
    const buttonView = propView === 'clear' ? 'flat' : 'outlined';
    const inputView = mobile && propView === 'clear' ? 'clear' : 'normal';
    const pageSizerView = propView === 'outlined' ? 'normal' : 'clear';

    return {buttonView, inputView, pageSizerView};
}

const PAGINATION_MANAGED_PROPS = new Set([
    'onClick',
    'className',
    'size',
    'view',
    'selected',
    'disabled',
    'qa',
    'aria-current',
    'extraProps',
    'children',
]);

export function buildComponentProps(
    component: PaginationComponent,
    item: PageItem | ButtonItem,
    getItemProps?: GetPaginationItemProps,
): Record<string, unknown> {
    if (!component || (item.type === 'button' && item.disabled)) {
        return {};
    }

    const userProps = getItemProps?.(item);
    const filtered: Record<string, unknown> = {};
    if (userProps) {
        for (const key of Object.keys(userProps)) {
            if (!PAGINATION_MANAGED_PROPS.has(key)) {
                filtered[key] = userProps[key];
            }
        }
    }

    // `Button` renders a native anchor when it receives an `href`
    if (component === 'a') {
        if (filtered.href === undefined) {
            warnOnce(
                '[Pagination] `component="a"` requires an `href` returned from `getItemProps` for every clickable item, otherwise the item falls back to a native `<button>`.',
            );
        }
        return filtered;
    }
    return {component, ...filtered};
}

// Only plain current-tab clicks should update pagination state.
export function shouldUpdateOnPaginationItemClick(
    event: React.MouseEvent<HTMLElement>,
    hasComponent: boolean,
) {
    if (!hasComponent) {
        return true;
    }

    const target = event.currentTarget.getAttribute('target');

    return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        (!target || target === '_self')
    );
}
