import {LayoutTheme, Space} from './types';

export const SPACE_TO_PIXEL: Record<Space, number> = {
    none: 0,
    nano: 2,
    micro: 4,
    xs: 8,
    s: 12,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
};

export const DEFAULT_LAYOUT_THEME: LayoutTheme = {
    breakpoints: {
        s: 576,
        m: 768,
        l: 1080,
        xl: 1200,
        xxl: 1400,
        xxxl: 1920,
    },
    common: {
        space: 's',
        media: {
            l: {
                space: 'l',
            },
        },
    },
    components: {
        container: {
            gutters: 's',
            media: {
                l: {
                    gutters: 'l',
                },
            },
        },
    },
};
