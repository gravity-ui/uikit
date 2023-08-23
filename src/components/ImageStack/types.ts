import type React from 'react';

export type ImageStackOverlapSize = 's' | 'm' | 'l';

export interface ImageStackProps<T extends object> {
    items: T[];

    renderItem(item: T, options: {itemClassName: string}): React.ReactNode;

    renderMore(items: T[]): React.ReactNode;

    /** Amount of items that should be visible */
    displayCount?: number;
    overlapSize?: ImageStackOverlapSize;
    className?: string;
}
