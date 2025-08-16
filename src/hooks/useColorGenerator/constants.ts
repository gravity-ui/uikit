import type {ThemeColorSettings} from './types';

export const colorOptions: Record<string, ThemeColorSettings> = {
    dark: {
        light: {
            lightness: [35, 40],
            saturation: [5, 10],
        },
        medium: {
            lightness: [50, 55],
            saturation: [12, 17],
        },
        heavy: {
            lightness: [75, 80],
            saturation: [20, 25],
        },
    },
    light: {
        light: {
            lightness: [90, 95],
            saturation: [5, 10],
        },
        medium: {
            lightness: [75, 80],
            saturation: [12, 17],
        },
        heavy: {
            lightness: [55, 60],
            saturation: [20, 25],
        },
    },
};
