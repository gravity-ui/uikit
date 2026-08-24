import * as React from 'react';

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
export type OnResizeHandler = (size: number) => void;

export interface UseResizeHandlersParams {
    onStart: () => void;
    onMove: (delta: number) => void;
    onEnd: (delta: number, event: MouseEvent | TouchEvent) => void;
    arrangement?: 'horizontal' | 'vertical';
}

export function useResizeHandlers({
    onStart,
    onMove,
    onEnd,
    arrangement = 'horizontal',
}: UseResizeHandlersParams) {
    const startRef = React.useRef(0);

    const handleMove = React.useCallback(
        (evt: PointerEvent) => {
            const current = arrangement === 'horizontal' ? evt.clientX : evt.clientY;
            onMove(startRef.current - current);
        },
        [arrangement, onMove],
    );

    const handleUp = React.useCallback(
        (evt: PointerEvent) => {
            window.removeEventListener('pointermove', handleMove);
            onEnd(
                startRef.current - (arrangement === 'horizontal' ? evt.clientX : evt.clientY),
                evt,
            );
        },
        [arrangement, handleMove, onEnd],
    );

    const onPointerDown = React.useCallback(
        (e: React.PointerEvent) => {
            e.preventDefault();
            const axisPos = arrangement === 'horizontal' ? e.clientX : e.clientY;
            startRef.current = axisPos;
            onStart();

            window.addEventListener('pointermove', handleMove);
            window.addEventListener('pointerup', handleUp, {once: true});
        },
        [onStart, arrangement, handleMove, handleUp],
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
