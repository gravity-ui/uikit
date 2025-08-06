import * as React from 'react';

export const DRAWER_ITEM_MIN_RESIZE_WIDTH = 200;
export const DRAWER_ITEM_MAX_RESIZE_WIDTH = 800;
export const DRAWER_ITEM_INITIAL_RESIZE_WIDTH = 400;

export type DrawerDirection = 'right' | 'left' | 'top' | 'bottom';
export type OnResizeHandler = (width: number) => void;

export interface UseResizeHandlersParams {
    onStart: () => void;
    onMove: (delta: number) => void;
    onEnd: (delta: number, event: MouseEvent | TouchEvent) => void;
    direction?: 'horizontal' | 'vertical';
}

export function useResizeHandlers({
    onStart,
    onMove,
    onEnd,
    direction = 'horizontal',
}: UseResizeHandlersParams) {
    const startRef = React.useRef(0);

    const handleMove = React.useCallback(
        (evt: PointerEvent) => {
            const current = direction === 'horizontal' ? evt.clientX : evt.clientY;
            onMove(startRef.current - current);
        },
        [direction, onMove],
    );

    const handleUp = React.useCallback(
        (evt: PointerEvent) => {
            window.removeEventListener('pointermove', handleMove);
            onEnd(startRef.current - (direction === 'horizontal' ? evt.clientX : evt.clientY), evt);
        },
        [direction, handleMove, onEnd],
    );

    const onPointerDown = React.useCallback(
        (e: React.PointerEvent) => {
            e.preventDefault();
            const axisPos = direction === 'horizontal' ? e.clientX : e.clientY;
            startRef.current = axisPos;
            onStart();

            window.addEventListener('pointermove', handleMove);
            window.addEventListener('pointerup', handleUp, {once: true});
        },
        [onStart, direction, handleMove, handleUp],
    );

    React.useEffect(() => {
        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerup', handleUp);
        };
    }, [handleMove, handleUp]);

    return {
        onPointerDown,
    };
}

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
