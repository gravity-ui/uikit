import React from 'react';
import {block} from '../../../utils/cn';
import {MEDIA_TO_MOD} from '../../constants';
import {MediaType, Space, MediaPartial} from '../../types';
import {spacing} from '../spacing/spacing';
import {useLayoutContext} from '../useLayoutContext';

import './Container.scss';

const b = block('container');

export interface ContainerProps {
    style?: React.CSSProperties;
    /**
     * Use function to define different classes in different media queries
     */
    className?: (m: MediaPartial<boolean>) => string | string;
    children?: React.ReactNode;
    /**
     * Take all available space
     */
    fluid?: boolean;
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
    spaceRow?: ((media: MediaPartial<boolean>) => Space) | Space;
    as?: keyof JSX.IntrinsicElements;
}

/**
 * Center you content by this component.
 *
 * In most cases mast be one on the page.
 *
 * ```tsx
 * import {Container, Row, Col} from '@gravity-ui/uikit';
 *
 * <Container masWidth="laptopM">
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
        fluid,
        gutters,
        disableGutters,
        spaceRow,
    }: ContainerProps) => {
        const {theme, activeMediasMap} = useLayoutContext();
        const additionClassName =
            typeof className === 'function' ? className(activeMediasMap) : className;

        return (
            <Tag
                style={style}
                className={b(
                    {
                        w: maxWidth && MEDIA_TO_MOD[maxWidth],
                        fl: fluid,
                        sr:
                            typeof spaceRow === 'function'
                                ? spaceRow(activeMediasMap)
                                : spaceRow || theme.spaceRow,
                    },
                    (gutters || theme.gutters) && !disableGutters
                        ? spacing(
                              {
                                  px: gutters || theme.gutters,
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
