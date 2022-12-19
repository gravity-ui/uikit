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
    tablH: 'th',
    lptpS: 'lps',
    lptpM: 'plm',
    dsktp: 'd',
};
export const MEDIA_TO_VALUE: Record<MediaType, number> = {
    mobile: 480,
    tablH: 1080,
    lptpS: 1200,
    lptpM: 1400,
    dsktp: 1920,
};

export const DATA_UI_LAYOUT_THEME: LayoutTheme = {
    base: {
        gutters: 's',
        space: 's',
    },
    medias: {
        mobile: {},
        tablH: {},
        lptpS: {
            gutters: 'l',
            space: 'l',
        },
        lptpM: {
            gutters: 'l',
            space: 'l',
        },
        dsktp: {
            gutters: 'l',
            space: 'l',
        },
    },
};
