'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {Box} from '../Box/Box';
import type {BoxProps} from '../Box/Box';
import {useLayoutContext} from '../hooks/useLayoutContext';
import type {ColSize, LayoutComponentProps, MediaPartial} from '../types';
import {makeCssMod} from '../utils';

import './Col.scss';

const b = block('col');

export interface ColProps<T extends React.ElementType = 'div'> extends BoxProps<T> {
    size?: ColSize | [ColSize | undefined, MediaPartial<ColSize>] | MediaPartial<ColSize>;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

/**
 * How many columns of you 12-th column layout will take content.
 * Must be used as a child of `Row` component.
 *
 * By default, the component spans all 12 tracks on its own row.
 * If you want to specify static size use `size` prop.
 *
 * ```tsx
 * <Col size="6">some content</Col>
 * ```
 * If you want responsive column use provide media sizes.
 *
 * ```tsx
 * <Col size={[12, {m: 6}]}>some content</Col>
 * ```
 * ---
 *
 * Note: you can use empty <Col/> component for spacing:
 *
 * ```tsx
 * <Row>
 *   <Col size="4">col 1</Col>
 *   <Col size="4" />
 *   <Col size="4">col 2</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
 */
export const Col = React.forwardRef<HTMLDivElement, ColProps>(function Col(
    {size, children, className, ...props},
    ref,
) {
    const {getClosestMediaProps} = useLayoutContext();
    let mediaConfig: MediaPartial<ColSize> | undefined;
    let defaultSizeMod: ColSize | undefined;

    if (Array.isArray(size)) {
        [defaultSizeMod, mediaConfig] = size;
    } else if (typeof size === 'object') {
        mediaConfig = size;
    } else {
        defaultSizeMod = size;
    }

    const sizeModValue = getClosestMediaProps(mediaConfig);

    return (
        <Box
            {...props}
            ref={ref}
            className={b(
                {
                    size:
                        typeof sizeModValue === 'undefined'
                            ? defaultSizeMod
                            : makeCssMod(sizeModValue),
                },
                className,
            )}
        >
            {children}
        </Box>
    );
}) as (<C extends React.ElementType = 'div'>(
    props: LayoutComponentProps<C, ColProps<C>>,
) => React.ReactElement) & {displayName: string};

/**
 * Possible improvements that the customer is looking for:
 * - props for vertical alignment in row;
 * - offset;
 * - media only. Rule that will be applied only in specified media query;
 * - content alignment;
 */
