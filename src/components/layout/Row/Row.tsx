/* eslint-disable valid-jsdoc */
import React from 'react';
import {block} from '../../utils/cn';
import {Space, MediaPartial} from '../types';
import {useRowThemeProps} from './useRowThemeProps';

import './Row.scss';

const b = block('row');

export interface RowProps {
    style?: React.CSSProperties;
    /**
     * Space between children `<Col />` components. Gaps are saved if children go to another line
     *
     * If not specified takes props via `LayoutContext`
     */
    space?: Space | MediaPartial<Space>;
    /**
     * Override default (space) vertical gaps between children if it wrap on next line
     */
    spaceRow?: Space | MediaPartial<Space>;
    className?: string;
    children?: React.ReactNode;
}

/**
 * Defines the margins between columns (`<Col />`).
 * By default, accepts all possible props via `LayoutContext'.
 * This props can be overridden by defining the prop directly on the jsx
 *
 * Required to use with `<Col />` component
 *
 * ```tsx
 * import {Row, Col} from '@gravity-ui/uikit';
 *
 * <Row>
 *  <Col>col</Col>
 *  <Col>col</Col>
 * </Row>
 * ```
 */
export const Row = ({children, style, className, space, spaceRow}: RowProps) => {
    const {getClosestMediaProps, rowThemeProps} = useRowThemeProps();

    return (
        <div
            style={style}
            className={b(
                {
                    s:
                        (typeof space === 'object' ? getClosestMediaProps(space) : space) ||
                        rowThemeProps.space,
                    sr:
                        (typeof spaceRow === 'object'
                            ? getClosestMediaProps(spaceRow)
                            : spaceRow) ||
                        rowThemeProps.spaceRow ||
                        rowThemeProps.space,
                },
                className,
            )}
        >
            {children}
        </div>
    );
};
