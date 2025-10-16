import {block} from '../../utils/cn';

import './text.scss';

const b = block('text');

export const TEXT_VARIANTS = [
    'display-4',
    'display-3',
    'display-2',
    'display-1',
    'header-2',
    'header-1',
    'subheader-3',
    'subheader-2',
    'subheader-1',
    'body-3',
    'body-2',
    'body-1',
    'body-short',
    'caption-2',
    'caption-1',
    'code-3',
    'code-inline-3',
    'code-2',
    'code-inline-2',
    'code-1',
    'code-inline-1',
] as const;

export interface TextBaseProps {
    /**
     * Storybook: https://preview.gravity-ui.com/uikit/?path=/story/typography--variants
     * **Note:**: below are the default variants that can be overridden in the project
     *
     * - body (font-family: var(--g-text-body-font-family); font-weight: 400):
     *      - 1: font-size: 13px; line-height: 18px; (**Default variant**)
     *      - 2: font-size: 15px; line-height: 20px;
     *      - 3: font-size: 17px; line-height: 24px;
     *      - short: font-size: 13px; line-height: 16px;
     * - caption (font-family: var(--g-text-caption-font-family); font-weight: 400):
     *      - 1: font-size: 9px; line-height: 12px;
     *      - 2: font-size: 11px; line-height: 16px;
     * - header (font-family: var(--g-text-header-font-family); font-weight: 600):
     *      - 1: font-size: 20px; line-height: 24px;
     *      - 2: font-size: 24px; line-height: 28px;
     * - subheader (font-family: var(--g-text-subheader-font-family); font-weight: 600):
     *      - 1: font-size: 13px; line-height: 18px;
     *      - 2: font-size: 15px; line-height: 20px;
     *      - 3: font-size: 17px; line-height: 24px;
     * - display (font-family: var(--g-text-display-font-family); font-weight: 600):
     *      - 1: font-size: 28px; line-height: 36px;
     *      - 2: font-size: 32px; line-height: 40px;
     *      - 3: font-size: 40px; line-height: 48px;
     *      - 4: font-size: 48px; line-height: 52px;
     * - code (font-family: var(--g-text-code-font-family); font-weight: 400):
     *      - 1: font-size: 12px; line-height: 18px;
     *      - 2: font-size: 14px; line-height: 20px;
     *      - 3: font-size: 16px; line-height: 14px;
     *      - inline=1: font-size: 12px; line-height: 14px;
     *      - inline-2: font-size: 14px; line-height: 16px;
     *      - inline-3: font-size: 16px; line-height: 20px;
     */
    variant?: (typeof TEXT_VARIANTS)[number] | 'inherit';

    /**
     * hidden overflow content will be displayed with ellipsis `…`
     *
     * - white-space: nowrap;
     * - overflow: hidden;
     * - text-overflow: ellipsis;
     */
    ellipsis?: boolean;
    /**
     * With this prop you need to pass `-webkit-line-clamp` css property with number of cropped lines
     *
     * !Note: supports only modern browsers
     * https://caniuse.com/?search=display%3A%20-webkit-box%3B
     */
    ellipsisLines?: boolean;
    /**
     * white-space css property
     */
    whiteSpace?: 'nowrap' | 'break-spaces';
    /**
     * word-break css property
     */
    wordBreak?: 'break-all' | 'break-word';
}

/**
 * Utility to generate text classes.
 *
 * **Hint:** Hover on props in your editor to read jsdoc
 *
 * ---
 * ```jsx
 * // "text text_display1 some-class"
 * text({variant: 'display-1'}, 'some-class')`
 *```
 */
export const text = (
    {variant = 'body-1', ellipsis, ellipsisLines, whiteSpace, wordBreak}: TextBaseProps,
    className?: string,
) =>
    b(
        {
            variant,
            ellipsis,
            ws: whiteSpace,
            wb: wordBreak,
            'ellipsis-lines': ellipsisLines,
        },
        className,
    );
