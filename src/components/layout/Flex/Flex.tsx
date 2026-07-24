'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {Box} from '../Box/Box';
import type {BoxProps} from '../Box/Box';
import {getSpacingValue, useStyleProps} from '../hooks/useStyleProps';
import type {StyleHandlers} from '../hooks/useStyleProps';
import type {AdaptiveProp, BoxAlignmentStyleProps, LayoutComponentProps} from '../types';

import './Flex.scss';

const b = block('flex');

type AlignPropsNotSupportedByFlex = 'justifyItems' | 'placeItems';

export interface FlexStyleProps extends Omit<BoxAlignmentStyleProps, AlignPropsNotSupportedByFlex> {
    /** The direction in which to layout children. */
    direction?: AdaptiveProp<React.CSSProperties['flexDirection']>;
    /** Whether to wrap items onto multiple lines. */
    wrap?: AdaptiveProp<boolean | React.CSSProperties['flexWrap']>;
}

export interface FlexProps<T extends React.ElementType = 'div'>
    extends BoxProps<T>,
        Omit<BoxAlignmentStyleProps, AlignPropsNotSupportedByFlex>,
        FlexStyleProps {
    /**
     * display: inline-flex;
     */
    inline?: boolean;
}

export const flexStyleHandlers: StyleHandlers<keyof FlexStyleProps> = {
    direction: ['flexDirection'],
    wrap: [
        'flexWrap',
        (v) => {
            if (typeof v === 'boolean') {
                return v ? 'wrap' : 'nowrap';
            }
            return `${v}`;
        },
    ],
    justifyContent: ['justifyContent'],
    alignItems: ['alignItems', flexAlignValue],
    alignContent: ['alignContent', flexAlignValue],
    placeContent: ['placeContent', (v) => `${v}`.trim().split(/\s+/).map(flexAlignValue).join(' ')],
    gap: ['gap', getSpacingValue],
    columnGap: ['columnGap', getSpacingValue],
    rowGap: ['rowGap', getSpacingValue],
};

/**
 * Flexbox model utility component.
 *
 * ```tsx
 * import {Flex, Button} from '@gravity-ui/uikit';
 *
 * <Flex
 *  // take value from theme depends of current media query
 *  space
 * >
 *  <Button>
 *      Button 1
 *  </Button>
 *  <Button>
 *      Button 2
 *  </Button>
 * </Flex>
 * ```
 *
 * Use build in media goods via props
 *
 * ```tsx
 * <Flex
 *  // space dynamically changes instead of current media query
 *  space={{s: '1', m: '5'}}
 *  // `flex-direction: column` will be applied to `l`, 'xl', 'xxl' and `xxxl` media queries
 *  direction={{'s': 'column', 'm': 'row'}}
 * >
 *  {...}
 * </Flex>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#flex
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(props, ref) {
    const {style, ...otherProps} = useStyleProps(props, flexStyleHandlers);

    const {children, inline, className, ...restProps} = otherProps;

    return (
        <Box {...restProps} className={b({inline}, className)} style={style} ref={ref}>
            {children}
        </Box>
    );
}) as (<C extends React.ElementType = 'div'>(
    props: LayoutComponentProps<C, FlexProps<C>>,
) => React.ReactElement) & {displayName: string};

function flexAlignValue(value: unknown) {
    if (value === 'start') {
        return 'flex-start';
    }

    if (value === 'end') {
        return 'flex-end';
    }

    return `${value}`;
}
