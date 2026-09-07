import {generateCSS, parseCSS, parseJSON} from '@gravity-ui/uikit-themer';
import type {JsonTheme} from '@gravity-ui/uikit-themer';

export const ADDON_ID = 'gravity-ui/theme-import';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TOOL_ID = `${ADDON_ID}/tool`;
export const APPLY_THEME_EVENT = `${ADDON_ID}/apply`;
export const RESET_THEME_EVENT = `${ADDON_ID}/reset`;
export const SET_THEME_SOURCE_EVENT = `${ADDON_ID}/set-source`;

const STORAGE_KEY = 'gravity-ui-storybook-imported-theme';
const STYLE_ELEMENT_ID = 'gravity-ui-storybook-imported-theme';
const CSS_IMPORT_PATTERN =
    /@import\s+(?:url\(\s*(?:"[^"]*"|'[^']*'|[^)]*)\s*\)|"[^"]*"|'[^']*')[^;]*;/gi;

export type ImportedTheme = {
    css: string;
    format: 'css' | 'json';
    source: string;
};

export function compileTheme(source: string): ImportedTheme {
    const trimmedSource = source.trim();

    if (trimmedSource.startsWith('{')) {
        const jsonTheme = JSON.parse(trimmedSource) as JsonTheme;

        return {
            css: generateCSS({theme: parseJSON(jsonTheme), forPreview: true}),
            format: 'json',
            source,
        };
    }

    const imports = trimmedSource.match(CSS_IMPORT_PATTERN)?.join('\n') ?? '';
    const css = generateCSS({theme: parseCSS(trimmedSource), forPreview: true});

    return {
        css: imports ? `${imports}\n\n${css}` : css,
        format: 'css',
        source,
    };
}

export function applyTheme(theme: ImportedTheme, documentRef: Document = document) {
    let styleElement = documentRef.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;

    if (!styleElement) {
        styleElement = documentRef.createElement('style');
        styleElement.id = STYLE_ELEMENT_ID;
        documentRef.head.append(styleElement);
    }

    styleElement.textContent = theme.css;
}

export function resetTheme(documentRef: Document = document) {
    documentRef.getElementById(STYLE_ELEMENT_ID)?.remove();
}

export function getStoredThemeSource(storage: Storage = localStorage) {
    return storage.getItem(STORAGE_KEY);
}

export function storeThemeSource(source: string, storage: Storage = localStorage) {
    storage.setItem(STORAGE_KEY, source);
}

export function clearStoredTheme(storage: Storage = localStorage) {
    storage.removeItem(STORAGE_KEY);
}
