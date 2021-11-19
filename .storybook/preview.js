import '../styles/styles.scss';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import {CloudTheme} from './theme';
import {withTheme} from './decorators/withTheme';
import {withMobile} from './decorators/withMobile';
import {ThemeProvider, MobileProvider} from '../src';

const withContextProvider = (Story, context) => {
    const theme = context.globals.theme;

    // хак для установки темы в доке
    context.parameters.backgrounds.default = theme;
    context.globals.backgrounds = {
        value: theme === 'light' ? 'white' : 'black',
    };

    context.globals.background = theme;

    // TODO: в будущем возможно появится вариант изменять динамически тему доки, нужно будет перейти на новый способ
    // context.parameters.docs.theme = theme === 'light' ? CommonTheme.light : CommonTheme.dark;

    return (
        <ThemeProvider>
            <MobileProvider>
                <Story {...context} />
            </MobileProvider>
        </ThemeProvider>
    );
};

export const decorators = [withTheme, withMobile, withContextProvider];

export const parameters = {
    docs: {
        theme: CloudTheme,
    },
    // FIXME: Disabled due to performance reasons. See https://github.com/storybookjs/storybook/issues/5551
    // actions: {
    //     argTypesRegex: '^on.*',
    // },
    jsx: {showFunctions: true}, // Для того, чтобы функции отображались в сорцах
    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
    backgrounds: {
        default: 'light',
        values: [
            {name: 'light', value: 'white'},
            {name: 'dark', value: 'rgba(45, 44, 51, 1)'},
        ],
    },
    options: {
        storySort: {
            order: ['Theme', 'Components'],
            method: 'alphabetical',
        },
    },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            items: [
                {value: 'light', icon: 'circle', title: 'Light'},
                {value: 'dark', icon: 'circlehollow', title: 'Dark'},
            ],
        },
    },
    lang: {
        name: 'Language',
        defaultValue: 'ru',
        toolbar: {
            icon: 'globe',
            items: [
                {value: 'ru', right: '🇷🇺', title: 'Ru'},
                {value: 'en', right: '🇺🇸', title: 'En'},
            ],
        },
    },
    platform: {
        name: 'Platform',
        defaultValue: 'desktop',
        toolbar: {
            items: [
                {value: 'desktop', title: 'Desktop', icon: 'browser'},
                {value: 'mobile', title: 'Mobile', icon: 'mobile'},
            ],
        },
    },
};
