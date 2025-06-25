'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {Box} from '../Box/Box';
import type {BoxProps} from '../Box/Box';
import {useLayoutContext} from '../hooks/useLayoutContext';
import type {AdaptiveProp, MediaPartial, Space} from '../types';
import {makeCssMod} from '../utils';

import './Flex.scss';

const b = block('flex');

export interface FlexProps<T extends React.ElementType = 'div'> extends BoxProps<T> {
    /**
     * `flex-direction` property
     */
    direction?: AdaptiveProp<'flexDirection'>;
    /**
     * `flex-grow` property
     */
    grow?: true | React.CSSProperties['flexGrow'];
    /**
     * `flex-basis` property
     */
    basis?: React.CSSProperties['flexBasis'];
    /**
     * `flex-shrink` property
     */
    shrink?: React.CSSProperties['flexShrink'];
    /**
     * `align-` properties
     */
    alignContent?: AdaptiveProp<'justifyContent'>;
    alignItems?: AdaptiveProp<'alignItems'>;
    alignSelf?: AdaptiveProp<'alignSelf'>;
    /**
     * `justify-` properties
     */
    justifyContent?: AdaptiveProp<'justifyContent'>;
    justifyItems?: AdaptiveProp<'justifyItems'>;
    justifySelf?: AdaptiveProp<'justifySelf'>;
    /**
     * Shortcut for:
     *
     * ```css
     *  justify-content: center;
        align-items: center;
     * ```
     */
    centerContent?: true;
    /**
     * `flex-wrap` property
     *
     * If value equals `true`, add css property `flex-wrap: wrap`;
     */
    wrap?: true | React.CSSProperties['flexWrap'];
    /**
     * display: inline-flex;
     */
    inline?: boolean;
    gap?: Space | MediaPartial<Space>;
    gapRow?: Space | MediaPartial<Space>;
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
    space?: Space | MediaPartial<Space>;
}

type FlexRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type FlexPropsWithTypedAttrs<T extends React.ElementType> = FlexProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof FlexProps<T>>;

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
export const Flex = React.forwardRef(function Flex<T extends React.ElementType = 'div'>(
    props: FlexProps<T>,
    ref: FlexRef<T>,
) {
    const {
        as: propsAs,
        direction,
        grow,
        basis,
        children,
        style,
        alignContent,
        alignItems,
        alignSelf,
        justifyContent,
        justifyItems,
        justifySelf,
        shrink,
        wrap,
        inline,
        gap,
        gapRow,
        className,
        space,
        centerContent,
        ...restProps
    } = props;

    const as: React.ElementType = propsAs || 'div';

    const {
        getClosestMediaProps,
        theme: {spaceBaseSize},
    } = useLayoutContext();

    const applyMediaProps = <P,>(
        property?: P | MediaPartial<P extends MediaPartial<infer V> ? V : P>,
    ): P | (P extends MediaPartial<infer V> ? V : P) | undefined =>
        typeof property === 'object' && property !== null
            ? getClosestMediaProps(property)
            : property;

    const gapSpaceSize = applyMediaProps(gap);
    const columnGap =
        typeof gapSpaceSize === 'undefined' ? undefined : spaceBaseSize * Number(gapSpaceSize);

    const gapRowSpaceSize = applyMediaProps(gapRow) || gapSpaceSize;
    const rowGap =
        typeof gapRowSpaceSize === 'undefined'
            ? undefined
            : spaceBaseSize * Number(gapRowSpaceSize);

    const spaceSize = applyMediaProps(space);
    const s =
        typeof gap === 'undefined' &&
        typeof gapRow === 'undefined' &&
        typeof spaceSize !== 'undefined'
            ? makeCssMod(spaceSize)
            : undefined;

    return (
        <Box
            as={as}
            className={b(
                {
                    'center-content': centerContent,
                    inline,
                    s,
                },
                className,
            )}
            ref={ref}
            style={{
                flexDirection: applyMediaProps(direction),
                flexGrow: grow === true ? 1 : grow,
                flexWrap: wrap === true ? 'wrap' : wrap,
                flexBasis: basis,
                flexShrink: shrink,
                columnGap,
                rowGap,
                alignContent: applyMediaProps(alignContent),
                alignItems: applyMediaProps(alignItems),
                alignSelf: applyMediaProps(alignSelf),
                justifyContent: applyMediaProps(justifyContent),
                justifyItems: applyMediaProps(justifyItems),
                justifySelf: applyMediaProps(justifySelf),
                ...style,
            }}
            {...restProps}
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
    props: FlexPropsWithTypedAttrs<C> & {ref?: FlexRef<C>},
) => React.ReactElement) & {displayName: string};
