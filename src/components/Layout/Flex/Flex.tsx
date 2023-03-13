/* eslint-disable react/display-name */
import React from 'react';

import {block} from '../../utils/cn';
import {Space, IsMediaActive} from '../types';
import {QAProps} from '../../types';
import {SPACE_TO_PIXEL} from '../constants';
import {useFlexThemeProps} from './useFlexThemeProps';

import './Flex.scss';

const b = block('flex');

type AdaptiveProp<T extends keyof React.CSSProperties> =
    | React.CSSProperties[T]
    | ((fn: IsMediaActive) => React.CSSProperties[T]);

export interface FlexProps<T extends React.ElementType> extends QAProps {
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
     */
    wrap?: React.CSSProperties['flexWrap'];
    width?: React.CSSProperties['width'];
    /**
     * display: inline-flex;
     */
    inline?: boolean;
    /**
     * `gap - true` - use space value for current media query from theme
     */
    gap?: Space | true;
    rowGap?: Space;
    /**
     * Space between children. Works like gap but supports in old browsers. Under the hoods uses negative margins. Vertical and horizontal directions are also supported
     *
     * `space - true` - use default theme space what depends at media query
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
    space?: true | Space | ((fn: IsMediaActive) => Space | undefined);
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
 *  space={matchMedia => matchMedia('m') ? 'l' : 'nano'}
 *  // `flex-direction: column` will be applied to `l`, 'xl', 'xxl' and `xxxl` media queries
 *  direction={matchMedia => matchMedia('m') ? 'row' : 'column'}
 * >
 *  {...}
 * </Flex>
 * ```
 */
export const Flex = React.forwardRef(
    <T extends React.ElementType = 'div'>(
        props: Omit<FlexProps<T>, 'ref'>,
        ref: React.ComponentPropsWithRef<T>['ref'],
    ) => {
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
            rowGap,
            className,
            space,
            qa,
            ...restProps
        } = props;

        const {isMediaActive, themeFlexProps} = useFlexThemeProps();

        let s: Space | undefined;

        if (typeof space === 'function') {
            s = space(isMediaActive);
        } else if (space === true) {
            s = themeFlexProps.space;
        } else {
            s = space;
        }

        let g: Space | undefined;

        if (gap === true) {
            g = themeFlexProps.space;
        } else {
            g = gap;
        }

        return (
            <Tag
                className={b(
                    {
                        inline,
                        s: gap || rowGap ? undefined : s,
                    },
                    className,
                )}
                style={{
                    width,
                    alignSelf,
                    flexDirection:
                        typeof direction === 'function' ? direction(isMediaActive) : direction,
                    flexGrow: grow === true ? 1 : grow,
                    flexWrap: wrap,
                    flexBasis: basis,
                    flexShrink: shrink,
                    gap: g ? SPACE_TO_PIXEL[g] : undefined,
                    rowGap: rowGap ? SPACE_TO_PIXEL[rowGap] : undefined,
                    justifyContent:
                        typeof justifyContent === 'function'
                            ? justifyContent(isMediaActive)
                            : justifyContent,
                    alignItems:
                        typeof alignItems === 'function' ? alignItems(isMediaActive) : alignItems,
                    ...style,
                }}
                title={title}
                ref={ref}
                data-qa={qa}
                {...restProps}
            >
                {children}
            </Tag>
        );
    },
);
