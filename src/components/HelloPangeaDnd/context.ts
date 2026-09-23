'use client';
import * as React from 'react';

import type {ListItemViewProps} from '../ListItemView';

/** What the clone of a dragged row needs from its Row: the row itself may be unmounted */
export interface HelloPangeaRowSnapshot {
    viewProps: Omit<ListItemViewProps, 'children'>;
    children: React.ReactNode;
    handleLabel?: string;
    handlePlacement: 'start' | 'end';
}

export interface HelloPangeaRowRegistry {
    set(id: string, snapshot: HelloPangeaRowSnapshot): void;
    /** A row unmounted during a drag keeps its snapshot until the drop */
    release(id: string): void;
    get(id: string): HelloPangeaRowSnapshot | undefined;
}

/** Internal: ListHelloPangeaDnd → its Rows */
export interface HelloPangeaKitContextValue {
    /** The index of Draggable: the position in `items`, section headers are not counted */
    getIndex(id: string): number | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isDragDisabled?: (item: any) => boolean;
    registry: HelloPangeaRowRegistry;
}

export const HelloPangeaKitContext = React.createContext<HelloPangeaKitContextValue | null>(null);
