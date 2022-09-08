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
     * Storybook: https://preview.yandexcloud.dev/gravity-ui-base/?path=/story/typography--common
     * **Note:**: below are the default variants that can be overridden in the project
     *
     * - body:
     *      - 1: font-size: 13px; line-height: 18px; (**Default variant**)
     *      - 2: font-size: 15px; line-height: 20px;
     *      - 3: font-size: 17px; line-height: 24px;
     *      - short: font-size: 13px; line-height: 16px;
     * - caption:
     *      - 1: font-size: 9px; line-height: 12px;
     *      - 2: font-size: 11px; line-height: 16px;
     * - header:
     *      - 1: font-size: 20px; line-height: 24px; font-weight: 900;
     *      - 2: font-size: 24px; line-height: 28px; font-weight: 900;
     * - subheader:
     *      - 1: font-size: 13px; line-height: 18px; font-weight: 900;
     *      - 2: font-size: 15px; line-height: 20px; font-weight: 900;
     *      - 2: font-size: 17px; line-height: 24px; font-weight: 900;
     * - display:
     *      - 1: font-size: 28px; line-height: 36px; font-weight: 900;
     *      - 2: font-size: 32px; line-height: 40px; font-weight: 900;
     *      - 3: font-size: 40px; line-height: 48px; font-weight: 900;
     *      - 4: font-size: 48px; line-height: 52px; font-weight: 900;
     * - code:
     *      - 1: font-size: 12px; line-height: 18px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     *      - 2: font-size: 14px; line-height: 20px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     *      - 3: font-size: 16px; line-height: 14px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     *      - inline=1: font-size: 12px; line-height: 14px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     *      - inline-2: font-size: 14px; line-height: 16px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     *      - inline-3: font-size: 16px; line-height: 20px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     */
    variant?: typeof TEXT_VARIANTS[number];

    /**
     * hidden overflow content will be displayed with ellipsis `…`
     *
     * - white-space: nowrap;
     * - overflow: hidden;
     * - text-overflow: ellipsis;
     */
    ellipsis?: boolean;
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
export const text = ({variant = 'body-1', ellipsis}: TextBaseProps, className?: string) =>
    b({variant, ellipsis}, className);
