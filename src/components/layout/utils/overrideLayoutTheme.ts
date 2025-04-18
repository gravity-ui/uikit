import merge from 'lodash/merge';

import type {LayoutTheme, RecursivePartial} from '../types';

interface OverrideLayoutThemeOptions {
    theme: LayoutTheme;
    override?: RecursivePartial<LayoutTheme>;
}

/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export function overrideLayoutTheme({theme, override}: OverrideLayoutThemeOptions): LayoutTheme {
    return merge(theme, override);
}
