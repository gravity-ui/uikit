/* eslint-disable valid-jsdoc */
import React from 'react';
import {ActiveMediaQuery, LayoutTheme, RecursivePartial} from '../types';
import {getClosestMediaPropsFactory, isMediaActiveFactory} from '../utils';
import {LayoutContext} from '../contexts/LayoutContext';

interface ComputedMediaContext {
    theme: RecursivePartial<LayoutTheme>;
    /**
     * Current active media query
     * Note: `s` breakpoint starts from 0 and and's with `m` - 1px
     */
    activeMediaQuery: ActiveMediaQuery;
    /**
     * For example: current active media `l`.
     * ```
     * - isMediaActive('l') // true
     * - isMediaActive('xl') // true
     * - isMediaActive('m') // false
     * ```
     */
    isMediaActive: ReturnType<typeof isMediaActiveFactory>;
    /**
     * For example: current active media `xl`.
     * ```
     * - getClosestMediaProps({s: 's', m: 'm'}) // 'm'
     * - getClosestMediaProps({xxl: /.../}) // undefined
     * - getClosestMediaProps({s: 's', xl: 'xl'}) // 'xl'
     * ```
     */
    getClosestMediaProps: ReturnType<typeof getClosestMediaPropsFactory>;
}

/**
 * Quick access to theme and helpers to work with media queries
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
