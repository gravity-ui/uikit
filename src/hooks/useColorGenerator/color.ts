/* eslint-disable no-bitwise */
import Color from 'colorjs.io';

import {BLACK_COLOR, WHITE_COLOR, colorOptions} from './constants';
import type {ColorProps, HslColorProps} from './types';
import {getHue, hashFnv32a, normalizeHash} from './utils';

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);

    const f = (n: number) => {
        return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    };

    const r = ~~(255 * f(0));
    const g = ~~(255 * f(8));
    const b = ~~(255 * f(4));

    return [r, g, b] as [number, number, number];
};

// https://www.w3.org/TR/WCAG20/#relativeluminancedef
const getRelativeLuminance = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    const N = rgb.length;
    const normalizedValues = Array(N);

    for (let i = 0; i < N; i++) {
        let c = rgb[i];
        c /= 255.0;

        if (c <= 0.04045) {
            c /= 12.92;
        } else {
            c = Math.pow((c + 0.055) / 1.055, 2.4);
        }

        normalizedValues[i] = c;
    }

    const [r, g, b] = normalizedValues;
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return L;
};

const getHash = (seed: string) => {
    const hash = hashFnv32a(seed, 0x73_6f_6d_65) ^ hashFnv32a(seed, 0x64_6f_72_61);

    return hash;
};

const generateHSLColor = ({hash, intensity, theme}: HslColorProps) => {
    const hue = getHue(hash);
    const themeOptions = colorOptions[theme];
    const lightnessRange = themeOptions[intensity].lightness;
    const saturationRange = themeOptions[intensity].situration;

    const saturation = normalizeHash(hash, saturationRange[0], saturationRange[1]);
    const lightness = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);

    const oklchStr = `oklch(${lightness / 100} ${saturation / 100} ${hue})`;
    const color = new Color(oklchStr).to('hsl');

    return {color, hue, saturation, lightness};
};

export const getPersistentColor = ({seed, intensity = 'light', theme, oklch}: ColorProps) => {
    const hash = getHash(seed);
    const values = generateHSLColor({hash, intensity, theme, oklch});

    return values;
};

export const getTextColor = (
    h: number,
    s: number,
    l: number,
    lightColor = WHITE_COLOR,
    darkColor = BLACK_COLOR,
) => {
    const L = getRelativeLuminance(h, s, l);

    return L > 0.179 ? darkColor : lightColor;
};
