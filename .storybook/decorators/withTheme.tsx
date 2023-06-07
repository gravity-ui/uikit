import React from 'react';

import type {Decorator} from '@storybook/react';

import {useTheme} from '../../src';

export const WithTheme: Decorator = (Story, context) => {
    const themeValue = context.globals.theme;
    const [theme, setTheme] = useTheme();

    React.useEffect(() => {
        if (theme !== themeValue) {
            setTheme(themeValue);
        }
    }, [theme, themeValue, setTheme]);

    return <Story {...context} />;
};
