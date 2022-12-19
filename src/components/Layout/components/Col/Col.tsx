import React from 'react';

import {block} from '../../../utils/cn';
import {MEDIA_TO_MOD} from '../../constants';
import {ColSize, MediaPartial, MediaType} from '../../types';

import './Col.scss';

const b = block('col');

export interface ColProps extends MediaPartial<ColSize> {
    /**
     * How many column of 12-th column layout will component take in all screen size.
     * Explicitly override col size in needed media query:
     *
     * ```tsx
     * <Col size="6" mobile="12" />
     * ```
     *
     * If not specified, assume that component take all available space.
     */
    size?: ColSize;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

function mediasToMods(mediasList: [MediaType, ColSize][]) {
    return mediasList.reduce<Record<string, ColSize>>((acc, [media, space]) => {
        acc[`s-${MEDIA_TO_MOD[media as MediaType]}`] = space;
        return acc;
    }, {});
}

/**
 * Describe columns of you 12-th column layout during this component.
 * Mast be used as a child of `Row` component.
 *
 * By default component takes all availible space. Use `size` props to specify exact dimension
 *
 * ```tsx
 * // default dehaviour (take all availible spase) overriden in mobile breakpoint
 * <Col mobile="12" >some content</Col>
 * ```
 * ---
 *
 * Note: you can use this empty component for spacing:
 *
 * ```tsx
 * <Row>
 *  <Col size="2">col 2</Col>
 *  <Col />
 *  <Col size="2">col 2</Col>
 * </Row>
 * ```
 */
export const Col = ({children, style, className, size, ...medias}: ColProps) => {
    const mediasList = Object.entries(medias) as [MediaType, ColSize][];

    return (
        <div
            style={style}
            className={b(
                {
                    s: size,
                    ...(mediasList.length > 0 ? mediasToMods(mediasList) : {}),
                },
                className,
            )}
        >
            {children}
        </div>
    );
};
