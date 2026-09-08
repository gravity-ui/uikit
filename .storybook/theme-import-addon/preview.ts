import {addons} from 'storybook/preview-api';

import {
    APPLY_THEME_EVENT,
    RESET_THEME_EVENT,
    applyTheme,
    clearStoredTheme,
    compileTheme,
    getStoredThemeSource,
    resetTheme,
    storeThemeSource,
} from './shared';

let initialized = false;

export function initializeThemeImport() {
    if (initialized) {
        return;
    }

    initialized = true;

    const channel = addons.getChannel();

    channel.on(APPLY_THEME_EVENT, (source: string) => {
        activateTheme(source);
    });

    channel.on(RESET_THEME_EVENT, () => {
        clearStoredTheme();
        resetTheme();
    });

    const storedThemeSource = getStoredThemeSource();

    if (storedThemeSource) {
        activateTheme(storedThemeSource);
    }
}

function activateTheme(source: string) {
    try {
        applyTheme(compileTheme(source));
        storeThemeSource(source);
    } catch (error) {
        console.error('Failed to apply the imported Gravity UI theme.', error);
    }
}
