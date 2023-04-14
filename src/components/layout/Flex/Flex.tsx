/* eslint-disable react/display-name */
import React from 'react';

import {block} from '../../utils/cn';
import {Space, MediaPartial} from '../types';
import {QAProps} from '../../types';
import {useLayoutContext} from '../hooks/useLayoutContext';
import {makeCssMod} from '../utils';

import './Flex.scss';

const b = block('flex');

type AdaptiveProp<T extends keyof React.CSSProperties> =
    | React.CSSProperties[T]
    | MediaPartial<React.CSSProperties[T]>;

export interface FlexProps<T extends React.ElementType = 'div'> extends QAProps {
    as?: T;
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
    alignSelf?: React.CSSProperties['alignSelf'];
    justifyContent?: AdaptiveProp<'justifyContent'>;
    alignItems?: AdaptiveProp<'alignItems'>;
    /**
     * `flex-wrap` property
     *
     * If value equals `true`, add css property `flex-wrap: wrap`;
     */
    wrap?: true | React.CSSProperties['flexWrap'];
    width?: number;
    /**
     * display: inline-flex;
     */
    inline?: boolean;
    gap?: Space | MediaPartial<Space>;
    gapRow?: Space | MediaPartial<Space>;
    /**
     * Space between children. Works like gap but supports in old browsers. Under the hoods uses negative margins. Vertical and horizontal directions are also supported
     *
     * ---
     * instead of ~imperfection of the world~ browser compatibility for margins between layout components used negative margins there is passible issues with `background-color` css property and others that depends of current block position. Use in this situations wrappers. In future version this issues will be avoided during flex `gap` properties
     *
     * ```tsx
     * // wrong
     * <Flex>
     *   <SomeComponentWIthBackground />
     *   <SomeComponentWIthBackground />
     * </Flex>
     *
     * // right
     * <Flex>
     *   <div>
     *     <SomeComponentWIthBackground />
     *   </div>
     *   <div>
     *     <SomeComponentWIthBackground />
     *   </div>
     * </Flex>
     * ```
     */
    space?: Space | MediaPartial<Space>;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    title?: string;
    ref?: React.ComponentPropsWithRef<T>['ref'];
}

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
 */
export const Flex = React.forwardRef(function Flex<T extends React.ElementType = 'div'>(
    props: Omit<FlexProps<T>, 'ref'>,
    ref: React.ComponentPropsWithRef<T>['ref'],
) {
    const {
        as: Tag = 'div',
        justifyContent,
        direction,
        width,
        grow,
        alignSelf,
        basis,
        children,
        style,
        alignItems,
        shrink,
        wrap,
        inline,
        title,
        gap,
        gapRow,
        className,
        space,
        qa,
        ...restProps
    } = props;

    const {
        getClosestMediaProps,
        theme: {spaceBaseSize},
    } = useLayoutContext();

    let spaceSize: Space | undefined;
    let gapSpaceSize: Space | undefined;
    let gapRowSpaceSize: Space | undefined;
    let columnGap: number | undefined;
    let rowGap: number | undefined;
    let s: string | undefined;

    if (typeof space === 'object') {
        spaceSize = getClosestMediaProps(space);
    } else {
        spaceSize = space;
    }

    if (typeof gap === 'object') {
        gapSpaceSize = getClosestMediaProps(gap);
    } else {
        gapSpaceSize = gap;
    }

    if (typeof gapRow === 'object') {
        gapRowSpaceSize = getClosestMediaProps(gapRow);
    } else if (gapRow) {
        gapRowSpaceSize = gapRow;
    } else if (gapSpaceSize) {
        gapRowSpaceSize = gapSpaceSize;
    }

    if (gapSpaceSize) {
        columnGap = spaceBaseSize * Number(gapSpaceSize);
    }
    if (gapRowSpaceSize) {
        rowGap = spaceBaseSize * Number(gapRowSpaceSize);
    }

    if (!gap && !gapRow && spaceSize) {
        s = makeCssMod(spaceSize);
    }

    return (
        <Tag
            className={b(
                {
                    inline,
                    s,
                },
                className,
            )}
            style={{
                width,
                alignSelf,
                flexDirection:
                    typeof direction === 'object' ? getClosestMediaProps(direction) : direction,
                flexGrow: grow === true ? 1 : grow,
                flexWrap: wrap === true ? 'wrap' : wrap,
                flexBasis: basis,
                flexShrink: shrink,
                columnGap,
                rowGap,
                justifyContent:
                    typeof justifyContent === 'object'
                        ? getClosestMediaProps(justifyContent)
                        : justifyContent,
                alignItems:
                    typeof alignItems === 'object' ? getClosestMediaProps(alignItems) : alignItems,
                ...style,
            }}
            title={title}
            ref={ref}
            data-qa={qa}
            {...restProps}
        >
            {space
                ? React.Children.map(children, (child) =>
                      // `space` uses negative margins under the hood. This is hack to prevent wrong background position appearance.
                      child ? <div className={b('wr')}>{child}</div> : child,
                  )
                : children}
        </Tag>
    );
});
