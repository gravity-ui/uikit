import type {Cases} from '../../../stories/tests-factory/models';
import type {BreadcrumbsProps} from '../Breadcrumbs';
import {FirstDisplayedItemsCount, LastDisplayedItemsCount} from '../Breadcrumbs';

export interface TestBreadcrumbsItem {
    text: string;
    items?: TestBreadcrumbsItem[];
    title?: string;
    action: () => void;
}

export type Props = BreadcrumbsProps<TestBreadcrumbsItem>;

export const lastDisplayedItemsCountCases: Cases<Props['lastDisplayedItemsCount']> = [
    LastDisplayedItemsCount.One,
    LastDisplayedItemsCount.Two,
];

export const firstDisplayedItemsCountCases: Cases<Props['firstDisplayedItemsCount']> = [
    FirstDisplayedItemsCount.Zero,
    FirstDisplayedItemsCount.One,
];

export const popupStyleCases: Cases<Props['popupStyle']> = ['staircase'];

export const popupPlacementCases: Cases<Props['popupPlacement']> = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
];
