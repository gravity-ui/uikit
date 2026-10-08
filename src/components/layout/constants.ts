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
        l: 980,
        xl: 1200,
        '2xl': 1400,
        '3xl': 1920,
    },
    spaceBaseSize: 4,
    components: {
        container: {
            gutters: 'spacing-3',
            media: {
                l: {
                    gutters: 'spacing-5',
                },
            },
        },
    },
};
