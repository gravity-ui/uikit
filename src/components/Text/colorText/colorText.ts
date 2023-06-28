import {block} from '../../utils/cn';

import './colorText.scss';

const b = block('color-text');

export const TEXT_COLORS = [
    'primary',
    'complementary',
    'secondary',
    'hint',
    'info',
    'info-heavy',
    'positive',
    'positive-heavy',
    'warning',
    'warning-heavy',
    'danger',
    'danger-heavy',
    'utility',
    'utility-heavy',
    'misc',
    'misc-heavy',
    'brand',
    'link',
    'link-hover',
    'link-visited',
    'link-visited-hover',
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

export interface ColorTextBaseProps {
    color?: (typeof TEXT_COLORS)[number];
}

/**
 * Utility to generate text colors classes.
 * Storybook: https://preview.gravity-ui.com/uikit/?path=/story/colors--texts
 *
 * ---
 * For example:
 * ```jsx
 * // "color-text color-text_color_inherit some-class"
 * colorText({color: 'inherit'}, 'some-class')
 * ```
 */
export const colorText = ({color}: ColorTextBaseProps, className?: string) => b({color}, className);
