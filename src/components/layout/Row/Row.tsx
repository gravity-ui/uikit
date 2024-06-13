'use client';

/* eslint-disable valid-jsdoc */
import React from 'react';

import type {QAProps} from '../../types';
import {block} from '../../utils/cn';
import {useLayoutContext} from '../hooks/useLayoutContext';
import type {MediaPartial, Space} from '../types';
import {makeCssMod} from '../utils';

import './Row.scss';

const b = block('row');

export interface RowProps extends QAProps {
    style?: React.CSSProperties;
    /**
     * Vertical and horizontal `space` between children `<Col />` components.
     */
    space: Space | MediaPartial<Space>;
    /**
     * Override default (space) vertical gaps between children if it wrap on next line
     */
    spaceRow?: Space | MediaPartial<Space>;
    className?: string;
    children?: React.ReactNode;
}

/**
 * Defines the margins between columns (`<Col />`).
 *
 * Required to use with `<Col />` component
 *
 * ```tsx
 * import {Row, Col} from '@gravity-ui/uikit';
 *
 * <Row space="5">
 *  <Col>col</Col>
 *  <Col>col</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#row
 */
export const Row = ({children, style, className, space, spaceRow, qa}: RowProps) => {
    const {getClosestMediaProps} = useLayoutContext();

    let s: string | undefined;
    let sr: string | undefined;

    if (typeof space === 'object') {
        const res = getClosestMediaProps(space);

        if (res) {
            s = makeCssMod(res);
        }
    } else if (space) {
        s = makeCssMod(space);
    }

    if (typeof spaceRow === 'object') {
        const res = getClosestMediaProps(spaceRow);

        if (res) {
            sr = makeCssMod(res);
        }
    } else if (spaceRow) {
        sr = String(spaceRow);
    }

    return (
        <div
            style={style}
            className={b(
                {
                    s,
                    sr,
                },
                className,
            )}
            data-qa={qa}
        >
            {children}
        </div>
    );
};
