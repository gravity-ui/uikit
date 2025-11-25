'use client';

import * as React from 'react';

import type {DOMProps, QAProps} from '../../types';
import {block} from '../../utils/cn';
import {useStyleProps} from '../hooks/useStyleProps';
import type {SpacingProps as SpacingPropsDeprecated} from '../spacing/spacing';
import {sp} from '../spacing/spacing';
import type {
    LayoutComponentProps,
    LayoutProps,
    PositioningProps,
    SizingProps,
    SpacingProps,
    StylingProps,
} from '../types';

import './Box.scss';

const b = block('box');

export interface BoxProps<T extends React.ElementType = 'div'>
    extends QAProps,
        DOMProps,
        LayoutProps,
        SpacingProps,
        SizingProps,
        PositioningProps,
        StylingProps {
    as?: T;
    /**
     * All spacing shortcut properties available here.
     * ```tsx
     * <Box spacing={{mr: 3, pb: 2}}>...<Box>
     * // margin-right: 12px
     * // padding-bottom: 8px
     * ```
     * @deprecated use `<Box marginInlineStart="spacing-3" paddingBlockEnd="spacing-2">...<Box>` instead
     */
    spacing?: SpacingPropsDeprecated;
    children?: React.ReactNode;
}

/**
 * Basic block to build other components and for standalone usage as a smart block with build in support of most usable css properties and shortcut `spacing` properties.
 * ```tsx
 * <Box width={300} height={200} spacing={{mb: 2}}>
 *      some content
 * </Box>
 * <Box width={300} height={200} >
 *      some content
 * </Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(
    {as, qa, spacing, ...props},
    ref,
) {
    const Tag: React.ElementType = as || 'div';

    const {className, ...otherProps} = useStyleProps(props);

    return (
        <Tag
            {...otherProps}
            data-qa={qa}
            className={b(null, spacing ? sp(spacing, className) : className)}
            ref={ref}
        />
    );
}) as (<C extends React.ElementType = 'div'>(
    props: LayoutComponentProps<C, BoxProps<C>>,
) => React.ReactElement) & {displayName: string};
