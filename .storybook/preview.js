import '../styles/styles.scss';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import {CloudTheme} from './theme';
import {withTheme} from './decorators/withTheme';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {ThemeProvider, MobileProvider} from '../src';
import {configure} from '../src/components/utils/configure';

configure({
    lang: 'en',
});

const withContextProvider = (Story, context) => {
    const theme = context.globals.theme;

    // dark theme for documentation hack
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

function withAnimationSpeed(Story, context) {
    const {animationSpeed} = context.globals;

    if (typeof animationSpeed === 'number') {
        document.body.style.setProperty('--yc-animation-multiplier', `${1 / animationSpeed}`);
    }

    return <Story {...context} />;
}

export const decorators = [
    withTheme,
    withMobile,
    withLang,
    withContextProvider,
    withAnimationSpeed,
];

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

const animationSpeed = [
    0.1, 0.2, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2,
    // Special value to make speed so fast that it could not be recognized
    10000,
];

/**
 * @param {number} speed
 * @returns {string}
 */
function getAnimationSpeedTitle(speed) {
    if (speed === 1) {
        return 'normal';
    }

    if (speed === 10000) {
        return 'disabled';
    }

    return `x${speed}`;
}

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
    animationSpeed: {
        name: 'Animation Speed',
        description: 'Control components animation speed',
        defaultValue: 1,
        toolbar: {
            icon: 'watch',
            items: animationSpeed.map((speed) => ({
                value: speed,
                title: getAnimationSpeedTitle(speed),
            })),
        },
    },
};
