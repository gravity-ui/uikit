'use client';

import * as React from 'react';

import {block} from '../../../utils/cn';
import type {ContentAreaHandlers} from '../../hooks/useContentScroll';

import './SheetContentArea.scss';

const b = block('sheet-content-area');

export interface SheetContentAreaProps extends ContentAreaHandlers {
    /** Ref to the scrollable container (owned by the parent for resize logic). */
    scrollContainerRef: React.Ref<HTMLDivElement>;
    /** Ref to the margin box (owned by the parent for the ResizeObserver). */
    marginBoxRef: React.Ref<HTMLDivElement>;
    /** Content to render inside the sheet. */
    children: React.ReactNode;
    /** Class name for the content element. */
    contentClassName?: string;
    /** Title of the sheet window. */
    title?: string;
    /** Disables scrolling of the content while a gesture is active. */
    withoutScroll?: boolean;
    /** Forces the content to always take the full available height. */
    alwaysFullHeight?: boolean;
}

export function SheetContentArea({
    scrollContainerRef,
    marginBoxRef,
    children,
    contentClassName,
    title,
    withoutScroll,
    alwaysFullHeight,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTransitionEnd,
}: SheetContentAreaProps) {
    return (
        <div
            ref={scrollContainerRef}
            className={b({'without-scroll': withoutScroll})}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTransitionEnd={onTransitionEnd}
        >
            <div
                ref={marginBoxRef}
                className={b('margin-box', {'always-full-height': alwaysFullHeight})}
            >
                <div className={b('margin-box-border-compensation')}>
                    <div className={b('content', null, contentClassName)}>
                        {title && <div className={b('content-title')}>{title}</div>}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
