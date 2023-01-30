import React from 'react';

import {block} from '../../../utils/cn';
import {MediaType, Space, IsMediaActive} from '../../types';
import {sp} from '../spacing/spacing';
import {useContainerThemeProps} from './useContainerThemeProps';

import './Container.scss';

const b = block('container');

export interface ContainerProps {
    style?: React.CSSProperties;
    /**
     * Use function to define different classes in different media queries
     */
    className?: (fn: IsMediaActive) => string | string;
    children?: React.ReactNode;
    /**
     * Max width equals max width of current breakpoint
     */
    fixed?: boolean;
    /**
     * Width of container will never be larger then specified media type width
     */
    maxWidth?: MediaType;
    /**
     * Right and left paddings between content
     *
     * Take default values during `LayoutContext`
     */
    gutters?: Space;
    /**
     * Remove gutters
     */
    disableGutters?: boolean;
    /**
     * Space between child `Row` components
     *
     * By default takes props via `LayoutContext`
     */
    spaceRow?: ((fn: IsMediaActive) => Space) | Space;
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
export const Container = React.memo(
    ({
        children,
        style,
        as: Tag = 'div',
        className,
        maxWidth,
        gutters,
        disableGutters,
        spaceRow,
    }: ContainerProps) => {
        const {isMediaActive, containerThemeProps} = useContainerThemeProps();

        const additionClassName =
            typeof className === 'function' ? className(isMediaActive) : className;

        return (
            <Tag
                style={style}
                className={b(
                    {
                        mw: maxWidth,
                        sr:
                            typeof spaceRow === 'function'
                                ? spaceRow(isMediaActive)
                                : spaceRow || containerThemeProps.spaceRow,
                    },
                    (gutters || containerThemeProps.gutters) && !disableGutters
                        ? sp(
                              {
                                  px: gutters || containerThemeProps.gutters,
                              },
                              additionClassName,
                          )
                        : additionClassName,
                )}
            >
                {children}
            </Tag>
        );
    },
);

Container.displayName = 'Container';
