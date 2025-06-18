import type {ColSize, LayoutTheme, Space} from './types';

// css custom properties doesn't support decimal numbers in name
export const CSS_SIZE_EXCEPTION = {
    '0.5': 'half',
} as Record<Space | ColSize, string>;

export const DEFAULT_LAYOUT_THEME: LayoutTheme = {
    breakpoints: {
        xs: 0,
        s: 576,
        m: 768,
        // TODO BREAKING CHANGE: Set l to 980
        l: 1080,
        xl: 1200,
        xxl: 1400,
        xxxl: 1920,
    },
    spaceBaseSize: 4,
    components: {
        container: {
            gutters: 3,
            media: {
                l: {
                    gutters: 5,
                },
            },
        },
    },
};
