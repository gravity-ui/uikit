import * as React from 'react';

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
