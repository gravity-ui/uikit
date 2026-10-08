'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {Box} from '../Box/Box';
import type {BoxProps} from '../Box/Box';
import {getSpacingValue} from '../hooks/useStyleProps';
import type {ContainerConfigProps, LayoutComponentProps, MediaType} from '../types';

import {useContainerThemeProps} from './useContainerThemeProps';

import './Container.scss';

const b = block('container');

export interface ContainerProps<T extends React.ElementType = 'div'> extends BoxProps<T> {
    /** Caps content width at the configured breakpoint width, excluding gutters by default. */
    size?: MediaType;
    /** Logical horizontal padding. Overrides paddingInline and layout-theme defaults. */
    gutters?: BoxProps<T>['paddingInline'];
    /** Spacing between adjacent direct-child Row elements. Defaults to the layout theme. */
    rowGap?: ContainerConfigProps['rowGap'];
}

/** Centers page content. Use gutters for horizontal padding and rowGap between rows. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
    {className, size, gutters, paddingInline, rowGap, style, ...props},
    ref,
) {
    const {containerThemeProps, getClosestMediaProps, breakpoints} = useContainerThemeProps();
    const rowGapValue = getClosestMediaProps(rowGap ?? containerThemeProps.rowGap);

    return (
        <Box
            maxInlineSize={size === undefined ? undefined : `min(100%, ${breakpoints[size]}px)`}
            {...props}
            paddingInline={gutters ?? paddingInline ?? containerThemeProps.gutters}
            style={{...style, '--g-container-row-gap': getSpacingValue(rowGapValue ?? 0)}}
            className={b(null, className)}
            ref={ref}
        />
    );
}) as (<C extends React.ElementType = 'div'>(
    props: LayoutComponentProps<C, ContainerProps<C>>,
) => React.ReactElement) & {displayName: string};
