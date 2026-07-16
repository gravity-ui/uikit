import * as React from 'react';

import type {DOMProps} from '../types';
import {block} from '../utils/cn';

import {useCenterEllipsis} from './hooks';

import './Ellipsis.scss';

const b = block('ellipsis');

export type EllipsisPosition = 'start' | 'center' | 'end';

interface CenterEllipsisProps {
    startOffset: string;
    endOffset: string;
    children: string;
}

const CenterEllipsis = React.memo(
    React.forwardRef<HTMLSpanElement, CenterEllipsisProps>(function CenterEllipsis(
        {children: text, startOffset, endOffset},
        ellipsisContentRef,
    ) {
        const {visibleText, containerRef, measureRef} = useCenterEllipsis({
            text,
            startOffset,
            endOffset,
        });

        return (
            <span ref={containerRef} className={b('ellipsis', {center: true})} aria-hidden>
                <span ref={measureRef} className={b('ellipsis-measure')} />
                <span className={b('ellipsis-content')} ref={ellipsisContentRef}>
                    {visibleText}
                </span>
            </span>
        );
    }),
);

const FSI = '\u2068';
const PDI = '\u2069';

export interface EllipsisProps extends DOMProps {
    position?: EllipsisPosition;
    offsetStart?: number;
    offsetEnd?: number;
    separator?: string | string[];
    children: string;
}

export const Ellipsis = React.forwardRef<HTMLSpanElement, EllipsisProps>(function Ellipsis(
    {
        className,
        style,
        position = 'end',
        offsetStart = 0,
        offsetEnd = 0,
        separator = '',
        children: text,
    },
    ref,
) {
    const ellipsisContentRef = React.useRef<HTMLSpanElement>(null);

    const isCenterPosition = position === 'center';

    const [startOffset, ellipsis, endOffset] = React.useMemo<[string, string, string]>(() => {
        const textLength = text.length;
        if (!separator) {
            const offsetEndLocal = -offsetEnd || textLength;

            return [
                text.slice(0, offsetStart),
                text.slice(offsetStart, offsetEndLocal),
                text.slice(offsetEndLocal),
            ];
        }

        const separatorCharacters = Array.from(separator);

        let startPartsLeft = offsetStart;
        let startOffsetEnd = 0;
        let endPartsLeft = offsetEnd;
        let endOffsetStart = textLength;
        for (let i = 0; i < textLength && (startPartsLeft || endPartsLeft); i++) {
            const charStart = text[i];
            const charEnd = text[textLength - i - 1];

            if (startPartsLeft && separatorCharacters.includes(charStart)) {
                startPartsLeft--;
                startOffsetEnd = i;
            }
            if (endPartsLeft && separatorCharacters.includes(charEnd)) {
                endPartsLeft--;
                endOffsetStart = textLength - i;
            }
        }

        return [
            text.slice(0, startOffsetEnd),
            text.slice(startOffsetEnd, endOffsetStart),
            text.slice(endOffsetStart),
        ];
    }, [text, separator, offsetStart, offsetEnd]);

    const handleCopy = React.useCallback(
        (e: React.ClipboardEvent<HTMLSpanElement>) => {
            if (!isCenterPosition) {
                return;
            }

            const clipboardText = (window.getSelection()?.toString() || '').trim();
            const currentText =
                startOffset + (ellipsisContentRef.current?.textContent || '') + endOffset;

            if (currentText === clipboardText) {
                e.preventDefault();
                e.clipboardData.setData('text/plain', text);
            }
        },
        [text, endOffset, startOffset, isCenterPosition],
    );

    return (
        <span
            className={b(null, className)}
            style={style}
            ref={ref}
            onCopy={handleCopy}
            aria-label={text}
        >
            {isCenterPosition ? (
                <CenterEllipsis
                    startOffset={startOffset}
                    endOffset={endOffset}
                    ref={ellipsisContentRef}
                >
                    {text}
                </CenterEllipsis>
            ) : (
                <React.Fragment>
                    <span aria-hidden>{startOffset}</span>
                    <span
                        className={b('ellipsis', {
                            [position]: true,
                        })}
                        aria-hidden
                    >
                        {/* The extra characters are needed to prevent text shuffling due to direction: rtl with position: 'start' */}
                        <span className={b('ellipsis-content')}>{`${FSI}${ellipsis}${PDI}`}</span>
                    </span>
                    <span aria-hidden>{endOffset}</span>
                </React.Fragment>
            )}
        </span>
    );
});
