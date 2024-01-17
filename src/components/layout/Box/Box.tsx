import React from 'react';

import type {QAProps} from '../../types';
import {block} from '../../utils/cn';
import type {SpacingProps} from '../spacing/spacing';
import {sp} from '../spacing/spacing';

import './Box.scss';

const b = block('box');

export interface BoxProps<T extends React.ElementType = 'div'>
    extends QAProps,
        React.HTMLAttributes<T>,
        React.PropsWithChildren<
            Pick<
                React.CSSProperties,
                'width' | 'height' | 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth'
            >
        > {
    as?: T;
    /**
     * Add overflow css properties to container
     */
    overflow?: 'hidden' | 'x' | 'y' | 'auto';
    className?: string;
    /**
     * All spacing shortcut properties available here.
     * ```tsx
     * <Box spacing={{mr: 3, pb: 2}}>...<Box>
     * // margin-right: 12px
     * // padding-bottom: 8px
     * ```
     */
    spacing?: SpacingProps;
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
export const Box = React.forwardRef(function Box<T extends React.ElementType = 'div'>(
    {
        as,
        children,
        qa,
        className,
        width,
        height,
        minWidth,
        minHeight,
        maxHeight,
        maxWidth,
        style: outerStyle,
        spacing,
        overflow,
        ...props
    }: BoxProps<T>,
    ref?: React.ComponentPropsWithRef<T>['ref'],
) {
    const Tag: React.ElementType = as || 'div';

    const style: React.CSSProperties = {
        width,
        height,
        minWidth,
        minHeight,
        maxHeight,
        maxWidth,
        ...outerStyle,
    };

    return (
        <Tag
            {...props}
            data-qa={qa}
            style={style}
            ref={ref}
            className={b({overflow}, spacing ? sp(spacing, className) : className)}
        >
            {children}
        </Tag>
    );
});
