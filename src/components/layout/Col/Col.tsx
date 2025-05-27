'use client';

import type * as React from 'react';

import type {QAProps} from '../../types';
import {block} from '../../utils/cn';
import {useLayoutContext} from '../hooks/useLayoutContext';
import type {ColSize, MediaPartial} from '../types';
import {makeCssMod} from '../utils';

import './Col.scss';

const b = block('col');

export interface ColProps extends Omit<MediaPartial<ColSize>, 'xs'>, QAProps {
    size?: ColSize;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

/**
 * How many columns of you 12-th column layout will take content.
 * Must be used as a child of `Row` component.
 *
 * By default, component takes all available space.
 * If you want to specify static size use `size` prop.
 *
 * ```tsx
 * <Col size="6">some content</Col>
 * ```
 * ---
 *
 * Note: you can use empty <Col/> component for spacing:
 *
 * ```tsx
 * <Row>
 *   <Col size="4">col 1</Col>
 *   <Col/>
 *   <Col size="4">col 2</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#col
 */
export const Col = ({size, children, style, className, qa, ...media}: ColProps) => {
    const {getClosestMediaProps} = useLayoutContext();
    const sizeModValue = getClosestMediaProps(media);

    return (
        <div
            style={style}
            className={b({size: sizeModValue ? makeCssMod(sizeModValue) : size}, className)}
            data-qa={qa}
        >
            {children}
        </div>
    );
};

/**
 * Possible improvements that the customer is looking for:
 * - props for vertical alignment in row;
 * - offset;
 * - media only. Rule that will be applied only in specified media query;
 * - content alignment;
 */
