import * as React from 'react';

import type {DOMProps, QAProps} from '../types';

import {colorText} from './colorText/colorText';
import type {ColorTextBaseProps} from './colorText/colorText';
import {text} from './text/text';
import type {TextBaseProps} from './text/text';

export interface TextProps<C extends React.ElementType = 'span'>
    extends Omit<TextBaseProps, 'ellipsisLines'>,
        ColorTextBaseProps,
        QAProps,
        DOMProps {
    /**
     * Ability to override default html tag
     */
    as?: C;
    ellipsisLines?: number;
}

type TextRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type TextPropsWithTypedAttrs<T extends React.ElementType> = TextProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>;

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
 * const textStyles = text({variant: 'display-1'}, 'some-class-name');
 *
 * <span className={textStyles}>some text</span>
 * ```
 */
export const Text = React.forwardRef(function Text<C extends React.ElementType = 'span'>(
    {
        as,
        children,
        variant,
        className,
        ellipsis,
        color,
        whiteSpace,
        wordBreak,
        ellipsisLines,
        style: outerStyle,
        qa,
        ...rest
    }: TextPropsWithTypedAttrs<C>,
    ref: React.ForwardedRef<C>,
) {
    const Tag: React.ElementType = as || 'span';

    const style: React.CSSProperties = {
        ...outerStyle,
    };

    if (typeof ellipsisLines === 'number') {
        style.WebkitLineClamp = ellipsisLines;
    }

    return (
        <Tag
            ref={ref}
            className={text(
                {
                    variant,
                    ellipsis,
                    whiteSpace,
                    wordBreak,
                    ellipsisLines: typeof ellipsisLines === 'number',
                },
                color ? colorText({color}, className) : className,
            )}
            style={style}
            data-qa={qa}
            {...rest}
        >
            {children}
        </Tag>
    );
}) as (<C extends React.ElementType = 'span'>({
    ref,
    ...props
}: TextPropsWithTypedAttrs<C> & {ref?: TextRef<C>}) => React.ReactElement) & {displayName: string};

Text.displayName = 'Text';
