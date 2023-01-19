import React from 'react';
import {text, TextBaseProps} from './text/text';
import {colorText, ColorTextBaseProps} from './colorText/colorText';

export interface TextProps extends TextBaseProps, ColorTextBaseProps {
    /**
     * Ability to override default html tag
     */
    as?: keyof JSX.IntrinsicElements;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    title?: string;
}

/**
 * A component for working with typography.
 *
 * Storybook: https://preview.yandexcloud.dev/gravity-ui-bae/?path=/docs/components-text--default
 *
 * **Hint:** Hover on props in your editor to read jsdoc
 *
 * Provides a convenient API for working with mixins of typography and text colors. Just point at the prop in you favorite code editor and read the accompanying documentation via `jsdoc` on where to apply this or that font or color.
 *
 * ```jsx
 * import {Text} from '@gravity-ui/uikit';
 *
 * <Text variant="body-1" color="inherit" elipsis>some test</Text>
 * ```
 *
 * You can also use a more flexible way of setting the style. "Gravity UI" also provide `text` utility function.
 *
 *```jsx
 * import {text} from '@gravity-ui/uikit';
 *
 * // textStyles = 'text text_variant_display-1 some-class-name'
 * const textStyles = text({variant: 'display-1'}, 'some-class-name'));
 *
 * <span className={textStyles}>some text</span>
 * ```
 */
export const Text: React.FC<TextProps> = ({
    as: Tag = 'span',
    children,
    variant,
    className,
    ellipsis,
    color,
    whiteSpace,
    wordBreak,
    ...rest
}) => {
    return (
        <Tag
            className={text(
                {variant, ellipsis, whiteSpace, wordBreak},
                color ? colorText({color}, className) : className,
            )}
            {...rest}
        >
            {children}
        </Tag>
    );
};
