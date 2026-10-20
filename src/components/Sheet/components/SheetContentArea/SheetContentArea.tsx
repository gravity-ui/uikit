'use client';

import * as React from 'react';

import {useForkRef} from '../../../../hooks/useForkRef';
import {useLayoutEffect} from '../../../../hooks/useLayoutEffect';
import {block} from '../../../utils/cn';
import {SheetQa} from '../../constants';
import type {ContentAreaHandlers} from '../../hooks/useContentScroll';

import './SheetContentArea.scss';

const b = block('sheet-content-area');

export interface SheetContentAreaProps extends ContentAreaHandlers {
    onTouchCancel: React.TouchEventHandler<HTMLDivElement>;
    /** Ref to the scrollable container (owned by the parent for resize logic). */
    scrollContainerRef: React.Ref<HTMLDivElement>;
    /** Ref to the margin box (owned by the parent for the ResizeObserver). */
    marginBoxRef: React.Ref<HTMLDivElement>;
    /** Content to render inside the sheet. */
    children: React.ReactNode;
    /** Class name for the content element. */
    contentClassName?: string;
    /** Title of the sheet window. */
    title?: React.ReactNode;
    /** ID used to label the dialog with a custom title. */
    titleId?: string;
    /** Keeps the title visible while the main content scrolls. */
    stickyTitle?: boolean;
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
    titleId,
    stickyTitle,
    withoutScroll,
    alwaysFullHeight,
    onTouchCancel,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTransitionEnd,
}: SheetContentAreaProps) {
    const hasTitle =
        title !== undefined && title !== null && typeof title !== 'boolean' && title !== '';
    const isTextTitle = typeof title === 'string' || typeof title === 'number';
    const localScrollContainerRef = React.useRef<HTMLDivElement>(null);
    const titleRef = React.useRef<HTMLDivElement>(null);
    const handleScrollContainerRef = useForkRef(localScrollContainerRef, scrollContainerRef);
    const [measuredStickyTitleHeight, setStickyTitleHeight] = React.useState(0);
    const shouldMeasureTitle = stickyTitle && hasTitle;
    const stickyTitleHeight = shouldMeasureTitle ? measuredStickyTitleHeight : 0;

    useLayoutEffect(() => {
        if (!shouldMeasureTitle) {
            return undefined;
        }

        const scrollContainer = localScrollContainerRef.current;
        const titleElement = titleRef.current;
        if (!scrollContainer || !titleElement) {
            return undefined;
        }

        let titleHeight = titleElement.getBoundingClientRect().height;
        let viewportHeight = scrollContainer.getBoundingClientRect().height;
        const updateStickyTitleHeight = () => {
            setStickyTitleHeight(titleHeight < viewportHeight ? titleHeight : 0);
        };
        updateStickyTitleHeight();

        // Observe both boxes together and reuse the layout sizes delivered by the observer.
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const height =
                    entry.borderBoxSize?.[0]?.blockSize ??
                    entry.target.getBoundingClientRect().height;
                if (entry.target === titleElement) {
                    titleHeight = height;
                } else if (entry.target === scrollContainer) {
                    viewportHeight = height;
                }
            }
            updateStickyTitleHeight();
        });
        observer.observe(scrollContainer, {box: 'border-box'});
        observer.observe(titleElement, {box: 'border-box'});
        return () => observer.disconnect();
    }, [shouldMeasureTitle]);

    return (
        <div
            ref={handleScrollContainerRef}
            className={b({'without-scroll': withoutScroll})}
            style={{scrollPaddingBlockStart: stickyTitleHeight || undefined}}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
            onTransitionEnd={onTransitionEnd}
            data-qa={SheetQa.CONTENT_AREA}
        >
            <div
                ref={marginBoxRef}
                className={b('margin-box', {'always-full-height': alwaysFullHeight})}
            >
                <div className={b('margin-box-border-compensation')}>
                    <div className={b('content', null, contentClassName)} data-qa={SheetQa.CONTENT}>
                        {hasTitle && (
                            <div
                                ref={titleRef}
                                id={titleId}
                                className={b('content-title', {
                                    sticky: stickyTitleHeight > 0,
                                    custom: !isTextTitle,
                                })}
                                data-qa={SheetQa.TITLE}
                            >
                                {title}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
