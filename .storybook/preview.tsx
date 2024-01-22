// eslint-disable-next-line import/order
import '../styles/fonts.scss';
// eslint-disable-next-line import/order
import '../styles/styles.scss';

import React from 'react';

import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {Decorator, Preview} from '@storybook/react';

import {Lang, MobileProvider, ThemeProvider, configure} from '../src';
import {DocsDecorator} from '../src/demo/DocsDecorator/DocsDecorator';

import {WithLang} from './decorators/withLang';
import {WithMobile} from './decorators/withMobile';
import {themes} from './theme';

configure({
    lang: Lang.En,
});

const withContextProvider: Decorator = (Story, context) => {
    const children = (
        <ThemeProvider theme={context.globals.theme} direction={context.globals.direction}>
            <MobileProvider>
                <Story {...context} />
            </MobileProvider>
        </ThemeProvider>
    );

    if (context.parameters?.disableStrictMode) {
        return children;
    }

    return <React.StrictMode>{children}</React.StrictMode>;
};

const preview: Preview = {
    decorators: [WithMobile, WithLang, withContextProvider],
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
                order: [
                    'Components',
                    ['Inputs', 'Data Display', 'Feedback', 'Navigation', 'Overlays', 'Utils'],
                    'Layout',
                    'Hooks',
                    'Branding',
                    ['Overview'],
                ],
                method: 'alphabetical',
            },
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
                    {value: 'light-hc', right: '☼', title: 'Light (high contrast)'},
                    {value: 'dark-hc', right: '☾', title: 'Dark (high contrast)'},
                ],
                dynamicTitle: true,
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
                dynamicTitle: true,
            },
        },
        direction: {
            defaultValue: 'ltr',
            toolbar: {
                title: 'Direction',
                icon: 'menu',
                items: [
                    {value: 'ltr', title: 'Left to Right', icon: 'arrowrightalt'},
                    {value: 'rtl', title: 'Right to Left', icon: 'arrowleftalt'},
                ],
                dynamicTitle: true,
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
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
