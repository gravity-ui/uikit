import * as React from 'react';

interface ResizeParams {
    text: string;
    startOffset: string;
    endOffset: string;
    setVisibleText: (text: string) => void;
    measure: HTMLSpanElement | null;
}

const ELLIPSIS_CHAR = '\u2026';

let observer: ResizeObserver | null = null;
const resizeParamsMap: Map<HTMLSpanElement, ResizeParams> = new Map();
const measureToContainerMap: Map<Element, HTMLSpanElement> = new Map();
const containerToMeasureMap: Map<HTMLSpanElement, Element> = new Map();

const handleResize = (container: HTMLSpanElement | null) => {
    if (!container) {
        return;
    }

    const resizeParams = resizeParamsMap.get(container);
    if (!resizeParams?.measure) {
        return;
    }

    const {text, startOffset, endOffset, setVisibleText, measure} = resizeParams;

    const available = container.getBoundingClientRect().width;
    if (available <= 0) {
        return;
    }

    measure.textContent = text;
    if (measure.getBoundingClientRect().width <= available) {
        setVisibleText(text);
        return;
    }

    const collapsibleStartIndex = startOffset.length;
    const collapsibleEndIndex = -endOffset.length || text.length;

    const collapsibleText = text.slice(collapsibleStartIndex, collapsibleEndIndex);

    let minCharacters = 0;
    let maxCharacters = collapsibleText.length;
    let result = startOffset + ELLIPSIS_CHAR + endOffset;

    let currentLength: number;
    let start: string;
    let end: string;
    let currentResult: string;
    while (minCharacters <= maxCharacters) {
        currentLength = Math.floor((minCharacters + maxCharacters) * 0.5);

        start = collapsibleText.slice(0, Math.ceil(currentLength * 0.5));
        end = collapsibleText.slice(collapsibleText.length - Math.floor(currentLength * 0.5));

        currentResult = startOffset + start + ELLIPSIS_CHAR + end + endOffset;

        measure.textContent = currentResult;
        if (measure.getBoundingClientRect().width <= available) {
            result = currentResult;
            minCharacters = currentLength + 1;
        } else {
            maxCharacters = currentLength - 1;
        }
    }

    // Measure is observed only for font changes, so we keep the text the same
    measure.textContent = text;
    setVisibleText(result);
};

const observerCallback = async (entries: ResizeObserverEntry[]) => {
    const handledContainers = new Set<HTMLSpanElement>();

    for (const {target} of entries) {
        const container = measureToContainerMap.get(target) ?? (target as HTMLSpanElement);
        if (handledContainers.has(container)) {
            continue;
        }

        handledContainers.add(container);

        handleResize(container);
    }
};

const setResizeParams = (container: HTMLSpanElement | null, resizeParams: ResizeParams) => {
    if (!container) {
        return;
    }

    resizeParamsMap.set(container, resizeParams);
};

const deleteResizeParams = (container: HTMLSpanElement | null) => {
    if (!container) {
        return;
    }

    resizeParamsMap.delete(container);
};

const subscribeResize = (container: HTMLSpanElement | null) => {
    if (!container) {
        return;
    }

    if (!observer) {
        observer = new ResizeObserver(observerCallback);
    }

    // Observe container to detect size and content changes
    observer.observe(container);

    // Observe measure as well to detect font changes
    const measure = resizeParamsMap.get(container)?.measure;
    if (measure) {
        observer.observe(measure);
        measureToContainerMap.set(measure, container);
        containerToMeasureMap.set(container, measure);
    }
};

const unsubscribeResize = (container: HTMLSpanElement | null) => {
    if (!container) {
        return;
    }

    const measure = containerToMeasureMap.get(container);

    if (measure) {
        observer?.unobserve(measure);
        measureToContainerMap.delete(measure);
    }

    containerToMeasureMap.delete(container);
    observer?.unobserve(container);

    if (resizeParamsMap.size === 0) {
        observer?.disconnect();
        observer = null;
    }
};

export interface CenterEllipsisProps {
    text: string;
    startOffset?: string;
    endOffset?: string;
}

export const useCenterEllipsis = ({
    text,
    startOffset = '',
    endOffset = '',
}: CenterEllipsisProps) => {
    const containerRef = React.useRef<HTMLSpanElement | null>(null);
    const measureRef = React.useRef<HTMLSpanElement>(null);
    const [visibleText, setVisibleText] = React.useState(text);

    const handleTextChange = React.useCallback(
        (container: HTMLSpanElement | null) => {
            setResizeParams(container, {
                text,
                startOffset,
                endOffset,
                setVisibleText,
                measure: measureRef.current,
            });
            handleResize(container);
        },
        [endOffset, startOffset, text],
    );

    // does the same as useLayoutEffect, but does not trigger warnings
    const containerRefCallback = React.useCallback<React.RefCallback<HTMLSpanElement>>(
        (node) => {
            if (!node) {
                return;
            }

            if (!containerRef.current) {
                document.fonts.ready.then(() => handleTextChange(node));
            }

            containerRef.current = node;
        },
        [handleTextChange],
    );

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        handleTextChange(container);
    }, [handleTextChange, text]);

    React.useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        subscribeResize(container);

        // eslint-disable-next-line consistent-return
        return () => {
            deleteResizeParams(container);
            unsubscribeResize(container);
        };
    }, []);

    return {visibleText, containerRef: containerRefCallback, measureRef};
};
