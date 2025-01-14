import * as React from 'react';

import {Pagination} from '../Pagination';
import type {PaginationProps} from '../types';

type PageOptions = {
    page: PaginationProps['page'];
    pageSize: PaginationProps['pageSize'];
};

const usePaginationState = (initPageOptions: PageOptions) => {
    const [pageOptions, setPageOptions] = React.useState<PageOptions>(initPageOptions);

    const onUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
        setPageOptions({
            page,
            pageSize,
        });
    };

    return {...pageOptions, onUpdate};
};

export const PaginationStateWrap = (props: Omit<PaginationProps, 'onUpdate'>) => {
    const {page, pageSize, onUpdate} = usePaginationState({
        page: props.page,
        pageSize: props.pageSize,
    });

    return <Pagination {...props} page={page} pageSize={pageSize} onUpdate={onUpdate} />;
};
