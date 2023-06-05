/* eslint-disable valid-jsdoc */
import merge from 'lodash/merge';

import {DEFAULT_LAYOUT_THEME} from '../constants';
import type {LayoutTheme, RecursivePartial} from '../types';

interface MakeDefaultLayoutTheme {
    override?: RecursivePartial<LayoutTheme>;
}

/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export const makeLayoutDefaultTheme = ({
    override,
}: MakeDefaultLayoutTheme | undefined = {}): LayoutTheme => {
    return merge(DEFAULT_LAYOUT_THEME, override);
};
