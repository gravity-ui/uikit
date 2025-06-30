import {colord, extend} from 'colord';
import namesPlugin from 'colord/plugins/names';

extend([namesPlugin]);

export const validAlpha = (v: number | null) => {
    if (!v || v > 100) {
        return 100;
    } else if (v < 0) {
        return 0;
    } else {
        return v;
    }
};

// Color format types
export type HexColor = string;
export type RgbColor = {r: number; g: number; b: number};
export type RgbaColor = {r: number; g: number; b: number; a: number};

export const isValidHex = (hex: string) => colord(hex).isValid();
export const isValidRgb = (rgb: RgbColor) => colord(rgb).isValid();
export const isValidRgba = (rgba: RgbaColor) => colord(rgba).isValid();

export const hexToRgb = (hex: HexColor): RgbColor | null => {
    const color = colord(hex);
    return color.isValid() ? color.toRgb() : null;
};

export const rgbToHex = (rgb: RgbColor): HexColor => {
    return colord(rgb).toHex();
};

export const hexToRgba = (hex: HexColor): RgbaColor | null => {
    const color = colord(hex);
    return color.isValid() ? color.toRgb() : null;
};

export const rgbaToHex = (rgba: RgbaColor): HexColor => {
    return colord(rgba).toHex();
};

export const rgbToRgba = (rgb: RgbColor, alpha = 1): RgbaColor => {
    return {...rgb, a: alpha};
};

export const rgbaToRgb = (rgba: RgbaColor): RgbColor => {
    return {r: rgba.r, g: rgba.g, b: rgba.b};
};

// String representations
export const rgbToString = (rgb: RgbColor): string => {
    return colord(rgb).toRgbString();
};

export const rgbaToString = (rgba: RgbaColor): string => {
    return colord(rgba).toRgbString();
};

// Parse string representations
export const parseRgbString = (rgbString: string): RgbColor | null => {
    const color = colord(rgbString);
    return color.isValid() ? color.toRgb() : null;
};

export const parseRgbaString = (rgbaString: string): RgbaColor | null => {
    const color = colord(rgbaString);
    return color.isValid() ? color.toRgb() : null;
};

// Helper functions for the color picker
export const sanitizeHex = (hex: string, prevHex: string): HexColor => {
    const color = colord(hex);
    return color.isValid() ? color.toHex() : prevHex;
};

export const opacityToHex = (hex: HexColor, opacity: number): HexColor => {
    const normalizedOpacity = Math.max(0, Math.min(100, opacity)) / 100;
    return colord(hex).alpha(normalizedOpacity).toHex();
};

export const hexToOpacity = (hex: HexColor): number => {
    const color = colord(hex);
    return Math.round(color.alpha() * 100);
};

export const applyFullOpacity = (hex: HexColor): HexColor => {
    return colord(hex).alpha(1).toHex();
};

export function adjust(color: HexColor, amount: number): HexColor {
    return colord(color)
        .lighten(amount / 255)
        .toHex();
}

export const getDisplayHex = (hex: HexColor): HexColor => {
    return colord(hex).alpha(1).toHex();
};

export const normalizeHex = (hex: string): string => {
    const color = colord(hex);
    return color.isValid() ? color.toHex() : '#000000';
};
