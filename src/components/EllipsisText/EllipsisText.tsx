import * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {useCenterEllipsisText} from './hooks';
import {splitText} from './utils';

import './EllipsisText.scss';

const b = block('ellipsis-text');

export type EllipsisTextPosition = 'start' | 'center' | 'end';

interface EllipsisTextContentProps {
    startOffset: string;
    endOffset: string;
    children: string;
}

const CenterEllipsisText = React.forwardRef<HTMLSpanElement, EllipsisTextContentProps>(
    function CenterEllipsisText({children: text, startOffset, endOffset}, ellipsisContentRef) {
        const {visibleText, containerRef, measureRef} = useCenterEllipsisText({
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
    },
);

const EdgeEllipsisText = React.memo(function EdgeEllipsisText({
    position,
    startOffset,
    endOffset,
    children: collapsibleText,
}: EllipsisTextContentProps & {position: Exclude<EllipsisTextPosition, 'center'>}) {
    return (
        <React.Fragment>
            {startOffset && <span aria-hidden>{startOffset}</span>}
            <span
                className={b('ellipsis', {
                    [position]: true,
                })}
                aria-hidden
            >
                <span className={b('ellipsis-content')}>
                    {/* Isolate the text from the direction flipped for start truncation. */}
                    <bdi>{collapsibleText}</bdi>
                </span>
            </span>
            {endOffset && <span aria-hidden>{endOffset}</span>}
        </React.Fragment>
    );
});

export interface EllipsisTextProps extends AriaLabelingProps, DOMProps, QAProps {
    id?: string;
    position?: EllipsisTextPosition;
    offsetStart?: number;
    offsetEnd?: number;
    separator?: string | string[];
    children: string;
}

type TextParts = [startOffset: string, collapsibleText: string, endOffset: string];

const getPartsWithoutSeparator = (
    text: string,
    offsetStart: number,
    offsetEnd: number,
): TextParts => {
    const characters = splitText(text);
    const textLength = characters.length;
    const startOffsetEnd = Math.min(textLength, Math.max(0, offsetStart));
    const endOffsetStart = Math.max(startOffsetEnd, textLength - Math.max(0, offsetEnd));

    return [
        characters.slice(0, startOffsetEnd).join(''),
        characters.slice(startOffsetEnd, endOffsetStart).join(''),
        characters.slice(endOffsetStart).join(''),
    ];
};

const getPartsWithSeparator = (
    text: string,
    separator: string | string[],
    offsetStart: number,
    offsetEnd: number,
): TextParts => {
    const textLength = text.length;
    const tokens = (typeof separator === 'string' ? [separator] : separator)
        .filter(Boolean)
        .sort((sep1, sep2) => sep2.length - sep1.length);

    if (!tokens.length) {
        return getPartsWithoutSeparator(text, offsetStart, offsetEnd);
    }

    const boundaries: {start: number; end: number}[] = [];
    for (let i = 0; i < textLength; ) {
        const token = tokens.find((candidate) => text.startsWith(candidate, i));
        if (token) {
            boundaries.push({start: i, end: i + token.length});
            i += token.length;
        } else {
            i++;
        }
    }

    // There is one more split part than separator boundaries, including empty parts.
    const startOffsetEnd = offsetStart > 0 ? (boundaries[offsetStart - 1]?.start ?? textLength) : 0;
    const requestedEndOffsetStart = Math.max(
        startOffsetEnd,
        offsetEnd > 0 ? (boundaries[boundaries.length - offsetEnd]?.end ?? 0) : textLength,
    );
    const endOffsetStart =
        offsetStart + offsetEnd >= boundaries.length + 1 ? startOffsetEnd : requestedEndOffsetStart;

    return [
        text.slice(0, startOffsetEnd),
        text.slice(startOffsetEnd, endOffsetStart),
        text.slice(endOffsetStart),
    ];
};

export const EllipsisText = React.forwardRef<HTMLSpanElement, EllipsisTextProps>(
    function EllipsisText(rawProps, ref) {
        const props = useDefaultProps('EllipsisText', rawProps);
        const {
            className,
            style,
            position = 'end',
            offsetStart = 0,
            offsetEnd = 0,
            separator = '',
            children: text,
            qa,
            ...restProps
        } = props;
        const ellipsisContentRef = React.useRef<HTMLSpanElement>(null);

        const isCenterPosition = position === 'center';

        const [startOffset, collapsibleText, endOffset] = React.useMemo(
            () =>
                separator.length
                    ? getPartsWithSeparator(text, separator, offsetStart, offsetEnd)
                    : getPartsWithoutSeparator(text, offsetStart, offsetEnd),
            [text, separator, offsetStart, offsetEnd],
        );

        const handleCopy = React.useCallback(
            (e: React.ClipboardEvent<HTMLSpanElement>) => {
                const selection = window.getSelection();
                if (!selection || selection.isCollapsed || selection.rangeCount !== 1) {
                    return;
                }

                // DOM text avoids layout-generated line breaks between the visual fragments.
                const selectedContent = selection.getRangeAt(0).cloneContents();
                selectedContent
                    .querySelectorAll(`.${b('accessible-text')}, .${b('ellipsis-measure')}`)
                    .forEach((node) => node.remove());
                const currentText = isCenterPosition
                    ? ellipsisContentRef.current?.textContent
                    : text;

                if (currentText === selectedContent.textContent) {
                    e.preventDefault();
                    e.clipboardData.setData('text/plain', text);
                }
            },
            [text, isCenterPosition],
        );

        return (
            <span
                {...filterDOMProps(restProps, {labelable: true})}
                className={b(null, className)}
                style={style}
                ref={ref}
                onCopy={handleCopy}
                data-qa={qa}
            >
                <span className={b('accessible-text')}>{text}</span>
                {isCenterPosition ? (
                    <CenterEllipsisText
                        startOffset={startOffset}
                        endOffset={endOffset}
                        ref={ellipsisContentRef}
                    >
                        {text}
                    </CenterEllipsisText>
                ) : (
                    <EdgeEllipsisText
                        startOffset={startOffset}
                        endOffset={endOffset}
                        position={position}
                    >
                        {collapsibleText}
                    </EdgeEllipsisText>
                )}
            </span>
        );
    },
);
