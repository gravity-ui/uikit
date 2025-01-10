import type {BreadcrumbsItem} from './Breadcrumbs';

export type RenderBreadcrumbsItemContent<T extends BreadcrumbsItem> = (
    item: T,
    isCurrent: boolean,
    isPrevCurrent: boolean,
) => React.ReactNode;

export type RenderBreadcrumbsRootContent<T extends BreadcrumbsItem> = (
    item: T,
    isCurrent: boolean,
) => React.ReactNode;

export type RenderBreadcrumbsItemProps<T extends BreadcrumbsItem = BreadcrumbsItem> = {
    children: React.ReactNode;
    item: T;
    isCurrent: boolean;
    isPrevCurrent: boolean;
};

export type RenderBreadcrumbsItem<T extends BreadcrumbsItem> = (
    props: RenderBreadcrumbsItemProps<T>,
) => React.ReactNode;
