import type {ColorOptions, ThemeColorSettings} from './types';

const heavy: ColorOptions = {
    lightness: [45, 55],
    situration: [45, 55],
};

export const colorOptions: Record<string, ThemeColorSettings> = {
    dark: {
        light: {
            lightness: [25, 35],
            situration: [45, 55],
        },
        medium: {
            lightness: [40, 80],
            situration: [15, 55],
        },
        heavy,
    },
    light: {
        light: {
            lightness: [80, 90],
            situration: [45, 55],
        },
        medium: {
            lightness: [40, 80],
            situration: [15, 55],
        },
        heavy,
    },
};

export const WHITE_COLOR = '#ffffff';
export const BLACK_COLOR = '#000000';
