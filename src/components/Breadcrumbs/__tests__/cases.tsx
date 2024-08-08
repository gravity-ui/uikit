import React from 'react';

import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {BreadcrumbsProps} from '../Breadcrumbs';
import {FirstDisplayedItemsCount, LastDisplayedItemsCount} from '../Breadcrumbs';
import type {RenderBreadcrumbsItemProps} from '../types';

export interface TestBreadcrumbsItem {
    text: string;
    items?: TestBreadcrumbsItem[];
    title?: string;
    action: () => void;
}

type Props = BreadcrumbsProps<TestBreadcrumbsItem>;

export const defaultProps: Props = {
    items: [],
    lastDisplayedItemsCount: LastDisplayedItemsCount.One,
    firstDisplayedItemsCount: FirstDisplayedItemsCount.Zero,
};

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

export const renderRootContentCases: CasesWithName<Props['renderRootContent']> = [
    [
        'custom-root-content',
        (item, isCurrent) => {
            return (
                <div style={isCurrent ? undefined : {border: '1px dotted tomato'}}>
                    ${item.text} [Custom]
                </div>
            );
        },
    ],
];

export const renderItemContentCases: CasesWithName<Props['renderItemContent']> = [
    [
        'custom-item-content',
        (item, isCurrent) => {
            return (
                <div style={isCurrent ? undefined : {border: '1px dotted tomato'}}>
                    ${item.text} [Custom]
                </div>
            );
        },
    ],
];

export const renderItemDividerCases: CasesWithName<Props['renderItemDivider']> = [
    [
        'custom-item-divider',
        () => {
            return <div style={{border: '1px dotted tomato'}}>[Divider]</div>;
        },
    ],
];

const Container = ({children, isCurrent}: RenderBreadcrumbsItemProps) => {
    return <div style={isCurrent ? undefined : {border: '1px dotted tomato'}}>{children}</div>;
};

export const renderItemCases: CasesWithName<Props['renderItem']> = [
    ['custom-item-render', Container],
];
