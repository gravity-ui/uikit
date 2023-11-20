import React from 'react';

import {colorText} from './colorText/colorText';
import type {ColorTextBaseProps} from './colorText/colorText';
import {text} from './text/text';
import type {TextBaseProps} from './text/text';

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

type TextRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type TextPropsWithoutRef<C extends React.ElementType> = {as?: C} & Omit<TextProps, 'as'>;

/**
 * A component for working with typography.
 *
 * Storybook: https://preview.gravity-ui.com/uikit/?path=/story/components-text--default
 *
 * **Hint:** Hover on props in your editor to read jsdoc
 *
 * Provides a convenient API for working with mixins of typography and text colors. Just point at the prop in you favorite code editor and read the accompanying documentation via `jsdoc` on where to apply this or that font or color.
 *
 * ```jsx
 * import {Text} from '@gravity-ui/uikit';
 *
 * <Text variant="body-1" color="inherit" ellipsis>some test</Text>
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
export const Text = React.forwardRef(
    <C extends React.ElementType = 'span'>(
        {
            as,
            children,
            variant,
            className,
            ellipsis,
            color,
            whiteSpace,
            wordBreak,
            ...rest
        }: TextPropsWithoutRef<C>,
        ref?: TextRef<C>,
    ) => {
        const Tag: React.ElementType = as || 'span';

        return (
            <Tag
                dir="auto"
                ref={ref}
                className={text(
                    {variant, ellipsis, whiteSpace, wordBreak},
                    color ? colorText({color}, className) : className,
                )}
                {...rest}
            >
                {children}
            </Tag>
        );
    },
) as (<C extends React.ElementType = 'span'>({
    ref,
    ...props
}: TextPropsWithoutRef<C> & {ref?: TextRef<C>}) => React.ReactElement) & {displayName: string};

Text.displayName = 'Text';
