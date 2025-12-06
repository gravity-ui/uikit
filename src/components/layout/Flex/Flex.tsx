'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {Box} from '../Box/Box';
import type {BoxProps} from '../Box/Box';
import {useLayoutContext} from '../hooks/useLayoutContext';
import {getSpacingValue, useStyleProps} from '../hooks/useStyleProps';
import type {StyleHandlers} from '../hooks/useStyleProps';
import type {
    AdaptiveProp,
    BoxAlignmentStyleProps,
    LayoutComponentProps,
    Space,
    SpacingValue,
} from '../types';
import {makeCssMod} from '../utils';

import './Flex.scss';

const b = block('flex');

interface DeprecatedProps {
    /**
     * `flex-grow` property
     * @deprecated use flexGrow instead
     */
    grow?: true | React.CSSProperties['flexGrow'];
    /**
     * `flex-basis` property
     * @deprecated use flexBasis instead
     */
    basis?: React.CSSProperties['flexBasis'];
    /**
     * `flex-shrink` property
     * @deprecated use flexShrink instead
     */
    shrink?: React.CSSProperties['flexShrink'];
    /**
     * Shortcut for:
     *
     * ```css
     *  justify-content: center;
        align-items: center;
     * ```
     * @deprecated
     */
    centerContent?: true;
    /**
     * @deprecated use rowGap instead
     */
    gapRow?: AdaptiveProp<Space>;
    /**
     * @deprecated - use native gap property
     * Space between children. Works like gap but supports in old browsers. Under the hoods uses negative margins. Vertical and horizontal directions are also supported
     *
     * ---
     * instead of ~imperfection of the world~ browser compatibility for margins between layout components used negative margins there is passible issues with `background-color` css property and others that depends of current block position. Use in this situations wrappers. In future version this issues will be avoided during flex `gap` properties
     *
     * ```tsx
     * // wrong
     * <Flex>
     *   <SomeComponentWithBackground />
     *   <SomeComponentWithBackground />
     * </Flex>
     *
     * // right
     * <Flex>
     *   <div>
     *     <SomeComponentWithBackground />
     *   </div>
     *   <div>
     *     <SomeComponentWithBackground />
     *   </div>
     * </Flex>
     * ```
     */
    space?: AdaptiveProp<Space>;
}

interface FlexStyleProps
    extends Omit<BoxAlignmentStyleProps, 'gap' | 'justifyItems' | 'placeItems'> {
    /** The direction in which to layout children. */
    direction?: AdaptiveProp<React.CSSProperties['flexDirection']>;
    /** Whether to wrap items onto multiple lines. */
    wrap?: AdaptiveProp<boolean | React.CSSProperties['flexWrap']>;
    /**
     * TODO: use gap from BoxAlignmentStyleProps
     */
    gap?: AdaptiveProp<Space | SpacingValue>;
}

export interface FlexProps<T extends React.ElementType = 'div'>
    extends BoxProps<T>,
        FlexStyleProps,
        DeprecatedProps {
    /**
     * display: inline-flex;
     */
    inline?: boolean;
}

const flexStyleHandlers: StyleHandlers<keyof FlexStyleProps> = {
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
    gap: [
        'gap',
        (v) => {
            const n = Number(v);
            if (Number.isInteger(n)) {
                return getSpacingValue(`spacing-${n}`);
            }
            if (n === 0.5) {
                return getSpacingValue('spacing-half');
            }
            return getSpacingValue(v);
        },
    ],
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

    const {
        grow,
        basis,
        children,
        shrink,
        inline,
        gapRow,
        className,
        space,
        centerContent,
        ...restProps
    } = otherProps;

    const {getClosestMediaProps} = useLayoutContext();

    const gapRowSpaceSize = getClosestMediaProps(gapRow);
    if (gapRowSpaceSize !== undefined && props.rowGap === undefined) {
        style.rowGap = `calc(var(--g-spacing-base) * ${Number(gapRowSpaceSize)})`;
    }

    const spaceSize = getClosestMediaProps(space);
    const s =
        style.gap === undefined &&
        style.columnGap === undefined &&
        style.rowGap === undefined &&
        typeof spaceSize !== 'undefined'
            ? makeCssMod(spaceSize)
            : undefined;

    if (props.flexGrow === undefined && grow !== undefined) {
        style.flexGrow = grow === true ? '1' : grow;
    }
    if (props.flexBasis === undefined && basis !== undefined) {
        style.flexBasis = basis;
    }
    if (props.flexShrink === undefined && shrink !== undefined) {
        style.flexShrink = shrink;
    }

    return (
        <Box
            {...restProps}
            className={b(
                {
                    'center-content': centerContent,
                    inline,
                    s,
                },
                className,
            )}
            style={style}
            ref={ref}
        >
            {space
                ? React.Children.map(children, (child) =>
                      // `space` uses negative margins under the hood. This is hack to prevent wrong background position appearance.
                      child ? <div className={b('wr')}>{child}</div> : child,
                  )
                : children}
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
