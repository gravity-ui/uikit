export type ActionName = 'previous' | 'next' | 'first';

export type PaginationSize = 'm' | 'l';

export type PaginationProps = {
    /**
     * Current page number.
     */
    page: number;
    /**
     * Number of data items per page.
     */
    pageSize: number;
    /**
     * Called when the page number or pageSize is changed.
     */
    onUpdate: (page: number, pageSize: number) => void;
    /**
     * Total number of data items.
     */
    total?: number;
    /**
     * Specify the sizeChanger options.
     */
    pageSizeOptions?: number[];
    /**
     * Hide first, previous, next buttons title.
     * Default true.
     */
    compact?: boolean;
    /**
     * Show input to navigate to pages directly.
     * Default false.
     */
    showInput?: boolean;
    /**
     * Show pages numeration.
     * Default true.
     */
    showPages?: boolean;
};

type EllipsisItem = {
    type: 'ellipsis';
};

type PageOfItem = {
    type: 'pageOf';
};

export type PageItem = {
    type: 'page';
    current: boolean;
    page: number;
    simple: boolean;
};

export type ButtonItem = {
    type: 'button';
    action: ActionName;
};

export type PaginationItem = EllipsisItem | PageOfItem | PageItem | ButtonItem;
