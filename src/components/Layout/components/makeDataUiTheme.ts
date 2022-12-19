import merge from 'lodash/merge';
import {DATA_UI_LAYOUT_THEME} from '../constants';
import {LayoutTheme} from '../types';

interface MakeDataUiTheme {
    override?: Partial<LayoutTheme>;
}

/**
 * Use this function to override default `DATA_UI_LAYOUT_THEME`
 */
export const makeDataUiTheme = ({override = {}}: MakeDataUiTheme | undefined = {}) => {
    return merge(DATA_UI_LAYOUT_THEME, override);
};
