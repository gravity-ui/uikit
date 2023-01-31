/* eslint-disable valid-jsdoc */
import React from 'react';

import {block} from '../../../utils/cn';
import {ColSize, MediaPartial} from '../../types';

import './Col.scss';

const b = block('col');

export interface ColProps extends MediaPartial<ColSize> {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

/**
 * How many columns of you 12-th column layout will take content.
 * Mast be used as a child of `Row` component.
 *
 * By default component takes all available space.
 * If you wont to specify static size to all media queries use `s` prop. In mobile first layout grid is first passible value.
 *
 * ```tsx
 * <Col s="12">some content</Col>
 * ```
 * ---
 *
 * Note: you can use this empty component for spacing:
 *
 * ```tsx
 * <Row>
 *  <Col s="2" l="1">col 2</Col>
 *  <Col />
 *  <Col s="2" l="1">col 2</Col>
 * </Row>
 * ```
 *
 * ---
 * instead of ~imperfection of the world~ browser compatibility for margins between layout components used negative margins there is passible issues with `background-color` css property and others that depends of current block position. Use in this situations wrappers. In future version this issues will be avoided during flex `gap` properties
 *
 * ```tsx
 * // wrong
 * <Col>
 *      <SomeComponentWIthBackground />
 * </Col>
 *
 * // right
 * <Col>
 *   <div>
 *     <SomeComponentWIthBackground />
 *   </div>
 * </Col>
 * ```
 */
export const Col = ({children, style, className, ...media}: ColProps) => {
    const mods = React.useMemo(
        () =>
            Object.entries(media).reduce((acc, [mod, modSize]) => {
                acc[`s-${mod}`] = modSize;

                return acc;
            }, {} as Record<string, ColSize>),
        [media],
    );

    return (
        <div style={style} className={b(mods, className)}>
            {children}
        </div>
    );
};

/**
 * Possible improvements that the customer is looking for:
 * - props for vertical alignment in row;
 * - offset;
 * - media only. Rule that will be applied only in specified media query;
 * - alias for 's' media query like `size` prop for example;
 * - content alignment;
 */
