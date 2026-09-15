import * as React from 'react';

import {useLayoutEffect, useResizeObserver} from '../../hooks';

import {splitText} from './utils';

interface ResizeParams {
    text: string;
    startOffset: string;
    endOffset: string;
    setVisibleText: (text: string) => void;
    containerRef: React.RefObject<HTMLSpanElement | null>;
    measureRef: React.RefObject<HTMLSpanElement | null>;
}

const ELLIPSIS_CHAR = '\u2026';

const getElementWidth = (element: HTMLElement) => element.getBoundingClientRect().width;

const calculateCollapsedText = (
    availableSpace: number,
    {text, startOffset, endOffset, measureRef}: ResizeParams,
): string | null => {
    const measure = measureRef.current;

    if (!measure) {
        return null;
    }

    const collapsibleStartIndex = startOffset.length;
    const collapsibleEndIndex = -endOffset.length || text.length;

    const collapsibleText = splitText(text.slice(collapsibleStartIndex, collapsibleEndIndex));

    let minCharacters = 0;
    let maxCharacters = collapsibleText.length;
    let result = startOffset + ELLIPSIS_CHAR + endOffset;

    let currentLength: number;
    let start: string;
    let end: string;
    let currentResult: string;
    while (minCharacters <= maxCharacters) {
        currentLength = Math.floor((minCharacters + maxCharacters) * 0.5);

        start = collapsibleText.slice(0, Math.ceil(currentLength * 0.5)).join('');
        end = collapsibleText
            .slice(collapsibleText.length - Math.floor(currentLength * 0.5))
            .join('');

        currentResult = startOffset + start + ELLIPSIS_CHAR + end + endOffset;

        measure.textContent = currentResult;
        if (getElementWidth(measure) <= availableSpace) {
            result = currentResult;
            minCharacters = currentLength + 1;
        } else {
            maxCharacters = currentLength - 1;
        }
    }

    // Measure is observed only for font changes, so we keep the text the same
    measure.textContent = text;

    return result;
};

const handleResize = (params: ResizeParams) => {
    const {text, setVisibleText, containerRef, measureRef} = params;
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) {
        return;
    }

    const availableSpace = getElementWidth(container);
    if (availableSpace <= 0) {
        return;
    }

    measure.textContent = text;
    if (
        params.startOffset.length + params.endOffset.length >= text.length ||
        getElementWidth(measure) <= availableSpace
    ) {
        setVisibleText(text);
        return;
    }

    const collapsedText = calculateCollapsedText(availableSpace, params);

    if (collapsedText === null) {
        return;
    }

    setVisibleText(collapsedText);
};

const makeOnResize = (params: ResizeParams) => () => {
    handleResize(params);
};

export interface CenterEllipsisTextProps {
    text: string;
    startOffset?: string;
    endOffset?: string;
}

export const useCenterEllipsisText = ({
    text,
    startOffset = '',
    endOffset = '',
}: CenterEllipsisTextProps) => {
    const containerRef = React.useRef<HTMLSpanElement | null>(null);
    const measureRef = React.useRef<HTMLSpanElement>(null);

    const [visibleText, setVisibleText] = React.useState(text);

    const onResize = React.useMemo(
        () =>
            makeOnResize({
                text,
                startOffset,
                endOffset,
                setVisibleText,
                measureRef,
                containerRef,
            }),
        [text, startOffset, endOffset, setVisibleText],
    );

    useLayoutEffect(onResize, [onResize]);

    useResizeObserver({ref: containerRef, onResize});
    // The measurement element also resizes when fonts change.
    useResizeObserver({ref: measureRef, onResize});

    return {visibleText, containerRef, measureRef};
};
