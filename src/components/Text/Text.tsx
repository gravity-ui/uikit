import React from 'react';
import {colorText, ColorTextBase} from '../ColorText/ColorText';
import {block} from '../utils/cn';

import './Text.scss';

const b = block('text');

interface TextBase {
    /**
     * Storybook: https://preview.yandexcloud.dev/uikit/?path=/story/typography--common
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
     *      - inline1: font-size: 12px; line-height: 14px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     *      - inline2: font-size: 14px; line-height: 16px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     *      - inline3: font-size: 16px; line-height: 20px; font-weight: 400; font-family: var(--yc-font-family-monospace);
     */
    type?:
        | 'display1'
        | 'display2'
        | 'display3'
        | 'display4'
        | 'code1'
        | 'code2'
        | 'code3'
        | 'codeInline1'
        | 'codeInline2'
        | 'codeInline3'
        | 'body1'
        | 'body2'
        | 'body3'
        | 'bodyShort'
        | 'caption1'
        | 'caption2'
        | 'header1'
        | 'header2'
        | 'subheader1'
        | 'subheader2'
        | 'subheader3';
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
 * text({type: 'display'}, 'some-class')`
 *```
 */
export const text = ({type = 'body1', ellipsis}: TextBase, className?: string) =>
    b({type, ellipsis}, className);

export interface TextProps extends TextBase, ColorTextBase {
    /**
     * Ability to override default html tag
     */
    as?: keyof Pick<
        JSX.IntrinsicElements,
        'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'pre' | 'code'
    >;
    style?: React.CSSProperties;
    className?: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    /**
     * Use this for locators in your tests
     */
    testId?: string;
}

/**
 * A component for working with typography.
 *
 * Storybook: https://preview.yandexcloud.dev/uikit/?path=/docs/components-text--default
 *
 * **Hint:** Hover on props in your editor to read jsdoc
 *
 * Provides a convenient API for working with mixins of typography and text colors. Just point at the prop in you favorite code editor and read the accompanying documentation via `jsdoc` on where to apply this or that font or color.
 *
 * ```jsx
 * import {Text} from '@yandex-cloud/uikit';
 *
 * <Text type="body1" color="inherit" elipsis>some test</Text>
 * ```
 *
 * You can also use a more flexible way of setting the style. "Uikit" alse provide `text` uility function.
 *
 *```jsx
 * import {text} from '@yandex-cloud/uikit';
 *
 * // textStyles = 'text text_type_display1 some-class-name'
 * const textStyles = text({type: 'display1'}, 'some-class-name'));
 *
 * <span className={textStyles}>some text</span>
 * ```
 */
export const Text: React.FC<TextProps> = ({
    as = 'span',
    children,
    content,
    type,
    className,
    ellipsis,
    color,
    testId,
    ...rest
}) => {
    const Tag = ellipsis ? 'div' : as;

    return (
        <Tag
            className={text({type, ellipsis}, color ? colorText({color}, className) : className)}
            data-testid={testId}
            {...rest}
        >
            {content || children}
        </Tag>
    );
};
