/* eslint-disable valid-jsdoc */
import React from 'react';
import {useLayoutContext} from '../../hooks/useLayoutContext';

import {block} from '../../../utils/cn';
import {ColSize, MediaPartial} from '../../types';

import './Col.scss';

const b = block('col');

export interface ColProps extends MediaPartial<ColSize> {
    /**
     * How many column of 12-th column layout will component take in all screen size.
     * Explicitly override col size in needed media query:
     *
     * ```tsx
     * <Col size="12" m="6" />
     * ```
     *
     * If not specified, assume that component take all available space.
     */
    size?: ColSize;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

/**
 * Describe columns of you 12-th column layout during this component.
 * Mast be used as a child of `Row` component.
 *
 * By default component takes all available space. Use `size` props to specify exact dimension
 *
 * ```tsx
 * <Col size="12">some content</Col>
 * ```
 * ---
 *
 * Note: you can use this empty component for spacing:
 *
 * ```tsx
 * <Row>
 *  <Col size="2" l="1">col 2</Col>
 *  <Col />
 *  <Col size="2" l="1">col 2</Col>
 * </Row>
 * ```
 */
export const Col = React.memo(({children, style, className, size, ...media}: ColProps) => {
    const {getClosestMediaProps} = useLayoutContext();

    return (
        <div
            style={style}
            className={b(
                {
                    /**
                     * priority:
                     * - match with media query and rules for this query
                     * - size prop as default behavior
                     */
                    s: getClosestMediaProps(media) || size,
                },
                className,
            )}
        >
            {children}
        </div>
    );
});

Col.displayName = 'Col';
