import type {ColorDetails} from './color';
import {getPersistentColorDetails} from './color';
import type {Intensity} from './types';

export type ColorInfo = ColorDetails;

export const getColorInfo = (seed: string, intensity: Intensity = 'light', theme: string) => {
    return getPersistentColorDetails({seed, intensity, theme});
};

const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (value: number) => {
        const hex = Math.round(value).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const formatColorInfo = (colorInfo: ColorInfo) => {
    return {
        hash: colorInfo.hash.toString(),
        oklch: `oklch(${colorInfo.oklch.l.toFixed(1)}% ${colorInfo.oklch.c.toFixed(1)}% ${colorInfo.oklch.h.toFixed(1)}°)`,
        rgb: `rgb(${colorInfo.rgb.r}, ${colorInfo.rgb.g}, ${colorInfo.rgb.b})`,
        hex: rgbToHex(colorInfo.rgb.r, colorInfo.rgb.g, colorInfo.rgb.b),
    };
};
