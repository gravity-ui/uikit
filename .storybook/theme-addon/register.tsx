import * as React from 'react';

import type {API} from 'storybook/manager-api';
import {addons, types, useGlobals} from 'storybook/manager-api';

import {themes} from '../theme';

const DARK_THEMES = new Set(['dark', 'dark-hc']);

const ADDON_ID = 'g-theme-addon';
const TOOL_ID = `${ADDON_ID}tool`;

addons.register(ADDON_ID, (api) => {
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: 'Theme',
        render: () => {
            return React.createElement(Tool, {api});
        },
    });
});

function Tool({api}: {api: API}) {
    const [{theme}] = useGlobals();
    React.useEffect(() => {
        api.setOptions({theme: themes[DARK_THEMES.has(theme) ? 'dark' : 'light']});
    }, [theme]);
    return null;
}
