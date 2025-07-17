import * as React from 'react';

export const DRAWER_ITEM_MIN_RESIZE_WIDTH = 200;
export const DRAWER_ITEM_MAX_RESIZE_WIDTH = 800;
export const DRAWER_ITEM_INITIAL_RESIZE_WIDTH = 400;

export type DrawerDirection = 'right' | 'left' | 'top' | 'bottom';
export type OnResizeHandler = (width: number, event: MouseEvent | TouchEvent) => void;
export type OnResizeContinueHandler = (width: number) => void;

export function useScrollLock(enabled: boolean) {
    React.useEffect(() => {
        if (!enabled) return;

        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [enabled]);
}

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

    const onPointerDown = React.useCallback(
        (e: React.PointerEvent) => {
            e.preventDefault();
            const axisPos = direction === 'horizontal' ? e.clientX : e.clientY;
            startRef.current = axisPos;
            onStart();

            const handleMove = (evt: PointerEvent) => {
                const current = direction === 'horizontal' ? evt.clientX : evt.clientY;
                onMove(startRef.current - current);
            };

            const handleUp = (evt: PointerEvent) => {
                window.removeEventListener('pointermove', handleMove);
                onEnd(
                    startRef.current - (direction === 'horizontal' ? evt.clientX : evt.clientY),
                    evt,
                );
            };

            window.addEventListener('pointermove', handleMove);
            window.addEventListener('pointerup', handleUp, {once: true});
        },
        [onStart, onMove, onEnd, direction],
    );

    return {
        onPointerDown,
    };
}

export interface UseResizableDrawerItemParams {
    direction?: DrawerDirection;
    width?: number;
    minResizeWidth?: number;
    maxResizeWidth?: number;
    onResizeStart?: VoidFunction;
    onResize?: OnResizeHandler;
    onResizeContinue?: OnResizeContinueHandler;
}

export function useResizableDrawerItem(params: UseResizableDrawerItemParams) {
    const {
        direction = 'left',
        width,
        minResizeWidth = DRAWER_ITEM_MIN_RESIZE_WIDTH,
        maxResizeWidth = DRAWER_ITEM_MAX_RESIZE_WIDTH,
        onResizeStart,
        onResize,
        onResizeContinue,
    } = params;

    const [isResizing, setIsResizing] = React.useState(false);
    const [resizeDelta, setResizeDelta] = React.useState(0);
    const [internalWidth, setInternalWidth] = React.useState(
        width ?? DRAWER_ITEM_INITIAL_RESIZE_WIDTH,
    );

    const getClampedWidth = React.useCallback(
        (width: number) => Math.min(Math.max(width, minResizeWidth), maxResizeWidth),
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
        onResizeStart?.();
    }, [onResizeStart]);

    const onMove = React.useCallback(
        (delta: number) => {
            setResizeDelta(delta);
            onResizeContinue?.(getResizedWidth(delta));
        },
        [getResizedWidth, onResizeContinue],
    );

    const onEnd = React.useCallback(
        (delta: number, event: MouseEvent | TouchEvent) => {
            const newWidth = getResizedWidth(delta);
            setIsResizing(false);
            setInternalWidth(newWidth);

            const prevWidth = width ?? internalWidth;
            if (newWidth !== prevWidth) {
                onResize?.(newWidth, event);
            }
        },
        [getResizedWidth, onResize, width, internalWidth],
    );

    const displayWidth = isResizing
        ? getResizedWidth(resizeDelta)
        : getClampedWidth(width ?? internalWidth);

    const handlers = useResizeHandlers({
        onStart,
        onMove,
        onEnd,
        direction: ['left', 'right'].includes(direction) ? 'horizontal' : 'vertical',
    });

    return {resizedWidth: displayWidth, resizerHandlers: handlers, isResizing};
}
