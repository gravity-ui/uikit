'use client';

import type * as React from 'react';

import type {QAProps} from '../../types';
import {block} from '../../utils/cn';
import {useLayoutContext} from '../hooks/useLayoutContext';
import type {ColSize, MediaPartial} from '../types';
import {makeCssMod} from '../utils';

import './Col.scss';

const b = block('col');

export interface ColProps extends QAProps {
    /**
     * @deprecated Use "size" prop. See https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
     */
    s?: MediaPartial<ColSize>['s'];
    /**
     * @deprecated Use "size" prop. See https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
     */
    m?: MediaPartial<ColSize>['m'];
    /**
     * @deprecated Use "size" prop. See https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
     */
    l?: MediaPartial<ColSize>['l'];
    /**
     * @deprecated Use "size" prop. See https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
     */
    xl?: MediaPartial<ColSize>['xl'];
    /**
     * @deprecated Use "size" prop. See https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
     */
    xxl?: MediaPartial<ColSize>['xxl'];
    size?: ColSize | [ColSize | undefined, MediaPartial<ColSize>] | MediaPartial<ColSize>;
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
 *   <Col/>
 *   <Col size="4">col 2</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
 */
export const Col = ({size, children, style, className, qa, ...mediaConfigProp}: ColProps) => {
    const {getClosestMediaProps} = useLayoutContext();

    let mediaConfig: MediaPartial<ColSize>;
    let defaultSizeMod: ColSize | undefined;

    if (Array.isArray(size)) {
        [defaultSizeMod, mediaConfig] = size;
    } else if (typeof size === 'object') {
        mediaConfig = size || mediaConfigProp;
    } else {
        defaultSizeMod = size;
        mediaConfig = mediaConfigProp;
    }

    const sizeModValue = getClosestMediaProps(mediaConfig);

    return (
        <div
            style={style}
            className={b(
                {
                    size:
                        typeof sizeModValue === 'undefined'
                            ? defaultSizeMod
                            : makeCssMod(sizeModValue),
                },
                className,
            )}
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
