import type React from 'react';

export type OverlapSize = 's' | 'm' | 'l';

export interface Props<T extends {pk: string}> {
    items: T[];

    renderItem(item: T, options: {itemClassName: string}): React.ReactNode;

    renderMore(items: T[]): React.ReactNode;

    /** Amount of items that should be visible */
    displayCount?: number;
    overlapSize?: OverlapSize;
    className?: string;
}
