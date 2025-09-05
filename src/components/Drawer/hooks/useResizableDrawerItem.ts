import * as React from 'react';

import type {DrawerDirection} from '..';
import {
    DRAWER_ITEM_INITIAL_RESIZE_WIDTH,
    DRAWER_ITEM_MAX_RESIZE_WIDTH,
    DRAWER_ITEM_MIN_RESIZE_WIDTH,
} from '../constants';

import type {OnResizeHandler} from './useResizeHandlers';
import {useResizeHandlers} from './useResizeHandlers';

export interface UseResizableDrawerItemParams {
    direction?: DrawerDirection;
    width?: number;
    minResizeWidth?: number;
    maxResizeWidth?: number;
    onResizeStart?: OnResizeHandler;
    onResizeEnd?: OnResizeHandler;
    onResize?: OnResizeHandler;
}

export function useResizableDrawerItem(params: UseResizableDrawerItemParams) {
    const {
        direction = 'left',
        width,
        minResizeWidth = DRAWER_ITEM_MIN_RESIZE_WIDTH,
        maxResizeWidth = DRAWER_ITEM_MAX_RESIZE_WIDTH,
        onResizeStart,
        onResizeEnd,
        onResize,
    } = params;

    const [isResizing, setIsResizing] = React.useState(false);
    const [resizeDelta, setResizeDelta] = React.useState(0);
    const [internalWidth, setInternalWidth] = React.useState(
        width ?? DRAWER_ITEM_INITIAL_RESIZE_WIDTH,
    );

    const getClampedWidth = React.useCallback(
        (curWidth: number) => Math.min(Math.max(curWidth, minResizeWidth), maxResizeWidth),
        [minResizeWidth, maxResizeWidth],
    );

    const getResizedWidth = React.useCallback(
        (delta: number) => {
            const signedDelta = ['right', 'bottom'].includes(direction) ? delta : -delta;
            const newWidth = (width ?? internalWidth) + signedDelta;
            return getClampedWidth(newWidth);
        },
        [width, internalWidth, direction, getClampedWidth],
    );

    const onStart = React.useCallback(() => {
        setIsResizing(true);
        setResizeDelta(0);
        onResizeStart?.(getResizedWidth(0));
    }, [onResizeStart, getResizedWidth]);

    const onMove = React.useCallback(
        (delta: number) => {
            setResizeDelta(delta);
            onResize?.(getResizedWidth(delta));
        },
        [getResizedWidth, onResize],
    );

    const onEnd = React.useCallback(
        (delta: number) => {
            const newWidth = getResizedWidth(delta);
            setIsResizing(false);
            setInternalWidth(newWidth);

            const prevWidth = width ?? internalWidth;
            if (newWidth !== prevWidth) {
                onResizeEnd?.(newWidth);
            }
        },
        [getResizedWidth, onResizeEnd, width, internalWidth],
    );

    const displayWidth = isResizing
        ? getResizedWidth(resizeDelta)
        : getClampedWidth(width ?? internalWidth);

    const {onPointerDown} = useResizeHandlers({
        onStart,
        onMove,
        onEnd,
        direction: ['left', 'right'].includes(direction) ? 'horizontal' : 'vertical',
    });

    return {
        resizedWidth: displayWidth,
        onResizerPointerDown: onPointerDown,
        isResizing,
    };
}
