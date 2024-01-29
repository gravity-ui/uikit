import React from 'react';

import {addons, types} from '@storybook/addons';
import {useGlobals} from '@storybook/api';
import type {API} from '@storybook/api';

import {getThemeType} from '../../src/components/theme/getThemeType';
import {themes} from '../theme';

const ADDON_ID = 'g-theme-addon';
const TOOL_ID = `${ADDON_ID}tool`;

addons.register(ADDON_ID, (api) => {
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: 'Theme',
        render: () => {
            return <Tool api={api} />;
        },
    });
});

function Tool({api}: {api: API}) {
    const [{theme}] = useGlobals();
    React.useEffect(() => {
        api.setOptions({theme: themes[getThemeType(theme)]});
    }, [theme]);
    return null;
}
