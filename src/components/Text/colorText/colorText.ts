import {block} from '../../utils/cn';

import './colorText.scss';

const b = block('color-text');

export const TEXT_COLORS = [
    'primary',
    'complementary',
    'secondary',
    'hint',
    'info',
    'positive',
    'warning-medium',
    'warningheavy',
    'danger',
    'utility',
    'misc',
    'special',
    'link',
    'link-hover',
    'yandex-red',
    'dark-primary',
    'dark-complementary',
    'dark-secondary',
    'light-primary',
    'light-complementary',
    'light-secondary',
    'light-hint',
    'inverted-primary',
    'inverted-complementary',
    'inverted-secondary',
    'inverted-hint',
] as const;

export interface ColorTextBase {
    color?: typeof TEXT_COLORS[number];
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
