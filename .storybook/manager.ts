import {addons} from '@storybook/manager-api';

import {themes} from './theme';

addons.setConfig({
    theme: themes.light,
});
