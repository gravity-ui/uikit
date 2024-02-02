import React from 'react';

import {emojiPaletteClassNames} from './definitions';

const optionsGap = 8; /* px */

export function useEmojiPaletteColumns(
    ref: React.RefObject<HTMLDivElement>,
    style: React.CSSProperties | undefined,
    columns: number,
) {
    const [layoutStyles, setLayoutStyles] = React.useState<React.CSSProperties>({
        gap: `${optionsGap}px`,
    });

    const finalStyles: React.CSSProperties = React.useMemo(
        () => ({...layoutStyles, ...style}),
        [style, layoutStyles],
    );

    React.useLayoutEffect(() => {
        if (!ref.current) return;

        const option = ref.current.querySelector(`.${emojiPaletteClassNames.option()}`);
        if (!option) return;

        const {width} = option.getBoundingClientRect();

        const gaps = optionsGap * (columns - 1);
        const maxWidth = `${columns * width + gaps}px`;

        if (layoutStyles.maxWidth !== maxWidth) {
            setLayoutStyles((current) => ({...current, maxWidth}));
        }
    }, [columns, layoutStyles.maxWidth, ref]);

    return finalStyles;
}
