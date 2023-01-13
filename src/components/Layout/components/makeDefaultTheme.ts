/* eslint-disable valid-jsdoc */
import merge from 'lodash/merge';
import {DEFAULT_LAYOUT_THEME} from '../constants';
import {LayoutTheme, PartialLayoutTheme} from '../types';

interface MakeDefaultLayoutTheme {
    override?: PartialLayoutTheme;
}

/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export const makeDefaultTheme = ({
    override,
}: MakeDefaultLayoutTheme | undefined = {}): LayoutTheme => {
    return merge(DEFAULT_LAYOUT_THEME, override);
};
