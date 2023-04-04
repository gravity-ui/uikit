/* eslint-disable valid-jsdoc */
import React from 'react';

import {block} from '../../utils/cn';
import {MediaType, Space, MediaPartial} from '../types';
import {sp} from '../spacing/spacing';
import {useContainerThemeProps} from './useContainerThemeProps';

import './Container.scss';

const b = block('container');

export interface ContainerProps {
    style?: React.CSSProperties;
    /**
     * Use function to define different classes in different media queries
     */
    className?: string;
    children?: React.ReactNode;
    /**
     * Width of container will never be larger then specified media type width
     */
    maxWidth?: MediaType;
    /**
     * Right and left paddings between content
     *
     * Take default values during `LayoutContext`
     */
    gutters?: Space | false;
    /**
     * Space between child `Row` components
     *
     * By default takes props via `LayoutContext`
     */
    spaceRow?: Space | MediaPartial<Space>;
    as?: keyof JSX.IntrinsicElements;
}

/**
 * Center you content in horizontal direction.
 *
 * > In most cases mast be one on the page.
 *
 * ```tsx
 * import {Container, Row, Col} from '@gravity-ui/uikit';
 *
 * <Container masWidth="m">
 *   <Row>
 *     <Col>
 *       Col 1
 *    </Col>
 *    <Col>
 *       Col 2
 *    </Col>
 *  </Row>
 * </Container>
 * ```
 */
export const Container = ({
    children,
    style,
    as: Tag = 'div',
    className,
    maxWidth,
    gutters,
    spaceRow,
}: ContainerProps) => {
    const {getClosestMediaProps, containerThemeProps} = useContainerThemeProps();

    return (
        <Tag
            style={style}
            className={b(
                {
                    mw: maxWidth,
                    sr:
                        (typeof spaceRow === 'object'
                            ? getClosestMediaProps(spaceRow)
                            : spaceRow) || containerThemeProps.spaceRow,
                },
                gutters === false
                    ? className
                    : sp(
                          {
                              px: gutters || containerThemeProps.gutters,
                          },
                          className,
                      ),
            )}
        >
            {children}
        </Tag>
    );
};
