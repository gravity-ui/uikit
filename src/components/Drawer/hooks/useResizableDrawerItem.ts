import * as React from 'react';

import type {DrawerPlacement} from '..';
import {DRAWER_ITEM_INITIAL_SIZE, DRAWER_ITEM_MAX_SIZE, DRAWER_ITEM_MIN_SIZE} from '../constants';

import type {OnResizeHandler} from './useResizeHandlers';
import {useResizeHandlers} from './useResizeHandlers';

export interface UseResizableDrawerItemParams {
    placement?: DrawerPlacement;
    size?: number;
    minSize?: number;
    maxSize?: number;
    onResizeStart?: OnResizeHandler;
    onResizeEnd?: OnResizeHandler;
    onResize?: OnResizeHandler;
}

export function useResizableDrawerItem(params: UseResizableDrawerItemParams) {
    const {
        placement = 'left',
        size,
        minSize = DRAWER_ITEM_MIN_SIZE,
        maxSize = DRAWER_ITEM_MAX_SIZE,
        onResizeStart,
        onResizeEnd,
        onResize,
    } = params;

    const [isResizing, setIsResizing] = React.useState(false);
    const [resizeDelta, setResizeDelta] = React.useState(0);
    const [internalSize, setInternalSize] = React.useState(size ?? DRAWER_ITEM_INITIAL_SIZE);

    const getClampedSize = React.useCallback(
        (curSize: number) => Math.min(Math.max(curSize, minSize), maxSize),
        [minSize, maxSize],
    );

    const getResizedSize = React.useCallback(
        (delta: number) => {
            const signedDelta = ['right', 'bottom'].includes(placement) ? delta : -delta;
            const newSize = (size ?? internalSize) + signedDelta;
            return getClampedSize(newSize);
        },
        [size, internalSize, placement, getClampedSize],
    );

    const onStart = React.useCallback(() => {
        setIsResizing(true);
        setResizeDelta(0);
        onResizeStart?.(getResizedSize(0));
    }, [onResizeStart, getResizedSize]);

    const onMove = React.useCallback(
        (delta: number) => {
            setResizeDelta(delta);
            onResize?.(getResizedSize(delta));
        },
        [getResizedSize, onResize],
    );

    const onEnd = React.useCallback(
        (delta: number) => {
            const newSize = getResizedSize(delta);
            setIsResizing(false);
            setInternalSize(newSize);

            const prevSize = size ?? internalSize;
            if (newSize !== prevSize) {
                onResizeEnd?.(newSize);
            }
        },
        [getResizedSize, onResizeEnd, size, internalSize],
    );

    const displaySize = isResizing
        ? getResizedSize(resizeDelta)
        : getClampedSize(size ?? internalSize);

    const {onPointerDown: onResizerPointerDown} = useResizeHandlers({
        onStart,
        onMove,
        onEnd,
        arrangement: ['left', 'right'].includes(placement) ? 'horizontal' : 'vertical',
    });

    return {
        resizedSize: displaySize,
        onResizerPointerDown,
    };
}
