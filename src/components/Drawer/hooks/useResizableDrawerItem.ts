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
    overlayRef: React.RefObject<HTMLElement>;
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
        overlayRef,
    } = params;

    const isHorizontal = ['left', 'right'].includes(placement);
    const getOverlayMaxSize = React.useCallback(() => {
        return isHorizontal
            ? (overlayRef.current?.clientWidth ?? 0)
            : (overlayRef.current?.clientHeight ?? 0);
    }, [isHorizontal, overlayRef]);

    const [isResizing, setIsResizing] = React.useState(false);
    const [resizeDelta, setResizeDelta] = React.useState(0);
    const [internalSize, setInternalSize] = React.useState(size ?? DRAWER_ITEM_INITIAL_SIZE);

    // Sync internalSize with size prop when it changes
    React.useEffect(() => {
        if (size !== undefined && !isResizing) {
            setInternalSize(size);
        }
    }, [size, isResizing]);

    const getClampedSize = React.useCallback(
        (curSize: number) => Math.min(Math.max(curSize, minSize), maxSize),
        [minSize, maxSize],
    );

    const getResizedSize = React.useCallback(
        (delta: number) => {
            const signedDelta = ['right', 'bottom'].includes(placement) ? delta : -delta;
            const overlaySize = getOverlayMaxSize();
            const newSize = Math.min(internalSize + signedDelta, overlaySize);
            return getClampedSize(newSize);
        },
        [internalSize, placement, getClampedSize, getOverlayMaxSize],
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

            onResizeEnd?.(newSize);
        },
        [getResizedSize, onResizeEnd],
    );

    const displaySize = isResizing
        ? getResizedSize(resizeDelta)
        : getClampedSize(size ?? internalSize);

    const {onPointerDown: onResizerPointerDown} = useResizeHandlers({
        onStart,
        onMove,
        onEnd,
        arrangement: isHorizontal ? 'horizontal' : 'vertical',
    });

    const handleCommonResize = React.useCallback(() => {
        const overlaySize = getOverlayMaxSize();

        if (overlaySize >= internalSize) {
            return;
        }

        setInternalSize(Math.max(minSize, overlaySize));
        onResize?.(overlaySize);
        onResizeEnd?.(overlaySize);
    }, [getOverlayMaxSize, minSize, internalSize, onResize, onResizeEnd]);

    React.useEffect(() => {
        window.addEventListener('resize', handleCommonResize);

        return () => {
            window.removeEventListener('resize', handleCommonResize);
        };
    }, [handleCommonResize]);

    return {
        currentSize: displaySize,
        onResizerPointerDown,
    };
}
