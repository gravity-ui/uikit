import '../styles/styles.scss';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {DecoratorFn} from '@storybook/react';
import {CloudTheme} from './theme';
import {withTheme} from './decorators/withTheme';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {ThemeProvider, MobileProvider, configure, Lang} from '../src';
import {DocsDecorator} from '../src/demo/DocsDecorator/DocsDecorator';

configure({
    lang: Lang.En,
});

const withContextProvider: DecoratorFn = (Story, context) => {
    return (
        <ThemeProvider>
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
        container: DocsDecorator,
    },
    // FIXME: Disabled due to performance reasons. See https://github.com/storybookjs/storybook/issues/5551
    // actions: {
    //     argTypesRegex: '^on.*',
    // },
    jsx: {showFunctions: true}, // Для того, чтобы функции отображались в сорцах
    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
    options: {
        storySort: {
            order: ['Theme', 'Components', ['Basic']],
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
