import '../styles/styles.scss';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import {CloudTheme} from './theme';
import {withTheme} from './decorators/withTheme';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {ThemeProvider, MobileProvider} from '../src';
import {I18N} from '../src/i18n';

I18N.setDefaultLang(I18N.LANGS.en);

const withContextProvider = (Story, context) => {
    const theme = context.globals.theme;

    // хак для установки темы в доке
    context.parameters.backgrounds.default = theme;
    context.globals.backgrounds = {
        value: theme === 'light' ? 'white' : 'black',
    };

    context.globals.background = theme;

    return (
        <ThemeProvider theme={theme}>
            <MobileProvider>
                <Story {...context} />
            </MobileProvider>
        </ThemeProvider>
    );
};

export const decorators = [withTheme, withMobile, withLang, withContextProvider];

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
        defaultValue: 'light',
        toolbar: {
            icon: 'mirror',
            items: [
                {value: 'light', right: '☼', title: 'Light'},
                {value: 'dark', right: '☾', title: 'Dark'},
            ],
        },
    },
    lang: {
        name: 'Language',
        defaultValue: 'en',
        toolbar: {
            icon: 'globe',
            items: [
                {value: 'en', right: '🇬🇧', title: 'En'},
                {value: 'ru', right: '🇷🇺', title: 'Ru'},
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
