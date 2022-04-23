import {block} from '../utils/cn';

import './ColorText.scss';

const b = block('color-text');

export interface ColorTextBase {
    color?:
        | 'inherit'
        | 'primary'
        | 'complementary'
        | 'secondary'
        | 'hint'
        | 'info'
        | 'positive'
        | 'warningMedium'
        | 'warningHeavy'
        | 'danger'
        | 'utility'
        | 'misc'
        | 'special'
        | 'link'
        | 'linkHover'
        | 'yandexRed'
        | 'darkPrimary'
        | 'darkComplementary'
        | 'darkSecondary'
        | 'lightPrimary'
        | 'lightComplementary'
        | 'lightSecondary'
        | 'lightHint'
        | 'invertedPrimary'
        | 'invertedComplementary'
        | 'invertedSecondary'
        | 'invertedHint';
}

/**
 * Utility to generate text colors classes.
 * Storybook: https://preview.yandexcloud.dev/uikit/?path=/story/colors--texts
 *
 * ---
 * For example:
 * ```jsx
 * // "color-text color-text_color_inherit some-class"
 * colorText({color: 'inherit'}, 'some-class')
 * ```
 */
export const colorText = ({color}: ColorTextBase, className?: string) => b({color}, className);
