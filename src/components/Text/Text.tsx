import React from 'react';
import {text, TextBase} from './text/text';
import {colorText, ColorTextBase} from './colorText/colorText';

export interface TextProps extends TextBase, ColorTextBase {
    /**
     * Ability to override default html tag
     */
    as?: keyof JSX.IntrinsicElements;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
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
 * <Text typography="body-1" color="inherit" elipsis>some test</Text>
 * ```
 *
 * You can also use a more flexible way of setting the style. "Uikit" alse provide `text` uility function.
 *
 *```jsx
 * import {text} from '@yandex-cloud/uikit';
 *
 * // textStyles = 'text text_typography_display-1 some-class-name'
 * const textStyles = text({typography: 'display-1'}, 'some-class-name'));
 *
 * <span className={textStyles}>some text</span>
 * ```
 */
export const Text: React.FC<TextProps> = ({
    as: Tag = 'span',
    children,
    typography,
    className,
    ellipsis,
    color,
    ...rest
}) => {
    return (
        <Tag
            className={text(
                {typography, ellipsis},
                color ? colorText({color}, className) : className,
            )}
            {...rest}
        >
            {children}
        </Tag>
    );
};
