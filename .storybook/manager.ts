import {addons} from 'storybook/manager-api';

import {themes} from './theme';
import './theme-addon/register';
import './theme-import-addon/register';

addons.setConfig({
    theme: themes.light,
});
