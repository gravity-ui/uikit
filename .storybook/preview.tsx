// eslint-disable-next-line import/order
import '../styles/fonts.scss';
// eslint-disable-next-line import/order
import '../styles/styles.scss';
import React from 'react';

import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {Decorator, Preview} from '@storybook/react';
import {withScreenshot} from 'storycap';

import {Lang, MobileProvider, ThemeProvider, configure} from '../src';
import {DocsDecorator} from '../src/demo/DocsDecorator/DocsDecorator';

import {WithLang} from './decorators/withLang';
import {WithMobile} from './decorators/withMobile';
import {themes} from './theme';

configure({
    lang: Lang.En,
});

const withContextProvider: Decorator = (Story, context) => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={context.globals.theme}>
                <MobileProvider>
                    <Story {...context} />
                </MobileProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export const decorators = [
    withScreenshot, // Registration the decorator is required
];

const preview: Preview = {
    decorators: [WithMobile, WithLang, withContextProvider, withScreenshot],
    parameters: {
        docs: {
            theme: themes.light,
            container: DocsDecorator,
        },
        // FIXME: Disabled due to performance reasons. See https://github.com/storybookjs/storybook/issues/5551
        // actions: {
        //     argTypesRegex: '^on.*',
        // },
        jsx: {showFunctions: true}, // To show functions in sources
        viewport: {
            viewports: MINIMAL_VIEWPORTS,
        },
        options: {
            storySort: {
                order: ['Components', ['Basic'], 'Branding', ['Overview']],
                method: 'alphabetical',
            },
        },
        screenshot: {
            waitAssets: true,
        },
    },
    globalTypes: {
        theme: {
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'mirror',
                items: [
                    {value: 'light', right: '☼', title: 'Light'},
                    {value: 'dark', right: '☾', title: 'Dark'},
                    {value: 'light-hc', right: '☼', title: 'High Contrast Light (beta)'},
                    {value: 'dark-hc', right: '☾', title: 'High Contrast Dark (beta)'},
                ],
            },
        },
        lang: {
            defaultValue: 'en',
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [
                    {value: 'en', right: '🇬🇧', title: 'En'},
                    {value: 'ru', right: '🇷🇺', title: 'Ru'},
                ],
            },
        },
        platform: {
            defaultValue: 'desktop',
            toolbar: {
                title: 'Platform',
                items: [
                    {value: 'desktop', title: 'Desktop', icon: 'browser'},
                    {value: 'mobile', title: 'Mobile', icon: 'mobile'},
                ],
            },
        },
    },
};

export default preview;
