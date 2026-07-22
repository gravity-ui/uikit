'use client';

import * as React from 'react';

import type {DOMProps, QAProps} from '../../types';
import {block} from '../../utils/cn';
import {useStyleProps} from '../hooks/useStyleProps';
import type {BaseStyleProps} from '../hooks/useStyleProps';
import type {LayoutComponentProps} from '../types';

import './Box.scss';

const b = block('box');

export interface BoxProps<T extends React.ElementType = 'div'>
    extends QAProps,
        DOMProps,
        BaseStyleProps {
    as?: T;
    children?: React.ReactNode;
}

/**
 * Basic block to build other components and for standalone usage as a smart block with build in support of most usable css properties and shortcut `spacing` properties.
 * ```tsx
 * <Box width={300} height={200} marginBlockEnd={2}}}>
 *      some content
 * </Box>
 * <Box inlineSize={300} blockSize={200} >
 *      some content
 * </Box>
 * ```
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(
    {as, qa, ...props},
    ref,
) {
    const Tag: React.ElementType = as || 'div';

    const {className, ...otherProps} = useStyleProps(props);

    return <Tag {...otherProps} data-qa={qa} className={b(null, className)} ref={ref} />;
}) as (<C extends React.ElementType = 'div'>(
    props: LayoutComponentProps<C, BoxProps<C>>,
) => React.ReactElement) & {displayName: string};
