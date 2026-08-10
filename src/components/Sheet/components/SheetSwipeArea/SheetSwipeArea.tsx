'use client';

import {block} from '../../../utils/cn';
import type {SwipeAreaHandlers} from '../../hooks/useSwipe';

import './SheetSwipeArea.scss';

const b = block('sheet-swipe-area');

export interface SheetSwipeAreaProps extends SwipeAreaHandlers {
    className?: string;
}

export function SheetSwipeArea({
    className,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
}: SheetSwipeAreaProps) {
    return (
        <div
            className={b({}, className)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        />
    );
}
