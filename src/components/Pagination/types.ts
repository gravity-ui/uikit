import type {ButtonCustomElementType} from '../Button';
import type {QAProps} from '../types';

export type ActionName = 'previous' | 'next' | 'first';

export type PaginationSize = 's' | 'm' | 'l' | 'xl';
export type PaginationView = 'outlined' | 'clear';

export type GetPaginationItemProps = (item: PageItem | ButtonItem) => Record<string, unknown>;

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
     * Size of the pagination items.
     */
    size?: PaginationSize;
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
    /**
     * ClassName of element
     */
    className?: string;
    /**
     * Sets buttons' and controls' appearance.
     * Affects pagination input's view in mobile.
     * Default outlined.
     */
    view?: PaginationView;
    /**
     * Overrides the root element for clickable pagination items
     * (navigation buttons and page buttons). Useful for router-aware links
     * such as `Link` from `react-router-dom` or `next/link`.
     *
     * Has no effect on ellipsis, "page of" indicator, simple page items,
     * the input, or the page-size selector.
     */
    component?: ButtonCustomElementType;
    /**
     * Returns extra props per clickable item (e.g. `to` for a router `Link`).
     * Only applied when `component` is set; ignored otherwise.
     *
     * Pagination-managed keys are stripped from the returned object and
     * cannot be overridden: `onClick`, `className`, `size`, `view`,
     * `selected`, `disabled`, `qa`, `aria-current`, `extraProps`, `children`.
     */
    getItemProps?: GetPaginationItemProps;
} & QAProps;

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
    key: number;
};

export type ButtonItem = {
    type: 'button';
    action: ActionName;
    disabled: boolean;
};

export type PaginationItem = EllipsisItem | PageOfItem | PageItem | ButtonItem;
