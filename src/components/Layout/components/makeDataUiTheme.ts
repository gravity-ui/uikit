import merge from 'lodash/merge';
import {DEFAULT_LAYOUT_THEME} from '../constants';
import {LayoutTheme} from '../types';

interface MakeDataUiTheme {
    override?: Partial<LayoutTheme>;
}

/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export const makeDefaultTheme = ({override = {}}: MakeDataUiTheme | undefined = {}) => {
    return merge(DEFAULT_LAYOUT_THEME, override);
};
