import type {ColorOptions, ThemeColorSettings} from './types';

const bright: ColorOptions = {
    lightness: [45, 55],
    situration: [45, 55],
};

export const colorOptions: Record<string, ThemeColorSettings> = {
    dark: {
        saturated: {
            lightness: [40, 80],
            situration: [15, 55],
        },
        unsaturated: {
            lightness: [25, 35],
            situration: [45, 55],
        },
        bright,
    },
    light: {
        saturated: {
            lightness: [40, 80],
            situration: [15, 55],
        },
        unsaturated: {
            lightness: [80, 90],
            situration: [45, 55],
        },
        bright,
    },
};

export const WHITE_COLOR = '#ffffff';
export const BLACK_COLOR = '#000000';
