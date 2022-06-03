import React from 'react';
import type {DecoratorFn} from '@storybook/react';
import {useTheme} from '../../src';

export const withTheme: DecoratorFn = (Story, context) => {
    const themeValue = context.globals.theme;
    const [theme, setTheme] = useTheme();

    React.useEffect(() => {
        if (theme !== themeValue) {
            setTheme(themeValue);
        }
    }, [theme, themeValue, setTheme]);

    return <Story {...context} />;
};
