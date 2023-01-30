/* eslint-disable react/display-name */
import React from 'react';

import {block} from '../../../utils/cn';
import {Space, IsMediaActive} from '../../types';
import {QAProps} from '../../../types';
import {SPACE_TO_PIXEL} from '../../constants';
import {useFlexThemeProps} from './useFlexThemeProps';

import './Flex.scss';

const b = block('flex');

export interface FlexPassThroughProps<T extends React.ElementType> {
    style?: React.CSSProperties;
    className?: string;
    title?: string;
    ref?: React.ComponentPropsWithRef<T>['ref'];
    ['data-qa']?: string;
}

type AdaptiveProp<T extends keyof React.CSSProperties> =
    | React.CSSProperties[T]
    | ((fn: IsMediaActive) => React.CSSProperties[T]);

export interface FlexProps<T extends React.ElementType>
    extends Omit<FlexPassThroughProps<T>, 'data-qa'>,
        QAProps {
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
    gap?: Space;
    /**
     * Space between children. Works like gap but supports in old browsers. Under the hoods uses negative margins. Vertical and horizontal directions are also supported
     *
     * `space - true` - useDefault theme space what depends at media query
     */
    space?: true | Space | ((fn: IsMediaActive) => Space | undefined);
    children?: React.ReactNode;
    Component?: React.ComponentPropsWithRef<T>;
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
 * You can add flex styles to existing component:
 *
 * > you component mast support `style` and `className` props
 *
 * ```tsx
 * <Flex Component={YouAwesomeComponent} justifyContent="center" {...{/ you component props /}}>
 *  awesome component content
 * </Flex>
 *
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
export const Flex = React.memo(
    React.forwardRef(
        <T extends React.ElementType = 'div'>(
            props: Omit<FlexProps<T>, 'ref'>,
            ref: React.ComponentPropsWithRef<T>['ref'],
        ) => {
            const {
                as,
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
                className,
                space,
                Component,
                qa,
                ...restProps
            } = props;

            const {isMediaActive, themeFlexProps} = useFlexThemeProps();

            const s = React.useMemo(() => {
                if (typeof space === 'function') {
                    return space(isMediaActive);
                }

                if (space === true) {
                    return themeFlexProps.space;
                }

                return space;
            }, [isMediaActive, space, themeFlexProps.space]);

            const passThroughProps: FlexPassThroughProps<T> = {
                className: b(
                    {
                        inline,
                        s: gap ? undefined : s,
                    },
                    className,
                ),
                style: {
                    width,
                    alignSelf,
                    flexDirection:
                        typeof direction === 'function' ? direction(isMediaActive) : direction,
                    flexGrow: grow === true ? 1 : grow,
                    flexWrap: wrap,
                    flexBasis: basis,
                    flexShrink: shrink,
                    justifyContent:
                        typeof justifyContent === 'function'
                            ? justifyContent(isMediaActive)
                            : justifyContent,
                    alignItems:
                        typeof alignItems === 'function' ? alignItems(isMediaActive) : alignItems,
                    gap: gap ? SPACE_TO_PIXEL[gap] : undefined,
                    ...style,
                },
                title,
                ref,
                ['data-qa']: qa,
                ...restProps,
            };

            if (Component) {
                return <Component {...passThroughProps}>{children}</Component>;
            }

            const Tag: React.ElementType = as || 'div';

            return <Tag {...passThroughProps}>{children}</Tag>;
        },
    ),
) as unknown as <T extends unknown, C extends React.ElementType>(
    props: T extends (args: infer B) => unknown
        ? // If Component is passed as a props, that component props are auto inferred and Flex props which inappropriate are omitted
          Omit<FlexProps<C>, 'Component' | 'as' | 'ref'> & {Component: T} & B
        : Omit<FlexProps<C>, 'Component'>,
) => React.ReactElement | null;
