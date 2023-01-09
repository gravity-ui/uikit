import {LayoutTheme, MediaType, Space} from './types';

export const SPACE_TO_PIXEL: Record<Space, number> = {
    none: 0,
    micro: 2,
    xxs: 4,
    xs: 8,
    s: 16,
    m: 20,
    l: 24,
    xl: 32,
    xxl: 40,
};

export const MEDIA_TO_MOD: Record<MediaType, string> = {
    mobile: 'm',
    tabletH: 'th',
    laptopS: 'lps',
    laptopM: 'lpm',
    desktop: 'd',
};

export const DEFAULT_LAYOUT_THEME: LayoutTheme = {
    breakpoints: {
        mobile: 480,
        tabletH: 1080,
        laptopS: 1200,
        laptopM: 1400,
        desktop: 1920,
    },
    default: {
        gutters: 's',
        space: 's',
    },
    mediasOverrides: {
        mobile: {},
        tabletH: {},
        laptopS: {
            gutters: 'l',
            space: 'l',
        },
        laptopM: {
            gutters: 'l',
            space: 'l',
        },
        desktop: {
            gutters: 'l',
            space: 'l',
        },
    },
};
