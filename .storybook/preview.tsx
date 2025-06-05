// eslint-disable-next-line import/order
import '../styles/fonts.scss';
// eslint-disable-next-line import/order
import '../styles/styles.scss';

import type {Preview} from '@storybook/react-webpack5';
import {MINIMAL_VIEWPORTS} from 'storybook/viewport';

import {DocsDecorator} from '../src/demo/DocsDecorator/DocsDecorator';

import {WithLang} from './decorators/withLang';
import {WithMobile} from './decorators/withMobile';
import {WithStrictMode} from './decorators/withStrictMode';
import {WithTheme} from './decorators/withTheme';
import {themes} from './theme';

const preview: Preview = {
    decorators: [WithLang, WithMobile, WithTheme, WithStrictMode],
    parameters: {
        docs: {
            theme: themes.light,
            container: DocsDecorator,
            codePanel: true,
        },
        actions: {
            argTypesRegex: '^on.*',
        },
        jsx: {showFunctions: true}, // To show functions in sources
        backgrounds: {disable: true},
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
    initialGlobals: {
        theme: 'light',
        lang: 'en',
        direction: 'ltr',
        platform: 'desktop',
    },
};

export default preview;
