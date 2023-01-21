/* eslint-disable react/display-name */
import React from 'react';

import {block} from '../../../utils/cn';
import {MediaPartial, Space} from '../../types';
import {SPACE_TO_PIXEL} from '../../constants';
import {useLayoutContext} from '../useLayoutContext';

import './Flex.scss';

const b = block('flex');

export interface FlexProps<T extends React.ElementType> {
    as?: T;
    /**
     * `flex-direction` property
     */
    direction?: (
        m: MediaPartial<boolean>,
    ) => React.CSSProperties['flexDirection'] | React.CSSProperties['flexDirection'];
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
    justifyContent?: React.CSSProperties['justifyContent'];
    style?: React.CSSProperties;
    alignItems?: React.CSSProperties['alignItems'];
    /**
     * `flex-wrap` property
     */
    wrap?: React.CSSProperties['flexWrap'];
    className?: string;
    width?: React.CSSProperties['width'];
    /**
     * display: inline-flex;
     */
    inline?: boolean;
    title?: string;
    gap?: Space;
    /**
     * Space between children. Works like gap but supports in old browsers. Under the hoods uses negative margins
     *
     * `space - true` - useDefault theme space what depends at media query
     */
    space?: true | Space | ((medias: MediaPartial<boolean>) => Space | undefined);
    children?: React.ReactNode;
    ref?: React.ComponentPropsWithRef<T>['ref'];
    Component?: React.ComponentPropsWithRef<T>;
}

/**
 * Utility component - represent Flexbox model
 * For more convenient usage has build in `space` utility (extends Space interface and provide `mr`, `ml` and more space props)
 *
 * ---
 * @example
 * ```tsx
 * import {Flex} from '@gravity-ui/uikit';
 *
 * <Flex
 *  // take space between children from LayoutContext (depending of current media query)
 *  space
 *  direction={({mobile}) => mobile ? "column" : "row"}
 * >
 *  flex
 * </Flex>
 *
 * // or add flex styles to you existing component
 * // you componnet mast support `style` and classNameProps
 * <Flex Component={YouAwesomeComponent} justifyContent="center">
 *  awesome component content
 * </Flex>
 *
 * ```
 */
export const Flex = React.forwardRef(
    <T extends React.ElementType = 'div'>(
        {
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
            ...props
        }: Omit<FlexProps<T>, 'ref'>,
        ref: React.ComponentPropsWithRef<T>['ref'],
    ) => {
        const {activeMediasMap, theme} = useLayoutContext();

        const s = React.useMemo(() => {
            if (typeof space === 'function') {
                return space(activeMediasMap);
            }

            if (space === true) {
                return theme.space;
            }

            return space;
        }, [activeMediasMap, space, theme.space]);

        const componentProps = {
            className: b(
                {
                    inline,
                    s,
                },
                className,
            ),
            style: {
                width,
                alignSelf,
                flexDirection:
                    typeof direction === 'function' ? direction(activeMediasMap) : direction,
                flexGrow: grow === true ? 1 : grow,
                flexWrap: wrap,
                flexBasis: basis,
                flexShrink: shrink,
                justifyContent,
                alignItems,
                // TODO: поправить баг со складыванием пропсов gap + space
                gap: gap ? SPACE_TO_PIXEL[gap] : undefined,
                ...style,
            },
            title,
            ref,
            ...props,
        };

        if (Component) {
            return <Component {...componentProps}>{children}</Component>;
        }

        const Tag: React.ElementType = as || 'div';

        return <Tag {...componentProps}>{children}</Tag>;
    },
) as unknown as <T extends unknown, C extends React.ElementType>(
    props: T extends (args: infer B) => unknown
        ? Omit<FlexProps<C>, 'Component' | 'as' | 'ref'> & {Component: T} & B
        : Omit<FlexProps<C>, 'Component'>,
) => React.ReactElement | null;
