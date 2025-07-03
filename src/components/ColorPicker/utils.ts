import {colord, extend} from 'colord';
import namesPlugin from 'colord/plugins/names';

import type {HexColor, RgbColor, RgbaColor} from './types';

extend([namesPlugin]);

/**
 * Validates and normalizes alpha value to be within 0-100 range
 * @param v - Alpha value to validate (0-100 range expected)
 * @returns Normalized alpha value: 100 for invalid/null/NaN/out-of-range values, 0 for negative values, or the original value if valid
 */
export const validAlpha = (v: number | null) => {
    if (v === null || v === undefined || Number.isNaN(v) || v > 100) {
        return 100;
    } else if (v < 0) {
        return 0;
    } else {
        return v;
    }
};

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

/**
 * Normalizes a hex color string to a valid hex format
 * @param hex - Color string to normalize (can be hex, color name, etc.)
 * @returns Valid hex color string or '#000000' if input is invalid
 */
export const normalizeHex = (hex: string): string => {
    const color = colord(hex);
    return color.isValid() ? color.toHex() : '#000000';
};
