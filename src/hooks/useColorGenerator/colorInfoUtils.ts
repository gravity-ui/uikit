import type {ColorDetails} from './color';
import {getPersistentColorDetails} from './color';
import type {Intensity} from './types';

export type ColorInfo = ColorDetails;

export const getColorInfo = (
    seed: string,
    intensity: Intensity = 'light',
    theme: string,
): ColorInfo => {
    return getPersistentColorDetails({seed, intensity, theme});
};

export const formatColorInfo = (
    colorInfo: ColorInfo,
): {
    hash: string;
    oklch: string;
    rgb: string;
} => {
    return {
        hash: colorInfo.hash.toString(),
        oklch: `oklch(${colorInfo.oklch.l.toFixed(1)}% ${colorInfo.oklch.c.toFixed(1)}% ${colorInfo.oklch.h.toFixed(1)}°)`,
        rgb: `rgb(${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b})`,
    };
};
