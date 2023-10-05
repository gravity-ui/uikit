import React from 'react';

import {useAsyncList} from '@react-stately/data';
import range from 'lodash/range';

import {Select} from '../Select';
import type {SelectOption} from '../types';

const generateItems = (limit: number, pageNumber = 0): SelectOption[] => {
    const offset = pageNumber * limit;
    return range(0, limit).map((i) => ({
        value: `val${i + offset + 1}`,
        content: `Value ${i + offset + 1}`,
    }));
};
type FetchExample = (pageNumber: number) => Promise<{
    response: SelectOption[];
    pageNumber: number | undefined;
}>;

const fetchExample: FetchExample = (pageNumber = 0) => {
    const nextPagination = pageNumber <= 0 ? pageNumber + 1 : undefined;
    const resp = {
        response: generateItems(100, pageNumber),
        pageNumber: nextPagination,
    };

    return new Promise((res) => {
        setTimeout(() => {
            res(resp);
        }, 1000);
    });
};

export const SelectAsyncShowcase = (args: any) => {
    const {items, isLoading, loadMore} = useAsyncList<SelectOption, number | null>({
        async load({cursor}) {
            console.log('!!', cursor);
            // If no cursor is available, then we're loading the first page.
            // Otherwise, the cursor is the next URL to load, as returned from the previous page.
            if (cursor === undefined) return {items: [], cursor};
            const {response, pageNumber} = await fetchExample(cursor ? cursor : 0);
            console.log('>>', pageNumber);
            return {
                items: response,
                cursor: pageNumber,
            };
        },
    });

    return <Select {...args} options={items} loading={true} onLoadMore={loadMore} />;
};
