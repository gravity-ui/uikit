let segmenter: Intl.Segmenter | undefined;

export function splitText(text: string): string[] {
    if (typeof Intl.Segmenter !== 'function') {
        return Array.from(text);
    }

    segmenter ??= new Intl.Segmenter(undefined, {granularity: 'grapheme'});
    return Array.from(segmenter.segment(text), ({segment}) => segment);
}
