import * as React from 'react';

import {LayoutContext} from '../contexts/LayoutContext';
import type {LayoutTheme, MediaType} from '../types';
import {getClosestMediaPropsFactory, isMediaActiveFactory} from '../utils';

interface ComputedMediaContext {
    theme: LayoutTheme;
    /**
     *
     *  > Note: `s` breakpoint starts from `0px` and and's with `m` - 1px
     *
     * ```tsx
     * import {useLayoutContext} from '@gravity-ui/uikit';
     *
     * const Component = () => {
     *  const {activeMediaQuery} = useLayoutContext();
     *
     *  return (
     *      <>
     *          {activeMediaQuery === 'l' ? (
     *              <Text>I am rendering only on screen resolution - "l"</Text>
     *          ) : null}
     *      </>
     *  );
     * };
     * ```
     */
    activeMediaQuery: MediaType;
    /**
     * Returns a boolean value if the passed value is equal to or greater than the currently active media expression.
     * It is necessary to describe the logic of adaptive behavior of elements taking into account the mobile-first approach
     * ```tsx
     * import {useLayoutContext} from '@gravity-ui/uikit';
     *
     * // this example of code will be shown on l, xl, xxl and xxxl screen sizes
     * const Component = () => {
     * const {isMediaActive} = useLayoutContext();
     *
     *  return (
     *      <>{isMediaActive('xl') ? <Text>i'm rendering on "l", "xl", "xxl" and "xxxl" screen sizes</Text> : null}</>;
     *  );
     * };
     * ```
     */
    isMediaActive: ReturnType<typeof isMediaActiveFactory>;
    /**
     * It works in a similar way to is Media Active, only it takes map as an argument in the keys of screen resolutions.
     * Returns the nearest available key value taking into account the mobile first approach.
     *
     * ```tsx
     * import {useLayoutContext} from '@gravity-ui/uikit';
     *
     * const mapOfPropsByScreen = {
     *  s: "i'm will be shown on 's' and 'n' screen size",
     *  l: "i'm will be shown on 'l' and 'xl' screen size",
     *  xxl: "i'm will be shown on 'xxl' and 'xxxl' screen size",
     * };
     *
     * const Component = () => {
     *  const {getClosestMediaProps} = useLayoutContext();
     *
     *  return <Text>{mapOfPropsByScreen(mapOfPropsByScreen)}</Text>;
     * };
     * ```
     */
    getClosestMediaProps: ReturnType<typeof getClosestMediaPropsFactory>;
}

/**
 * Quick access to theme and helpers to work with media queries
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#uselayoutcontext
 */
export const useLayoutContext = (): ComputedMediaContext => {
    const {activeMediaQuery, theme} = React.useContext(LayoutContext);

    const {isMediaActive, getClosestMediaProps} = React.useMemo(
        () => ({
            isMediaActive: isMediaActiveFactory(activeMediaQuery),
            getClosestMediaProps: getClosestMediaPropsFactory(activeMediaQuery),
        }),
        [activeMediaQuery],
    );

    return {
        theme,
        activeMediaQuery,
        isMediaActive,
        getClosestMediaProps,
    };
};
